import { Link, NavLink, useLocation } from "react-router";
import { site } from "~/data/site";

const tabs = [
  { to: "/", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
];

export function TabNav() {
  const { pathname } = useLocation();
  // 케이스 스터디 상세에서도 Projects 탭을 활성화
  const isProjects = pathname === "/" || pathname.startsWith("/case-studies");

  return (
    <header className="tabnav">
      {/* 왼쪽 위 이름 (홈·About) */}
      {(pathname === "/" || pathname === "/about") && (
        <Link to="/" className="tabnav__brand">
          <strong>{site.name}</strong> {site.role}
        </Link>
      )}
      <nav className="tabnav__tabs" aria-label="주요 메뉴">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end
            className={({ isActive }) =>
              "tabnav__tab" +
              ((tab.to === "/" ? isProjects : isActive) ? " is-active" : "")
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
