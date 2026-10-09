import type { CSSProperties } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface WhyRow {
  label: string;
  /** 라벨 색 (Figma 행마다 다를 수 있음, 기본 #252D38) */
  labelColor?: string;
  /** 줄 단위로 나눈 설명 */
  desc: string[];
}

interface CaseWhyGridProps {
  id?: string;
  eyebrow: string;
  /** 줄 단위로 나눈 제목 */
  title: string[];
  /** 왼쪽 카드: 강조 문장(줄 단위)과 인용문(줄 단위) */
  lead: { lines: string[]; quote: string[] };
  rows: WhyRow[];
  icon?: string;
  pointColor?: string;
  /** 배경 이미지 (섹션 y=200부터, 위쪽은 흰색으로 흐려짐) */
  background: string;
}

/** 왼쪽 강조 카드 + 오른쪽 문제 행 카드 (Multi AI Workspace_04_Why) */
export function CaseWhyGrid({
  id,
  eyebrow,
  title,
  lead,
  rows,
  icon,
  pointColor,
  background,
}: CaseWhyGridProps) {
  return (
    <section
      id={id}
      className="case-sec case-whyg"
      aria-label={eyebrow}
      style={
        {
          ...(pointColor && { "--color-point": pointColor }),
          "--whyg-bg": `url(${background})`,
        } as CSSProperties
      }
    >
      <div className="case-whyg__bg" aria-hidden />
      <div className="case-whyg__head">
        <CaseEyebrow icon={icon}>
          <span className="case-eyebrow__point">{eyebrow}</span>
        </CaseEyebrow>
        <h2 className="case-h2 is-tight">
          {title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
      </div>

      <div className="case-whyg__body">
        <div className="case-whyg__lead">
          <p className="case-whyg__lead-text">
            {lead.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <blockquote className="case-whyg__quote">
            {lead.quote.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </blockquote>
        </div>

        <ul className="case-whyg__rows">
          {rows.map(({ label, labelColor, desc }) => (
            <li key={label} className="case-whyg__row">
              <h3
                className="case-whyg__label"
                style={labelColor ? { color: labelColor } : undefined}
              >
                {label}
              </h3>
              <p className="case-whyg__desc">
                {desc.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
