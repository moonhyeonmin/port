export type Tone = "violet" | "lime" | "sky" | "gray";

export interface Project {
  slug: string;
  title: string;
  /** 카드 아래 태그 (연도, 분야 순) */
  tags: string[];
  summary: string;
  tone: Tone;
  /** 4:3 썸네일. public/ 기준 경로 (예: "/projects/ellm.mp4") */
  thumbnail?: string;
}

export const projects: Project[] = [
  {
    slug: "ellm",
    title: "Ellm 기업용 Private LLM",
    tags: ["2026", "UI/UX"],
    summary:
      "보안 기업 최초의 사내 sLLM, 참고할 선례 없이 사용자와 관리자 경험을 처음부터 설계했습니다.",
    tone: "violet",
    // Figma "framer 이전용" > Ellm_cover image (129:103052), 4:3
    thumbnail: "/projects/ellm/thumb.jpg",
  },
  {
    slug: "lumix",
    title: "멀티 AI 워크스페이스",
    tags: ["2026", "Branding", "UI"],
    summary: "여러 AI 모델을 하나의 작업 공간에서 다루는 신제품 설계.",
    tone: "sky",
    // Figma "framer 이전용" > Multi AI Workspace_cover image (163:158533), 4:3
    thumbnail: "/projects/lumix/thumb.webp",
  },
  {
    slug: "design-system",
    title: "다크모드, RTL 다국어 디자인 시스템 구축",
    tags: ["2025", "시스템 구축"],
    summary: "다크모드를 포함한 개인 디자인 시스템 구축.",
    tone: "lime",
    // Figma "framer 이전용" > 다크모드, RTL 다국어 디자인 시스템 구축_cover image, 4:3
    thumbnail: "/projects/design-system/thumb.webp",
  },
  {
    slug: "aviera",
    title: "데이터 기반 사내 메신저 개선",
    tags: ["2025", "UX 개선"],
    summary: "사내 메신저 경험 개선 프로젝트.",
    tone: "gray",
    // Figma "framer 이전용" > 사내메신저_cover image, 4:3
    thumbnail: "/projects/aviera/thumb.webp",
  },
  {
    slug: "leaf",
    title: "가상 식물키우기 사이드 프로젝트",
    tags: ["2023", "사이드 프로젝트"],
    summary: "식물을 가상으로 미리 키워 보며 마음까지 힐링하는 AI 감성 식물 키우기 앱 leaf.",
    tone: "gray",
    // Figma "framer 이전용" > 개인작_cover image, 4:3
    thumbnail: "/projects/leaf/thumb.webp",
  },
];

export const getProject = (slug: string | undefined) =>
  projects.find((p) => p.slug === slug);
