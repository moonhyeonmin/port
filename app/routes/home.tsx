import { useEffect, useRef, useState } from "react";
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
          <p className="hero__desc muted">
            {site.heroDesc.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </section>

      {features.homeRow ? (
        <CasesRow />
      ) : (
        <section className="container cases" aria-label="Case Studies">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </section>
      )}
    </div>
  );
}

/** 프로젝트 카드 한 줄: 한 화면에 4장, 나머지는 가로 스크롤(양옆 화살표 버튼) */
function CasesRow() {
  const ref = useRef<HTMLElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdge({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.querySelector<HTMLElement>(".card");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="cases-scroll">
      <section ref={ref} className="container cases cases--row" aria-label="Case Studies">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
      <button type="button" className="cases-scroll__btn is-prev" aria-label="이전 프로젝트 보기" hidden={edge.start} onClick={() => move(-1)}>
        ←
      </button>
      <button type="button" className="cases-scroll__btn is-next" aria-label="다음 프로젝트 보기" hidden={edge.end} onClick={() => move(1)}>
        →
      </button>
    </div>
  );
}
