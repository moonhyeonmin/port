import { CaseHero } from "~/components/case-study/CaseHero";
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
    </>
  );
}
