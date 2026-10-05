import { CaseEyebrow } from "./CaseEyebrow";

interface CaseWhyHowProps {
  title: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  figure: { src: string; width: number; height: number; alt: string };
}

export function CaseWhyHow({ title, bullets, stats, figure }: CaseWhyHowProps) {
  return (
    <section className="case-sec case-why" aria-label="Why & How">
      <div className="case-why__text">
        <CaseEyebrow>
          <span className="case-eyebrow__point">Why &amp; How</span>
        </CaseEyebrow>
        <div className="case-why__heading">
          <h2 className="case-h2">{title}</h2>
          <ul className="case-why__bullets">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <ul className="case-why__stats">
            {stats.map(({ value, label }) => (
              <li key={label} className="case-why__stat">
                <p className="case-why__value">{value}</p>
                <p className="case-why__label">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="case-why__figure">
        <img
          src={figure.src}
          width={figure.width}
          height={figure.height}
          alt={figure.alt}
          loading="lazy"
        />
      </figure>
    </section>
  );
}
