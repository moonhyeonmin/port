import { CaseHero } from "~/components/case-study/CaseHero";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import type { CaseStudyProps } from "./index";

/** 상단 내비게이션 항목 (섹션 id와 연결) */
export const avieraNav: CaseNavItem[] = [{ id: "project", label: "Project" }];

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
    </>
  );
}
