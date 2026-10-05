import { Link } from "react-router";
import type { Project } from "~/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, company, year, tone, thumbnail } = project;
  const isVideo = thumbnail?.endsWith(".mp4");

  return (
    <Link to={`/case-studies/${slug}`} className="card">
      <div className={`card__media tone-${tone}`}>
        {thumbnail &&
          (isVideo ? (
            <video src={thumbnail} autoPlay muted loop playsInline />
          ) : (
            <img src={thumbnail} alt="" loading="lazy" />
          ))}
      </div>
      <div className="card__meta">
        <h3 className="card__title">{title}</h3>
        <div className="tags">
          <span className="tag">{company}</span>
          <span className="tag">{year}</span>
        </div>
      </div>
    </Link>
  );
}
