import { useState } from "react";
import { Link } from "react-router";
import { site } from "~/data/site";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__intro">
          <p className="footer__name">{site.name}</p>
          <p className="muted">{site.intro}</p>
        </div>
        <div className="footer__col">
          <p className="footer__label">Links</p>
          <Link to="/">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/resume">Resume</Link>
        </div>
        <div className="footer__col">
          <p className="footer__label">Contact</p>
          <button type="button" className="footer__email" onClick={copyEmail}>
            {copied ? "Copied!" : site.email}
          </button>
          <a className="pill" href={site.callUrl} target="_blank" rel="noreferrer">
            Schedule a call
          </a>
        </div>
      </div>
    </footer>
  );
}
