import type { Config } from "@react-router/dev/config";
import { projects } from "./app/data/projects";

export default {
  // 정적 사이트: 서버 없이 빌드 시점에 모든 페이지를 HTML로 생성
  ssr: false,
  prerender: [
    "/",
    "/about",
    "/resume",
    ...projects.map((p) => `/case-studies/${p.slug}`),
  ],
} satisfies Config;
