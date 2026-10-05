import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** 최종 숫자 */
  to: number;
  /** 소수점 자릿수 (예: 4.2 → 1) */
  decimals?: number;
  /** 애니메이션 시간 (ms) */
  duration?: number;
}

const format = (n: number, decimals: number) => n.toFixed(decimals);

/**
 * 화면에 들어오면 0에서 to까지 올라가는 숫자.
 * 미리 렌더링된 HTML에는 최종 숫자가 들어가고, 폭은 최종 숫자 기준으로 고정해 옆 글자가 흔들리지 않는다.
 */
export function CountUp({ to, decimals = 0, duration = 2000 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    setValue(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setValue(to * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="countup">
      <span className="countup__ghost" aria-hidden>
        {format(to, decimals)}
      </span>
      <span className="countup__live">{format(value, decimals)}</span>
    </span>
  );
}
