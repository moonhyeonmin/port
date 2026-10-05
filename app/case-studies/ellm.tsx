import { CaseHero } from "~/components/case-study/CaseHero";
import { CaseOverview } from "~/components/case-study/CaseOverview";
import { CaseSummary } from "~/components/case-study/CaseSummary";
import type { CaseStudyProps } from "./index";

// Figma: 2wduPMxRCf5SwSUCNYqvbl / "framer 이전용" (125:55403)
export default function EllmCaseStudy({ index }: CaseStudyProps) {
  return (
    <>
      {/* Ellm_01_Hero (126:55427) */}
      <CaseHero
        index={index}
        label="기업용 Private LLM"
        title={["보안 기업의 첫 LLM,", "UI로 신뢰를 증명하다"]}
        description={[
          "사명 변경과 함께 출시한 보안 기업 최초의 사내 sLLM- Ellm,",
          "참고할 선례가 없는 상태에서 사용자와 관리자 경험을 처음부터 설계했습니다.",
        ]}
        tags={[
          { label: "생성형 AI", box: 136, pill: 135.491 },
          { label: "관리자/사용자 화면 설계", box: 250, pill: 250.491 },
          { label: "기업용 sLLM", box: 166, pill: 166.491 },
        ]}
        cover={{
          src: "/projects/ellm/cover.png",
          width: 1564,
          height: 1005,
          alt: "Ellm 관리자 홈 대시보드와 DB 성능 카드, 추가 질문 입력창",
        }}
      />

      {/* Ellm_02_Overview 1 (126:62652) */}
      <CaseOverview
        items={[
          {
            title: "Role",
            lines: ["사용자, 관리자 화면 설계", "와이어프레임 제작, 디자인,디자인 QA"],
            width: 389,
            gap: 37,
          },
          { title: "Period", lines: ["2025.08 - 2026. 08"], width: 261, gap: 37 },
          {
            title: "Team",
            lines: ["기획 1 / FE 3 / 디자인 2 / BE 12", "클라이언트사"],
            width: 358,
            gap: 12,
          },
          {
            title: "Contribution",
            lines: ["기획 60%", "디자인 70%", "QA 70%"],
            width: 184,
            gap: 12,
          },
        ]}
      />

      {/* Ellm_03_Summary 1 (126:57665) */}
      <CaseSummary
        title="파일럿 데모 후, 6개 고객사 수주"
        rows={[
          {
            label: "Problem",
            text: (
              <>
                선례 없이 <strong>‘보안 데이터를 다루는 AI’</strong>를 믿고 쓰게 만들어야 했습니다.
              </>
            ),
          },
          {
            label: "Solution",
            text: (
              <>
                사용자 여정 4단계에서 막히는 지점을 찾아,{" "}
                <strong>입력 순서와 대기 경험을 다시 설계</strong>했습니다.
              </>
            ),
          },
          {
            label: "Impact",
            text: (
              <>
                속도, 이탈, 신뢰 지표가 모두 개선되며 <strong>신규 고객사 수주</strong>로
                이어졌습니다.
              </>
            ),
          },
        ]}
        cards={[
          { value: "6개사", detail: ["파일럿 데모 후", "신규 고개사 수주"], accent: true },
          { value: "68%↓", detail: ["답변 대기 중", "이탈률"] },
          { value: "42%↓", detail: ["문서 생성", "리드타임 (사내 QA)"] },
          {
            value: (
              <>
                4.2<small>/5.0</small>
              </>
            ),
            detail: ["베타 사용자 신뢰도", "(98명)"],
          },
        ]}
      />
    </>
  );
}
