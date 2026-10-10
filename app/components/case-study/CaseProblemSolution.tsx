import type { CSSProperties, ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface CaseProblemSolutionProps {
  id?: string;
  /** 라벨 (예: "Problem & Solution 1") */
  eyebrow: string;
  icon?: string;
  /** 라벨 글자 그라디언트 (CSS 배경 값) */
  pointGradient?: string;
  /** 줄 단위로 나눈 제목 (줄 높이 100) */
  title: string[];
  /** 오른쪽 위 장식 이미지 (Figma: x 1029, y 269, 1131×1178, 섹션 오른쪽 끝에 붙음) */
  decor?: string;
  children: ReactNode;
}

/**
 * 어두운 "Problem & Solution" 섹션 (Design system_04_Why).
 * 검은 바탕 + 오른쪽 위 사선 무늬, 라벨·제목 아래에 문제 카드와 해결 구조를 차례로 둔다.
 */
export function CaseProblemSolution({
  id,
  eyebrow,
  icon,
  pointGradient,
  title,
  decor,
  children,
}: CaseProblemSolutionProps) {
  return (
    <section
      id={id}
      className={`case-ps${pointGradient ? " has-point-gradient" : ""}`}
      aria-label={eyebrow}
      style={pointGradient ? ({ "--point-gradient": pointGradient } as CSSProperties) : undefined}
    >
      <div className="case-sec case-ps__inner">
        {decor && <img className="case-ps__decor" src={decor} alt="" width={1131} height={1178} loading="lazy" />}
        <div className="case-ps__head">
          <CaseEyebrow icon={icon}>
            <span className="case-eyebrow__point">{eyebrow}</span>
          </CaseEyebrow>
          <h2 className="case-h2 is-tight case-ps__title">
            {title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

/** 문제 카드: 빨간 라벨, 굵은 인용, 오른쪽 그림, 아래 설명 */
export function PsProblemCard({
  label,
  quote,
  figure,
  description,
}: {
  label: string;
  quote: string[];
  figure: ReactNode;
  description: string[];
}) {
  return (
    <div className="case-ps__problem">
      <div className="case-ps__problem-text">
        <p className="case-ps__problem-label">{label}</p>
        <p className="case-ps__quote">
          {quote.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
      <div className="case-ps__problem-figure">{figure}</div>
      <p className="case-ps__problem-desc">
        {description.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}

/** 제품별 색 견본 비교: 열마다 제목과 색 사각형 3개, 겹치는 칸에는 빨간 테두리와 설명 */
export function PsSwatchCompare({
  columns,
}: {
  columns: { label: string; swatches: { color: string; flag?: string }[] }[];
}) {
  return (
    <div className="case-ps__swatches" role="img" aria-label={columns.map((c) => c.label).join(", ") + " 색 견본 비교"}>
      {columns.map(({ label, swatches }) => (
        <div key={label} className="case-ps__swatch-col">
          <p className="case-ps__swatch-label">
            <span>{label}</span>
          </p>
          {swatches.map(({ color, flag }, i) => (
            <div key={i} className={`case-ps__swatch${flag ? " is-flagged" : ""}`} style={{ background: color }}>
              {flag && <span className="case-ps__swatch-flag">{flag}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** 해결 구조: 파란 라벨, 왼쪽에 층 카드(하나 강조), 오른쪽에 그림 */
export function PsLayers({
  label,
  layers,
  figure,
}: {
  label: string;
  layers: { title: string; description: string; active?: boolean }[];
  figure: { src: string; width: number; height: number; alt: string };
}) {
  return (
    <div className="case-ps__solution">
      <p className="case-ps__solution-label">{label}</p>
      <div className="case-ps__layers-row">
        <ul className="case-ps__layers">
          {layers.map(({ title, description, active }) => (
            <li key={title} className={`case-ps__layer${active ? " is-active" : ""}`}>
              <p className="case-ps__layer-title">{title}</p>
              <p className="case-ps__layer-desc">{description}</p>
            </li>
          ))}
        </ul>
        <img
          className="case-ps__layers-figure"
          src={figure.src}
          width={figure.width}
          height={figure.height}
          alt={figure.alt}
          loading="lazy"
        />
      </div>
    </div>
  );
}

/** 결론 한 줄 (어두운 남색 띠) */
export function PsCallout({ children }: { children: ReactNode }) {
  return <p className="case-ps__callout">{children}</p>;
}

/** 큰 화면 그림 */
export function PsFigure({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) {
  return <img className="case-ps__figure" src={src} width={width} height={height} alt={alt} loading="lazy" />;
}
