import type { Route } from "./+types/about";
import { Link } from "react-router";
import { pageMeta } from "~/data/meta";
import { site } from "~/data/site";
import { CountUp } from "~/components/CountUp";
import { useReveal } from "~/hooks/useReveal";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "About",
    description: "감각으로 그리고, 구조로 설계합니다. 프로덕트 디자이너 조수연을 소개합니다.",
    path: "/about",
  });

// 디자인: design-src/About@1x 1.png (1440 프레임, 4x로 내보냄)
const stats: { value: React.ReactNode; unit?: string; caption: string[] }[] = [
  { value: <CountUp to={7} duration={1400} />, caption: ["담당 제품 수", "보안 관제 시스템 포함"] },
  { value: <CountUp to={4} duration={1400} />, unit: "회/년", caption: ["제품 시험으로", "도메인 학습"] },
  { value: <><CountUp to={3} duration={1400} />만+</>, caption: ["SNS 채널 팔로워", "블로그 4.2배 성장"] },
  { value: "특허", caption: ["스타트업 브랜드", "디자인 특허 등록"] },
];

const principles = [
  {
    title: "공부하고 설계합니다",
    lines: [
      "낯선 보안 정책과 사양을 먼저 이해하고, 그 위에서 사용자 흐름을",
      "설계합니다. 기획부터 QA까지 풀사이클로 담당해 왔습니다.",
    ],
  },
  {
    title: "직접 만들어 증명합니다",
    lines: [
      "개발이 어렵다던 인터랙션을 AI 코딩으로 동작하는 프로토타입으로 만들어",
      "제안합니다. WCAG 대비 검사 플러그인과 사내 디자인 파일 숏컷 사이트도",
      "직접 만들었습니다.",
    ],
  },
  {
    title: "AI에는 AI의 UI가 필요합니다",
    lines: [
      "관리자용 디자인 시스템의 한계를 느끼고,",
      "Chat·Feedback·Privacy·Loading 등 AI 전용 컴포넌트 패턴을 만들어",
      "신제품 공통 패턴으로 정립했습니다.",
    ],
  },
  {
    title: "함께 만듭니다",
    lines: [
      "개발자·기획자와 치열하게 조율하고, 사내 스터디를 꾸려 함께 배웁니다.",
      "동료들에게 \"같이 있으면 발전하게 만드는 사람\"이라는 이야기를 들었습니다.",
    ],
  },
];

const journey = [
  {
    label: "01 · Brand",
    title: "커머스 · SNS 브랜드",
    lines: ["비주얼과 브랜딩, 콘텐츠 기획까지. 보기 좋게 만드는 법을", "배웠습니다."],
  },
  {
    label: "02 · Product 0→1",
    title: "스타트업 UX/UI · 브랜딩",
    lines: ["UX 시나리오, 디자인 시스템, 앱 출시. 제품을 처음부터", "끝까지 만드는 법을 배웠습니다."],
  },
  {
    label: "03 · AI & Enterprise",
    title: "파수 · 2년 2개월",
    lines: ["B2B 보안 7개 제품과 AI 신제품. 복잡한 것을 믿고 쓰게", "만드는 법을 배우고 있습니다."],
    current: true,
  },
];

const toolkit = [
  { label: "Design", items: ["Figma", "Photoshop", "3D", "Design System", "Variables"] },
  { label: "Prototype", items: ["AI 코딩", "HTML / CSS / JS", "Framer", "Vercel"] },
  { label: "Product", items: ["UX 시나리오", "화면 설계서", "데이터 분석", "QA"] },
];

export default function About() {
  useReveal();
  return (
    <div className="about">
      <section className="container about-intro">
        <div className="about-intro__text">
          <p className="about-label">About</p>
          <h1 className="about-intro__title">
            <span>감각으로 그리고,</span>
            <span>구조로 설계합니다.</span>
          </h1>
          <p className="about-intro__body">
            화려한 UI와 브랜딩이 강점인 디자이너로 시작했습니다.
            <br />
            커머스와 브랜드 채널을 거쳐,
            스타트업에서는 브랜드 아이덴티티부터 디자인 시스템, 앱 출시까지 제품을 처음부터 끝까지
            만들었습니다.
          </p>
          <p className="about-intro__body">
            파수에서 보낸 2년 2개월은 영역을 넓힌 시간이었습니다. 보안 관제 시스템을 포함해 7개
            제품을 맡았고, 1년에 4번 제품 시험을 보며 어려운 사양을 공부해 UX를 설계하는 힘을
            길렀습니다.
          </p>
          <p className="about-intro__body is-strong">
            눈에 보이지 않는 기술일수록, 신뢰는 화면에서 만들어집니다. AI 신제품을 맡으며 얻은
            확신입니다.
          </p>
        </div>
        <img
          className="about-intro__photo"
          src="/about/profile.webp"
          width={475}
          height={592}
          alt="조수연 프로필 사진"
          fetchPriority="high"
        />
      </section>

      <ul className="container about-stats">
        {stats.map(({ value, unit, caption }) => (
          <li key={caption[0]} className="about-stat">
            <p className="about-stat__value">
              {value}
              {unit && <small>{unit}</small>}
            </p>
            <p className="about-stat__caption">
              {caption.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </li>
        ))}
      </ul>

      <section className="about-work" aria-labelledby="about-work-title">
        <div className="container">
          <p className="about-label">How I work</p>
          <h2 id="about-work-title" className="about-h2">
            이렇게 일합니다
          </h2>
          <ol className="about-work__cards">
            {principles.map(({ title, lines }, i) => (
              <li key={title} className="about-work__card">
                <p className="about-work__num">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="about-work__title">{title}</h3>
                <p className="about-work__desc">
                  {lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container about-journey" aria-labelledby="about-journey-title">
        <p className="about-label">Journey</p>
        <h2 id="about-journey-title" className="about-h2">
          보기 좋은 화면에서, 믿고 쓰는 경험으로
        </h2>
        <ol className="about-journey__steps">
          {journey.map(({ label, title, lines, current }) => (
            <li key={label} className={`about-journey__step${current ? " is-current" : ""}`}>
              <p className="about-journey__label">{label}</p>
              <h3 className="about-journey__title">{title}</h3>
              <p className="about-journey__desc">
                {lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container about-toolkit" aria-labelledby="about-toolkit-title">
        <p className="about-label">Toolkit</p>
        <h2 id="about-toolkit-title" className="about-h2">
          다루는 도구
        </h2>
        <dl className="about-toolkit__rows">
          {toolkit.map(({ label, items }) => (
            <div key={label} className="about-toolkit__row">
              <dt>{label}</dt>
              <dd>
                {items.map((item) => (
                  <span key={item} className="about-chip">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container about-cta-wrap" aria-label="연락하기">
        <div className="about-cta">
          <p className="about-cta__title">함께 일할 이야기가 있다면.</p>
          <div className="about-cta__actions">
            <a className="about-cta__btn is-primary" href={`mailto:${site.email}`}>
              이메일 보내기
            </a>
            <Link className="about-cta__btn" to="/resume">
              Resume 보기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
