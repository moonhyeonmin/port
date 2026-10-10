import { useEffect, useRef } from "react";

/**
 * 홈 배경: 어두운 남색 바탕 위로 대각선 파란 빛줄기가 천천히 흐르고, 마우스 쪽으로 살짝 기운다.
 * WebGL 셰이더로 그리며, WebGL이 없거나 동작 줄이기 설정이면 CSS 그라디언트(.home-beam 배경)만 보인다.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;   // -1..1, 천천히 따라오는 값
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

void main() {
  // 화면 비율을 보정한 좌표 (가로 0..aspect, 세로 0..1, 위가 1)
  vec2 uv = gl_FragCoord.xy / uRes.y;
  float aspect = uRes.x / uRes.y;
  float t = uTime * 0.06;

  // 빛줄기 경계선: 화면 위 가운데에서 오른쪽 아래로 내려가는 대각선
  // 세로로 긴 화면(모바일)은 경계를 왼쪽으로 옮기고 더 가파르게
  float narrow = smoothstep(1.3, 0.6, aspect);
  float ang = radians(mix(-42.0, -60.0, narrow)) + uMouse.x * 0.05 + sin(t * 1.3) * 0.04;
  vec2 dir = vec2(cos(ang), sin(ang));
  vec2 nrm = vec2(-dir.y, dir.x);
  vec2 origin = vec2(aspect * (mix(0.48, 0.3, narrow) + uMouse.x * 0.025) + sin(t) * 0.05, 1.0 + uMouse.y * 0.025);
  float warp = (fbm(uv * 1.4 + vec2(t, -t * 0.7)) - 0.5) * 0.16;
  float d = dot(uv - origin, nrm) + warp; // 양수 = 빛 쪽

  vec3 base = vec3(0.008, 0.012, 0.045);
  vec3 deep = vec3(0.03, 0.14, 0.72);
  vec3 blue = vec3(0.1, 0.36, 1.0);
  vec3 edge = vec3(0.42, 0.62, 1.0);

  // 빛 쪽: 경계에서 빠르게 밝아지고 안쪽은 진한 파랑과 밝은 파랑이 흐른다
  float side = smoothstep(-0.015, 0.1, d);
  float inner = fbm(uv * 0.9 + vec2(-t * 0.6, t * 0.4));
  vec3 lit = mix(blue, deep, smoothstep(0.2, 0.9, d) * (0.4 + inner * 0.6));
  vec3 col = mix(base, lit, side);
  // 어두운 쪽으로 번지는 푸른 기운
  col += deep * exp(-max(-d, 0.0) * 5.0) * 0.28 * (1.0 - side);
  // 경계의 밝은 띠
  col += edge * exp(-abs(d - 0.012) * 40.0) * 0.35;

  // 왼쪽 아래 은은한 푸른 기운
  vec2 g = uv - vec2(aspect * 0.18 + sin(t * 0.8) * 0.05, -0.05);
  col += vec3(0.03, 0.12, 0.55) * exp(-dot(g, g) * 5.5) * 0.55;

  // 아래로 갈수록, 스크롤할수록 차분하게 (카드 영역 가독성)
  float fade = smoothstep(-0.15, 0.55, uv.y) * (1.0 - uScroll * 0.6);
  col = mix(base, col, fade);

  // 필름 그레인
  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.035;
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

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uScroll = gl.getUniformLocation(prog, "uScroll");

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let visible = true;
    let frame = 0;
    const start = performance.now();

    const resize = () => {
      // 흐릿한 그림이라 고해상도가 필요 없다: 픽셀 밀도 최대 1.25
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      const scroll = Math.min(window.scrollY / Math.max(canvas.clientHeight, 1), 1);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, still ? 8 : (now - start) / 1000 + 8);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
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
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
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
