export type Tone = "violet" | "lime" | "sky" | "gray";

export interface Project {
  slug: string;
  title: string;
  company: string;
  year: number;
  summary: string;
  tone: Tone;
  /** 4:3 썸네일. public/ 기준 경로 (예: "/projects/ellm.mp4") */
  thumbnail?: string;
}

export const projects: Project[] = [
  {
    slug: "ellm",
    title: "Ellm 기업용 Private LLM",
    company: "Fasoo",
    year: 2026,
    summary:
      "보안 기업 최초의 사내 sLLM, 참고할 선례 없이 사용자와 관리자 경험을 처음부터 설계했습니다.",
    tone: "violet",
    // Figma "framer 이전용" > Ellm_cover image (129:103052), 4:3
    thumbnail: "/projects/ellm/thumb.jpg",
  },
  {
    slug: "lumix",
    title: "멀티 AI 워크스페이스",
    company: "Lumix",
    year: 2025,
    summary: "여러 AI 모델을 하나의 작업 공간에서 다루는 신제품 설계.",
    tone: "sky",
  },
  {
    slug: "design-system",
    title: "다크모드 · 디자인 시스템",
    company: "Personal project",
    year: 2025,
    summary: "다크모드를 포함한 개인 디자인 시스템 구축.",
    tone: "lime",
  },
  {
    slug: "aviera",
    title: "사내 메신저 개선",
    company: "Aviera",
    year: 2024,
    summary: "사내 메신저 경험 개선 프로젝트.",
    tone: "gray",
  },
];

export const getProject = (slug: string | undefined) =>
  projects.find((p) => p.slug === slug);
