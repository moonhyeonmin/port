import type { ReactNode } from "react";
import type { Route } from "./+types/resume";
import { pageMeta } from "~/data/meta";
import { site } from "~/data/site";
import { useReveal } from "~/hooks/useReveal";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Resume",
    description: "브랜딩·UI에서 출발해 B2B 보안·AI 제품의 UX 설계까지 영역을 넓힌 프로덕트 디자이너 조수연의 이력입니다.",
    path: "/resume",
  });

// 디자인: design-src/Resume@1x 1.png (1440 프레임, 4x로 내보냄)
interface Job {
  company: string;
  period: string;
  role: string;
  bullets?: ReactNode[];
  /** 글머리 없이 줄만 있는 설명 (Early Career) */
  lines?: string[];
}

const jobs: Job[] = [
  {
    company: "파수 Fasoo",
    period: "2024.08 – 현재 · 2년 2개월",
    role: "Product Designer · B2B 보안 / AI 제품",
    bullets: [
      <>
        <strong>기업용 Private LLM(Ellm)</strong> 관리자·사용자 화면 설계 → 신제품 고객사 수주
      </>,
      "AI 전용 컴포넌트 패턴 라이브러리 구축, AI 신제품 공통 패턴으로 정립",
      "전 제품 공통 다크모드 디자인 시스템 제작, AI로 만든 WCAG AA 대비 검사 플러그인으로 컬러 충돌 해결",
      "디자인 시스템을 모바일·데스크톱·아랍어 RTL 다국어로 확장",
      "사내 메신저 사용자 데이터 분석 기반 기능 개선 및 제품 로드맵 리드",
      "DSPM 보안 관제 시스템 다크모드 대시보드 설계",
      "파편화된 Figma 문서를 정리한 디자인 파일 숏컷 사이트 제작·사내 배포",
      "보안·AI 제품 7종(서브 포함) 담당, 연 4회 제품 시험으로 도메인 학습",
    ],
  },
  {
    company: "케이글로벌미디어센터",
    period: "2022.12 – 2023.09",
    role: "UX/UI · 브랜딩 디자이너 (인턴) · 플랫폼 개발 사업부",
    bullets: [
      "외국인 대상 한국어 교육 앱 UX 시나리오 기획, 반응형 웹·앱 GUI 디자인",
      "모듈형 디자인 시스템 구축, 신규 앱 출시",
      <>
        로고·브랜드 아이덴티티 개발 및 <strong>디자인 특허 등록</strong>, IR 자료 제작
      </>,
    ],
  },
  {
    company: "레꼴뜨",
    period: "2023.05 – 2023.12",
    role: "SNS 콘텐츠 디자이너 (프리랜서)",
    bullets: [
      "인스타그램·유튜브·블로그 채널 운영, 콘텐츠 기획·촬영·디자인",
      <>
        인스타그램 팔로워 <strong>3만 명 돌파</strong>, 블로그 팔로워 <strong>4.2배</strong> 성장
      </>,
    ],
  },
  {
    company: "Early Career",
    period: "2020 – 2023",
    role: "",
    lines: [
      "신세계라이브쇼핑 온라인 운영팀 (계약직) · 프로모션·브랜드 런칭 보조",
      "신세계인터내셔날 (아르바이트) · 배너 제작, 디자인 보조",
    ],
  },
];

const sideProjects = [
  { type: "개인", name: "leaf", desc: "AI 감성 힐링 식물 키우기 커뮤니티" },
  { type: "개인", name: "Spotlight", desc: "공간 음악 기록 앱" },
  { type: "외주", name: "비굿", desc: "농산물 선도거래 B2B 플랫폼" },
];

const skills = [
  { name: "UX", desc: "UX 시나리오, 정보 구조, 화면 설계서, 사용자 데이터 분석" },
  { name: "UI", desc: "GUI, 디자인 시스템, 다크모드·RTL·반응형, 대시보드" },
  { name: "Build", desc: "AI 코딩 프로토타입, Figma 플러그인 제작, 웹 배포" },
  { name: "Brand", desc: "로고·BI, SNS 콘텐츠, IR 디자인" },
];

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="resume-row" aria-label={label}>
      <h2 className="resume-row__label">{label}</h2>
      <div className="resume-row__body">{children}</div>
    </section>
  );
}

export default function Resume() {
  useReveal();
  return (
    <div className="about resume">
      <div className="container">
        <header className="resume-hero">
          <div>
            <p className="about-label">Resume</p>
            <h1 className="resume-hero__name">
              Suyeon Jo <span>조수연</span>
            </h1>
            <p className="resume-hero__role">Product Designer · UI / UX · AI Products · Seoul</p>
            <p className="resume-hero__links">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </p>
          </div>
        </header>

        <Row label="Summary">
          <p className="resume-summary">
            <span>브랜딩·UI에서 출발해 B2B 보안·AI 제품의 UX 설계까지 영역을 넓힌 프로덕트 디자이너입니다.</span>{" "}
            <span>
              기획부터 디자인 시스템, 코드 프로토타입까지 직접 만들며, AI 신제품 화면 설계로 <em>고객사 수주</em>에
              기여했습니다.
            </span>
          </p>
        </Row>

        <Row label="Experience">
          <ol className="resume-jobs">
            {jobs.map(({ company, period, role, bullets, lines }) => (
              <li key={company} className="resume-job">
                <div className="resume-job__head">
                  <h3 className="resume-job__company">{company}</h3>
                  <p className="resume-job__period">{period}</p>
                </div>
                {role && <p className="resume-job__role">{role}</p>}
                {lines && (
                  <p className="resume-job__lines">
                    {lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                )}
                {bullets && (
                  <ul className="resume-job__bullets">
                    {bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Row>

        <Row label="Side Projects">
          <ul className="resume-projects">
            {sideProjects.map(({ type, name, desc }) => (
              <li key={name} className="resume-project">
                <p className="resume-project__type">{type}</p>
                <p className="resume-project__name">{name}</p>
                <p className="resume-project__desc">{desc}</p>
              </li>
            ))}
          </ul>
        </Row>

        <Row label="Skills">
          <dl className="resume-skills">
            {skills.map(({ name, desc }) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row label="Education">
          <div className="resume-job__head">
            <div>
              <h3 className="resume-job__company">상명대학교</h3>
              <p className="resume-job__role">산업디자인과</p>
            </div>
            <p className="resume-job__period">2023.02 졸업</p>
          </div>
        </Row>
      </div>
    </div>
  );
}
