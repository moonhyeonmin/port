import type { CSSProperties } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface CaseLandingProps {
  id?: string;
  eyebrow: string;
  title: string;
  icon?: string;
  pointColor?: string;
  /** 왼쪽 세로로 긴 랜딩 페이지 전체 화면 */
  shot: { src: string; width: number; height: number; alt: string };
  columns: [string, string];
  /** 왼쪽(제품 요소) → 오른쪽(랜딩 요소). leftColor는 Figma 행별 색 */
  /** arrowDy: 화살표 세로 보정 (Figma에서 화살표 간격 157, 카드 간격 160이라 행마다 다름) */
  rows: { from: string; to: string; fromColor?: string; arrowDy?: number }[];
  note: string;
  /** 아래쪽 장식 이미지 (섹션 y=1628부터 2711×1060, 위는 흰색으로 흐려짐) */
  background: string;
}

/** 랜딩 페이지 화면 + 제품 요소 → 랜딩 요소 대응표 (Multi AI Workspace_08) */
export function CaseLanding({
  id,
  eyebrow,
  title,
  icon,
  pointColor,
  shot,
  columns,
  rows,
  note,
  background,
}: CaseLandingProps) {
  return (
    <section
      id={id}
      className="case-landing"
      aria-label={`${eyebrow}: ${title}`}
      style={
        {
          ...(pointColor && { "--color-point": pointColor }),
          "--landing-bg": `url(${background})`,
        } as CSSProperties
      }
    >
      <div className="case-landing__bg" aria-hidden />
      <div className="case-sec case-landing__inner">
        <div className="case-landing__head">
          <CaseEyebrow icon={icon}>
            <span className="case-eyebrow__point">{eyebrow}</span>
          </CaseEyebrow>
          <h2 className="case-h2 is-tight">{title}</h2>
        </div>

        <div className="case-landing__body">
          <img
            className="case-landing__shot"
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            loading="lazy"
          />
          <div className="case-landing__map">
            <div className="case-landing__cols" aria-hidden>
              <span>{columns[0]}</span>
              <span />
              <span>{columns[1]}</span>
            </div>
            <ul className="case-landing__rows">
              {rows.map(({ from, to, fromColor, arrowDy = 0 }) => (
                <li key={from} className="case-landing__row">
                  <span
                    className="case-landing__from"
                    style={fromColor ? { color: fromColor } : undefined}
                  >
                    {from}
                  </span>
                  <img
                    className="case-landing__arrow"
                    src="/icons/arrow-dotted.svg"
                    alt="→"
                    width={134}
                    height={12}
                    style={{ "--dy": arrowDy } as CSSProperties}
                  />
                  <span className="case-landing__to">{to}</span>
                </li>
              ))}
            </ul>
            <p className="case-landing__note">{note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
