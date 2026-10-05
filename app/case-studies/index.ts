import type { ComponentType } from "react";
import type { CaseNavItem } from "~/components/case-study/CaseNav";
import EllmCaseStudy, { ellmNav } from "./ellm";

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
}

/** Figma 디자인이 있는 프로젝트의 상세 콘텐츠. 없는 slug는 기본 플레이스홀더를 사용합니다. */
export const caseStudies: Record<string, CaseStudyEntry> = {
  ellm: { Content: EllmCaseStudy, nav: ellmNav },
};

export const getCaseStudy = (slug: string | undefined) =>
  slug ? caseStudies[slug] : undefined;
