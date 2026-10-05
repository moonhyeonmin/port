import type { ReactNode } from "react";

/** 섹션 상단 라벨: 파란 별 아이콘 + 텍스트. 강조 부분은 .case-eyebrow__point */
export function CaseEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="case-eyebrow">
      <span className="case-eyebrow__icon" aria-hidden>
        <img src="/icons/star.svg" alt="" width={29.682} height={29.669} />
      </span>
      <span>{children}</span>
    </p>
  );
}
