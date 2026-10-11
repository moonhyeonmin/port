import type { CSSProperties, ReactNode } from "react";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import { CountUp } from "~/components/CountUp";
import type { CaseStudyProps } from "./index";
import { Clover, Wordmark } from "./leaf-marks";

/** 상단 내비게이션 항목 (섹션 id와 연결) */
export const leafNav: CaseNavItem[] = [
  { id: "project", label: "Project" },
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research", also: ["survey", "competitor"] },
  { id: "branding", label: "Branding", also: ["packaging"] },
  { id: "concept", label: "Concept", also: ["onboarding", "add-plant", "today"] },
  { id: "growing", label: "Features", also: ["healing", "pot", "diary", "voice", "analyze", "community", "mypage"] },
  { id: "screens", label: "Screens" },
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
          [537.2, 3011.7, "c", "있지 않으신가요?"],
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
      <Txt top={T} fs={27} fw={700} lines={[[817.6, 6694.6, "l", "예비 식집사들에게 식물 기르기에 대해서 물어봤어요"]]} />
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
          [1076.7, 8373.2, "c", "식물을 키우려는 이유로 감정적 부분이 큰 차지를 했는데 그 중 정서적 교감과 안정감을 느끼기 때문이지만"],
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


/* ───── 06 Competitor Analysis (10220 – 12288.4) ───── */
const competitors = [
  { icon: "groo", name: "groo", y: 11414.8, marks: ["o", "o", "o", "x", "x"] },
  { icon: "planta", name: "Planta", y: 11559.9, marks: ["o", "o", "o", "x", "x"] },
  { icon: "app3", name: "식물 관리 앱 3", y: 11705.1, marks: ["o", "o", "x", "x", "x"] },
  { icon: "app4", name: "식물 관리 앱 4", y: 11850.2, marks: ["o", "x", "x", "x", "x"] },
  { icon: "app5", name: "식물 관리 앱 5", y: 11995.3, marks: ["o", "o", "x", "x", "x"] },
];
const compareCols = [
  { cx: 582.3, label: "식물 돌봄", markX: 586.7 },
  { cx: 818.9, label: "직접 일지 작성", markX: 818.4 },
  { cx: 1050.3, label: "커뮤니티", markX: 1050.2 },
  { cx: 1313.4, label: "나에게 맞는 식물 추천", markX: 1313.5, chip: [1167.75, 291.375] },
  { cx: 1696.5, label: "식물과의 정서적 감정 기록 서비스", markX: 1696.5, chip: [1489.5, 414] },
];

function Competitor() {
  const T = 10220;
  return (
    <Sec id="competitor" top={T} h={2068.4} className="lf-compare" label="Competitor Analysis">
      <Txt top={T} fs={22.5} fw={700} color="#A8D180" className="lf-label" lines={[[1082.3, 10435.3, "c", "COMPETITOR ANALYSIS"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        color="#35322B"
        className="lf-h2"
        lines={[
          [1072.1, 10531.2, "c", "다양한 서비스를 제공하지만"],
          [1078.3, 10613.3, "c", "내가 잘 키울 수 있는 식물을 찾고 키워내는 것이 어려워요"],
        ]}
      />
      <Txt
        top={T}
        fs={22.5}
        lh={47.2}
        color="#35322B"
        className="lf-body"
        lines={[
          [1073.9, 10705.9, "c", "국내외 주요 식물 기르기 서비스를 분석했어요. 그 결과 다양한 서비스를 제공하지만 게임처럼 실제 해당 식물을 기르는 것과"],
          [1073.6, 10753.1, "c", "관련 없는 플레이 방식이 많았으며 작성하기 귀찮은 식물 상태의 보고는 AI가 대신해주고, 유저가 작성하는 식물과의 정서적"],
          [1073.9, 10800.4, "c", "감정 기록 서비스를 제공하며 실제 나의 방에 어울리는 식물을 추천해주는 서비스나 기능은 현재 시장에서 볼 수 없었어요."],
        ]}
      />
      <Img top={T} x={0} y={11003} w={2160} h={1286} src="/projects/leaf/compare-bg.webp" className="lf-compare__bg" />
      {/* 좁은 화면용: 같은 내용을 일반 표로 */}
      <table className="lf-compare__mtable lf-r">
        <thead>
          <tr>
            <th scope="col"><span className="lf-sr">서비스</span></th>
            {compareCols.map(({ label, chip }) => (
              <th key={label} scope="col" className={chip ? "is-chip" : undefined}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {competitors.map(({ icon, name, marks }) => (
            <tr key={icon}>
              <th scope="row">
                <img src={`/projects/leaf/icon-${icon}.webp`} alt={name} width={40} height={40} loading="lazy" />
              </th>
              {marks.map((m, i) => (
                <td key={i} className={`is-${m}${i > 2 ? " is-accent" : ""}`} aria-label={m === "o" ? "지원" : "미지원"}>
                  {m === "o" ? "○" : "×"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="lf-compare__table lf-r" role="table" aria-label="식물 기르기 서비스 기능 비교">
        <div role="row" className="lf-compare__head">
          <span role="columnheader" className="lf-sr">서비스</span>
          {compareCols.map(({ cx, label, chip }, i) => (
            <span
              key={label}
              role="columnheader"
              className={`lf-compare__col${chip ? " is-chip" : ""}`}
              style={{ "--x": chip ? chip[0] : cx, "--w": chip ? chip[1] : 0 } as CSSProperties}
            >
              <Txt
                top={chip ? 11244.4 : 11194}
                fs={28.125}
                fw={chip ? 700 : 400}
                color={chip ? "#242424" : "#fff"}
                ls={-0.334}
                lines={[[chip ? cx - chip[0] : 0, i === 3 ? 11292.2 : i === 4 ? 11289.9 : i === 0 ? 11292.2 : 11293.3, "c", label]]}
              />
            </span>
          ))}
        </div>
        {competitors.map(({ icon, name, y, marks }) => (
          <div role="row" key={icon} className="lf-compare__row" style={{ "--y": y } as CSSProperties}>
            <span role="rowheader" className="lf-compare__app">
              <img src={`/projects/leaf/icon-${icon}.webp`} alt={name} width={89} height={89} loading="lazy" />
            </span>
            {marks.map((m, i) => (
              <span
                key={i}
                role="cell"
                className={`lf-mark is-${m}${i > 2 ? " is-accent" : ""}`}
                style={{ "--x": compareCols[i].markX } as CSSProperties}
                aria-label={m === "o" ? "지원" : "미지원"}
              />
            ))}
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* ───── 07 Who · How · What (12288.4 – 12839.6) ───── */
function Hypothesis() {
  const T = 12288.4;
  const tags = [
    { x: 727.875, y: 12389.6, t: "WHO", ty: 12420.2 },
    { x: 939.375, y: 12474, t: "HOW", ty: 12504.6 },
    { x: 1155.375, y: 12556.1, t: "WHAT", ty: 12586.7 },
  ];
  return (
    <Sec top={T} h={551.2} className="lf-hypo" label="가설">
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [118.1, 12497.1, "l", "반려 식물을 들이기 전 사용자에게"],
          [118.1, 12579.2, "l", "감성적 공유와 성취감을 느낄 수 있게 한다면"],
          [118.1, 12661.4, "l", "실제로 식물을 길러내는 것에 도움을 줄 수 있지 않을까?"],
        ]}
      />
      {tags.map(({ x, y, t, ty }, i) => (
        <span key={t} className="lf-tag lf-r" style={{ "--x": x, "--y": y - T, "--i": i } as CSSProperties}>
          <Txt top={y} fs={19.125} fw={700} color="#615B54" lines={[[46.69, ty, "c", t]]} />
        </span>
      ))}
    </Sec>
  );
}

/* ───── 08 Brand intro (12839.6 – 15219) ───── */
function BrandIntro() {
  const T = 12839.6;
  return (
    <Sec id="branding" top={T} h={2379.4} className="lf-brand" label="leaf 소개">
      <Img top={T} x={0} y={12839.6} w={2160} h={2379.4} src="/projects/leaf/brand-scene.webp" className="lf-brand__scene" alt="leaf 앱 화면이 켜진 휴대폰 두 대와 몬스테라, 돌 오브제" />
      <div className="lf-brand__mark lf-r">
        <span className="lf-brand__icon" aria-hidden>✤</span>
        <Wordmark className="lf-brand__wordmark" title="leaf" />
        <Clover className="lf-brand__clover" />
      </div>
      <Txt
        top={T}
        fs={22.5}
        lh={47.2}
        className="lf-body"
        lines={[
          [150.8, 13410.4, "l", "식물이 주는 역할은 다양해요. 감정적인 위로도 인테리어, 공기정화까지 내 생활 전반에 함께하고 있어요."],
          [150.8, 13457.6, "l", "작은 휴대폰 속 리프 앱에서도 가능해요. AI로 키우고 싶었던 식물을 혹은 나와 잘 맞는 식물을 추천받아 식물을 실제처럼"],
          [150.8, 13504.9, "l", "가상에서 길러보고 내 생활 습관, 감정을 공유하고 영향을 받는 반려 식물과 함께 나의 감정의 기록들도 함께 정리해요."],
        ]}
      />
    </Sec>
  );
}

/* ───── 09 Shadow logo (15219 – 16642) ───── */
function ShadowLogo() {
  const T = 15219;
  return (
    <Sec top={T} h={1423} className="lf-shadow" label="leaf 로고">
      <Img top={T} x={0} y={15219} w={2160} h={1423} src="/projects/leaf/shadow.webp" className="lf-shadow__photo" alt="" />
      <div className="lf-shadow__mark lf-r" aria-hidden>
        <Wordmark className="lf-shadow__wordmark" />
        <Clover className="lf-shadow__clover" />
      </div>
    </Sec>
  );
}

/* ───── 10 Logo system (16642 – 20866.5) ───── */
function LogoSystem() {
  const T = 16642;
  return (
    <Sec top={T} h={4224.5} className="lf-logo" label="로고와 앱 아이콘">
      <div className="lf-logo__mark lf-r" aria-hidden>
        <Clover className="lf-logo__symbol" />
        <Wordmark className="lf-logo__wordmark" />
        <Clover className="lf-logo__clover" />
      </div>
      <Txt
        top={T}
        fs={22.5}
        lh={47.2}
        color="#35322B"
        className="lf-body"
        lines={[
          [1059.6, 17369.2, "c", "리프는 사용자의 힐링을 주는 마음과 함께 가상 식물의 잎사귀를 키워나가는 것에서부터 시작해요."],
          [1059.8, 17416.5, "c", "정형화되지 않고 어떠한 방향으로든 다양하게 뻗어나갈 수 있는 식물의 특성을 반영하여 리프 앱의 로고를 제작했어요."],
          [1059.7, 17463.7, "c", "리프 로고의 컬러 무드보드는 원초적인 흙에서 단단한 뿌리를 내려 마침내 잎사귀를 피워낸다는 이미지를 표현했어요."],
        ]}
      />
      <div className="lf-card is-dark lf-r" style={{ "--x": 46.125, "--y": 17651.2 - T, "--w": 1008, "--ch": 775.125 } as CSSProperties}>
        <Wordmark className="lf-card__wordmark" title="leaf 워드마크" />
        <Clover className="lf-card__clover" />
      </div>
      <div className="lf-card is-green lf-r" style={{ "--x": 1103.6, "--y": 17651.2 - T, "--w": 1006.9, "--ch": 775.125 } as CSSProperties}>
        <img src="/projects/leaf/symbol-grid.webp" alt="원형 가이드 위의 leaf 심볼" width={1007} height={775} loading="lazy" />
      </div>
      <Img top={T} x={46} y={18475} w={2065} h={777} src="/projects/leaf/phone-dock.webp" className="lf-card-img lf-r" alt="아이폰 독에 놓인 leaf 앱 아이콘" />
      <Img top={T} x={46} y={19300.5} w={2064.4} h={955.1} src="/projects/leaf/mac-dock.webp" className="lf-card-img lf-r" alt="앱 아이콘 그리드와 맥 독에 놓인 leaf 아이콘" />
      <Txt top={T} fs={22.5} fw={700} color="#A8D180" className="lf-label" lines={[[1074.3, 20775.7, "c", "PACKAGING DESIGN"]]} />
    </Sec>
  );
}

/* ───── 11 Packaging (20866.5 – 23475) ───── */
function Packaging() {
  const T = 20866.5;
  return (
    <Sec id="packaging" top={T} h={2608.5} className="lf-package" label="Packaging Design">
      <Img top={T} x={0} y={20866.5} w={2160} h={1334.3} src="/projects/leaf/package.webp" className="lf-package__photo" alt="클로버 무늬 연두색 테이프를 두른 leaf 포장 상자" />
      <Img top={T} x={46.375} y={22245.8} w={1007.75} h={1188} src="/projects/leaf/pot.webp" className="lf-card-img lf-r" alt="leaf 심볼이 새겨진 화분에 심은 식물" />
      <Img top={T} x={1105} y={22245.8} w={1007.75} h={1188} src="/projects/leaf/bag.webp" className="lf-card-img lf-r" alt="leaf 로고가 찍힌 크라프트 종이 봉투" />
    </Sec>
  );
}


/* ───── 12 Service Concept (23475 – 26225) ───── */
function Concept() {
  const T = 23475;
  return (
    <>
      <Sec id="concept" top={T} h={873} className="lf-concept" label="Service Concept">
        <Img top={T} x={0} y={T} w={2160} h={873} src="/projects/leaf/concept-bg.webp" className="lf-bgimg" />
        <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[1079.1, 23798.6, "c", "SERVICE CONCEPT"]]} />
        <Txt top={T} fs={54} lh={82.1} fw={700} className="lf-h2" lines={[[1087.5, 23886.1, "c", "AI 식물을 키우며 내 마음을 공유해요"]]} />
        <Txt
          top={T}
          fs={22.5}
          lh={47.2}
          className="lf-body"
          lines={[
            [1095.7, 23965.1, "c", "이전의 경험으로 식물 키우기를 겁냈더라도 괜찮아요. 가상 식물을 키우며 나의 마음과 식물을 이어주고 다양한 방법으로"],
            [1095.9, 24012.4, "c", "소통할 수 있는 리프 앱을 소개해요. 별안간 깜짝 선물처럼 새잎을 내기도 하고, 강인한 모습에 위로와 용기가 되기도 해요."],
            [1095.2, 24059.6, "c", "때로는 식물의 죽음을 마주하며 의연하게 나아가는 모습까지도 배울 수 있어요."],
          ]}
        />
      </Sec>
      <Sec top={24348.4} h={1876.6} className="lf-concept-photo" label="leaf 앱 화면">
        <Img top={24348.4} x={0} y={24348.4} w={2160} h={1876.6} src="/projects/leaf/concept-photo.webp" className="lf-concept-photo__img" alt="나뭇잎 그림자가 드리운 바닥 위 휴대폰 속 leaf 홈 화면" />
      </Sec>
    </>
  );
}

/* ───── 13 Onboarding · Main Home (26225 – 30746) ───── */
const onboardingScreens = [
  { n: 1, x: 93, y: 26866, w: 690, h: 817, alt: "시작 화면: leaf 로고와 시작하기 버튼" },
  { n: 3, x: 985, y: 26870, w: 866, h: 825, alt: "성향 테스트 화면: 리프님과 식물의 케미를 알아보기 위한 테스트" },
  { n: 4, x: 1430, y: 26867, w: 632, h: 829, alt: "장소 선택 화면: 어느 장소에서 식물을 기르고 싶으신가요?" },
  { n: 5, x: 1614, y: 26871, w: 546, h: 825, alt: "경험 선택 화면: 식물을 키워보신 경험이 있나요?" },
  { n: 2, x: 173, y: 26814, w: 1243, h: 929, alt: "로그인 화면: 카카오·네이버·애플 간편 로그인" },
];

function AppIntro() {
  const T = 26225;
  return (
    <Sec id="onboarding" top={T} h={4521} className="lf-app" label="Onboarding · Main Home">
      <span className="lf-dot is-sm lf-r" style={{ "--x": 975.1, "--y": 26473.2 - T, "--c": "#A8D180" } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color="#A8D180" className="lf-label" lines={[[993.5, 26481.7, "l", "ONBOARDING"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        color="#474238"
        className="lf-h2"
        lines={[
          [1102.4, 26582.7, "c", "온보딩 화면에서 나와 성향이 잘 맞는"],
          [1108.6, 26664.8, "c", "식물을 추천받으며 시작해요!"],
        ]}
      />
      <div className="lf-onb">
        {onboardingScreens.map(({ n, x, y, w, h, alt }) => (
          <Img key={n} top={T} x={x} y={y} w={w} h={h} src={`/projects/leaf/ob-${n}.webp`} alt={alt} className={`lf-onb__screen is-${n} lf-r`} />
        ))}
      </div>
      {/* 좁은 화면: 온보딩 화면 줄 전체를 가로로 넘겨 본다 */}
      <div className="lf-xscroll lf-onb-m">
        <img src="/projects/leaf/ob-row.webp" alt="온보딩 화면 5개: 시작, 로그인, 성향 테스트, 장소 선택, 경험 선택" width={3240} height={1395} loading="lazy" />
      </div>
      <Img top={T} x={212} y={27696} w={590} h={626} src="/projects/leaf/ob-line.webp" className="lf-onb__line lf-r" />

      <span className="lf-dot is-sm lf-r" style={{ "--x": 130.2, "--y": 28376.7 - T, "--c": "#A8D180" } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color="#A8D180" className="lf-label" lines={[[154.4, 28385.2, "l", "MAIN HOME"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        color="#474238"
        className="lf-h2"
        lines={[
          [144.0, 28494.1, "l", "추천 받은 식물은 홈 화면에서"],
          [144.0, 28576.2, "l", "나의 감정, 성향에 따라 같은 식물이라도 다르게 표현돼요"],
        ]}
      />
      <Img top={T} x={0} y={28700} w={2160} h={1260} src="/projects/leaf/carousel.webp" className="lf-carousel lf-r" alt="추천 식물 화면들: Bird of Paradise, Asparagus, Monstera(홈), Yellow palm, Rubber tree" />
      <Img top={T} x={396} y={30073} w={1772} h={1106} src="/projects/leaf/home-tablet.webp" className="lf-app__tablet lf-r" alt="가로 화면의 leaf 홈: Monstera" />
    </Sec>
  );
}

/* ───── 14 Add Your Plant (30746 – 34865) ───── */
function AddPlant() {
  const T = 30746;
  return (
    <Sec id="add-plant" top={T} h={4119} className="lf-add" label="Add Your Plant">
      <Img top={T} x={0} y={T} w={2160} h={4119} src="/projects/leaf/add-bg.webp" className="lf-bgimg" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 169.6, "--y": 31552.6 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[192.9, 31561.1, "l", "ADD YOUR PLANT"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [192.4, 31650.8, "l", "홈 화면에서 내 반려 식물을 추가하고"],
          [192.4, 31732.9, "l", "내 식물에 대한 관련 소식들을 확인 할 수 있어요"],
        ]}
      />
      <Txt
        top={T}
        fs={22.5}
        lh={47.2}
        className="lf-body"
        lines={[
          [192.4, 31808.6, "l", "사용자의 식물 키우기 단계에 따라 키울 수 있는 식물의 수가 달라져요. 중요한 할 일이 있을때는 상단에 알림이 뜨고 홈 화면"],
          [192.4, 31855.9, "l", "스크롤을 내리면 오늘 할일과 음악, 이모지, 글쓰기, 음성녹음 등 다양한 카드 형식으로 식물 상태와 감정 기록을 작성하는 페이"],
          [192.4, 31903.1, "l", "지와 내 식물에 남긴 코멘트를 확인할 수 있어요."],
        ]}
      />
      <div className="lf-add__wrap">
        <Img top={T} x={0} y={32150} w={2160} h={2715} src="/projects/leaf/add-collage.webp" className="lf-add__collage lf-r" alt="홈 화면 구성: Monstera 식물, 할 일 알림, 오늘 할 일 카드, 기록·음악·코멘트 카드 모음과 세로로 긴 홈 화면" />
      </div>
    </Sec>
  );
}

/* ───── 15 Today's Work (34865 – 36950) ───── */
function Today() {
  const T = 34865;
  return (
    <Sec id="today" top={T} h={2085} className="lf-today" label="Today's Work">
      <Img top={T} x={0} y={T} w={2160} h={2085} src="/projects/leaf/today-bg.webp" className="lf-bgimg" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 949.2, "--y": 35314.6 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[969.3, 35323.1, "l", "TODAY’S WORK"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [1052.0, 35412.8, "c", "홈 화면에서 내 반려 식물을 추가하고"],
          [1058.3, 35494.9, "c", "내 식물에 대한 관련 소식들을 확인 할 수 있어요"],
        ]}
      />
      <div className="lf-today__stage">
        <div className="lf-chip is-white lf-r" style={{ "--x": 353.25, "--y": 36299.2 - T, "--o": 0.83, "--from": -1 } as CSSProperties}>
          <Txt top={36299.2} fs={26.29} ls={-0.643} color="#424242" lines={[[37.5, 36361.9, "l", "오늘은 물을 흠뻑 주는 날이예요"]]} />
        </div>
        <div className="lf-chip is-white lf-r" style={{ "--x": 1230.75, "--y": 36228.4 - T, "--o": 0.58, "--from": 1 } as CSSProperties}>
          <Txt top={36228.4} fs={26.29} ls={-0.643} color="#4D4D4D" lines={[[37.5, 36291.0, "l", "햇빛을 받을 수 있도록 화분 위치를 옮겨주세요"]]} />
        </div>
        <Img top={T} x={849} y={35614} w={459} h={934} src="/projects/leaf/today-phone.webp" className="lf-today__phone lf-r" alt="오늘 할 일 화면: 몬스테라와 선인장의 할 일 목록, 물주러 가기 버튼" />
        <div className="lf-chip is-green lf-r" style={{ "--x": 280.125, "--y": 35934.8 - T, "--from": -1 } as CSSProperties}>
          <Txt top={35934.8} fs={26.29} fw={700} ls={-0.643} color="#474238" lines={[[37.5, 35997.4, "l", "환기가 필요해요! 창문을 열어주세요"]]} />
          <span className="lf-chip__check" aria-hidden>✓</span>
        </div>
      </div>
    </Sec>
  );
}


/* ───── 16 Growing Plants (36950 – 39000) ───── */
function Growing() {
  const T = 36950;
  return (
    <Sec id="growing" top={T} h={2050} className="lf-s4" label="Growing Plants">
      <Img top={T} x={0} y={T} w={2160} h={2050} src="/projects/leaf/s4-grow-bg.webp" className="lf-bgimg lf-s4bg" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 195, "--y": 37136 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[214.0, 37144.5, "l", "GROWING PLANTS"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [209.2, 37242.1, "l", "분갈이를 하거나 물을 줄 때가 됐나요?"],
          [209.2, 37324.2, "l", "소중한 식물을 위해 물을 주고 직접 행동해봐요"],
        ]}
      />
      <div className="lf-float-wrap">
        <Img top={T} x={110} y={37618} w={494} h={977} src="/projects/leaf/s4-g-phone.webp" className="lf-s4-phone is-float lf-r" alt="물 주기 화면: 물이 필요해요! 물 마시기를 인증해주세요" />
      </div>
      <Txt
        top={T}
        fs={22.5}
        lh={47.2}
        className="lf-body"
        lines={[
          [819.0, 38353.9, "l", "식물 물을 줄 때 직접 적정량의 물을 뜨고 사진으로 인증을 남겨요 ! 물을 줄때도 분갈이를 할때도 직접 행동으로 옮기고"],
          [819.0, 38401.1, "l", "햇빛을 쐬거나 시간이 걸릴때에는 마음 명상 ASMR 이나 AI 추천 플레이리스트나 명언 모음집 등 힘이 나는 문구를 보고"],
          [819.0, 38448.4, "l", "지친 일상 속 힐링의 시간을 가져요. 내 마음이 편안해질때 식물도 살랑살랑 움직이며 긍정적인 영향을 준답니다!"],
        ]}
      />
    </Sec>
  );
}

/* ───── 17 Healing (39000 – 40579) ───── */
function Healing() {
  const T = 39000;
  return (
    <Sec id="healing" top={T} h={1579} className="lf-s4" label="Healing Emotion Therapy">
      <Img top={T} x={0} y={T} w={2160} h={1579} src="/projects/leaf/s4-heal-bg.webp" className="lf-bgimg lf-s4bg" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 649, "--y": 39173 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[669.4, 39097.5, "l", "HEALING EMOTION THERAPY"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [664.9, 39195.1, "l", "명상, 마음챙김 글이나 ASMR , 사운드 테라피 등"],
          [664.9, 39277.2, "l", "식물을 기르며 마음도 힐링하는 시간을 가져요"],
        ]}
      />
      <div className="lf-phones">
        <Img top={T} x={357} y={39532} w={460.5} h={940} src="/projects/leaf/s4-h-1.webp" className="lf-s4-phone is-1 lf-r" alt="마음 명상 ASMR 재생 화면" />
        <Img top={T} x={863} y={39539} w={472} h={921} src="/projects/leaf/s4-h-2.webp" className="lf-s4-phone is-2 lf-r" alt="15초 명언 화면: 세상에서 가장 아름다운 것은 세상 그 자체이다" />
        <Img top={T} x={1390} y={39539} w={432} h={916} src="/projects/leaf/s4-h-3.webp" className="lf-s4-phone is-3 lf-r" alt="할 일 완료 화면: 축하해요! 모든 할 일을 완료했어요" />
      </div>
    </Sec>
  );
}

/* ───── 18 Plant Pot Custom (40579 – 43285) ───── */
function PotCustom() {
  const T = 40579;
  return (
    <Sec id="pot" top={T} h={2706} className="lf-s4" label="Plant Pot Custom">
      <Img top={T} x={0} y={T} w={2160} h={2706} src="/projects/leaf/s4-pot-bg.webp" className="lf-bgimg lf-s4bg" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 801, "--y": 41320 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[821.2, 41328.4, "l", "PLANT POT CUSTOM"]]} />
      <Txt top={T} fs={54} lh={82.1} fw={700} className="lf-h2" lines={[[816.8, 41415.8, "l", "내 공간의 무드와 취향에 맞게 화분을 커스텀 해봐요!"]]} />
      <div className="lf-phones">
        <Img top={T} x={816} y={41655} w={454} h={997} src="/projects/leaf/s4-p-1.webp" className="lf-s4-phone is-1 lf-r" alt="화분 꾸미기 화면: 색상과 모양 변경" />
        <Img top={T} x={1357} y={41690} w={435.5} h={925.5} src="/projects/leaf/s4-p-2.webp" className="lf-s4-phone is-2 lf-r" alt="주황색 화분으로 바꾼 화면" />
        <Img top={T} x={1831} y={41693} w={329} h={926} src="/projects/leaf/s4-p-3.webp" className="lf-s4-phone is-3 lf-r" alt="연두색 화분으로 바꾼 화면" />
      </div>
    </Sec>
  );
}

/* ───── 19 Write Daily Record (43285 – 45541) ───── */
function Diary() {
  const T = 43285;
  return (
    <Sec id="diary" top={T} h={2256} className="lf-s4" label="Write Daily Record">
      <Img top={T} x={0} y={T} w={2160} h={2256} src="/projects/leaf/s4-diary-bg.webp" className="lf-bgimg lf-s4bg" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 173, "--y": 43566 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[198.0, 43575.2, "l", "WRITE DAILY RECORD"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [198.0, 43668.1, "l", "귀찮은 일지 작성은 앱에서"],
          [198.0, 43750.2, "l", "나와 식물과의 교감은 내가 직접 작성해요"],
        ]}
      />
      <Txt
        top={T}
        fs={22.5}
        lh={47.3}
        className="lf-body"
        lines={[
          [204.8, 43824.7, "l", "칭찬 양파와 비난 양파 들어보셨나요? 식물도 분위기와 사람과 공간의 분위기를 인지한다고 해요."],
          [204.8, 43872.0, "l", "아무한테도 말 못했던 나의 감정을 식물에게는 털어놓아도 좋아요. 사진으로, 음악으로, 이모지로 다양하게 남겨봐요!"],
        ]}
      />
      <div className="lf-phones">
        <Img top={T} x={188} y={44188} w={448.5} h={878.5} src="/projects/leaf/s4-d-1.webp" className="lf-s4-phone is-1 lf-r" alt="기록 시작 화면: 오늘의 마음을 적어보세요" />
        <Img top={T} x={661} y={44188} w={414} h={837} src="/projects/leaf/s4-d-2.webp" className="lf-s4-phone is-2 lf-r" alt="글쓰기 화면: 오늘 너무 힘든 날이었어" />
        <Img top={T} x={1126} y={44188} w={414} h={844} src="/projects/leaf/s4-d-3.webp" className="lf-s4-phone is-3 lf-r" alt="작성한 기록 화면" />
        <Img top={T} x={1556} y={44188} w={485} h={878.5} src="/projects/leaf/s4-d-4.webp" className="lf-s4-phone is-4 lf-r" alt="2월 기록 모아보기 화면" />
      </div>
    </Sec>
  );
}

/* ───── 20 AI Voice (45541 – 48700) ───── */
function Voice() {
  const T = 45541;
  return (
    <Sec id="voice" top={T} h={3159} className="lf-s4" label="Using AI Voice Recognition">
      <Img top={T} x={0} y={T} w={2160} h={3159} src="/projects/leaf/s4-voice-bg.webp" className="lf-bgimg lf-s4bg" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 897, "--y": 45969 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[917.8, 45978.1, "l", "USING AI VOICE RECOGNITION"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [1055.7, 46084.6, "c", "반려 식물과 교감하며 힐링하고"],
          [1068.2, 46166.7, "c", "AI 감정 분석을 활용해서 내 감정을 기록해볼까요?"],
        ]}
      />
      <Txt
        top={T}
        fs={22.5}
        lh={47.3}
        className="lf-body"
        lines={[
          [1081.5, 46268.2, "c", "반려 식물도 나의 감정에 영향을 받는다고 해요. 식물의 성장일기와 함께 오늘 하루의 마음을 분석하고 기록해봐요."],
          [1080.8, 46315.5, "c", "STT를 활용해서 간단하게 오늘 있었던 일을 정리 할 수 있어요!"],
        ]}
      />
        <Img top={T} x={845} y={46848} w={497} h={998} src="/projects/leaf/s4-v-phone.webp" className="lf-s4-phone is-voice lf-r" alt="음성 녹음 화면: Monstera와 녹음 버튼" />
      <Img top={T} x={0} y={47270} w={2160} h={700} src="/projects/leaf/s4-v-wave.webp" className="lf-wave" />
      <span className="lf-rec" style={{ "--x": 1100, "--y": 47734 - T } as CSSProperties} aria-hidden />
    </Sec>
  );
}

/* ───── 21 Analyzing Voice (48700 – 50837) ───── */
function Analyze() {
  const T = 48700;
  return (
    <Sec id="analyze" top={T} h={2137} className="lf-s4" label="Analyzing Voice with AI">
      <Img top={T} x={0} y={T} w={2160} h={2137} src="/projects/leaf/s4-analyze-bg.webp" className="lf-bgimg lf-s4bg" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 118, "--y": 48775 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[142.9, 48783.9, "l", "ANALYZING VOICE WITH AI"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [142.9, 48876.8, "l", "AI 분석하기 버튼을 누르고 녹음이 완료되면"],
          [142.9, 48958.9, "l", "리프가 내 감정과 기분을 정리해서 감정을 출력해요"],
        ]}
      />
      <Txt
        top={T}
        fs={22.5}
        lh={47.2}
        className="lf-body"
        lines={[
          [149.6, 49033.5, "l", "음성 녹음이 완료되면 간단하게 내용을 한 줄 요약해주거나 내 감정 분석을 해주는 화면까지 보여줘요."],
          [149.6, 49080.7, "l", "그날 감정에 따라 이미지가 달라져요. 출력된 감정 기록들을 모아서 식물과 나의 감정 공유와 함께 기록해 둘 수 있어요!"],
        ]}
      />
      <div className="lf-phones">
        <Img top={T} x={59} y={49358} w={998} h={1193} src="/projects/leaf/s4-a-left.webp" className="lf-s4-card is-1 lf-r" alt="AI 분석하기 버튼이 있는 녹음 완료 화면" />
        <Img top={T} x={1107} y={49358} w={998} h={1196.5} src="/projects/leaf/s4-a-right.webp" className="lf-s4-card is-2 lf-r" alt="감정 분석 완료 화면: 지치고 힘들어요, AI 요약" />
      </div>
    </Sec>
  );
}


/* ───── 22 Community (50837 – 53768) ───── */
function Community() {
  const T = 50837;
  return (
    <Sec id="community" top={T} h={2931} className="lf-s4 lf-comm" label="Community Page">
      <Img top={T} x={0} y={T} w={2160} h={2931} src="/projects/leaf/s5-comm-bg.webp" className="lf-bgimg lf-s5bg" alt="커뮤니티 카드 모음: 음악, 사진, 질문 글" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 956, "--y": 51155 - T } as CSSProperties} aria-hidden />
      {/* Figma 원문 그대로 "COMUNITY" (오타 의심: 사용자에게 알림) */}
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[989.2, 51164.4, "l", "COMUNITY PAGE"]]} />
      <Txt
        top={T}
        fs={54}
        lh={82.1}
        fw={700}
        className="lf-h2"
        lines={[
          [1062.0, 51270.8, "c", "다양한 유저들과 소통하며 다양하게 자라는 식물을"],
          [1068.2, 51352.9, "c", "구경하고 추천 음악이나 업로드한 글을 확인해봐요"],
        ]}
      />
      <Txt
        top={T}
        fs={22.5}
        lh={47.2}
        className="lf-body"
        lines={[
          [1078.6, 51481.5, "c", "커뮤니티 페이지에 해쉬태그와 함께 내 식물의 상태와 마음 글을 작성해서 공유해봐요."],
          [1078.7, 51528.7, "c", "같은 식물이더라도 나의 공간과 위치, 내 감정에 따라서 식물마다 성장속도와 모양이 모두 달라요."],
          [1081.1, 51576.0, "c", "궁금한 점을 물어보고 다양한 유저들의 이미지를 모아서 볼 수도 있어요!"],
        ]}
      />
      <Img top={T} x={158} y={51882} w={673} h={1301} src="/projects/leaf/s5-c-phone.webp" className="lf-s4-phone is-float lf-r" alt="커뮤니티 화면: 추천 탭의 사진·음악·글 카드" />
    </Sec>
  );
}

/* ───── 23 My Page (53768 – 55823) ───── */
const myPhones = [
  { n: 1, x: 201, y: 54529, w: 473, h: 985, alt: "회원 정보 화면: 프로필 사진과 작성 완료 버튼" },
  { n: 2, x: 768, y: 54618, w: 406, h: 841, alt: "마이페이지: 내 식물 탭, 기록이 없는 상태" },
  { n: 3, x: 1217, y: 54620, w: 406, h: 841, alt: "마이페이지: 내 식물 기록 목록" },
  { n: 4, x: 1661, y: 54622, w: 406, h: 841, alt: "마이페이지: 감정 기록 탭" },
];

function MyPage() {
  const T = 53768;
  return (
    <Sec id="mypage" top={T} h={2055} className="lf-s4" label="My Page">
      <Img top={T} x={0} y={T} w={2160} h={2055} src="/projects/leaf/s5-my-bg.webp" className="lf-bgimg" />
      <span className="lf-dot is-sm lf-r" style={{ "--x": 163, "--y": 54043 - T } as CSSProperties} aria-hidden />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[187.9, 54052.3, "l", "MY PAGE"]]} />
      <Txt top={T} fs={54} lh={82.1} fw={700} className="lf-h2" lines={[[187.9, 54145.7, "l", "나의 식물 기록과 활동 히스토리를 확인해요"]]} />
      <Txt
        top={T}
        fs={22.5}
        lh={47.2}
        className="lf-body"
        lines={[
          [187.9, 54229.9, "l", "마이페이지에서 나의 가입 정보와 내 식물 리스트, 나의 활동 내역과 감정 기록을 확인할 수 있어요."],
          [187.9, 54277.1, "l", "설정에 대한 부분들도 마이페이지에서 수정하고 사용자 히스토리를 제공하고 있어요!"],
        ]}
      />
      <div className="lf-phones">
        {myPhones.map(({ n, x, y, w, h, alt }) => (
          <Img key={n} top={T} x={x} y={y} w={w} h={h} src={`/projects/leaf/s5-m-${n}.webp`} alt={alt} className={`lf-s4-phone is-${n} lf-r`} />
        ))}
      </div>
    </Sec>
  );
}

/* ───── 24 Devices photo (55823 – 57401) ───── */
function Devices() {
  const T = 55823;
  return (
    <Sec top={T} h={1578} className="lf-devices" label="태블릿과 휴대폰의 leaf">
      <Img top={T} x={0} y={T} w={2160} h={1578} src="/projects/leaf/s5-photo-bg.webp" className="lf-devices__photo" alt="햇빛 드는 테이블 위 태블릿과 휴대폰에 띄운 leaf 홈 화면" />
    </Sec>
  );
}

/* ───── 25 Overview: 전체 화면 (57401 – 63865) ───── */
function Screens() {
  const T = 57401;
  return (
    <Sec id="screens" top={T} h={6464} className="lf-screens" label="전체 화면">
      <Img top={T} x={0} y={T} w={2160} h={6464} src="/projects/leaf/s5-over-bg.webp" className="lf-screens__img lf-r" alt="leaf 앱 전체 화면 모음: 시작, 홈, 할 일, 화분 꾸미기, 기록, 음성 녹음 등 22개 화면" />
      <Txt top={T} fs={22.5} fw={700} color={G} className="lf-label" lines={[[1102.3, 57635.4, "c", "OVERVIEW"]]} />
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
      <Competitor />
      <Hypothesis />
      <BrandIntro />
      <ShadowLogo />
      <LogoSystem />
      <Packaging />
      <Concept />
      <AppIntro />
      <AddPlant />
      <Today />
      <Growing />
      <Healing />
      <PotCustom />
      <Diary />
      <Voice />
      <Analyze />
      <Community />
      <MyPage />
      <Devices />
      <Screens />
    </div>
  );
}
