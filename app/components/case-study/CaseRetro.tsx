import type { ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";
import { CaseNext } from "./CaseNext";

interface CaseRetroProps {
  id?: string;
  title: string;
  stats: { value: ReactNode; caption: string[] }[];
  retro: {
    label: string;
    /** 줄 단위 문단. 빈 문자열은 빈 줄 */
    lines: string[];
    /** 마지막에 파란 굵은 글씨로 강조하는 문장 */
    highlight: string;
  };
  next: { to: string; title: string };
}

/** 결과 및 회고 (어두운 배경) + Next Project */
export function CaseRetro({ id, title, stats, retro, next }: CaseRetroProps) {
  return (
    <section id={id} className="case-retro" aria-label="Retrospective">
      <div className="case-retro__dark">
        <div className="case-retro__glows" aria-hidden>
          <span className="case-retro__glow is-sky" />
          <span className="case-retro__glow is-mid" />
        </div>
        <div className="case-sec case-retro__inner">
          <div className="case-retro__text">
            <CaseEyebrow light>Retrospective</CaseEyebrow>
            <h2 className="case-h2 is-tight">{title}</h2>
          </div>

          <ul className="case-retro__stats">
            {stats.map(({ value, caption }) => (
              <li key={caption.join(" ")} className="case-retro__stat">
                <p className="case-retro__value">{value}</p>
                <p className="case-retro__caption">
                  {caption.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </li>
            ))}
          </ul>

          <div className="case-retro__note">
            <h3 className="case-retro__label">{retro.label}</h3>
            <p className="case-retro__body">
              {retro.lines.map((line, i) =>
                line ? <span key={i}>{line}</span> : <span key={i} className="is-blank" />,
              )}
              <strong>{retro.highlight}</strong>
            </p>
          </div>
        </div>
      </div>

      <CaseNext to={next.to} title={next.title} />
    </section>
  );
}
