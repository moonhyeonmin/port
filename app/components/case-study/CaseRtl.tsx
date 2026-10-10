import type { CSSProperties } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface Img {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * RTL & Result 섹션 (Design system_06): 위에 큰 화면 그림, 라벨·제목, 원칙 카드 3장,
 * 아래 왼쪽 작성 규칙 그림 + 오른쪽 타이포그래피 표 그림.
 */
export function CaseRtl({
  id,
  eyebrow,
  icon,
  pointGradient,
  cover,
  title,
  cards,
  notes,
  table,
}: {
  id?: string;
  eyebrow: string;
  icon?: string;
  pointGradient?: string;
  cover: Img;
  title: string[];
  cards: { title: string; items: string[] }[];
  notes: Img;
  table: Img;
}) {
  return (
    <section
      id={id}
      className={`case-sec case-rtl${pointGradient ? " has-point-gradient" : ""}`}
      aria-label={eyebrow}
      style={pointGradient ? ({ "--point-gradient": pointGradient } as CSSProperties) : undefined}
    >
      <img className="case-rtl__cover" src={cover.src} width={cover.width} height={cover.height} alt={cover.alt} loading="lazy" />

      <div className="case-rtl__head">
        <CaseEyebrow icon={icon}>
          <span className="case-eyebrow__point">{eyebrow}</span>
        </CaseEyebrow>
        <h2 className="case-h2 is-tight case-rtl__title">
          {title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
      </div>

      <ul className="case-rtl__cards">
        {cards.map(({ title, items }) => (
          <li key={title} className="case-rtl__card">
            <p className="case-rtl__card-title">{title}</p>
            <ul className="case-rtl__card-list">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="case-rtl__detail">
        <img className="case-rtl__notes" src={notes.src} width={notes.width} height={notes.height} alt={notes.alt} loading="lazy" />
        <img className="case-rtl__table" src={table.src} width={table.width} height={table.height} alt={table.alt} loading="lazy" />
      </div>
    </section>
  );
}
