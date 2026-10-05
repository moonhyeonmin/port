import type { CSSProperties, ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface CaseDeepDiveProps {
  title: string;
  subtitle: string;
  /** 상단 배경: tint = 연파랑 그라디언트, glow = 보라·하늘 원형 그라디언트 */
  tint?: "tint" | "glow";
  /** 본문 블록 사이 간격 (디자인 px) */
  gap?: number;
  children: ReactNode;
}

export function CaseDeepDive({ title, subtitle, tint, gap = 44, children }: CaseDeepDiveProps) {
  return (
    <section
      className={`case-sec case-deep${tint ? ` has-${tint}` : ""}`}
      aria-label={`Deep Dive: ${title}`}
    >
      <div className="case-deep__text">
        <CaseEyebrow>
          <span className="case-eyebrow__point">Deep Dive</span>
        </CaseEyebrow>
        <div className="case-deep__heading">
          <h2 className="case-h2 is-tight">{title}</h2>
          <p className="case-deep__subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="case-deep__blocks" style={{ "--gap": gap } as CSSProperties}>
        {children}
      </div>
    </section>
  );
}

interface DeepDiveCompareProps {
  label: "AS IS" | "TO BE";
  /** 줄 단위로 나눈 설명 */
  text: string[];
  figure: { src: string; width: number; height: number; alt: string };
  /** 설명 위에 놓이는 강조 수치 등 */
  lead?: ReactNode;
  /** label 대신 표시할 내용 (예: 시도 ③ + 이름) */
  labelNode?: ReactNode;
  /** 라벨과 설명 사이 간격 (디자인 px) */
  labelGap?: number;
}

/** AS IS / TO BE 설명 한 줄 + 화면 그림 */
export function DeepDiveCompare({
  label,
  text,
  figure,
  lead,
  labelNode,
  labelGap = 0,
}: DeepDiveCompareProps) {
  const row = (
    <p className="case-deep__row" style={{ "--label-gap": labelGap } as CSSProperties}>
      <span className={`case-deep__label ${label === "AS IS" ? "is-asis" : "is-tobe"}`}>
        {labelNode ?? label}
      </span>
      <span className="case-deep__desc">
        {text.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </p>
  );

  return (
    <div className="case-deep__block">
      {lead ? (
        <div className="case-deep__lead">
          {lead}
          {row}
        </div>
      ) : (
        row
      )}
      <figure className="case-deep__figure">
        <img
          src={figure.src}
          width={figure.width}
          height={figure.height}
          alt={figure.alt}
          loading="lazy"
        />
      </figure>
    </div>
  );
}

/** 그라디언트 큰 수치 + 설명 */
export function DeepDiveStat({ value, caption }: { value: ReactNode; caption: string }) {
  return (
    <div className="case-deep__stat">
      <p className="case-deep__stat-value">{value}</p>
      <p className="case-deep__stat-caption">{caption}</p>
    </div>
  );
}

interface PriorityRow {
  badge: string;
  /** 필수 항목은 파란 배경 */
  required?: boolean;
  items: string;
  note: string;
}

/** 입력 항목 우선순위 표 */
export function DeepDivePriority({ title, rows }: { title: string; rows: PriorityRow[] }) {
  return (
    <div className="case-deep__priority">
      <h3 className="case-deep__priority-title">{title}</h3>
      <ul className="case-deep__priority-rows">
        {rows.map(({ badge, required, items, note }) => (
          <li key={badge} className={`case-deep__priority-row${required ? " is-required" : ""}`}>
            <span className="case-deep__priority-badge">{badge}</span>
            <span className="case-deep__priority-items">{items}</span>
            <span className="case-deep__priority-note">{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Trial {
  /** 예: "시도 ①" */
  step: string;
  name: string;
  caption: string;
  /** Figma 노드 크기 (그림자 여백 20px 제외). 이미지는 사방 20px 그림자 포함 */
  image: { src: string; width: number; height: number; alt: string };
}

/** 실패한 시도 카드 (빨간 X) */
export function DeepDiveTrials({ text, trials }: { text: string; trials: Trial[] }) {
  return (
    <div className="case-deep__block">
      <p className="case-deep__plain">{text}</p>
      <ul className="case-deep__trials">
        {trials.map(({ step, name, caption, image }) => (
          <li key={step} className="case-deep__trial">
            <div className="case-deep__trial-inner">
              <div className="case-deep__trial-head">
                <p className="case-deep__trial-title">
                  <span>{step}</span>
                  <strong>{name}</strong>
                </p>
                <img src="/icons/x-red.svg" alt="실패" width={25} height={25} />
              </div>
              <div className="case-deep__trial-shot">
                <img
                  src={image.src}
                  width={image.width + 40}
                  height={image.height + 40}
                  alt={image.alt}
                  loading="lazy"
                  style={{ "--w": image.width + 40 } as CSSProperties}
                />
              </div>
              <p className="case-deep__trial-caption">{caption}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
