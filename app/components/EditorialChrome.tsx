"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FooterLanguage } from "./FooterLanguage";

function Logo() {
  return (
    <Image
      className="brand-logo"
      src="/medivo-logo-white-v2.png"
      alt="Medivo AI"
      width="1006"
      height="205"
    />
  );
}

export function EditorialHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

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
        <Link href="/#product" onClick={closeMenus}>Product</Link>
        <Link href="/#solution" onClick={closeMenus}>Solution</Link>
        <div className="editorial-resource-menu">
          <button onClick={() => setResourcesOpen(!resourcesOpen)} aria-expanded={resourcesOpen}>
            Resources <span>⌄</span>
          </button>
          <div className={resourcesOpen ? "editorial-resource-dropdown show" : "editorial-resource-dropdown"}>
            <span className="resource-dropdown-label">Resources</span>
            <Link href="/about" onClick={closeMenus}>About</Link>
            <Link href="/team" onClick={closeMenus}>Team</Link>
          </div>
        </div>
      </nav>
      <a className="editorial-demo" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">
        Book Demo <span>↗</span>
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
  return (
    <footer>
      <div className="footer-main">
        <Link className="brand" href="/" aria-label="Medivo AI home"><Logo /></Link>
        <nav>
          <Link href="/#product">Product</Link>
          <Link href="/#solution">Solution</Link>
          <div><span>Resources</span><Link href="/about">About</Link><Link href="/team">Team</Link></div>
          <a href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">Book Demo ↗</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <small>© 2026 Medivo AI. All rights reserved.</small>
        <FooterLanguage />
      </div>
    </footer>
  );
}
