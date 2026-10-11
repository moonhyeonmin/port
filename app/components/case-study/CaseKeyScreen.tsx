import type { CSSProperties, ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface Img {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** 핵심 화면 섹션 (fireside_05): 라벨·제목·설명 + 내용 */
export function CaseKeyScreen({
  id,
  eyebrow,
  icon,
  pointColor,
  title,
  description,
  bottom,
  children,
}: {
  id?: string;
  eyebrow: string;
  icon?: string;
  pointColor?: string;
  title: string;
  description: string[];
  /** 섹션 아래 여백 (디자인 px, 기본 115) */
  bottom?: number;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="case-sec case-ks"
      aria-label={eyebrow}
      style={
        {
          ...(pointColor && { "--color-point": pointColor }),
          ...(bottom !== undefined && { "--ks-bottom": bottom }),
        } as CSSProperties
      }
    >
      <div className="case-ks__head">
        <CaseEyebrow icon={icon}>
          <span className="case-eyebrow__point">{eyebrow}</span>
        </CaseEyebrow>
        <div className="case-ks__heading">
          <h2 className="case-h2 is-tight">{title}</h2>
          <p className="case-ks__desc">
            {description.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

interface ComparePanel {
  label: string;
  image: Img;
  bullets: string[];
  /** 글머리 목록 위치: left = 점의 x, center = 줄 가운데 x (패널 왼쪽 기준, 디자인 px) */
  align: { left: number } | { center: number };
}

/** AS IS(회색 패널, 글자 라벨) / TO BE(그라디언트 패널, 흰 알약 라벨) 두 패널 + 아래 글머리 목록 */
/** bulletGap: 그림과 글머리 목록 사이 (디자인 px, 기본 43.8) */
export function KsCompare({ asIs, toBe, bulletGap }: { asIs: ComparePanel; toBe: ComparePanel; bulletGap?: number }) {
  return (
    <div
      className="case-ks__compare"
      style={bulletGap !== undefined ? ({ "--ks-bullet-gap": bulletGap } as CSSProperties) : undefined}
    >
      {[
        { ...asIs, tone: "asis" },
        { ...toBe, tone: "tobe" },
      ].map(({ label, image, bullets, align, tone }) => (
        <div key={tone} className={`case-ks__panel is-${tone}`}>
          <div className="case-ks__figure">
            <img src={image.src} width={image.width} height={image.height} alt={image.alt} loading="lazy" />
            <p className="case-ks__label">{label}</p>
          </div>
          <ul
            className={`case-ks__bullets${"center" in align ? " is-center" : ""}`}
            style={{ "--x": "center" in align ? align.center : align.left } as CSSProperties}
          >
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** 왼쪽 화면 그림 + 오른쪽 큰 수치와 AS IS / TO BE 설명 */
export function KsStat({
  image,
  value,
  caption,
  rows,
}: {
  image: Img;
  value: string;
  caption: string;
  rows: { label: string; lines: string[]; tone: "asis" | "tobe" }[];
}) {
  return (
    <div className="case-ks__stat">
      <img className="case-ks__stat-figure" src={image.src} width={image.width} height={image.height} alt={image.alt} loading="lazy" />
      <div className="case-ks__stat-text">
        <p className="case-ks__stat-value">{value}</p>
        <p className="case-ks__stat-caption">{caption}</p>
        <dl className="case-ks__stat-rows">
          {rows.map(({ label, lines, tone }) => (
            <div key={label} className={`case-ks__stat-row is-${tone}`}>
              <dt>{label}</dt>
              <dd>
                {lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
