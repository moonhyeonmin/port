import type { CSSProperties } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface GlassCard {
  image: { src: string; width: number; height: number; alt: string };
  /** 예: "LEVEL 1 - 상시" */
  level: string;
  levelColor: string;
  title: string;
  desc: string;
}

interface CaseGlassCardsProps {
  id?: string;
  eyebrow: string;
  title: string;
  /** 제목 옆 아이콘 (gap: 디자인 px) */
  titleIcon?: { src: string; width: number; height: number; gap: number };
  icon?: string;
  pointColor?: string;
  cards: GlassCard[];
}

/** 어두운 배경 + 유리 카드 3장 (Multi AI Workspace_06 security ux) */
export function CaseGlassCards({
  id,
  eyebrow,
  title,
  titleIcon,
  icon,
  pointColor,
  cards,
}: CaseGlassCardsProps) {
  return (
    <section
      id={id}
      className="case-glass"
      aria-label={`${eyebrow}: ${title}`}
      style={pointColor ? ({ "--color-point": pointColor } as CSSProperties) : undefined}
    >
      <div className="case-glass__glows" aria-hidden>
        <span className="case-glass__glow is-a" />
        <span className="case-glass__glow is-b" />
      </div>
      <div className="case-sec case-glass__inner">
        <div className="case-glass__head">
          <CaseEyebrow icon={icon}>
            <span className="case-eyebrow__point">{eyebrow}</span>
          </CaseEyebrow>
          <h2 className="case-h2 is-tight">
            {titleIcon ? (
              <span
                className="case-deep__title-row"
                style={{ "--title-icon-gap": titleIcon.gap } as CSSProperties}
              >
                {title}
                <img
                  src={titleIcon.src}
                  alt=""
                  width={titleIcon.width}
                  height={titleIcon.height}
                  style={{ "--w": titleIcon.width, "--h": titleIcon.height } as CSSProperties}
                />
              </span>
            ) : (
              title
            )}
          </h2>
        </div>

        <ul className="case-glass__cards">
          {cards.map(({ image, level, levelColor, title: cardTitle, desc }) => (
            <li key={level} className="case-glass__card">
              <img
                className="case-glass__shot"
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading="lazy"
              />
              <p className="case-glass__level" style={{ color: levelColor }}>
                {level}
              </p>
              <h3 className="case-glass__title">{cardTitle}</h3>
              <p className="case-glass__desc">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
