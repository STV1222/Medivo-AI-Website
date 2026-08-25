"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FooterLanguage } from "./FooterLanguage";
import { Trans, useT } from "./I18n";

function Logo() {
  return (
    <Image
      className="brand-logo"
      src="/medivo-logo-white-v2.png"
      alt="Medivo AI"
      width="1006"
      height="205"
      unoptimized
    />
  );
}

export function EditorialHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const t = useT();

  const closeMenus = () => {
    setMenuOpen(false);
    setResourcesOpen(false);
  };

  return (
    <header className="editorial-header">
      <Link className="brand" href="/" aria-label="Medivo AI home">
        <Logo />
      </Link>
      <nav className={menuOpen ? "editorial-nav open" : "editorial-nav"} aria-label="Primary navigation">
        <Link href="/#product" onClick={closeMenus}>{t("nav.product")}</Link>
        <Link href="/#solution" onClick={closeMenus}>{t("nav.solution")}</Link>
        <div className="editorial-resource-menu">
          <button onClick={() => setResourcesOpen(!resourcesOpen)} aria-expanded={resourcesOpen}>
            {t("nav.resources")} <span>⌄</span>
          </button>
          <div className={resourcesOpen ? "editorial-resource-dropdown show" : "editorial-resource-dropdown"}>
            <span className="resource-dropdown-label">{t("nav.resources")}</span>
            <Link href="/about" onClick={closeMenus}>{t("nav.about")}</Link>
            <Link href="/team" onClick={closeMenus}>{t("nav.team")}</Link>
          </div>
        </div>
      </nav>
      <a className="editorial-demo" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">
        {t("nav.bookDemo")} <span>↗</span>
      </a>
      <button
        className="editorial-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

export function EditorialFooter() {
  const t = useT();

  return (
    <footer>
      <div className="footer-main">
        <Link className="brand" href="/" aria-label="Medivo AI home"><Logo /></Link>
        <nav>
          <Link href="/#product">{t("nav.product")}</Link>
          <Link href="/#solution">{t("nav.solution")}</Link>
          <div><span>{t("nav.resources")}</span><Link href="/about">{t("nav.about")}</Link><Link href="/team">{t("nav.team")}</Link></div>
          <a href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">{t("nav.bookDemo")} ↗</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <small><Trans k="footer.rights" /></small>
        <FooterLanguage />
      </div>
    </footer>
  );
}
