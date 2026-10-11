import type { CSSProperties } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface Bar {
  label: string;
  value: string;
  /** 막대 길이 (디자인 px) */
  width: number;
}

interface Row {
  name: string;
  note: string;
  /** 강조 행 (빨간 배경) */
  highlight?: boolean;
}

interface DiagnosisCard {
  icon: string;
  label: string;
  /** 라벨·테두리·막대 색 */
  color: string;
  value: string;
  description: string[];
  bars?: Bar[];
  rows?: Row[];
}

/**
 * 진단 카드 3장 (fireside_04 Diagnosis): 아래쪽 파스텔 빛 번짐 배경,
 * 카드마다 아이콘·라벨·큰 수치·설명, 아래에 막대그래프 또는 비교 목록.
 */
export function CaseDiagnosis({
  id,
  eyebrow,
  icon,
  pointColor,
  title,
  description,
  background,
  cards,
}: {
  id?: string;
  eyebrow: string;
  icon?: string;
  pointColor?: string;
  title: string;
  description: string[];
  background?: string;
  cards: DiagnosisCard[];
}) {
  return (
    <section
      id={id}
      className="case-diag"
      aria-label={eyebrow}
      style={pointColor ? ({ "--color-point": pointColor } as CSSProperties) : undefined}
    >
      {background && <img className="case-diag__bg" src={background} alt="" loading="lazy" />}
      <div className="case-sec case-diag__inner">
        <div className="case-diag__head">
          <CaseEyebrow icon={icon}>
            <span className="case-eyebrow__point">{eyebrow}</span>
          </CaseEyebrow>
          <div className="case-diag__heading">
            <h2 className="case-h2 is-tight">{title}</h2>
            <p className="case-diag__desc">
              {description.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
        </div>

        <ul className="case-diag__cards">
          {cards.map(({ icon, label, color, value, description, bars, rows }) => (
            <li key={label} className="case-diag__card" style={{ "--c": color } as CSSProperties}>
              <div className="case-diag__card-head">
                <img src={icon} alt="" width={110} height={110} loading="lazy" />
                <p className="case-diag__label">{label}</p>
              </div>
              <p className="case-diag__value">{value}</p>
              <p className="case-diag__card-desc">
                {description.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              {bars && (
                <dl className="case-diag__bars">
                  {bars.map(({ label, value, width }) => (
                    <div key={label} className="case-diag__bar-row">
                      <dt>{label}</dt>
                      <dd>
                        <span className="case-diag__bar" style={{ "--w": width } as CSSProperties} />
                        <span className="case-diag__bar-value">{value}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {rows && (
                <ul className="case-diag__rows">
                  {rows.map(({ name, note, highlight }) => (
                    <li key={name} className={`case-diag__row${highlight ? " is-highlight" : ""}`}>
                      <span className="case-diag__row-name">{name}</span>
                      <span className="case-diag__row-note">{note}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
