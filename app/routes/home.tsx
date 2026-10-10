import type { Route } from "./+types/home";
import { HomeBeam } from "~/components/HomeBeam";
import { ProjectCard } from "~/components/ProjectCard";
import { features } from "~/data/features";
import { pageMeta } from "~/data/meta";
import { projects } from "~/data/projects";
import { site } from "~/data/site";
import { useReveal } from "~/hooks/useReveal";

export const meta: Route.MetaFunction = () => pageMeta({});

export default function Home() {
  useReveal();
  return (
    <div className="home">
      {features.homeBeam && <HomeBeam />}
      <section className="hero">
        <div className="hero__sky" aria-hidden />
        <div className="container hero__inner">
          <div className="hero__photo" aria-hidden />
          <h1 className="hero__title">
            {site.heroTitle.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero__desc muted">{site.intro}</p>
        </div>
      </section>

      <section
        className={`container cases${features.homeRow ? " cases--row" : ""}`}
        aria-label="Case Studies"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
