import type { ComponentType } from "react";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import DesignSystemCaseStudy, { designSystemNav } from "./design-system";
import EllmCaseStudy, { ellmNav } from "./ellm";
import LumixCaseStudy, { lumixNav } from "./lumix";

export interface CaseStudyProps {
  /** "Project N"의 N (1부터 시작) */
  index: number;
  /** 다음 프로젝트 slug (Next Project 링크) */
  nextSlug: string;
}

export interface CaseStudyEntry {
  Content: ComponentType<CaseStudyProps>;
  /** 상단 섹션 내비게이션. 이 페이지에서는 기본 탭 내비게이션 대신 표시 */
  nav: CaseNavItem[];
  /** 페이지 바탕 (기본 흰색). dark면 어두운 바탕에 흰 글자 */
  theme?: "dark";
}

/** Figma 디자인이 있는 프로젝트의 상세 콘텐츠. 없는 slug는 기본 플레이스홀더를 사용합니다. */
export const caseStudies: Record<string, CaseStudyEntry> = {
  ellm: { Content: EllmCaseStudy, nav: ellmNav },
  lumix: { Content: LumixCaseStudy, nav: lumixNav },
  "design-system": { Content: DesignSystemCaseStudy, nav: designSystemNav, theme: "dark" },
};

export const getCaseStudy = (slug: string | undefined) =>
  slug ? caseStudies[slug] : undefined;
