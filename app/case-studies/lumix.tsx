import { CaseHero } from "~/components/case-study/CaseHero";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import type { CaseStudyProps } from "./index";

/** 상단 내비게이션 항목 (섹션 id와 연결) */
export const lumixNav: CaseNavItem[] = [{ id: "project", label: "Project" }];

// Figma: 2wduPMxRCf5SwSUCNYqvbl / "framer 이전용" > Multi AI Workspace_*
// MCP·REST 한도로 사용자가 내보낸 SVG(글자 윤곽선)·PNG 2x에서 수치와 문구를 옮김
export default function LumixCaseStudy({ index }: CaseStudyProps) {
  return (
    <>
      {/* Multi AI Workspace_01_Hero (163:158413): Ellm Hero와 같은 템플릿 */}
      <CaseHero
        id="project"
        index={index}
        label="Multi AI Workspace"
        icon="/icons/star-gradient.svg"
        pointColor="#5476FE"
        bottom={122}
        title={["여러 개의 AI를,", "하나의 안전한 경험으로"]}
        description={[
          "Ellm 다음으로 맡은 신제품, 사내 멀티 AI 워크스페이스",
          "여러 생성형 AI를 한 화면에서 비교 및 활용하고, 사용자, 앱, 관리자 콘솔, 랜딩 페이지까지 하나의 흐름으로 설계했습니다.",
        ]}
        tags={[
          { label: "Multi-AI", box: 136, pill: 133.491 },
          { label: "Unified Workspace", box: 250, pill: 235.491 },
          { label: "AI Collaboration", box: 208.491, pill: 208.491 },
        ]}
        cover={{
          src: "/projects/lumix/cover.jpg",
          width: 1564,
          height: 1005,
          alt: "Multi Chat Workspace 화면: ChatGPT 4o, Claude 3.5 Sonnet, Gemini 1.5 Pro 답변을 나란히 비교하는 화면과 답변 요약 카드",
        }}
      />
    </>
  );
}
