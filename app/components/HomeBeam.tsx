import { useEffect, useRef } from "react";

/**
 * 홈 배경: 어두운 남색 바탕 위 대각선 파란 빛줄기 (josu.framer.website 첫 화면 참고).
 * 큰 천(비단)이 파도처럼 일렁이며 계속 밀려가고, 빛을 받는 면은 파랗게, 주름은 어둡게 보인다.
 * 마우스를 움직이면 커서 자리의 천이 부풀어 오르며 뒤따라온다.
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
uniform vec2 uTrail;   // 커서를 느리게 따라오는 점
uniform float uEnergy; // 커서 속도 (0..1)
uniform float uScroll; // 0..1, 아래로 내릴수록 빛을 줄인다

const float PI = 3.14159265;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

vec2 gM; vec2 gTr; float gT; float gAspect;

// 천 한 장: 법선 n 쪽으로 폭 W만큼 펼쳐진 띠. 또렷한 경계(f=0)에서 n 쪽으로 갈수록 진해지다 사라진다.
// 띠 전체가 주기 T초 동안 화면 한쪽 밖에서 반대쪽 밖으로 지나간다 (dirSign: +1이면 n 쪽으로 이동)
vec3 sheet(vec3 col, vec2 p, vec2 n, float W, float T, float ph, float dirSign, float bend) {
  // 화면 네 모서리에서 n 방향 투영의 최소/최대
  float d0 = 0.0, d1 = gAspect * n.x, d2 = n.y, d3 = gAspect * n.x + n.y;
  float lo = min(min(d0, d1), min(d2, d3)) - 0.35, hi = max(max(d0, d1), max(d2, d3)) + 0.35;
  float u = fract(gT / T + ph);
  // 띠가 완전히 화면 밖일 때 처음으로 돌아간다
  float o = dirSign > 0.0 ? mix(lo - W, hi, u) : mix(hi, lo - W, u);
  vec2 dir = vec2(n.y, -n.x);
  float f = dot(p, n) - o + bend * sin(dot(p, dir) * 1.7 + gT * 0.45 + ph * 6.0)
          + 0.04 * sin(dot(p, dir) * 4.1 - gT * 0.8 + ph * 3.0);
  // 커서 쪽으로 천 자락이 넓게 휘어 온다
  vec2 dm = p - gM, dt = p - gTr;
  f += (0.1 + uEnergy * 0.18) * exp(-dot(dm, dm) / 0.22) + 0.05 * exp(-dot(dt, dt) / 0.3);

  float side = smoothstep(-0.006, 0.012, f) * smoothstep(W, W * 0.45, f);
  vec3 bright = vec3(0.14, 0.4, 1.0), deep = vec3(0.02, 0.16, 0.78);
  vec3 c = mix(deep, bright, exp(-max(f, 0.0) * 2.4));
  c *= 1.0 - 0.2 * exp(-pow((f - 0.17) / 0.06, 2.0));          // 안쪽 두 번째 결
  c += vec3(0.45, 0.62, 1.0) * exp(-abs(f) * 70.0) * 0.45;      // 경계 하이라이트
  col *= 1.0 - 0.45 * exp(-max(-f, 0.0) * 9.0) * step(f, 0.0);  // 경계 바깥 그림자
  return mix(col, c, side);
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = gl_FragCoord.xy / uRes.y;           // 가로 0..aspect, 세로 0..1
  gM = uMouse * vec2(aspect, 1.0);
  gTr = uTrail * vec2(aspect, 1.0);
  gT = uTime;
  gAspect = aspect;

  vec3 base = vec3(0.008, 0.012, 0.045);
  vec3 col = base;
  // 왼쪽 아래 은은히 떠다니는 푸른 빛
  vec2 g = p - vec2(aspect * 0.18 + 0.12 * sin(gT * 0.21), 0.28 + 0.1 * sin(gT * 0.17));
  col += vec3(0.04, 0.12, 0.5) * exp(-dot(g * vec2(0.7, 1.3), g * vec2(0.7, 1.3)) * 7.0) * 0.7;

  // 서로 다른 방향의 천 세 장이 번갈아 화면을 지나간다 (뒤 → 앞)
  col = sheet(col, p, normalize(vec2(-0.85, 0.5)), 1.1, 19.0, 0.55, -1.0, 0.08); // 왼쪽 위에서 오른쪽 아래로
  col = sheet(col, p, normalize(vec2(-0.12, 1.0)), 1.0, 16.0, 0.2, -1.0, 0.07);  // 위에서 아래로
  col = sheet(col, p, normalize(vec2(0.78, 0.62)), 1.2, 14.0, 0.8, 1.0, 0.06);   // 오른쪽 위 대각선, 오른쪽으로 물러남

  // 아래로 갈수록, 스크롤할수록 차분하게 (카드 영역 가독성)
  float fade = smoothstep(-0.15, 0.55, p.y) * (1.0 - uScroll * 0.6);
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
      // 컨텍스트는 버리지 않는다: 개발 모드(StrictMode)는 effect를 두 번 실행하는데,
      // 여기서 loseContext()를 부르면 같은 캔버스의 두 번째 실행이 아무것도 못 그린다
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div className="home-beam" aria-hidden>
      <canvas ref={ref} className="home-beam__canvas" />
    </div>
  );
}
