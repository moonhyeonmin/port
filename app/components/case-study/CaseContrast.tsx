import type { CSSProperties, ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface ContrastSample {
  /** 견본 카드 바탕색 */
  bg: string;
  /** 견본 글자색 */
  color: string;
  text: string;
  caption: string;
  ratio: string;
  /** 판정 (예: "AA 미달") */
  verdict: string;
  /** 비율·판정 글자색 */
  tone: string;
}

/**
 * 색 대비 문제 섹션 (Design system_05 위쪽): 라벨·제목·설명, 대비 견본 3장, 반복 작업 카드.
 */
export function CaseContrast({
  id,
  eyebrow,
  icon,
  pointGradient,
  title,
  description,
  samples,
  work,
}: {
  id?: string;
  eyebrow: string;
  icon?: string;
  pointGradient?: string;
  title: string[];
  description: string[];
  samples: ContrastSample[];
  work: { title: string; items: string[] };
}) {
  return (
    <section
      id={id}
      className={`case-sec case-contrast${pointGradient ? " has-point-gradient" : ""}`}
      aria-label={eyebrow}
      style={pointGradient ? ({ "--point-gradient": pointGradient } as CSSProperties) : undefined}
    >
      <div className="case-contrast__head">
        <CaseEyebrow icon={icon}>
          <span className="case-eyebrow__point">{eyebrow}</span>
        </CaseEyebrow>
        <div className="case-contrast__heading">
          <h2 className="case-h2 is-tight">
            {title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="case-contrast__desc">
            {description.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>

      <ul className="case-contrast__samples">
        {samples.map(({ bg, color, text, caption, ratio, verdict, tone }) => (
          <li key={caption} className="case-contrast__sample">
            <p className="case-contrast__swatch" style={{ background: bg, color }}>
              {text}
            </p>
            <p className="case-contrast__caption">{caption}</p>
            <p className="case-contrast__result" style={{ color: tone }}>
              <span className="case-contrast__ratio">{ratio}</span>
              <span className="case-contrast__verdict">{verdict}</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="case-contrast__work">
        <p className="case-contrast__work-title">{work.title}</p>
        <ul className="case-contrast__work-list">
          {work.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * 해결 도구 섹션 (Design system_05 아래쪽): 검은 바탕, 제목, 왼쪽 도구 화면 + 오른쪽 번호 단계, 뒤에 180° 돌린 사선 무늬.
 */
export function CasePlugin({
  title,
  figure,
  steps,
  decor,
}: {
  title: string[];
  figure: { src: string; width: number; height: number; alt: string };
  steps: { title: string; description: ReactNode[] }[];
  decor?: string;
}) {
  return (
    <section className="case-plugin" aria-label={title.join(" ")}>
      <div className="case-sec case-plugin__inner">
        {decor && <img className="case-plugin__decor" src={decor} alt="" width={1307} height={1096} loading="lazy" />}
        <h2 className="case-h2 is-tight case-plugin__title">
          {title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <div className="case-plugin__body">
          <img
            className="case-plugin__figure"
            src={figure.src}
            width={figure.width}
            height={figure.height}
            alt={figure.alt}
            loading="lazy"
          />
          <ol className="case-plugin__steps">
            {steps.map(({ title, description }, i) => (
              <li key={title} className="case-plugin__step">
                <span className="case-plugin__num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="case-plugin__step-title">{title}</p>
                  <p className="case-plugin__step-desc">
                    {description.map((line, j) => (
                      <span key={j}>{line}</span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
