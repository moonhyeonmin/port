import { CaseHero } from "~/components/case-study/CaseHero";
import { CaseOverview } from "~/components/case-study/CaseOverview";
import {
  CaseProblemSolution,
  PsCallout,
  PsFigure,
  PsLayers,
  PsProblemCard,
  PsSwatchCompare,
} from "~/components/case-study/CaseProblemSolution";
import { CaseSummary } from "~/components/case-study/CaseSummary";
import { CountUp } from "~/components/CountUp";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import type { CaseStudyProps } from "./index";

/** 상단 내비게이션 항목 (섹션 id와 연결) */
export const designSystemNav: CaseNavItem[] = [
  { id: "project", label: "Project" },
  { id: "summary", label: "Summary" },
  { id: "problem-solution", label: "Problem & Solution" },
];

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

      {/* Design system_03_Summary: 멀티 AI 워크스페이스 Summary와 같은 배치, 어두운 카드 */}
      <CaseSummary
        id="summary"
        icon="/icons/star-orange.svg"
        pointColor="#FA5730"
        pointGradient="linear-gradient(90deg, #FA5730, #FCA25F)"
        top={128}
        bottom={108}
        rowGap={26}
        headingGap={28}
        rowAlign="center"
        title={["반복되는 문제는 규칙으로,", "규칙이 지켜지지 않으면 도구로"]}
        rows={[
          {
            label: "Problem",
            text: [
              "다크모드를 전 제품에 적용하려고 하자 브랜드 색과 상태 색이 같은 원색을 참조해 충돌했고, 다크모드 ",
              "배경 위 대비는 눈으로 판단할 수 없어 수정이 반복됐습니다.",
            ],
          },
          {
            label: "Solution",
            text: [
              "Primitive, Brand, Semantic 3단 Variable 구조로 브랜드와 테마를 분리하고, ",
              "파수 제품용 WCAG AA 대비 검사 Figma Plugin을 직접 만들어 검증했습니다.",
            ],
          },
          {
            label: "Impact",
            text: [
              "아랍어 RTL까지 확장해 마크다운용 문서로 남기고, 컬러 대비 검수 시간과 개발 후 오류를 줄였습니다.",
            ],
          },
        ]}
        cards={[
          {
            value: (
              <>
                <CountUp to={16} />개 제품
              </>
            ),
            detail: ["공통 다크모드 적용"],
            accent: true,
            shadow: true,
            // Figma 이미지 채우기 그대로 (이미지 너비 = 카드의 119.73%, 높이 100%, 가운데)
            bg: "url(/projects/design-system/summary-card-bg.webp) 50% 0 / 119.73% 100% no-repeat",
          },
          {
            value: (
              <>
                <CountUp to={100} />%
              </>
            ),
            detail: ["Semantic 컬러 토큰", "AA 통과"],
          },
          {
            value: (
              <>
                -<CountUp to={70} />%
              </>
            ),
            // Figma 원문은 "Lignt" (사용자 요청으로 Light로 수정)
            detail: ["Light 모드 대비", "검수 시간"],
          },
          {
            value: (
              <>
                <CountUp to={48} />%↓
              </>
            ),
            detail: ["개발 후", "색상 대비 오류"],
          },
        ]}
      />

      {/* Design system_04_Why: Problem & Solution 1 (브랜드·테마 분리) */}
      <CaseProblemSolution
        id="problem-solution"
        eyebrow="Problem & Solution 1"
        icon="/icons/star-orange.svg"
        pointGradient="linear-gradient(90deg, #FA5730, #FCA25F)"
        title={["브랜드가 다른 제품들이 같은 토큰에서", "충돌했고, 브랜드와 테마를 분리해 풀었습니다."]}
        decor="/projects/design-system/why-decor.webp"
      >
        <PsProblemCard
          label="Problem - 같은 토큰, 다른 의미"
          quote={["착수 전에 도메인별", "신뢰 요구 수준부터", "정의하겠다."]}
          figure={
            <PsSwatchCompare
              columns={[
                {
                  label: "그린 제품",
                  swatches: [{ color: "#05C072" }, { color: "#05C072", flag: "구분 불가" }, { color: "#3182F6" }],
                },
                {
                  label: "블루 제품",
                  swatches: [{ color: "#3182F6" }, { color: "#05C072" }, { color: "#3182F6", flag: "구분 불가" }],
                },
              ]}
            />
          }
          description={[
            "브랜드 색과 상태색이 같은 원색을 직접 참조해, 제품이 바뀌면 “성공\"과 “브랜드\"가 겹쳤습니다.",
            "다크모드까지 더해지며 조합은 제품, 테마만큼 늘었습니다.",
          ]}
        />
        <PsLayers
          label="Solution - Variable 3단 구조"
          layers={[
            { title: "Primitive", description: "원색 팔레트, 직접 사용 금지" },
            { title: "Brand (Green / Blue)", description: "제품이 바뀌면 이 층만 교체", active: true },
            { title: "Semantic (Light / Dark)", description: "역할 기준, 상태 색은 브랜드와 분리" },
          ]}
          figure={{
            src: "/projects/design-system/why-tokens.webp",
            width: 678,
            height: 470,
            alt: "그린 브랜드 컬러 토큰의 라이트/다크 값 표: light/green/20~80과 dark/green/20~80",
          }}
        />
        <PsCallout>→ 하나의 컴포넌트가 제품 X 테마 4가지 조합에서 규칙대로 전환</PsCallout>
        <PsFigure
          src="/projects/design-system/why-screen.webp"
          width={1564}
          height={996}
          alt="Fasoo DSPM 설정 화면을 왼쪽은 다크 모드, 오른쪽은 라이트 모드로 나눠 보여주는 화면"
        />
      </CaseProblemSolution>
    </>
  );
}
