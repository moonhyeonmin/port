import { useEffect, useRef } from "react";

/**
 * 홈 배경: 어두운 남색 위로 파란 천이 파도처럼 느리게 일렁인다 (josu.framer.website 첫 화면 참고).
 * 원본과 같은 기법(사인파로 좌표를 여러 번 비트는 난류 + Oklab 팔레트)과 같은 설정값으로 직접 작성했다.
 * 원본처럼 마우스에는 반응하지 않고 시간에 따라서만 움직인다.
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

// 원본과 같은 설정값
const float SPEED = 0.25;    // 흐름 속도 (원본 0.4, 사용자 요청으로 더 느리게)
const float SCALE = 0.6;     // 무늬 크기 (작을수록 크다)
const float TURB_AMP = 0.6;  // 비트는 세기
const float TURB_FREQ = 0.1; // 비트는 촘촘함
const float WAVE = 2.0;      // 물결 간격
const float EXPOSURE = 1.1;
const float CONTRAST = 1.1;
const float GRAIN = 0.05;

// 팔레트: 남색 바탕 → 밝은 파랑 → 진한 파랑 (sRGB)
const vec3 C0 = vec3(0.0, 0.0, 0.102);
const vec3 C1 = vec3(0.161, 0.384, 1.0);
const vec3 C2 = vec3(0.0, 0.267, 1.0);

float grain(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// Oklab (Björn Ottosson): 색을 사람 눈에 고르게 섞기 위한 색공간
vec3 lin2lab(vec3 c) {
  vec3 lms = vec3(
    dot(c, vec3(0.4122214708, 0.5363325363, 0.0514459929)),
    dot(c, vec3(0.2119034982, 0.6806995451, 0.1073969566)),
    dot(c, vec3(0.0883024619, 0.2817188376, 0.6299787005)));
  lms = pow(max(lms, 0.0), vec3(1.0 / 3.0));
  return vec3(
    dot(lms, vec3(0.2104542553, 0.7936177850, -0.0040720468)),
    dot(lms, vec3(1.9779984951, -2.4285922050, 0.4505937099)),
    dot(lms, vec3(0.0259040371, 0.7827717662, -0.8086757660)));
}
vec3 lab2lin(vec3 c) {
  vec3 lms = vec3(
    c.x + 0.3963377774 * c.y + 0.2158037573 * c.z,
    c.x - 0.1055613458 * c.y - 0.0638541728 * c.z,
    c.x - 0.0894841775 * c.y - 1.2914855480 * c.z);
  lms = lms * lms * lms;
  return vec3(
    dot(lms, vec3(4.0767416621, -3.3077115913, 0.2309699292)),
    dot(lms, vec3(-1.2684380046, 2.6097574011, -0.3413193965)),
    dot(lms, vec3(-0.0041960863, -0.7034186147, 1.7076147010)));
}
vec3 palette(float v) {
  vec3 a = lin2lab(pow(C0, vec3(2.2)));
  vec3 b = lin2lab(pow(C1, vec3(2.2)));
  vec3 c = lin2lab(pow(C2, vec3(2.2)));
  return v < 0.5 ? mix(a, b, v * 2.0) : mix(b, c, v * 2.0 - 1.0);
}

void main() {
  // 화면 가운데가 0, 세로 -1..1
  vec2 p = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  float t = uTime * 0.3 * SPEED;

  // 무늬 방향과 시작 위상: 원본 설정(seed 648)에서 계산한 상수
  const vec3 OFS = vec3(0.472163, 0.710389, 0.314634);
  const vec3 OFS2 = vec3(0.186009, 0.227949, 0.150506);
  p = mat2(-0.996149, 0.087671, -0.087671, -0.996149) * p;

  // 난류(turbulence): 좌표를 사인파로 여러 번 비틀어 천이 흐르는 듯한 결을 만든다
  vec2 q = p * SCALE;
  float a = -1.972862, d = -1.709346;
  for (int j = 2; j < 7; j++) {
    float fj = float(j);
    q += TURB_AMP * sin(q.yx * TURB_FREQ * fj + t + vec2(a, d) + OFS.xy * fj) / fj;
    a += cos(fj + d * 1.2 + q.x * 2.0 - t + OFS2.z);
    d += sin(fj * q.y + a + OFS.z + t + OFS2.y);
  }

  // 위상이 조금씩 다른 물결 세 겹을 섞어 경계를 부드럽게
  float L = length(q.yx + vec2(a, d) * 0.2) * WAVE + OFS.x;
  float v = (0.5 * (0.5 + 0.5 * sin(L + 1.0))
           + 1.0 * (0.5 + 0.5 * sin(L + 4.0))
           + 0.5 * (0.5 + 0.5 * sin(L + 9.0))) / 2.0;
  v = clamp((v - 0.3) / 0.4, 0.0, 1.0);
  v = clamp(v + (grain(floor(gl_FragCoord.xy)) - 0.5) * GRAIN, 0.0, 1.0);

  // 노출 → 대비(Oklab 밝기) → sRGB
  vec3 lab = lin2lab(max(lab2lin(palette(v)) * EXPOSURE, 0.0));
  lab.x = clamp((lab.x - 0.5) * CONTRAST + 0.5, 0.0, 1.0);
  vec3 col = pow(clamp(lab2lin(lab), 0.0, 1.0), vec3(0.4545));

  // 원본처럼 위에서 아래로 검은 그라디언트를 덮는다 (맨 아래는 페이지 바탕과 같은 검정)
  col *= gl_FragCoord.y / uRes.y;

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

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      gl.uniform2f(uRes, canvas.width, canvas.height);
      // 동작 줄이기 설정이면 한 장면에 멈춘다
      gl.uniform1f(uTime, still ? 4 : (now - start) / 1000);
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

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", onResize);
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
