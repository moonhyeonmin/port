import { CaseHero } from "~/components/case-study/CaseHero";
import { CaseOverview } from "~/components/case-study/CaseOverview";
import { CaseQuestionSteps } from "~/components/case-study/CaseQuestionSteps";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import type { CaseStudyProps } from "./index";

/** 상단 내비게이션 항목 (섹션 id와 연결) */
export const avieraNav: CaseNavItem[] = [
  { id: "project", label: "Project" },
  { id: "why-how", label: "Why & How" },
];

// Figma: 2wduPMxRCf5SwSUCNYqvbl / "framer 이전용" > fireside_* (데이터 기반 사내 메신저 개선)
// 사용자가 내보낸 SVG(글자 포함)·PNG 4x에서 수치와 문구를 옮김
export default function AvieraCaseStudy({ index }: CaseStudyProps) {
  return (
    <>
      {/* fireside_01_Hero: 멀티 AI 워크스페이스 Hero와 같은 템플릿, 청록 별·강조색 #2BC8D9 */}
      <CaseHero
        id="project"
        index={index}
        label="Workplace Messenger"
        icon="/icons/star-cyan.svg"
        pointColor="#2BC8D9"
        bottom={248}
        title={["데이터 기반 사내 메신저 개선"]}
        description={["5년째 유지보수만 되던 사내 메신저를,", "개선점 발견부터 실제 개선 제안까지 이어갔습니다."]}
        tags={[
          { label: "데이터 기반 기획", box: 190.491, pill: 190.491 },
          { label: "UX 개선 제안", box: 165.491, pill: 165.491 },
          { label: "외부 도구 연동", box: 173.491, pill: 173.491 },
        ]}
        cover={{
          src: "/projects/aviera/cover.webp",
          width: 1564,
          height: 1005,
          alt: "사내 메신저 Fireside 데스크톱 화면: 런칭TF 채팅방과 스레드 답글, 그 위에 즐겨찾기 동료의 상태와 Outlook 일정 연동을 보여주는 창",
        }}
      />

      {/* fireside_02_Overview: 멀티 AI 워크스페이스 Overview와 같은 배치, 아래 여백 69 */}
      <CaseOverview
        bottom={69}
        items={[
          {
            title: "Role",
            // Figma 원문은 "사용자Desktop" (사용자 요청으로 띄어쓰기 추가)
            lines: ["사용자 Desktop/Mobile,", "관리자 설계 기획, 디자인, QA"],
            width: 389,
            gap: 37,
          },
          { title: "Period", lines: ["2025.08 - 2026.08"], width: 261, gap: 37 },
          { title: "Team", lines: ["기획 1 / FE 4 / 디자인 1 / BE 8"], width: 358, gap: 12 },
          { title: "Contribution", lines: ["제안 완료", "기획 제안 검토 중"], width: 184, gap: 12 },
        ]}
      />

      {/* fireside_03 (파일 이름은 Summary, 내용은 Why & How): 핵심 질문 카드 + 번호 단계 */}
      <CaseQuestionSteps
        id="why-how"
        eyebrow="Why & How"
        icon="/icons/star-cyan.svg"
        pointColor="#2BC8D9"
        title={["개선점 발견부터 시작해야 해 막막했지만,", "근거있는 개선을 위해 데이터를 찾았습니다."]}
        question={{
          label: "Key Question",
          paragraphs: [
            ["사내 메신저는 보안 측면에서 강점을", "가지고 있습니다."],
            ["하지만 그 강점만으로는 고객을", "유지할 수 없었습니다."],
          ],
        }}
        steps={[
          { title: "로그 전수 분석", description: "Spring Boot Observability 기반 6개월 API 요청 로그" },
          { title: "경쟁사 벤치마킹", description: "Slack, 네이버웍스, 카카오워크, 다우오피스 등 분석" },
          { title: "우선순위 도출", description: "사용 편중, 저활용 신호, 포지셔닝 격차 기준" },
          { title: "KPI 설계", description: "Now, Next, Later 3단계 화면 제안으로 구체화" },
        ]}
      />
    </>
  );
}
