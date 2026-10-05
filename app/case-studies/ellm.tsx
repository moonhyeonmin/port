import { CaseDeepDive } from "~/components/case-study/CaseDeepDive";
import { CaseHero } from "~/components/case-study/CaseHero";
import { CaseJourney } from "~/components/case-study/CaseJourney";
import { CaseOverview } from "~/components/case-study/CaseOverview";
import { CaseSummary } from "~/components/case-study/CaseSummary";
import { CaseWhyHow } from "~/components/case-study/CaseWhyHow";
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

      {/* Ellm_04_ why and how (126:56068) */}
      <CaseWhyHow
        title="선례도, 신뢰도 없이 시작했습니다"
        bullets={[
          "사명 변경과 함께 출시한 보안 기업 최초의 사내 sLLM",
          "관리자, 사용자 화면 모두 벤치마킹할 선례 부족",
          "‘보안 데이터를 다루는 AI’가 핵심 과제",
        ]}
        stats={[
          { value: "4차례", label: "사용자 리서치" },
          { value: "3회", label: "프로토타입 검증" },
          { value: "3→1", label: "depth 단순화" },
        ]}
        figure={{
          src: "/projects/ellm/ia-diagram.png",
          width: 1564,
          height: 1005,
          alt: "Ellm IA Diagram: 채팅(K-Master + Librarian)과 보고서 생성(Scribe)의 화면 구조도",
        }}
      />

      {/* Ellm_05_UserJourney 1 (126:57609) */}
      <CaseJourney
        title={["문제는 4개였지만,", "전부 연결되어 있었습니다."]}
        description="사용자가 문서를 만들고 관리자가 운영하는 흐름을 따라, 단계마다 막히는 지점을 찾았습니다."
        steps={[
          {
            step: "프로젝트 탐색",
            pain: ["반복 카드 리스트로 원하는", "항목, 생성 버튼을 찾기 어려움"],
            fix: { action: "테이블 + 검색, 필터", result: "정보 강약 재설계" },
          },
          {
            step: "문서 생성",
            pain: ["우선 순위 없는 입력 폼", "고객사 불만 요청 증가"],
            fix: { action: "Wizard로 필수 데이터 분리", result: "리드 타임 42%↓" },
          },
          {
            step: "답변 생성 대기",
            pain: ["10초 넘는 대기", "외부 이탈률 54% 증가"],
            fix: { action: "생각하는 과정 표시", result: "이탈률 63%↓" },
          },
          {
            step: "관리자 페이지",
            pain: ["5줄 사양서, 38개의 그래프", "우선순위 기준 없음"],
            fix: { action: "지표 유형별 그룹화", result: "3개 그룹으로 정리" },
          },
        ]}
        background={{ src: "/projects/ellm/journey-bg.jpg", width: 2160, height: 1244 }}
      />

      {/* Ellm_06_DeepDive01_프로젝트 탐색 (126:56301) */}
      <CaseDeepDive
        title="프로젝트 탐색"
        subtitle="반복되는 카드 리스트 →  테이블 + 검색, 필터"
        blocks={[
          {
            label: "AS IS",
            text: ["프로젝트 카드가 같은 형태로 나열되어 있어, 원하는 프로젝트를 찾기 어려웠습니다."],
            figure: {
              src: "/projects/ellm/explore-asis.png",
              width: 1564,
              height: 893,
              alt: "개선 전: 같은 형태의 문서 카드가 4열로 반복 나열된 목록 화면",
            },
          },
          {
            label: "TO BE",
            text: [
              "테이블로 리스트를 구성하고, 검색 필터를 추가하며",
              "원하는 항목과 생성 버튼이 한눈에 보이도록 정보의 강약을 재설계했습니다.",
            ],
            figure: {
              src: "/projects/ellm/explore-tobe.png",
              width: 1564,
              height: 893,
              alt: "개선 후: 상단 문서 생성 카드와 검색이 있는 문서 테이블 화면",
            },
          },
        ]}
      />
    </>
  );
}
