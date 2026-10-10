import { CaseHero } from "~/components/case-study/CaseHero";
import { CaseOverview } from "~/components/case-study/CaseOverview";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import type { CaseStudyProps } from "./index";

/** 상단 내비게이션 항목 (섹션 id와 연결) */
export const designSystemNav: CaseNavItem[] = [{ id: "project", label: "Project" }];

// Figma: 2wduPMxRCf5SwSUCNYqvbl / "framer 이전용" > Design system_*
// 사용자가 내보낸 SVG(글자 포함)·PNG 4x에서 수치와 문구를 옮김. 페이지 전체가 어두운 바탕(#0E0E0E)
export default function DesignSystemCaseStudy({ index }: CaseStudyProps) {
  return (
    <>
      {/* Design system_01_Hero: Ellm Hero와 같은 템플릿, 주황 그라디언트 별·강조 글자, 어두운 바탕 */}
      <CaseHero
        id="project"
        index={index}
        label="Design System"
        icon="/icons/star-orange.svg"
        pointGradient="linear-gradient(90deg, #FA5730, #FCA25F)"
        bottom={156}
        title={["다크모드, RTL 다국어", "디자인 시스템 구축"]}
        description={[
          "관제 시스템 DSPM에서 시작된 다크모드 요구를 전 제품 공통 시스템으로 확장하고, 컬러 검증 도구까지 제작한 프로젝트",
        ]}
        tags={[
          { label: "Design System", box: 198.491, pill: 198.491 },
          { label: "Figma Variable", box: 196.491, pill: 196.491 },
          { label: "AI 검수 툴 제작", box: 179.491, pill: 179.491 },
        ]}
        cover={{
          src: "/projects/design-system/cover.webp",
          width: 1564,
          height: 1173,
          alt: "라이트·다크 모드를 나란히 보여주는 관제 화면, 아랍어 RTL 화면, 라이트/다크 컬러 토큰 표, 다크 모드 Primitives 컬러 시스템",
        }}
      />

      {/* Design system_02_Overview: 멀티 AI 워크스페이스 Overview와 같은 배치, 아래 여백 69 */}
      <CaseOverview
        bottom={69}
        items={[
          {
            title: "Role",
            lines: ["컬러 시스템, Variable 설계", "플러그인 제작, 마크다운 문서화"],
            width: 389,
            gap: 37,
          },
          { title: "Period", lines: ["2026.01 - 2026.10"], width: 261, gap: 37 },
          { title: "Team", lines: ["전 제품 Web, Mobile", "공통 다크모드, RTL"], width: 358, gap: 12 },
          { title: "Contribution", lines: ["디자이너 6명", "협업"], width: 184, gap: 12 },
        ]}
      />
    </>
  );
}
