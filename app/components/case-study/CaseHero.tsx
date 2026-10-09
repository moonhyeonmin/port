import type { CSSProperties } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface CaseHeroProps {
  /** 섹션 id (상단 내비게이션 이동용) */
  id?: string;
  /** "Project N"의 N */
  index: number;
  label: string;
  /** 줄 단위로 나눈 제목 */
  title: string[];
  /** 줄 단위로 나눈 설명. 모바일에서는 이어서 흐름 */
  description: string[];
  /** box: Figma 태그 컨테이너 너비, pill: 그 안의 pill 너비 (디자인 px) */
  tags: { label: string; box: number; pill: number }[];
  cover: { src: string; width: number; height: number; alt: string };
  /** 라벨 아이콘 (기본: 파란 별) */
  icon?: string;
  /** "Project N" 강조색 (기본 --color-point) */
  pointColor?: string;
  /** 섹션 아래 여백 (디자인 px, 기본 33) */
  bottom?: number;
}

export function CaseHero({
  id,
  index,
  label,
  title,
  description,
  tags,
  cover,
  icon,
  pointColor,
  bottom,
}: CaseHeroProps) {
  return (
    <header
      id={id}
      className="case-sec case-hero"
      style={
        {
          ...(pointColor && { "--color-point": pointColor }),
          ...(bottom !== undefined && { "--hero-bottom": bottom }),
        } as CSSProperties
      }
    >
      <div className="case-hero__text">
        <CaseEyebrow icon={icon}>
          <span className="case-eyebrow__point">Project {index}</span> - {label}
        </CaseEyebrow>

        <div className="case-hero__heading">
          <h1 className="case-hero__title">
            {title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="case-hero__desc">
            {description.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>

        <ul className="case-hero__tags" aria-label="키워드">
          {tags.map(({ label, box, pill }) => (
            <li key={label} style={{ "--w": box } as CSSProperties}>
              <span className="case-hero__tag" style={{ "--w": pill } as CSSProperties}>
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <img
        className="case-hero__cover"
        src={cover.src}
        width={cover.width}
        height={cover.height}
        alt={cover.alt}
        fetchPriority="high"
      />
    </header>
  );
}
