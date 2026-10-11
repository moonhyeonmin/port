import type { CSSProperties } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

/**
 * 핵심 질문 카드 + 번호 단계 (fireside_03 "Why & How"):
 * 왼쪽에 초록빛 그라디언트 카드(라벨 배지 + 문단), 오른쪽에 그라디언트 숫자 01~04와 단계 설명.
 */
export function CaseQuestionSteps({
  id,
  eyebrow,
  icon,
  pointColor,
  title,
  question,
  steps,
}: {
  id?: string;
  eyebrow: string;
  icon?: string;
  pointColor?: string;
  title: string[];
  /** paragraphs: 문단마다 줄 단위 배열 */
  question: { label: string; paragraphs: string[][] };
  steps: { title: string; description: string }[];
}) {
  return (
    <section
      id={id}
      className="case-sec case-qs"
      aria-label={eyebrow}
      style={pointColor ? ({ "--color-point": pointColor } as CSSProperties) : undefined}
    >
      <div className="case-qs__head">
        <CaseEyebrow icon={icon}>
          <span className="case-eyebrow__point">{eyebrow}</span>
        </CaseEyebrow>
        <h2 className="case-h2 is-tight">
          {title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
      </div>

      <div className="case-qs__body">
        <div className="case-qs__card">
          <p className="case-qs__badge">{question.label}</p>
          {question.paragraphs.map((lines, i) => (
            <p key={i} className="case-qs__para">
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          ))}
        </div>

        <ol className="case-qs__steps">
          {steps.map(({ title, description }, i) => (
            <li key={title} className="case-qs__step">
              <span className="case-qs__num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="case-qs__step-title">{title}</p>
                <p className="case-qs__step-desc">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
