import type { CSSProperties, ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";
import { CaseNext } from "./CaseNext";

interface CaseRetroProps {
  id?: string;
  /** 한 줄 문자열 또는 줄 단위 배열 */
  title: string | string[];
  /** tight: 숫자·기호만 있는 값의 좁은 자간 */
  /** from: 숫자 그라디언트 시작색 (없으면 colors.accent) */
  stats: { value: ReactNode; caption: string[]; tight?: boolean; from?: string }[];
  /** 숫자 열 너비 (디자인 px). 없으면 4등분 */
  statWidth?: number;
  retro: {
    label: string;
    /** 줄 단위 문단. 빈 문자열은 빈 줄 */
    lines: string[];
    /** 마지막에 파란 굵은 글씨로 강조하는 문장 */
    highlight?: string;
  };
  next: { to: string; title: string };
  /** 색 바꾸기 (기본: Ellm 남색 바탕 + 파란 강조) */
  colors?: {
    /** 어두운 영역 바탕 */
    bg: string;
    /** 숫자 그라디언트 시작색, 강조 문장 색 */
    accent: string;
    /** 오른쪽 아래 / 왼쪽 위 빛 번짐 색 (투명도 포함) */
    glows: [string, string];
  };
  /** 숫자 아래 구분선 색 (있으면 표시) */
  divider?: string;
  /** 구분선·회고를 아래로 더 내리는 값 (디자인 px). 어두운 영역 높이는 그대로 */
  noteShift?: number;
}

/** 결과 및 회고 (어두운 배경) + Next Project */
export function CaseRetro({ id, title, stats, retro, next, colors, divider, statWidth, noteShift }: CaseRetroProps) {
  return (
    <section
      id={id}
      className="case-retro"
      aria-label="Retrospective"
      style={
        {
          ...(colors && {
            "--retro-bg": colors.bg,
            "--retro-accent": colors.accent,
            "--retro-glow-a": colors.glows[0],
            "--retro-glow-b": colors.glows[1],
          }),
          ...(divider && { "--retro-divider": divider }),
          ...(statWidth && { "--retro-stat-w": statWidth }),
          ...(noteShift && { "--retro-shift": noteShift }),
        } as CSSProperties
      }
    >
      <div className="case-retro__dark">
        <div className="case-retro__glows" aria-hidden>
          <span className="case-retro__glow is-sky" />
          <span className="case-retro__glow is-mid" />
        </div>
        <div className="case-sec case-retro__inner">
          <div className="case-retro__text">
            <CaseEyebrow light>Retrospective</CaseEyebrow>
            <h2 className="case-h2 is-tight">
              {Array.isArray(title) ? title.map((line) => <span key={line}>{line}</span>) : title}
            </h2>
          </div>

          <ul className={`case-retro__stats${statWidth ? " has-width" : ""}`}>
            {stats.map(({ value, caption, tight, from }) => (
              <li
                key={caption.join(" ")}
                className="case-retro__stat"
                style={from ? ({ "--retro-accent": from } as CSSProperties) : undefined}
              >
                <p className={`case-retro__value${tight ? " is-tight" : ""}`}>{value}</p>
                <p className="case-retro__caption">
                  {caption.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </li>
            ))}
          </ul>

          {divider && <hr className="case-retro__divider" />}
          <div className="case-retro__note">
            <h3 className="case-retro__label">{retro.label}</h3>
            <p className="case-retro__body">
              {retro.lines.map((line, i) =>
                line ? <span key={i}>{line}</span> : <span key={i} className="is-blank" />,
              )}
              {retro.highlight && <strong>{retro.highlight}</strong>}
            </p>
          </div>
        </div>
      </div>

      <CaseNext to={next.to} title={next.title} />
    </section>
  );
}
