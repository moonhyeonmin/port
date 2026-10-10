import type { CSSProperties } from "react";
import type { Project } from "~/data/projects";
import { ProjectCard } from "./ProjectCard";

/** 끊김 없이 이어지도록 같은 목록을 몇 번 반복할지 (아주 넓은 화면에서도 빈칸이 안 보이게) */
const COPIES = 3;

/**
 * 홈 프로젝트 카드 가로 띠: 카드가 한 줄로 천천히 왼쪽으로 흐르고, 끝나면 처음부터 이어진다.
 * 마우스를 올리거나 키보드로 카드에 들어가면 멈춘다. 동작 줄이기 설정이면 멈춘 채 가로 스크롤로 본다.
 * 반복된 사본은 스크린 리더와 탭 이동에서 제외한다 (inert).
 */
export function HomeMarquee({ projects, seconds = 60 }: { projects: Project[]; seconds?: number }) {
  return (
    <section
      className="home-marquee"
      aria-label="Case Studies"
      style={{ "--marquee-duration": `${seconds}s`, "--marquee-copies": COPIES } as CSSProperties}
    >
      <div className="home-marquee__track">
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul key={copy} className="home-marquee__list" inert={copy > 0} aria-hidden={copy > 0 || undefined}>
            {projects.map((project) => (
              <li key={project.slug} className="home-marquee__item">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
