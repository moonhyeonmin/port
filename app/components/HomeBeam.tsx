import { useEffect, useRef } from "react";

/**
 * 홈 배경: 어두운 남색 바탕 위 대각선 파란 빛줄기 (josu.framer.website 첫 화면 참고).
 * 빛줄기는 비단처럼 접힌 결을 따라 흐르고, 마우스를 움직이면 커서 쪽으로 크게 휘며 뒤따라온다.
 * 터치 기기처럼 마우스가 없으면 보이지 않는 점이 천천히 돌며 같은 움직임을 만든다.
 * WebGL이 없으면 CSS 그라디언트(.home-beam 배경)만 보이고, 동작 줄이기 설정이면 정지 화면 한 장만 그린다.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;   // 커서를 빠르게 따라오는 점 (0..1, 위가 1)
uniform vec2 uTrail;   // 커서를 느리게 따라오는 점: 둘 사이로 빛이 끌려간다
uniform float uEnergy; // 커서 속도 (0..1), 빠를수록 결이 크게 일렁인다
uniform float uScroll; // 0..1, 아래로 내릴수록 빛을 줄인다

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}
// 점 p에서 선분 a-b까지 거리
float segDist(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 uv = gl_FragCoord.xy / uRes.y;           // 가로 0..aspect, 세로 0..1
  vec2 m = uMouse * vec2(aspect, 1.0);
  vec2 tr = uTrail * vec2(aspect, 1.0);
  float t = uTime * 0.08;

  // 기본 빛줄기: 위 가운데에서 오른쪽 아래로 내려가는 대각선 (세로 화면은 더 가파르게)
  float narrow = smoothstep(1.3, 0.6, aspect);
  float ang = radians(mix(-42.0, -60.0, narrow)) + sin(t * 1.3) * 0.05;
  vec2 nrm = vec2(sin(-ang), cos(ang));
  vec2 origin = vec2(aspect * mix(0.5, 0.3, narrow) + sin(t) * 0.06, 1.0);

  // 결이 흐르도록 좌표를 비튼다 (커서가 빠를수록 크게)
  vec2 q = uv + (vec2(fbm(uv * 0.75 + t), fbm(uv * 0.75 - t + 4.0)) - 0.5) * (0.3 + uEnergy * 0.3);
  float f = dot(q - origin, nrm);

  // 커서 쪽으로 빛이 끌려온다: 느린 점→빠른 점 선분 주변을 밝은 쪽으로 밀어 비단 자락처럼
  float pull = exp(-pow(segDist(q, tr, m) / 0.42, 2.0));
  f += pull * (0.55 + uEnergy * 0.35);

  vec3 base = vec3(0.008, 0.012, 0.045);
  vec3 deep = vec3(0.02, 0.1, 0.62);
  vec3 blue = vec3(0.1, 0.36, 1.0);
  vec3 edge = vec3(0.45, 0.65, 1.0);

  float side = smoothstep(-0.02, 0.12, f);
  // 접힌 비단 결: 빛 안쪽에 밝고 어두운 주름
  float folds = 0.5 + 0.5 * sin(f * 4.2 + fbm(q * 0.9 + t) * 2.2 - t * 1.5);
  folds = smoothstep(0.1, 0.9, folds);
  vec3 lit = mix(deep, blue, 0.35 + 0.65 * folds);
  lit = mix(lit, deep, smoothstep(0.35, 1.1, f) * 0.5);
  vec3 col = mix(base, lit, side);
  col += deep * exp(-max(-f, 0.0) * 5.0) * 0.3 * (1.0 - side); // 어두운 쪽으로 번지는 푸른 기운
  col += edge * exp(-abs(f - 0.015) * 38.0) * 0.32;            // 경계의 밝은 띠

  // 아래로 갈수록, 스크롤할수록 차분하게 (카드 영역 가독성)
  float fade = smoothstep(-0.15, 0.55, uv.y) * (1.0 - uScroll * 0.6);
  col = mix(base, col, fade);

  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.035; // 필름 그레인
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export function HomeBeam() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!canvas || !gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("uRes");
    const uTime = u("uTime");
    const uMouse = u("uMouse");
    const uTrail = u("uTrail");
    const uEnergy = u("uEnergy");
    const uScroll = u("uScroll");

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 좌표는 캔버스 기준 0..1 (위가 1). 처음엔 오른쪽 위 빛줄기 근처
    const target = { x: 0.78, y: 0.75 };
    const mouse = { ...target };
    const trail = { ...target };
    let energy = 0;
    let lastMove = -Infinity;
    let visible = true;
    let frame = 0;
    let prev = performance.now();
    const start = prev;

    const resize = () => {
      // 흐릿한 그림이라 고해상도가 필요 없다: 픽셀 밀도 최대 1.25
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      const dt = Math.min((now - prev) / 16.7, 3); // 60fps 기준 프레임 수
      prev = now;
      const time = (now - start) / 1000;

      // 커서가 3초 이상 없으면 보이지 않는 점이 천천히 원을 그린다 (터치 기기 포함)
      if (now - lastMove > 3000) {
        target.x = 0.62 + Math.cos(time * 0.25) * 0.22;
        target.y = 0.62 + Math.sin(time * 0.33) * 0.2;
      }
      const vx = (target.x - mouse.x) * 0.08 * dt;
      const vy = (target.y - mouse.y) * 0.08 * dt;
      mouse.x += vx;
      mouse.y += vy;
      trail.x += (mouse.x - trail.x) * 0.025 * dt;
      trail.y += (mouse.y - trail.y) * 0.025 * dt;
      energy = Math.min(1, energy * Math.pow(0.95, dt) + Math.hypot(vx, vy) * 1.5);

      const rect = canvas.getBoundingClientRect();
      const scroll = Math.min(Math.max(-rect.top, 0) / Math.max(rect.height, 1), 1);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, still ? 8 : time + 8);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform2f(uTrail, trail.x, trail.y);
      gl.uniform1f(uEnergy, energy);
      gl.uniform1f(uScroll, scroll);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.classList.add("is-ready");
    };

    const loop = (now: number) => {
      frame = 0;
      draw(now);
      if (!still && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!frame) {
        prev = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = 1 - (e.clientY - rect.top) / rect.height;
      lastMove = performance.now();
    };
    const onResize = () => {
      resize();
      kick();
    };

    // 화면 밖이거나 탭이 숨겨지면 멈춘다
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);

    resize();
    kick();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", kick);
    if (!still) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    } else {
      // 동작 줄이기: 한 장만 그리되 스크롤에 따른 밝기는 반영
      window.addEventListener("scroll", kick, { passive: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", kick);
      document.removeEventListener("visibilitychange", kick);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className="home-beam" aria-hidden>
      <canvas ref={ref} className="home-beam__canvas" />
    </div>
  );
}
