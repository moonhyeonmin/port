import { CaseEyebrow } from "./CaseEyebrow";

interface JourneyStep {
  step: string;
  /** 줄 단위로 나눈 문제 */
  pain: string[];
  fix: { action: string; result: string };
}

interface CaseJourneyProps {
  id?: string;
  /** 줄 단위로 나눈 제목 */
  title: string[];
  description: string;
  steps: JourneyStep[];
  background: { src: string; width: number; height: number };
}

function PainTag() {
  return (
    <p className="case-journey__tag is-pain">
      <img src="/icons/face-pain.svg" alt="" width={26} height={26} />
      <span>Pain</span>
    </p>
  );
}

function FixTag() {
  return (
    <p className="case-journey__tag is-fix">
      <img src="/icons/face-fix.svg" alt="" width={26} height={26} />
      <span>Fix</span>
    </p>
  );
}

export function CaseJourney({ id, title, description, steps, background }: CaseJourneyProps) {
  return (
    <section id={id} className="case-journey" aria-label="User Journey">
      <img
        className="case-journey__bg"
        src={background.src}
        width={background.width}
        height={background.height}
        alt=""
        loading="lazy"
      />
      <div className="case-sec case-journey__inner">
        <div className="case-journey__text">
          <CaseEyebrow>
            <span className="case-eyebrow__point">User Journey</span>
          </CaseEyebrow>
          <div className="case-journey__heading">
            <h2 className="case-h2 is-tight">
              {title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="case-journey__desc">{description}</p>
          </div>
        </div>

        <div className="case-journey__table">
          <div className="case-journey__head" aria-hidden>
            <p>Step</p>
            <PainTag />
            <FixTag />
          </div>
          <ol className="case-journey__rows">
            {steps.map(({ step, pain, fix }, i) => (
              <li key={step} className="case-journey__row">
                <h3 className="case-journey__step">
                  {i + 1}. {step}
                </h3>
                <div>
                  <PainTag />
                  <p className="case-journey__pain">
                    {pain.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </div>
                <div>
                  <FixTag />
                  <p className="case-journey__fix">
                    <span>{fix.action}</span>
                    <strong>{fix.result}</strong>
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
