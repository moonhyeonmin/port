import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import { TabNav } from "~/components/TabNav";
import { Footer } from "~/components/Footer";
import { getCaseStudy } from "~/case-studies";
import { features } from "~/data/features";
import "~/styles/global.css";
import "~/styles/home-beam.css";
import "~/styles/home-row.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // head 스크립트가 붙이는 .js 클래스 때문에 생기는 hydration 경고를 막는다
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* JS가 있을 때만 등장 애니메이션 대상을 첫 페인트 전에 숨긴다 (useReveal) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname } = useLocation();
  // 디자인이 있는 케이스 스터디는 자체 섹션 내비게이션(CaseNav)을 쓴다
  const slug = pathname.match(/^\/case-studies\/([^/]+)/)?.[1];
  const hasCaseNav = Boolean(getCaseStudy(slug));
  // 홈 어두운 배경 실험 (features.homeBeam)
  const homeBeam = features.homeBeam && pathname === "/";

  return (
    <div className={`page${homeBeam ? " is-home-beam" : ""}`}>
      {!hasCaseNav && <TabNav />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="page">
      <TabNav />
      <main className="container error">
        <h1>{notFound ? "404" : "문제가 발생했어요"}</h1>
        <p className="muted">
          {notFound ? "페이지를 찾을 수 없어요." : "잠시 후 다시 시도해 주세요."}
        </p>
      </main>
    </div>
  );
}
