import type { ReactNode } from "react";

/** 섹션 상단 라벨: 파란 별 아이콘 + 텍스트. 강조 부분은 .case-eyebrow__point. light는 어두운 배경용 흰색 */
export function CaseEyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`case-eyebrow${light ? " is-light" : ""}`}>
      <span className="case-eyebrow__icon" aria-hidden>
        <img
          src={light ? "/icons/star-white.svg" : "/icons/star.svg"}
          alt=""
          width={29.682}
          height={29.669}
        />
      </span>
      <span>{children}</span>
    </p>
  );
}
