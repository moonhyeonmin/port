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

export function CaseOverview({ items }: { items: OverviewItem[] }) {
  return (
    <section className="case-sec case-overview" aria-label="Overview">
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
    </section>
  );
}
