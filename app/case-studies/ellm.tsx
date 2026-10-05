import {
  CaseDeepDive,
  DeepDiveCompare,
  DeepDivePriority,
  DeepDiveSpecCard,
  DeepDiveStat,
  DeepDiveTrials,
} from "~/components/case-study/CaseDeepDive";
import { CaseHero } from "~/components/case-study/CaseHero";
import { CaseJourney } from "~/components/case-study/CaseJourney";
import { CaseOverview } from "~/components/case-study/CaseOverview";
import { CaseRetro } from "~/components/case-study/CaseRetro";
import { CaseSummary } from "~/components/case-study/CaseSummary";
import { CaseWhyHow } from "~/components/case-study/CaseWhyHow";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import type { CaseStudyProps } from "./index";

/** 상단 내비게이션 항목 (섹션 id와 연결) */
export const ellmNav: CaseNavItem[] = [
  { id: "project", label: "Project" },
  { id: "summary", label: "Summary" },
  { id: "why-how", label: "Why & How" },
  { id: "user-journey", label: "User Journey" },
  {
    id: "deep-dive",
    label: "Deep Dive",
    also: ["deep-dive-docgen", "deep-dive-wait", "deep-dive-admin"],
  },
  { id: "retrospective", label: "Retrospective" },
];

// Figma: 2wduPMxRCf5SwSUCNYqvbl / "framer 이전용" (125:55403)
export default function EllmCaseStudy({ index, nextSlug }: CaseStudyProps) {
  return (
    <>
      {/* Ellm_01_Hero (126:55427) */}
      <CaseHero
        id="project"
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
        id="summary"
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
        id="why-how"
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
        id="user-journey"
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
        id="deep-dive"
        title="프로젝트 탐색"
        subtitle="반복되는 카드 리스트 →  테이블 + 검색, 필터"
      >
        <DeepDiveCompare
          label="AS IS"
          text={["프로젝트 카드가 같은 형태로 나열되어 있어, 원하는 프로젝트를 찾기 어려웠습니다."]}
          figure={{
            src: "/projects/ellm/explore-asis.png",
            width: 1564,
            height: 893,
            alt: "개선 전: 같은 형태의 문서 카드가 4열로 반복 나열된 목록 화면",
          }}
        />
        <DeepDiveCompare
          label="TO BE"
          text={[
            "테이블로 리스트를 구성하고, 검색 필터를 추가하며",
            "원하는 항목과 생성 버튼이 한눈에 보이도록 정보의 강약을 재설계했습니다.",
          ]}
          figure={{
            src: "/projects/ellm/explore-tobe.png",
            width: 1564,
            height: 893,
            alt: "개선 후: 상단 문서 생성 카드와 검색이 있는 문서 테이블 화면",
          }}
        />
      </CaseDeepDive>

      {/* Ellm_06_DeepDive02_문서 생성 (126:57131) */}
      <CaseDeepDive
        id="deep-dive-docgen"
        title="문서 생성"
        subtitle="입력 항목이 아닌 입력 ‘순서’를 재설계"
        tint="tint"
        gap={90}
      >
        <DeepDiveCompare
          label="AS IS"
          text={[
            "모든 항목을 한 화면에 늘어 놓자 무엇부터 채워야 하는지 알 수 없었고, 생성 시작 단계에서 사용자 이탈과 불만이 늘었습니다.",
          ]}
          figure={{
            src: "/projects/ellm/docgen-asis.png",
            width: 1564,
            height: 893,
            alt: "개선 전: 주제, 구성, 추가 지침, 논문 가져오기가 한 화면에 모두 놓인 문서 생성 화면",
          }}
        />
        <DeepDivePriority
          title="답변 정확도 기준으로 분류했습니다."
          rows={[
            { badge: "필수 1", required: true, items: "제목, 키워드", note: "답변 방향을 정합니다." },
            { badge: "필수 2", required: true, items: "기반 파일, URL", note: "답변 근거를 정합니다." },
            {
              badge: "선택",
              items: "분량, 추가 지침, 참고 논문",
              note: "필수 아닌 문항으로, 생성 후 조정 가능합니다.",
            },
          ]}
        />
        <DeepDiveCompare
          label="TO BE"
          lead={<DeepDiveStat value="42%" caption="문서 생성 리드타임 단축, 답변 품질 향상" />}
          text={[
            "3단계 Wizard 형태를 도입하여 필수가 아닌 항목은 뒤에서 건너뛸 수 있도록 구성했습니다.",
            "흩어져 있던 인력 과정을 구조화해 속도와 답변 품질을 함께 높혔습니다. (사내 QA 기준)",
          ]}
          figure={{
            src: "/projects/ellm/docgen-tobe.png",
            width: 1564,
            height: 893,
            alt: "개선 후: 문서 제목·키워드, 기반 파일 업로드, 추가 지침 3단계 Wizard 화면",
          }}
        />
      </CaseDeepDive>

      {/* Ellm_07_DeepDive03_답변 생성 대기 (126:56943) */}
      <CaseDeepDive
        id="deep-dive-wait"
        title="답변 생성 대기"
        subtitle="세번의 시도 끝에 기다림을 ‘진행 중인 작업’으로 변경"
        tint="glow"
        gap={80}
      >
        <DeepDiveTrials
          text="서버 쪽 생성 시간 단축은 어려웠고, 대기가 10초를 넘자 외부 이탈률이 55% 이상 증가했습니다."
          trials={[
            {
              step: "시도 ①",
              name: "Spinner",
              caption: "무엇이 진행되는지 알 수 없음",
              image: {
                src: "/projects/ellm/wait-spinner.png",
                width: 634,
                height: 448,
                alt: "목차 옆 본문 영역에 스피너와 '보고서 생성 중...'만 표시된 화면",
              },
            },
            {
              step: "시도 ②",
              name: "Skeleton",
              caption: "반복 구조로 결과 영역을 예측할 수 없음",
              image: {
                src: "/projects/ellm/wait-skeleton.png",
                width: 610,
                height: 436,
                alt: "'보고서 생성 중...' 아래 같은 모양의 스켈레톤 블록이 반복되는 화면",
              },
            },
          ]}
        />
        <DeepDiveCompare
          label="TO BE"
          labelNode={
            <>
              <span>시도 ③</span>
              <strong>생각하는 과정 표시</strong>
            </>
          }
          labelGap={116}
          lead={
            <DeepDiveStat
              value={
                <>
                  68%<span className="case-deep__stat-arrow">↓</span>
                </>
              }
              caption="답변 대기 중 이탈률 하락"
            />
          }
          text={[
            "AI의 처리 단계를 실시간으로 보여주며, 기다림이 ‘진행 중인 작업’으로 느껴지게 만들었습니다.",
            "AI 엔지니어와 주 2회 리뷰 회의로 로딩 단계를 새로 정의했습니다.",
          ]}
          figure={{
            src: "/projects/ellm/wait-tobe.png",
            width: 1564,
            height: 893,
            alt: "개선 후: 답변 위에 '답변을 생각하고 있습니다' 진행 단계가 표시되는 Ellm 채팅 화면",
          }}
        />
      </CaseDeepDive>

      {/* Ellm_08_관리자 페이지 (126:56374) */}
      <CaseDeepDive
        id="deep-dive-admin"
        title="관리자 대시보드 페이지"
        subtitle="38개의 지표 → 유형별로 3개의 그래프 타입으로 정의"
        tint="tint"
        tintHeight={363}
      >
        <DeepDiveCompare
          label="AS IS"
          text={["5줄의 개발 사양서와 정리되지 않은 38개의 지표들이 존재했습니다."]}
          figure={{
            src: "/projects/ellm/admin-asis.png",
            width: 1564.5,
            height: 441,
            alt: "개선 전: 정리되지 않은 vllm 지표 이름이 길게 나열된 목록",
          }}
          overlay={
            <DeepDiveSpecCard
              title="[개발 사양서]"
              subtitle="(UI) 모니터링 메뉴 조회 데이터"
              lines={[
                "CPU 사용률/ Memory 사용량/ Disk 사용량",
                "GPU 사용량 , GPU 사용률, 사용 가능한 프레임 버퍼 메모리 양 (MiB), 사용 중인 프레임 버퍼 메모리 양 (MiB)",
                "DB 커넥션, 트랙잭션, 쿼리 성능, Lock 상태, WAL 관련",
                "모델건전성",
              ]}
            />
          }
        />
        <DeepDiveCompare
          label="TO BE"
          text={["지표를 그래프 유형별로 묶고, 중요도 ・위험도・시선 흐름 순으로 배치했습니다."]}
          figure={{
            src: "/projects/ellm/admin-tobe.png",
            width: 1564.5,
            height: 1217,
            alt: "개선 후: Gauge·Histogram·Counter 세 유형으로 묶은 지표와 모니터링 대시보드 화면",
          }}
        />
      </CaseDeepDive>

      {/* Ellm_09_회고 및 정리 (126:56881) */}
      <CaseRetro
        id="retrospective"
        title="결과 및 회고"
        stats={[
          { value: "6개사", caption: ["파일럿 데모 후", "신규 고객사 수주"] },
          { value: "42%", caption: ["Wizard 적용 후 문서 생성", "리드타임 단축"] },
          {
            value: (
              <>
                4.2<small>/5.0</small>
              </>
            ),
            caption: ["AI 응답 시각화 후", "베타 신뢰도 (98명 대상)"],
          },
          { value: "90%", caption: ["영업 데모 시", "고객 반응 성공률"] },
        ]}
        retro={{
          label: "회고",
          lines: [
            "대화형 UI를 과신했다가, 보안 도메인의 ‘검증 가능성’ 요구를 뒤늦게 깨달았습니다.",
            "다음 제품에서는 착수 전에 신뢰 요구 수준부터 정의하기로 했습니다.",
            "",
          ],
          highlight: "→ 이 다짐이 다음 프로젝트인 멀티 AI 워크스페이스 신제품의 출발점이 됩니다.",
        }}
        next={{ to: `/case-studies/${nextSlug}`, title: "멀티 AI 워크스페이스 신제품 설계" }}
      />
    </>
  );
}
