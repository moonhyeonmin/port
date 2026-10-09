import { CaseDeepDive, DeepDivePanel } from "~/components/case-study/CaseDeepDive";
import { CaseGlassCards } from "~/components/case-study/CaseGlassCards";
import { CaseHero } from "~/components/case-study/CaseHero";
import { CaseOverview } from "~/components/case-study/CaseOverview";
import { CaseSummary } from "~/components/case-study/CaseSummary";
import { CaseWhyGrid } from "~/components/case-study/CaseWhyGrid";
import { CountUp } from "~/components/CountUp";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import type { CaseStudyProps } from "./index";

/** 상단 내비게이션 항목 (섹션 id와 연결) */
export const lumixNav: CaseNavItem[] = [
  { id: "project", label: "Project" },
  { id: "summary", label: "Summary" },
  { id: "why", label: "Why" },
  { id: "key-screens", label: "Key Screens", also: ["key-screen-2"] },
];

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

      {/* Multi AI Workspace_02_Overview (163:158647): Ellm Overview와 같은 템플릿 */}
      <CaseOverview
        bottom={69}
        items={[
          {
            title: "Role",
            lines: ["서비스 기획, 사용자 및 관리자", "화면 설계, 랜딩 페이지 제작"],
            width: 389,
            gap: 37,
          },
          { title: "Period", lines: ["2026.06 - 2026.10"], width: 261, gap: 37 },
          { title: "Team", lines: ["기획 1 / FE 2 / 디자인 2 / BE 6"], width: 358, gap: 12 },
          { title: "Contribution", lines: ["기획 70%", "디자인 80%"], width: 184, gap: 12 },
        ]}
      />

      {/* Multi AI Workspace_03_Summary (163:158592) */}
      <CaseSummary
        id="summary"
        icon="/icons/star-gradient.svg"
        pointColor="#5476FE"
        top={128}
        bottom={128}
        rowAlign="center"
        title={["흩어진 AI 사용을,", "통제 가능한 하나의 워크스페이스로"]}
        rows={[
          {
            label: "Problem",
            text: [
              "여러 생성형 AI를 제각각 쓰는 환경에서 사용자는 탭을 오가며 비교했고, 관리자는 무엇을 보내는지 알 수 ",
              "없었습니다.",
            ],
          },
          {
            label: "Solution",
            text: [
              "비교 피로를 줄이는 멀티챗 레이아웃, 위험도별 3단계 보안 UX, Ellm 대시보드에서 정리한 관리자 패턴으",
              "로 설계했습니다.",
            ],
          },
          {
            label: "Impact",
            text: [
              "사용자 앱, 관리자 콘솔, 랜딩이 하나의 시각 언어를 공유하고, 신규 관리자 화면 설계 시간을 줄였습니다.",
            ],
          },
        ]}
        cards={[
          {
            value: (
              <>
                <CountUp to={3} />단계
              </>
            ),
            detail: ["위험도별", "보안 UI 개입 강도"],
            accent: true,
            shadow: true,
            // Figma 이미지 채우기 위치 그대로 (이미지 705.3×397 / 카드 362×282, 오프셋 -284.6, -115)
            bg: "url(/projects/lumix/summary-card-bg.jpg) 82.9% 100% / 194.84% 140.77% no-repeat",
          },
          {
            value: (
              <>
                <CountUp to={4} />개
              </>
            ),
            detail: ["관리자 화면 재사용 패턴"],
            bg: "url(/projects/lumix/summary-card-grad-a.svg) 0 0 / 100% 100% no-repeat",
          },
          {
            value: (
              <>
                <CountUp to={48} />%↓
              </>
            ),
            detail: ["신규 관리자 화면", "설계 시간 단축"],
            bg: "url(/projects/lumix/summary-card-grad-a.svg) 0 0 / 100% 100% no-repeat",
          },
          {
            textLines: ["사용자 앱, 관리자", "콘솔, 랜딩 페이지"],
            detail: [],
            bg: "url(/projects/lumix/summary-card-grad-b.svg) 0 0 / 100% 100% no-repeat",
          },
        ]}
      />

      {/* Multi AI Workspace_04_Why (163:158663) */}
      <CaseWhyGrid
        id="why"
        eyebrow="Why"
        icon="/icons/star-gradient.svg"
        pointColor="#5476FE"
        background="/projects/lumix/why-bg.jpg"
        title={["Ellm에서 배운 신뢰 문제를", "이번에는 처음부터 설계했습니다."]}
        lead={{
          lines: ["착수 전에 도메인별", "신뢰 요구 수준부터", "정의 합니다."],
          quote: ["“직원들이 여러 AI를 제각각 쓰는데", "무슨 데이터가 나가는지 모르겠다”"],
        }}
        rows={[
          { label: "AI 파편화", desc: ["탭을 오가며 같은 질문 복붙,", "비교는 기억에 의존"] },
          { label: "정보 유출 불안", desc: ["민감정보가 외부 AI로", "그대로 전송, Shadow AI"] },
          {
            label: "관리 사각지대",
            labelColor: "#141414",
            desc: ["누가 어떤 AI를 얼마나", "사용하는지 불투명"],
          },
        ]}
      />

      {/* Multi AI Workspace_05 프로젝트 탐색 (163:159138): Key Screen 1 */}
      <CaseDeepDive
        id="key-screens"
        eyebrow="Key Screen 1"
        icon="/icons/star-gradient.svg"
        pointColor="#5476FE"
        title="Multi Chat"
        titleIcon={{ src: "/icons/diamond-stack.svg", width: 96, height: 58, gap: 31.3 }}
        subtitle="  비교의 피로를 레이아웃으로 줄였습니다."
        keepSubtitleSpaces
        bottom={267}
      >
        <DeepDivePanel
          heading="같은 질문, 서로 다른 읽기 목적 - 결론만 보는 사용자와 원문을 비교하는 사용자"
          items={[
            {
              figure: {
                src: "/projects/lumix/multichat-1.jpg",
                width: 1000,
                height: 711,
                alt: "간략히 보기: 모델별 답변은 접혀 있고 종합 답변이 본문에 표시된 Multi Chat Workspace 화면",
              },
              pill: { label: "간략히 보기", width: 199, x: 677.5 },
              caption: "모델 답은 접고 종합 답변은 본문으로 확인합니다.",
            },
            {
              figure: {
                src: "/projects/lumix/multichat-2.jpg",
                width: 1000,
                height: 711,
                alt: "전체 답변 보기: Ellm, Gemini, Claude 답변을 칼럼으로 나란히 펼쳐 비교하는 화면",
              },
              pill: { label: "전체 답변 보기", width: 230, x: 711 },
              caption: "칼럼으로 펼쳐 표현과 근거를 직접 비교합니다.",
            },
          ]}
        />
      </CaseDeepDive>

      {/* Multi AI Workspace_06. security ux (163:158996): Key Screen 2 */}
      <CaseGlassCards
        id="key-screen-2"
        eyebrow="Key Screen 2"
        icon="/icons/star-gradient.svg"
        pointColor="#5476FE"
        title="디자인 포인트 3가지"
        titleIcon={{ src: "/icons/dots-grid-white.svg", width: 60, height: 60, gap: 24 }}
        cards={[
          {
            image: {
              src: "/projects/lumix/security-1.jpg",
              width: 499,
              height: 377,
              alt: "첫 화면 입력창 아래 보안 안내 문구가 고정된 화면",
            },
            level: "LEVEL 1 - 상시",
            levelColor: "#AFAFAF",
            title: "보안 안내",
            desc: "입력창 하단 고정 문구, 개입 없이 안심 제공",
          },
          {
            image: {
              src: "/projects/lumix/security-2.jpg",
              width: 499,
              height: 377,
              alt: "Gemini 패널에 Private 모드가 켜져 '이 대화는 학습에 사용되지 않습니다'가 표시된 화면",
            },
            level: "LEVEL 2 - 선택",
            levelColor: "#8CA3FF",
            title: "Private 모드",
            desc: "패널 별로 켜는 비학습 모드, 학습 비사용 패턴",
          },
          {
            image: {
              src: "/projects/lumix/security-3.jpg",
              width: 499,
              height: 377,
              alt: "주민등록번호 전송이 차단되고 프롬프트의 민감정보가 마스킹 처리된 DLP 경고 화면",
            },
            level: "LEVEL 3 - 차단",
            levelColor: "#F77E6E",
            title: "DLP 탐지 - 차단",
            desc: "민감정보 감지 시 마스킹하고 이유를 명시",
          },
        ]}
      />
    </>
  );
}
