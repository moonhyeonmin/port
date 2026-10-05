import { CaseHero } from "~/components/case-study/CaseHero";
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
        tags={["생성형 AI", "관리자/사용자 화면 설계", "기업용 sLLM"]}
        cover={{
          src: "/projects/ellm/cover.png",
          width: 1564,
          height: 1005,
          alt: "Ellm 관리자 홈 대시보드와 DB 성능 카드, 추가 질문 입력창",
        }}
      />
    </>
  );
}
