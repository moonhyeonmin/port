import type { ReactNode } from "react";

/**
 * 섹션 상단 라벨: 파란 별 아이콘 + 텍스트. 강조 부분은 .case-eyebrow__point.
 * light는 어두운 배경용 흰색. icon은 이미 회전이 적용된 40×40 아이콘(예: 그라디언트 별)
 */
export function CaseEyebrow({
  children,
  light,
  icon,
}: {
  children: ReactNode;
  light?: boolean;
  icon?: string;
}) {
  return (
    <p className={`case-eyebrow${light ? " is-light" : ""}`}>
      <span className={`case-eyebrow__icon${icon ? " is-custom" : ""}`} aria-hidden>
        {icon ? (
          <img src={icon} alt="" width={40} height={40} />
        ) : (
          <img
            src={light ? "/icons/star-white.svg" : "/icons/star.svg"}
            alt=""
            width={29.682}
            height={29.669}
          />
        )}
      </span>
      <span>{children}</span>
    </p>
  );
}
