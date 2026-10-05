import type { ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface SummaryCard {
  value: ReactNode;
  /** 줄 단위로 나눈 설명 */
  detail: string[];
  /** 파란 그라디언트 강조 카드 */
  accent?: boolean;
}

interface CaseSummaryProps {
  id?: string;
  title: string;
  /** Problem / Solution / Impact 등. text의 강조 부분은 <strong> */
  rows: { label: string; text: ReactNode }[];
  cards: SummaryCard[];
}

export function CaseSummary({ id, title, rows, cards }: CaseSummaryProps) {
  return (
    <section id={id} className="case-sec case-summary" aria-label="Summary">
      <div className="case-summary__text">
        <CaseEyebrow>
          <span className="case-eyebrow__point">Summary</span>
        </CaseEyebrow>
        <div className="case-summary__heading">
          <h2 className="case-h2">{title}</h2>
          <dl className="case-summary__rows">
            {rows.map(({ label, text }) => (
              <div key={label} className="case-summary__row">
                <dt>{label}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ul className="case-summary__cards">
        {cards.map(({ value, detail, accent }) => (
          <li key={detail.join(" ")} className={`case-summary__card${accent ? " is-accent" : ""}`}>
            <p className="case-summary__value">{value}</p>
            <p className="case-summary__detail">
              {detail.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
