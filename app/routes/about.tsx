import type { Route } from "./+types/about";
import { pageMeta } from "~/data/meta";

export const meta: Route.MetaFunction = () =>
  pageMeta({ title: "About", path: "/about" });

export default function About() {
  return (
    <section className="container prose">
      <h1>About</h1>
      <p className="muted">TODO: 자기소개를 작성하세요.</p>
    </section>
  );
}
