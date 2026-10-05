import type { CSSProperties, ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface CaseDeepDiveProps {
  title: string;
  subtitle: string;
  /** 상단 연파랑 그라디언트 배경 */
  tint?: boolean;
  /** 본문 블록 사이 간격 (디자인 px) */
  gap?: number;
  children: ReactNode;
}

export function CaseDeepDive({ title, subtitle, tint, gap = 44, children }: CaseDeepDiveProps) {
  return (
    <section
      className={`case-sec case-deep${tint ? " has-tint" : ""}`}
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
}

/** AS IS / TO BE 설명 한 줄 + 화면 그림 */
export function DeepDiveCompare({ label, text, figure, lead }: DeepDiveCompareProps) {
  const row = (
    <p className="case-deep__row">
      <span className={`case-deep__label ${label === "AS IS" ? "is-asis" : "is-tobe"}`}>
        {label}
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
export function DeepDiveStat({ value, caption }: { value: string; caption: string }) {
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
