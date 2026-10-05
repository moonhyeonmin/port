import { data, Link } from "react-router";
import type { Route } from "./+types/case-study";
import { pageMeta } from "~/data/meta";
import { getProject, projects } from "~/data/projects";
import { caseStudies } from "~/case-studies";

// 템플릿의 케이스 스터디 목차
const sections = ["Overview", "Problem", "Research", "Ideation", "Designs", "Lessons"];

// ssr: false 이므로 빌드(prerender) 시점에만 실행됩니다.
export function loader({ params }: Route.LoaderArgs) {
  const project = getProject(params.slug);
  if (!project) throw data(null, { status: 404 });
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return { project, next };
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  loaderData
    ? pageMeta({
        title: loaderData.project.title,
        description: loaderData.project.summary,
        path: `/case-studies/${loaderData.project.slug}`,
      })
    : pageMeta({ title: "Not found" });

export default function CaseStudy({ loaderData }: Route.ComponentProps) {
  const { project, next } = loaderData;
  const index = projects.findIndex((p) => p.slug === project.slug) + 1;
  const Content = caseStudies[project.slug];

  if (Content) {
    return (
      // Next Project 등 모든 요소는 Figma 디자인대로 Content 안에서 그린다
      <article className="case-page">
        <Content index={index} />
      </article>
    );
  }

  return (
    <article className="container case">
      <aside className="case__toc" aria-label="목차">
        {sections.map((s) => (
          <a key={s} href={`#${s.toLowerCase()}`}>
            {s}
          </a>
        ))}
      </aside>

      <div className="case__body">
        <header className="case__header">
          <p className="eyebrow">Project {index}</p>
          <h1 className="case__title">{project.title}</h1>
          <p className="muted">{project.summary}</p>
          <div className="tags">
            <span className="tag">{project.company}</span>
            <span className="tag">{project.year}</span>
          </div>
        </header>

        {sections.map((s) => (
          <section key={s} id={s.toLowerCase()} className="case__section">
            <h2>{s}</h2>
            <p className="muted">TODO: {s} 내용을 작성하세요.</p>
          </section>
        ))}

        <Link to={`/case-studies/${next.slug}`} className="case__next">
          <span className="eyebrow">Next Project</span>
          <span>{next.title} →</span>
        </Link>
      </div>
    </article>
  );
}
