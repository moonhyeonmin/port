import type { CSSProperties, ReactNode } from "react";
import { CaseEyebrow } from "./CaseEyebrow";

interface CaseDeepDiveProps {
  id?: string;
  title: string;
  subtitle: string;
  /** 상단 배경: tint = 연파랑 그라디언트, glow = 보라·하늘 원형 그라디언트 */
  tint?: "tint" | "glow";
  /** tint 배경 높이 (디자인 px, 기본 508) */
  tintHeight?: number;
  /** tint 그라디언트 색 [아래(투명 쪽), 위] (기본 연파랑) */
  tintColors?: [string, string];
  /** 본문 블록 사이 간격 (디자인 px) */
  gap?: number;
  /** 라벨 문구 (기본 "Deep Dive") */
  eyebrow?: string;
  /** 라벨 아이콘 */
  icon?: string;
  /** 라벨·부제 강조색 */
  pointColor?: string;
  /** 제목 옆 아이콘 (gap: 제목과 아이콘 사이, dy: 세로 보정, 디자인 px) */
  titleIcon?: { src: string; width: number; height: number; gap: number; dy?: number };
  /** 부제 앞 공백(들여쓰기)을 Figma처럼 유지 */
  keepSubtitleSpaces?: boolean;
  /** 섹션 아래 여백 (디자인 px, 기본 120) */
  bottom?: number;
  children: ReactNode;
}

export function CaseDeepDive({
  id,
  title,
  subtitle,
  tint,
  tintHeight,
  tintColors,
  gap = 44,
  eyebrow = "Deep Dive",
  icon,
  pointColor,
  titleIcon,
  keepSubtitleSpaces,
  bottom,
  children,
}: CaseDeepDiveProps) {
  return (
    <section
      id={id}
      className={`case-sec case-deep${tint ? ` has-${tint}` : ""}`}
      style={
        {
          ...(tintHeight && { "--tint-h": tintHeight }),
          ...(tintColors && { "--tint-from": tintColors[0], "--tint-to": tintColors[1] }),
          ...(pointColor && { "--color-point": pointColor, "--deep-point": pointColor }),
          ...(bottom !== undefined && { "--deep-bottom": bottom }),
        } as CSSProperties
      }
      aria-label={`${eyebrow}: ${title}`}
    >
      <div className="case-deep__text">
        <CaseEyebrow icon={icon}>
          <span className="case-eyebrow__point">{eyebrow}</span>
        </CaseEyebrow>
        <div className="case-deep__heading">
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
                  style={
                    {
                      "--w": titleIcon.width,
                      "--h": titleIcon.height,
                      "--dy": titleIcon.dy ?? 0,
                    } as CSSProperties
                  }
                />
              </span>
            ) : (
              title
            )}
          </h2>
          <p className={`case-deep__subtitle${keepSubtitleSpaces ? " is-pre" : ""}`}>{subtitle}</p>
        </div>
      </div>

      <div className="case-deep__blocks" style={{ "--gap": gap } as CSSProperties}>
        {children}
      </div>
    </section>
  );
}

interface DeepDiveCompareProps {
  /** 행 라벨 (AS IS / TO BE / Design 등) */
  label: string;
  /** 라벨 색 톤 (기본: TO BE는 파랑, 그 외는 진한 갈색) */
  tone?: "asis" | "tobe";
  /** 줄 단위로 나눈 설명 */
  text: string[];
  figure: { src: string; width: number; height: number; alt: string };
  /** 설명 위에 놓이는 강조 수치 등 */
  lead?: ReactNode;
  /** label 대신 표시할 내용 (예: 시도 ③ + 이름) */
  labelNode?: ReactNode;
  /** 라벨과 설명 사이 간격 (디자인 px) */
  labelGap?: number;
  /** 그림 위에 겹치는 요소 (예: DeepDiveSpecCard) */
  overlay?: ReactNode;
  /** 모바일에서 그림을 잘라 보여줄 비율과 가로 위치 (예: { aspect: "1 / 1", x: "72%" }) */
  mobileCrop?: { aspect: string; x: string };
}

/** AS IS / TO BE 설명 한 줄 + 화면 그림 */
export function DeepDiveCompare({
  label,
  text,
  figure,
  lead,
  labelNode,
  labelGap = 0,
  overlay,
  mobileCrop,
  tone = label === "TO BE" ? "tobe" : "asis",
}: DeepDiveCompareProps) {
  const row = (
    <p className="case-deep__row" style={{ "--label-gap": labelGap } as CSSProperties}>
      <span className={`case-deep__label is-${tone}`}>
        {labelNode ?? label}
      </span>
      <span className="case-deep__desc">
        {text.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </p>
  );

  return (
    <div className="case-deep__block">
      {lead ? (
        <div className="case-deep__lead">
          {lead}
          {row}
        </div>
      ) : (
        row
      )}
      <figure
        className={`case-deep__figure${overlay ? " has-overlay" : ""}${mobileCrop ? " has-mobile-crop" : ""}`}
        style={
          mobileCrop
            ? ({ "--m-aspect": mobileCrop.aspect, "--m-pos": mobileCrop.x } as CSSProperties)
            : undefined
        }
      >
        <img
          src={figure.src}
          width={figure.width}
          height={figure.height}
          alt={figure.alt}
          loading="lazy"
        />
        {overlay}
      </figure>
    </div>
  );
}

/** 그라디언트 큰 수치 + 설명. gradient: [위, 아래] (기본 #1658ff → #3182f6) */
export function DeepDiveStat({
  value,
  caption,
  gradient,
}: {
  value: ReactNode;
  caption: string;
  gradient?: [string, string];
}) {
  return (
    <div
      className="case-deep__stat"
      style={
        gradient
          ? ({ "--stat-from": gradient[0], "--stat-to": gradient[1] } as CSSProperties)
          : undefined
      }
    >
      <p className="case-deep__stat-value">{value}</p>
      <p className="case-deep__stat-caption">{caption}</p>
    </div>
  );
}

interface PriorityRow {
  badge: string;
  /** 필수 항목은 파란 배경 */
  required?: boolean;
  items: string;
  note: string;
}

/** 입력 항목 우선순위 표 */
export function DeepDivePriority({ title, rows }: { title: string; rows: PriorityRow[] }) {
  return (
    <div className="case-deep__priority">
      <h3 className="case-deep__priority-title">{title}</h3>
      <ul className="case-deep__priority-rows">
        {rows.map(({ badge, required, items, note }) => (
          <li key={badge} className={`case-deep__priority-row${required ? " is-required" : ""}`}>
            <span className="case-deep__priority-badge">{badge}</span>
            <span className="case-deep__priority-items">{items}</span>
            <span className="case-deep__priority-note">{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Trial {
  /** 예: "시도 ①" */
  step: string;
  name: string;
  caption: string;
  /** Figma 노드 크기 (그림자 여백 20px 제외). 이미지는 사방 20px 그림자 포함 */
  image: { src: string; width: number; height: number; alt: string };
}

/** 실패한 시도 카드 (빨간 X) */
export function DeepDiveTrials({ text, trials }: { text: string; trials: Trial[] }) {
  return (
    <div className="case-deep__block">
      <p className="case-deep__plain">{text}</p>
      <ul className="case-deep__trials">
        {trials.map(({ step, name, caption, image }) => (
          <li key={step} className="case-deep__trial">
            <div className="case-deep__trial-inner">
              <div className="case-deep__trial-head">
                <p className="case-deep__trial-title">
                  <span>{step}</span>
                  <strong>{name}</strong>
                </p>
                <img src="/icons/x-red.svg" alt="실패" width={25} height={25} />
              </div>
              <div className="case-deep__trial-shot">
                <img
                  src={image.src}
                  width={image.width + 40}
                  height={image.height + 40}
                  alt={image.alt}
                  loading="lazy"
                  style={{ "--w": image.width + 40 } as CSSProperties}
                />
              </div>
              <p className="case-deep__trial-caption">{caption}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 그림 위에 겹치는 문서 카드 (예: 개발 사양서). 줄 단위로 나눈 본문 */
export function DeepDiveSpecCard({
  title,
  subtitle,
  lines,
}: {
  title: string;
  subtitle: string;
  lines: string[];
}) {
  return (
    <div className="case-deep__spec">
      <p className="case-deep__spec-title">{title}</p>
      <p className="case-deep__spec-subtitle">{subtitle}</p>
      <p className="case-deep__spec-body">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}

interface PanelItem {
  figure: { src: string; width: number; height: number; alt: string };
  /** 그림 아래 알약 라벨과 설명. width는 Figma 알약 너비, x는 알약 시작 x (없으면 가운데) */
  pill: { label: string; width: number; x?: number };
  caption: string;
}

/** 연보라 패널: 가운데 질문 + 화면 그림 + 알약 설명 반복 (Multi AI Workspace Key Screen) */
export function DeepDivePanel({ heading, items }: { heading: string; items: PanelItem[] }) {
  return (
    <div className="case-deep__panel">
      <h3 className="case-deep__panel-heading">{heading}</h3>
      {items.map(({ figure, pill, caption }) => (
        <div key={pill.label} className="case-deep__panel-item">
          <img
            className="case-deep__panel-figure"
            src={figure.src}
            width={figure.width}
            height={figure.height}
            alt={figure.alt}
            loading="lazy"
          />
          <p
            className={`case-deep__panel-caption${pill.x !== undefined ? " has-x" : ""}`}
            style={pill.x !== undefined ? ({ "--cap-x": pill.x } as CSSProperties) : undefined}
          >
            <span className="case-deep__panel-pill" style={{ "--w": pill.width } as CSSProperties}>
              {pill.label}
            </span>
            <span>{caption}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

/** 수치 + 아래 패턴 카드 줄 (Multi AI Workspace Key Screen 3) */
export function DeepDivePatterns({
  stat,
  cards,
}: {
  stat: ReactNode;
  cards: { title: string; desc: string }[];
}) {
  return (
    <div className="case-deep__result">
      {stat}
      <ul className="case-deep__patterns">
        {cards.map(({ title, desc }) => (
          <li key={title} className="case-deep__pattern">
            <h3 className="case-deep__pattern-title">{title}</h3>
            <p className="case-deep__pattern-desc">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
