import { CaseEyebrow } from "./CaseEyebrow";

interface DeepDiveBlock {
  label: "AS IS" | "TO BE";
  /** 줄 단위로 나눈 설명 */
  text: string[];
  figure: { src: string; width: number; height: number; alt: string };
}

interface CaseDeepDiveProps {
  title: string;
  subtitle: string;
  blocks: DeepDiveBlock[];
}

export function CaseDeepDive({ title, subtitle, blocks }: CaseDeepDiveProps) {
  return (
    <section className="case-sec case-deep" aria-label={`Deep Dive: ${title}`}>
      <div className="case-deep__text">
        <CaseEyebrow>
          <span className="case-eyebrow__point">Deep Dive</span>
        </CaseEyebrow>
        <div className="case-deep__heading">
          <h2 className="case-h2 is-tight">{title}</h2>
          <p className="case-deep__subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="case-deep__blocks">
        {blocks.map(({ label, text, figure }) => (
          <div key={label} className="case-deep__block">
            <p className="case-deep__row">
              <span className={`case-deep__label ${label === "AS IS" ? "is-asis" : "is-tobe"}`}>
                {label}
              </span>
              <span className="case-deep__desc">
                {text.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </p>
            <figure className="case-deep__figure">
              <img
                src={figure.src}
                width={figure.width}
                height={figure.height}
                alt={figure.alt}
                loading="lazy"
              />
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
