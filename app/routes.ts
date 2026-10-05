import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("resume", "routes/resume.tsx"),
  route("case-studies/:slug", "routes/case-study.tsx"),
] satisfies RouteConfig;
