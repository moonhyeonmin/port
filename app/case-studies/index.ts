import type { ComponentType } from "react";
import EllmCaseStudy from "./ellm";

export interface CaseStudyProps {
  /** "Project N"의 N (1부터 시작) */
  index: number;
}

/** Figma 디자인이 있는 프로젝트의 상세 콘텐츠. 없는 slug는 기본 플레이스홀더를 사용합니다. */
export const caseStudies: Record<string, ComponentType<CaseStudyProps>> = {
  ellm: EllmCaseStudy,
};
