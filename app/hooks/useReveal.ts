import { useEffect } from "react";

/**
 * 화면에 들어올 때 살짝 올라오며 나타나는 요소.
 * global.css의 "Reveal" 블록 선택자와 같게 유지해야 한다 (CSS가 첫 페인트 전에 숨김).
 */
export const REVEAL_SELECTOR = [
  // 홈
  ".cases .card",
  // 케이스 스터디
  ".case-page .case-eyebrow",
  ".case-page .case-h2",
  ".case-hero__heading > *",
  ".case-hero__tags",
  ".case-hero__cover",
  ".case-overview__item",
  ".case-summary__row",
  ".case-summary__card",
  ".case-deep__subtitle",
  ".case-why__bullets",
  ".case-why__stat",
  ".case-why__figure",
  ".case-journey__desc",
  ".case-journey__head",
  ".case-journey__row",
  ".case-deep__plain",
  ".case-deep__row",
  ".case-deep__stat",
  ".case-deep__trial",
  ".case-deep__priority-title",
  ".case-deep__priority-row",
  ".case-deep__figure",
  ".case-retro__stat",
  ".case-retro__note",
  ".case-retro__next",
].join(", ");

/** 등장 시간은 global.css의 --reveal-duration 기본값(1.2s)과 같게 유지 */
const STAGGER_MS = 180;
const MAX_DELAY_MS = 1100;
/** 페이지 첫 화면(처음 보이는 요소들)은 시작 전에 잠깐 여유를 둔다 */
const FIRST_LEAD_MS = 200;

/** 페이지의 REVEAL_SELECTOR 요소를 화면 진입 시 한 번씩 나타나게 한다 */
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    let firstBatch = true;
    const observer = new IntersectionObserver(
      (entries) => {
        // 같은 순간 들어온 요소들은 위→아래, 왼→오른 순서로 조금씩 늦게
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left;
          });
        const first = firstBatch;
        firstBatch = false;
        entering.forEach((el, i) => {
          const delay = (first ? FIRST_LEAD_MS : 0) + Math.min(i * STAGGER_MS, MAX_DELAY_MS);
          el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.classList.add("is-revealed");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => {
      if (!el.classList.contains("is-revealed")) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}
