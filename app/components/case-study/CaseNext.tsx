import type { CSSProperties } from "react";
import { Link } from "react-router";

/** 페이지 하단 Next Project 링크. top: 위 여백 (디자인 px, 기본 95) */
export function CaseNext({ to, title, top }: { to: string; title: string; top?: number }) {
  return (
    <Link
      to={to}
      className="case-sec case-retro__next"
      style={top !== undefined ? ({ "--next-top": top } as CSSProperties) : undefined}
    >
      <span className="case-retro__next-text">
        <span className="case-retro__next-label">Next Project</span>
        <span className="case-retro__next-title">{title}</span>
      </span>
      <span className="case-retro__next-arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}
