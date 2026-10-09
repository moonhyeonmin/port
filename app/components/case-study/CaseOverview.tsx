import type { CSSProperties } from "react";

export interface OverviewItem {
  title: string;
  /** 줄 단위로 나눈 내용 */
  lines: string[];
  /** Figma 기준 열 너비 (디자인 px) */
  width: number;
  /** Figma 기준 제목-내용 간격 (디자인 px) */
  gap: number;
}

/** bottom: 구분선 아래 여백 (디자인 px, 기본 44). 프레임 높이가 고정이라 항목이 짧으면 커진다 */
export function CaseOverview({ items, bottom }: { items: OverviewItem[]; bottom?: number }) {
  return (
    <section
      className="case-sec case-overview"
      aria-label="Overview"
      style={bottom !== undefined ? ({ "--ov-bottom": bottom } as CSSProperties) : undefined}
    >
      <div className="case-overview__items">
        {items.map(({ title, lines, width, gap }) => (
          <div
            key={title}
            className="case-overview__item"
            style={{ "--w": width, "--gap": gap } as CSSProperties}
          >
            <h2 className="case-overview__title">{title}</h2>
            <p className="case-overview__body">
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
        ))}
      </div>
      <hr className="case-overview__divider" />
    </section>
  );
}
