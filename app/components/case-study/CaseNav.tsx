import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export interface CaseNavItem {
  /** 이동할 섹션 id */
  id: string;
  label: string;
  /** 같은 항목으로 강조할 추가 섹션 id (예: Deep Dive 01~03) */
  also?: string[];
}

/** 케이스 스터디 상단 섹션 내비게이션 (josuyeon.framer.website 케이스 스터디 헤더 스타일) */
export function CaseNav({ items }: { items: CaseNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치로 현재 섹션 찾기: 화면 위쪽 35% 지점을 지난 마지막 섹션
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = items[0]?.id;
      for (const item of items) {
        const tops = [item.id, ...(item.also ?? [])]
          .map((id) => document.getElementById(id)?.getBoundingClientRect().top)
          .filter((top): top is number => top !== undefined);
        if (tops.length && Math.min(...tops) <= line) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  // 모바일 가로 스크롤 목록에서 현재 항목이 보이도록
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !el || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: el.offsetLeft - list.clientWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="case-nav" aria-label="케이스 스터디 목차">
      <Link to="/" className="case-nav__back">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M14 8H2.5M7 3 2 8l5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Projects</span>
      </Link>
      <span className="case-nav__divider" aria-hidden />
      <div className="case-nav__list" ref={listRef}>
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            data-id={id}
            className={`case-nav__link${active === id ? " is-active" : ""}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setActive(id)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
