import { Link, NavLink, useLocation } from "react-router";
import { site } from "~/data/site";

const tabs = [
  { to: "/", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
];

export function TabNav() {
  // 끝의 "/"는 무시한다 (정적 서버가 /about을 /about/로 보낼 때도 서버 렌더와 같게)
  const path = useLocation().pathname.replace(/(.)\/$/, "$1");
  // 케이스 스터디 상세에서도 Projects 탭을 활성화
  const isProjects = path === "/" || path.startsWith("/case-studies");

  return (
    <header className="tabnav">
      {/* 왼쪽 위 이름 (홈·About·Resume) */}
      {["/", "/about", "/resume"].includes(path) && (
        <Link to="/" className="tabnav__brand">
          <strong>{site.name}</strong> {site.role}
        </Link>
      )}
      <nav className="tabnav__tabs" aria-label="주요 메뉴">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={
              "tabnav__tab" + ((tab.to === "/" ? isProjects : path === tab.to) ? " is-active" : "")
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
