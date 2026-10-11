import type { CSSProperties, ReactNode } from "react";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import { CountUp } from "~/components/CountUp";
import type { CaseStudyProps } from "./index";

/** 상단 내비게이션 항목 (섹션 id와 연결) */
export const leafNav: CaseNavItem[] = [
  { id: "project", label: "Project" },
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research", also: ["survey"] },
];

/*
 * leaf (가상 식물 키우기 사이드 프로젝트)
 * 디자인: design-src/leaf.svg (2160 × 63865). 글자·도형·차트는 HTML로 다시 만들고,
 * 사진과 앱 목업만 SVG 원본을 2배로 렌더링한 이미지(public/projects/leaf)로 넣는다.
 *
 * 데스크톱(1100px~): 디자인 좌표 그대로 배치 (--u = 디자인 1px, 값은 2160 기준 좌표)
 * 그 아래: 같은 요소를 위→아래 흐름으로 쌓는다 (글자는 줄을 이어 붙임)
 *
 * 글자 위치: SVG의 첫 줄 기준선(y)에서 줄 상자 위쪽을 계산한다.
 * Pretendard 기준선 = 줄 상자 위 + 줄높이/2 + 0.355 × 글자 크기
 */

type Align = "l" | "c" | "r";
/** [x, 기준선 y, 정렬, 내용] — x는 정렬 기준(왼쪽/가운데/오른쪽) */
type Line = [number, number, Align, ReactNode];

const G = "#CFFF9F";

function Txt({
  top,
  fs,
  lh = fs * 1.4,
  fw = 400,
  color = "#fff",
  ls = 0,
  lines,
  className = "",
}: {
  /** 섹션 위쪽 y (디자인 px) */
  top: number;
  fs: number;
  lh?: number;
  fw?: number;
  color?: string;
  ls?: number;
  lines: Line[];
  className?: string;
}) {
  return (
    <p
      className={`lf-t lf-r is-${lines[0][2]} ${className}`}
      style={{ "--fs": fs, "--lh": lh, "--ls": ls, fontWeight: fw, color } as CSSProperties}
    >
      {lines.map(([x, y, a, content], i) => (
        <span
          key={i}
          className={`lf-t__line is-${a}`}
          style={{ "--x": x, "--y": y - top - lh / 2 - 0.355 * fs } as CSSProperties}
        >
          {content}
        </span>
      ))}
    </p>
  );
}

/** 디자인 좌표에 놓는 이미지 (src는 2배 렌더링) */
function Img({
  top,
  x,
  y,
  w,
  h,
  src,
  alt = "",
  className = "",
  lazy = true,
}: {
  top: number;
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
  alt?: string;
  className?: string;
  lazy?: boolean;
}) {
  return (
    <img
      className={`lf-img ${className}`}
      src={src}
      width={Math.round(w)}
      height={Math.round(h)}
      alt={alt}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      style={{ "--x": x, "--y": y - top, "--w": w } as CSSProperties}
    />
  );
}

function Sec({
  id,
  top,
  h,
  className = "",
  label,
  children,
}: {
  id?: string;
  top: number;
  h: number;
  className?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`lf-sec ${className}`} aria-label={label} style={{ "--h": h } as CSSProperties}>
      <div className="lf-sec__inner" data-top={top}>
        {children}
      </div>
    </section>
  );
}

/* ───── 01 Hero (0 – 1329) ───── */
function Hero() {
  const T = 0;
  return (
    <Sec id="project" top={T} h={1329} className="lf-hero" label="leaf">
      <Img top={T} x={0} y={0} w={2160} h={1329} src="/projects/leaf/hero.webp" className="lf-hero__photo" lazy={false} alt="회색 벽 앞 흰 화분에 심긴 몬스테라" />
      <Txt
        top={T}
        fs={20.25}
        ls={-0.334}
        className="lf-hero__meta"
        lines={[
          [1968, 102.3, "r", "UXUI DESIGN"],
          [1964.1, 140.5, "r", "DATE : 2023.01 ~ 2023. 02"],
        ]}
      />
      <span className="lf-hero__badge" aria-hidden>
        <img src="/icons/leaf-clover.svg" alt="" width={47} height={47} />
      </span>
      <h1 className="lf-hero__logo">
        <img src="/icons/leaf-wordmark.svg" alt="leaf" width={390} height={156} />
        <img className="lf-hero__clover" src="/icons/leaf-clover.svg" alt="" width={59} height={59} />
      </h1>
      <a className="lf-hero__start" href="#overview">
        시작하기
      </a>
    </Sec>
  );
}

/* ───── 02 Overview (1329 – 2246) ───── */
function Overview() {
  const T = 1329;
  return (
    <Sec id="overview" top={T} h={917} className="lf-overview" label="Overview">
      {/* Figma 원문에 있는 왼쪽 위 작은 아이콘(♬ ♥ ♡) */}
      <Img top={T} x={0} y={1350} w={84} h={28} src="/projects/leaf/overview-icons.webp" className="lf-overview__icons" />
      <div className="lf-overview__logo lf-r" aria-hidden>
        <img src="/icons/leaf-wordmark.svg" alt="" width={154} height={62} />
        <img className="lf-overview__clover" src="/icons/leaf-clover.svg" alt="" width={16} height={24} />
      </div>
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[921.4, 1609.7, "l", "OVERVIEW"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        ls={0.5625}
        className="lf-h2"
        lines={[
          [919.1, 1697.7, "l", "식물을 키우기 전"],
          [919.1, 1779.8, "l", "가상으로 식물을 키우고 마음까지 힐링해요"],
        ]}
      />
      <Txt
        top={T}
        fs={22.5}
        lh={47.2}
        className="lf-body"
        lines={[
          [921.4, 1855.5, "l", "식물을 키우기만 하면 시들어서 키울 엄두가 안나는 경험 있나요? 내가 잘 키울 수 있을지 실제처럼 미리 예행 연습을"],
          [921.4, 1902.7, "l", "해보고 나에게 딱 맞는 식물을 추천받고 싶다는 생각에서부터 시작했어요. 식물을 실제처럼 키우면서 자격이 주어지면"],
          [921.4, 1950.0, "l", "실제 식물을 받아 키울 수 있어요. 또한 리프 앱에서는 AI를 활용한 마인드 분석으로 식물과의 교감을 넘어서 사용자의"],
          [921.4, 1997.2, "l", "마인드테라피까지 가능한 힐링 소셜앱이예요."],
        ]}
      />
    </Sec>
  );
}

/* ───── 03 Background (2246 – 3644) ───── */
function Background() {
  const T = 2246;
  return (
    <Sec top={T} h={1398} className="lf-background" label="Background">
      <div className="lf-background__panel" aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[537.2, 2843.8, "c", "BACKGROUND"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [531.0, 2929.6, "c", "식물 키우기를 고민하신 적"],
          // Figma 원문 그대로: "있지  않으신가요?" (띄어쓰기 2칸)
          [537.2, 3011.7, "c", "있지  않으신가요?"],
        ]}
      />
      <Img top={T} x={1078} y={2246} w={1082} h={1400} src="/projects/leaf/background.webp" className="lf-background__photo" alt="흑백으로 찍은 몬스테라 잎" />
    </Sec>
  );
}

/* ───── 04 User Research (3644 – 5180) ───── */
const researchCards = [
  { n: "a", x: 74, y: 4442, w: 354, h: 491, alt: "식물 기록 카드: 3월 13일 기록" },
  { n: "b", x: 451, y: 4354, w: 351, h: 487, alt: "커뮤니티 글 카드: 왼쪽에만 잎이 시들었다는 질문" },
  { n: "c", x: 793, y: 4652, w: 309, h: 414, alt: "검은 화분의 극락조화 사진 카드" },
  { n: "d", x: 1093, y: 4421, w: 441, h: 581, alt: "감정 기록 카드: 오늘 너무 힘든 날이었어" },
  { n: "e", x: 1512, y: 4370, w: 341, h: 471, alt: "음악 카드: Houdini, Dua Lipa" },
  { n: "f", x: 1854, y: 4573, w: 306, h: 493, alt: "코멘트 카드: 몬스테라가 벌써 새순이 돋았구나" },
];

function Research() {
  const T = 3644;
  return (
    <Sec id="research" top={T} h={1536} className="lf-research" label="User Research">
      <Txt top={T} fs={22.5} fw={700} color="#A8D180" className="lf-label" lines={[[1102.5, 3857.4, "c", "USER RESEARCH"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        color="#35322B"
        className="lf-h2"
        lines={[
          [1096.3, 3944.3, "c", "식물 키우기에 대한"],
          [1102.5, 4026.4, "c", "의견을 듣고자 리서치를 진행했어요"],
        ]}
      />
      <Txt
        top={T}
        fs={22.5}
        color="#35322B"
        className="lf-body"
        lines={[[1096.0, 4101.0, "c", "실제로 식물을 기르기 전 사용자의 행태를 알아보고, 인사이트를 얻기 위한 설문조사와 데스크리서치를 진행했습니다."]]}
      />
      <div className="lf-research__stage">
        {researchCards.map(({ n, x, y, w, h, alt }, i) => (
          <Img
            key={n}
            top={T}
            x={x}
            y={y}
            w={w}
            h={h}
            src={`/projects/leaf/card-${n}.webp`}
            alt={alt}
            className={`lf-research__card is-${n}`}
          />
        ))}
        <Img top={T} x={100} y={4140} w={2040} h={1380} src="/projects/leaf/tablet.webp" className="lf-research__tablet lf-r" alt="태블릿 화면의 leaf 앱: 화분 속 몬스테라와 하단 메뉴" />
      </div>
    </Sec>
  );
}

/* ───── 05 Survey · Insight (5180 – 10220) ───── */
const barsLeft = [
  { y: 7024.5, w: 496.1, label: "다른 것을 키우는 것보다 부담이 적어서", ly: 7062.6, pct: 50, px: 774.0 },
  { y: 7104.4, w: 322.9, label: "인테리어 요소", ly: 7142.5, pct: 32, px: 596.2 },
  // Figma에서 "16%"는 막대 뒤에 가려져 보이지 않는다 → 숨김
  { y: 7184.25, w: 154.1, label: "공기정화", ly: 7223.5, pct: 16, px: 447.8, py: 7222.4, hidePct: true },
];
const barsRight = [
  { y: 7025.6, w: 432, label: "잘 키워낼 자신이 없어서", ly: 7063.8, pct: 44, px: 1595.2 },
  { y: 7105.5, w: 392.6, label: "무엇을 데려와야 할지 몰라서", ly: 7143.6, pct: 36, px: 1558.1 },
  { y: 7185.4, w: 109.1, label: "기타", ly: 7224.6, pct: 8, px: 1292.6, pfs: 22.5 },
];

function BarChart({
  T,
  x,
  question,
  qx,
  top,
  rows,
}: {
  T: number;
  x: number;
  question: string;
  qx: number;
  top: { y: number; w: number; label: string; pct: number; px: number };
  rows: { y: number; w: number; label: string; ly: number; pct: number; px: number; py?: number; pfs?: number; hidePct?: boolean }[];
}) {
  const all = [
    { ...top, h: 85.5, ly: 6973.2, fs: 24.75, fw: 700, color: G, pfs: 24.75, py: 6973.2, first: true },
    ...rows.map((r) => ({ ...r, h: 63, fs: 20.25, fw: 400, color: "#969088", first: false })),
  ];
  return (
    <div className="lf-bars">
      <Txt top={T} fs={22.5} fw={700} color="#969088" className="lf-bars__q" lines={[[qx, 6883.1, "l", question]]} />
      <ol className="lf-bars__rows">
        {all.map((r) => (
          <li
            key={r.label}
            className={`lf-bar lf-r${r.first ? " is-top" : ""}`}
            style={{ "--x": x, "--y": r.y - T, "--w": r.w, "--bh": r.h, "--pct": r.pct } as CSSProperties}
          >
            <span className="lf-bar__fill" aria-hidden />
            <Txt top={r.y} fs={r.fs} fw={r.fw} color={r.color} ls={-0.334} className="lf-bar__label" lines={[[18, r.ly, "l", r.label]]} />
            {!("hidePct" in r && r.hidePct) && <Txt
              top={r.y}
              fs={r.pfs ?? 20.25}
              color={r.color}
              ls={-0.334}
              className="lf-bar__pct"
              lines={[[r.px - x, r.py ?? r.ly, "l", <><CountUp to={r.pct} />%</>]]}
            />}
          </li>
        ))}
      </ol>
    </div>
  );
}

const insights = [
  { cx: 580, t: "식물 예행 연습", tc: 579.2, d: ["AI를 활용하여 실제처럼 식물을", "키워보며 미리 연습해봐요"], dc: 579.4 },
  { cx: 1079, t: "정서적 교감", tc: 1077.1, d: ["식물과 나의 정서적 교감을 위해", "나의 감정 상태를 기록해요"], dc: 1077.7 },
  { cx: 1578.4, t: "감성 공간 맞춤", tc: 1577.1, d: ["어떤 식물이 나의 성향과 무드", "나의 공간과 어울릴지 추천해요"], dc: 1578.6 },
];

function Survey() {
  const T = 5180;
  return (
    <Sec id="survey" top={T} h={5040} className="lf-survey" label="Survey & Insight">
      <Img top={T} x={0} y={5180} w={2160} h={3172} src="/projects/leaf/survey-bg.webp" className="lf-survey__bg" />

      {/* 설문 1: 식집사 */}
      <span className="lf-dot" style={{ "--x": 835.3, "--y": 5599.7 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={27} fw={700} lines={[[858.8, 5607.9, "l", "직접 식물을 키워본 식집사들에게 물어봤어요"]]} />
      <Txt top={T} fs={22.5} className="lf-source" lines={[[1091.8, 5659.1, "c", "출처 : 한국식물농진청 이병성기자 2023.12.10 n = 814 (복수응답 가능)"]]} />
      <Txt top={T} fs={22.5} fw={700} color="#969088" lines={[[1102.8, 5776.1, "c", "Q. 식물을 키우려는 이유는 무엇인가요?"]]} />
      <div className="lf-pie lf-r" role="img" aria-label="매우 그렇다 64%, 대체로 그렇다 28%, 보통 8%" style={{ "--x": 906.75, "--y": 5814 - T } as CSSProperties}>
        <svg viewBox="906.75 5814 387 387" aria-hidden>
          <circle cx="1100.25" cy="6007.5" r="193.5" fill="#161616" />
          <path className="lf-pie__a" d="M1100.25 5814C1206.46 5814 1292.68 5899.57 1293.74 6005.53H1100.25V5814Z" fill="#68635D" />
          <path className="lf-pie__b" d="M1224.52 5859.18C1266.84 5894.67 1293.75 5947.94 1293.75 6007.5C1293.75 6025.62 1291.26 6043.16 1286.6 6059.79L1100.25 6005.52L1224.52 5859.18Z" fill="#45423F" />
        </svg>
        {/* 조각 안 글자: 원 위쪽(5814)·왼쪽(906.75) 기준 */}
        <Txt top={5814} fs={13.82} color="#969088" ls={-0.293} lines={[[1139.7 - 906.75, 5873.3, "l", "보통"]]} />
        <Txt top={5814} fs={20.58} color="#969088" ls={-0.293} lines={[[1128.7 - 906.75, 5907.2, "l", <><CountUp to={8} />%</>]]} />
        <Txt top={5814} fs={13.82} color="#969088" ls={-0.293} lines={[[1184.6 - 906.75, 5959.6, "l", "대체로 그렇다"]]} />
        <Txt top={5814} fs={31.59} color="#969088" ls={-0.293} lines={[[1189.2 - 906.75, 5996.4, "l", <><CountUp to={28} />%</>]]} />
        <Txt top={5814} fs={19.74} color={G} ls={-0.293} lines={[[972.4 - 906.75, 6012.7, "l", "매우 그렇다"]]} />
        <Txt top={5814} fs={39.49} color={G} ls={-0.293} lines={[[974.0 - 906.75, 6054.5, "l", <><CountUp to={64} />%</>]]} />
      </div>
      <Txt
        top={T}
        fs={42.75}
        lh={61.9}
        fw={700}
        className="lf-statement"
        lines={[
          [1093.5, 6297.1, "c", <>반려식물을 키우면서 <em>우울감과 외로움 해소</em></>],
          [1093.5, 6358.9, "c", "도움이 되었다고 답변했어요."],
        ]}
      />

      {/* 설문 2: 예비 식집사 */}
      <span className="lf-dot" style={{ "--x": 791.4, "--y": 6684.2 - T } as CSSProperties} aria-hidden />
      {/* Figma 원문 그대로: "대해서  물어봤어요" (띄어쓰기 2칸) */}
      <Txt top={T} fs={27} fw={700} lines={[[817.6, 6694.6, "l", "예비 식집사들에게 식물 기르기에 대해서  물어봤어요"]]} />
      <Txt top={T} fs={22.5} className="lf-source" lines={[[824.6, 6744.7, "l", "2024.02.01 ~ 2024.02.12"]]} />
      <Txt top={T} fs={22.5} className="lf-source" lines={[[1092.4, 6744.7, "l", "n = 60 (복수 응답 가능)"]]} />
      <BarChart
        T={T}
        x={347.6}
        qx={347.2}
        question="Q. 식물을 키우려는 이유는 무엇인가요?"
        top={{ y: 6922.1, w: 586.1, label: "정서적 교감과 안정", pct: 68, px: 860.6 }}
        rows={barsLeft}
      />
      {/* Figma에서 보이는 그대로: 오른쪽 1순위 막대도 "정서적 교감과 안정 68%" (아래 겹친 "과거에 식물이 시들고 죽은 경험으로 59%"는 가려져 있음) */}
      <BarChart
        T={T}
        x={1229.6}
        qx={1232.6}
        question="Q. 실제로 식물을 키우고 싶지만 고민되는 이유는 무엇인가요?"
        top={{ y: 6923.25, w: 533.25, label: "정서적 교감과 안정", pct: 68, px: 1692.0 }}
        rows={barsRight}
      />
      <Txt
        top={T}
        fs={42.75}
        lh={61.9}
        fw={700}
        className="lf-statement"
        lines={[
          [344.2, 7343.3, "l", <>식물을 키우려는 이유로 <em>정서적 교감과</em></>],
          [344.2, 7405.2, "l", <><em>안정, 부담이 적어서</em>라고 답변했어요</>],
        ]}
      />
      <Txt
        top={T}
        fs={42.75}
        lh={61.9}
        fw={700}
        className="lf-statement"
        lines={[
          [1229.6, 7341.1, "l", <em>잘 키울 자신이 없고 무엇이 나와 맞을지</em>],
          [1229.6, 7402.9, "l", <><em>몰라서</em> 고민된다고 답변했어요</>],
        ]}
      />

      {/* Insight */}
      <span className="lf-survey__line" aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[1078.9, 8228.6, "c", "INSIGHT"]]} />
      <Txt
        top={T}
        fs={22.5}
        lh={82.1}
        className="lf-body"
        lines={[
          [1076.3, 8291.0, "c", "식물을 키우면서 반려 동물처럼 우울감과 외로움의 감정을 해소하는데 도움이 되었다고 답했고"],
          // Figma 원문 그대로: "그 중  정서적" (띄어쓰기 2칸)
          [1076.7, 8373.2, "c", "식물을 키우려는 이유로 감정적 부분이 큰 차지를 했는데 그 중  정서적 교감과 안정감을 느끼기 때문이지만"],
          [1079.4, 8455.3, "c", "예전에 식물을 키우다가 시들게 한 경험으로 잘 키울 자신이 없고 어떤 식물이 나와 맞을지 고민이 된다고 답했어요."],
        ]}
      />
      <ul className="lf-insights">
        {insights.map(({ cx, t, tc, d, dc }) => (
          <li key={t} className="lf-insight lf-r" style={{ "--x": cx - 249.75, "--y": 8869.5 - 249.75 - T } as CSSProperties}>
            <Txt top={8869.5 - 249.75} fs={33.75} fw={700} color={G} ls={-0.334} lines={[[tc - cx + 249.75, 8848.5, "c", t]]} />
            <Txt
              top={8869.5 - 249.75}
              fs={22.5}
              lh={47.2}
              lines={[
                [dc - cx + 249.75, 8900.2, "c", d[0]],
                [dc - cx + 249.75, 8947.5, "c", d[1]],
              ]}
            />
          </li>
        ))}
      </ul>

      {/* Quote */}
      <blockquote className="lf-quote lf-r">
        <span className="lf-quote__mark is-open" style={{ "--x": 508, "--y": 9726.2 - T } as CSSProperties} aria-hidden>
          “
        </span>
        <Txt
          top={T}
          fs={78.75}
          lh={105.8}
          fw={700}
          lines={[
            [1077.2, 9748.8, "c", <>끝까지 식물을 키워내는 <em>성취감</em>과</>],
            [1086.2, 9854.5, "c", <><em>정서적 안정감</em>을 줄 수는 없을까요?</>],
          ]}
        />
        <span className="lf-quote__mark is-close" style={{ "--x": 1647.7, "--y": 9854.5 - T } as CSSProperties} aria-hidden>
          ”
        </span>
      </blockquote>
    </Sec>
  );
}

export default function LeafCaseStudy(_: CaseStudyProps) {
  return (
    <div className="lf">
      <Hero />
      <Overview />
      <Background />
      <Research />
      <Survey />
    </div>
  );
}
