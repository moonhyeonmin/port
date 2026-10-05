interface CaseHeroProps {
  /** "Project N"의 N */
  index: number;
  label: string;
  /** 줄 단위로 나눈 제목 */
  title: string[];
  /** 줄 단위로 나눈 설명. 모바일에서는 이어서 흐름 */
  description: string[];
  tags: string[];
  cover: { src: string; width: number; height: number; alt: string };
}

export function CaseHero({ index, label, title, description, tags, cover }: CaseHeroProps) {
  return (
    <header className="container case-hero">
      <div className="case-hero__text">
        <p className="case-hero__label">
          <span className="case-hero__icon" aria-hidden>
            <img src="/icons/star.svg" alt="" width={29.68} height={29.67} />
          </span>
          <span>
            <span className="case-hero__index">Project {index}</span> - {label}
          </span>
        </p>

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
          {tags.map((tag) => (
            <li key={tag} className="case-hero__tag">
              {tag}
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
