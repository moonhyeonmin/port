import type { Route } from "./+types/resume";
import { pageMeta } from "~/data/meta";

export const meta: Route.MetaFunction = () =>
  pageMeta({ title: "Resume", path: "/resume" });

export default function Resume() {
  return (
    <section className="container prose">
      <h1>Resume</h1>
      <p className="muted">TODO: 경력과 학력을 작성하세요.</p>
    </section>
  );
}
