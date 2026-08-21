"use client";

import { useState } from "react";

function Logo() {
  return (
    <img
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
      <a className="brand" href="/" aria-label="Medivo AI home">
        <Logo />
      </a>
      <nav className={menuOpen ? "editorial-nav open" : "editorial-nav"} aria-label="Primary navigation">
        <a href="/#product" onClick={closeMenus}>Product</a>
        <a href="/#solution" onClick={closeMenus}>Solution</a>
        <div className="editorial-resource-menu">
          <button onClick={() => setResourcesOpen(!resourcesOpen)} aria-expanded={resourcesOpen}>
            Resources <span>⌄</span>
          </button>
          <div className={resourcesOpen ? "editorial-resource-dropdown show" : "editorial-resource-dropdown"}>
            <a href="/about" onClick={closeMenus}>About</a>
            <a href="/team" onClick={closeMenus}>Team</a>
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
        <a className="brand" href="/" aria-label="Medivo AI home"><Logo /></a>
        <nav>
          <a href="/#product">Product</a>
          <a href="/#solution">Solution</a>
          <div><span>Resources</span><a href="/about">About</a><a href="/team">Team</a></div>
          <a href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">Book Demo ↗</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <small>© 2026 Medivo AI. All rights reserved.</small>
        <div><a href="/terms">Terms and Conditions</a><a href="/privacy">Privacy Policy</a></div>
      </div>
    </footer>
  );
}
