import type { CSSProperties, ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface SummaryCard {
  value?: ReactNode;
  /** 줄 단위로 나눈 설명 */
  detail: string[];
  /** 강조 카드: 흰 글자, 위 여백 54 (기본 배경은 파란 그라디언트) */
  accent?: boolean;
  /** 카드 배경 (CSS background 값). 없으면 기본 회색 그라디언트 */
  bg?: string;
  /** 글자 그림자 (이미지 배경 위 흰 글자) */
  shadow?: boolean;
  /** 숫자 없이 큰 문구만 보여주는 카드 (40px, 줄 높이 60). 줄 단위 배열 */
  textLines?: string[];
}

interface CaseSummaryProps {
  id?: string;
  /** 한 줄 문자열 또는 줄 단위 배열(줄 높이 100) */
  title: string | string[];
  /**
   * Problem / Solution / Impact 등. text의 강조 부분은 <strong>.
   * 줄을 고정하려면 줄 단위 배열로 넘긴다 (모바일에서는 이어서 흐름).
   * 줄 끝 공백은 Figma 원문 그대로 포함한다 (단어 중간 줄바꿈이면 공백 없음)
   */
  rows: { label: string; text: ReactNode | string[] }[];
  cards: SummaryCard[];
  /** 라벨 아이콘 */
  icon?: string;
  /** "Summary"와 행 라벨 색 (기본: 라벨 --color-point, 행 #3182f6) */
  pointColor?: string;
  /** "Summary" 글자 그라디언트 (CSS 배경 값). 행 라벨은 pointColor 그대로 */
  pointGradient?: string;
  /** 행 사이 간격 (디자인 px, 기본 20) */
  rowGap?: number;
  /** 제목과 행 사이 간격 (디자인 px, 기본 20) */
  headingGap?: number;
  /** 섹션 위·아래 여백 (디자인 px, 기본 120) */
  top?: number;
  bottom?: number;
  /** 여러 줄 행에서 라벨 세로 정렬 (기본 아래, Figma items-end) */
  rowAlign?: "end" | "center";
}

export function CaseSummary({
  id,
  title,
  rows,
  cards,
  icon,
  pointColor,
  pointGradient,
  rowGap,
  headingGap,
  top,
  bottom,
  rowAlign,
}: CaseSummaryProps) {
  const titleLines = Array.isArray(title) ? title : null;
  return (
    <section
      id={id}
      className={`case-sec case-summary${pointGradient ? " has-point-gradient" : ""}`}
      aria-label="Summary"
      style={
        {
          ...(pointColor && { "--color-point": pointColor, "--summary-label": pointColor }),
          ...(pointGradient && { "--point-gradient": pointGradient }),
          ...(rowGap !== undefined && { "--sum-row-gap": rowGap }),
          ...(headingGap !== undefined && { "--sum-heading-gap": headingGap }),
          ...(top !== undefined && { "--sum-top": top }),
          ...(bottom !== undefined && { "--sum-bottom": bottom }),
          ...(rowAlign === "center" && { "--summary-row-align": "center" }),
        } as CSSProperties
      }
    >
      <div className="case-summary__text">
        <CaseEyebrow icon={icon}>
          <span className="case-eyebrow__point">Summary</span>
        </CaseEyebrow>
        <div className="case-summary__heading">
          <h2 className={`case-h2${titleLines ? " is-tight" : ""}`}>
            {titleLines ? titleLines.map((line) => <span key={line}>{line}</span>) : title}
          </h2>
          <dl className="case-summary__rows">
            {rows.map(({ label, text }) => (
              <div key={label} className="case-summary__row">
                <dt>{label}</dt>
                <dd>
                  {Array.isArray(text)
                    ? text.map((line) => (
                        <span key={line} className="case-summary__line">
                          {line}
                        </span>
                      ))
                    : text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ul className="case-summary__cards">
        {cards.map(({ value, detail, accent, bg, shadow, textLines }, i) => (
          <li
            key={i}
            className={[
              "case-summary__card",
              accent && "is-accent",
              shadow && "has-shadow",
              textLines && "is-text",
            ]
              .filter(Boolean)
              .join(" ")}
            style={bg ? { background: bg } : undefined}
          >
            <p className="case-summary__value">
              {textLines ? textLines.map((line) => <span key={line}>{line}</span>) : value}
            </p>
            {detail.length > 0 && (
              <p className="case-summary__detail">
                {detail.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
