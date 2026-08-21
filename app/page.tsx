"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const workflow = [
  { step: "01", title: "Prepare", body: "The healthcare team prepares the relevant instructions for the patient’s procedure and recovery." },
  { step: "02", title: "Review", body: "A healthcare professional checks the patient information and confirms the content before delivery." },
  { step: "03", title: "Create", body: "Medivo AI turns the confirmed instructions into a clear patient education video." },
  { step: "04", title: "Deliver", body: "The patient receives a mobile link and can revisit the video after leaving care." },
];

const platformTabs = ["Prepare", "Review", "Preview", "Deliver"];

function Logo({ priority = false }: { priority?: boolean }) {
  return <Image className="brand-logo" src="/medivo-logo-white-v2.png" alt="Medivo AI" width="1006" height="205" priority={priority} />;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [platform, setPlatform] = useState(0);
  const [menu, setMenu] = useState(false);
  const [resources, setResources] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-workflow-step]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(Number((entry.target as HTMLElement).dataset.workflowStep)));
    }, { rootMargin: "-38% 0px -48%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => { setMenu(false); setResources(false); };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Medivo AI home"><Logo priority /></a>
        <nav className={menu ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#product" onClick={closeMenu}>Product</a>
          <a href="#solution" onClick={closeMenu}>Solution</a>
          <div className="resource-menu">
            <button onClick={() => setResources(!resources)} aria-expanded={resources}>Resources <span>⌄</span></button>
            <div className={resources ? "resource-dropdown show" : "resource-dropdown"}>
              <a href="/about" onClick={closeMenu}>About</a>
              <a href="/team" onClick={closeMenu}>Team</a>
            </div>
          </div>
        </nav>
        <a className="button button-light header-cta" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">Book Demo <span>↗</span></a>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}><span/><span/></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-film" aria-hidden="true">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/medivo-hero-poster.webp"
          >
            <source src="/medivo-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <h1>Turn medical instructions<br/>into understanding.</h1>
        <a className="scroll-note" href="#problem">SCROLL TO EXPLORE <span>↓</span></a>
      </section>

      <section className="problem" id="problem">
        <p className="section-label">THE PROBLEM</p>
        <h2>Important medical information is easy to <em>forget.</em></h2>
        <div className="problem-story">
          <p>Patients often receive preparation, recovery, medication and follow-up instructions during short and stressful clinical encounters.</p>
          <div className="instruction-stream" aria-hidden="true">
            <span>Nothing to eat after midnight</span><span>Arrange transport home</span><span>Medication guidance</span><span>Follow-up date</span><span>When to seek help</span>
          </div>
        </div>
        <div className="problem-line"><span>Too much information.</span><span>Too little time.</span><span>Too easy to forget.</span></div>
      </section>

      <section className="solution" id="solution">
        <div className="solution-heading">
          <p className="section-label">THE SOLUTION</p>
          <h2>Guidance that stays with the patient.</h2>
          <p className="solution-lead">Medivo AI turns confirmed medical instructions into a clear, personalised video patients can watch—and revisit—from their phone.</p>
        </div>

        <div className="solution-outcome" aria-label="A Medivo AI endoscopy recovery guide delivered to a patient’s phone">
          <div className="solution-message">
            <span className="solution-message-index">01 / PATIENT EXPERIENCE</span>
            <p>From a stressful conversation to a calm, visual guide.</p>
            <div className="solution-proof">
              <span>CLINICIAN-REVIEWED</span>
              <span>AVAILABLE AT HOME</span>
            </div>
          </div>

          <div className="patient-phone">
            <div className="phone-status"><span>9:41</span><span>● ● ●</span></div>
            <div className="phone-film">
              <Logo/>
              <span className="phone-kicker">YOUR RECOVERY GUIDE</span>
              <div className="phone-play" aria-hidden="true"><span>▶</span></div>
              <div className="phone-subtitle">What to expect after your procedure</div>
            </div>
            <div className="phone-details">
              <span>ENDOSCOPY · AFTERCARE</span>
              <h3>Your recovery guide</h3>
              <p>Clear instructions for recovery, medication and follow-up.</p>
              <div className="phone-progress"><i/></div>
              <div className="phone-meta"><span>01:12</span><span>04:18</span></div>
            </div>
          </div>

          <span className="solution-format">PERSONALISED VIDEO · MOBILE LINK</span>
        </div>
      </section>

      <section className="workflow" id="product">
        <div className="workflow-visual">
          <div className={`spatial stage-${active}`}>
            <div className="plane plane-one"><span>PATIENT INSTRUCTIONS</span><b>Endoscopy recovery</b><i/><i/><i/></div>
            <div className="plane plane-two"><span>CLINICAL REVIEW</span><b>Patient information</b><p><i/>Procedure <strong>Confirmed</strong></p><p><i/>Follow-up <strong>Confirmed</strong></p></div>
            <div className="plane plane-three"><div className="check">✓</div><b>Ready to create</b></div>
            <div className="mini-phone"><div><Logo/><span>▶</span></div><b>Your recovery guide</b><small>Available on mobile</small></div>
          </div>
          <div className="step-indicator">{workflow.map((_, i) => <button key={i} className={active === i ? "active" : ""} onClick={() => document.querySelector(`[data-workflow-step='${i}']`)?.scrollIntoView({behavior:"smooth"})} aria-label={`View workflow step ${i + 1}`}><i/></button>)}</div>
        </div>
        <div className="workflow-copy">
          <div className="workflow-intro"><p className="section-label">PRODUCT WORKFLOW</p><h2>From clinical instruction to patient understanding.</h2></div>
          {workflow.map((item, i) => <article key={item.step} data-workflow-step={i}><p className="section-label">{item.step}</p><h3>{item.title}</h3><p>{item.body}</p></article>)}
        </div>
      </section>

      <section className="platform">
        <div className="section-head"><div><p className="section-label">THE PLATFORM</p><h2>One platform for patient education.</h2></div><p>A structured workspace for healthcare teams to prepare, review and deliver patient-facing videos.</p></div>
        <div className="platform-tabs" role="tablist">{platformTabs.map((tab, i) => <button role="tab" aria-selected={platform === i} className={platform === i ? "active" : ""} onClick={() => setPlatform(i)} key={tab}><span>0{i+1}</span>{tab}</button>)}</div>
        <div className={`platform-window view-${platform}`}>
          <div className="app-nav"><span><Logo/></span><i/><i/><i/></div>
          <div className="app-main">
            <div className="app-top"><small>ENDOSCOPY EDUCATION</small><b>{platformTabs[platform]}</b><span className="prototype">PRODUCT PROTOTYPE</span></div>
            <div className="app-content">
              <div className="app-list"><i/><i/><i/><i/><i/></div>
              <div className="app-preview"><div className="preview-media"><span>{platform === 2 || platform === 3 ? "▶" : "✓"}</span></div><b>{platform === 0 ? "Patient instructions" : platform === 1 ? "Clinical confirmation" : platform === 2 ? "Video preview" : "Delivery status"}</b><p>{platform === 3 ? "Ready for patient access" : "Endoscopy patient education"}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="endoscopy">
        <p className="section-label">CLINICAL USE CASE · ENDOSCOPY</p>
        <h2>Support patients before and after their procedure.</h2>
        <div className="journey">
          <article><span>01</span><h3>Before</h3><p>Preparation requirements, timing and what to expect.</p></article>
          <article><span>02</span><h3>At the hospital</h3><p>Healthcare professionals confirm the relevant instructions.</p></article>
          <article><span>03</span><h3>After</h3><p>Recovery, diet, medication and follow-up guidance.</p></article>
          <article><span>04</span><h3>At home</h3><p>Patients and families revisit the information when questions arise.</p></article>
        </div>
      </section>

      <section className="value">
        <p className="section-label">VALUE FOR HOSPITALS</p>
        <h2>Extend patient communication beyond the hospital visit.</h2>
        <div className="value-list">
          <article><span>01</span><h3>Consistent communication</h3><p>Deliver education aligned with the organisation’s established information and workflow.</p></article>
          <article><span>02</span><h3>Less repetitive explanation</h3><p>Make common instructions available in a format patients can revisit.</p></article>
          <article><span>03</span><h3>Continuity after care</h3><p>Give patients and families access to guidance after leaving the hospital.</p></article>
          <article><span>04</span><h3>Scalable education</h3><p>Begin with endoscopy and extend across procedures, departments and languages.</p></article>
        </div>
        <p className="value-close">Designed to support healthcare teams—not replace the conversations that matter.</p>
      </section>

      <footer>
        <div className="footer-main"><a className="brand" href="#top" aria-label="Medivo AI home"><Logo/></a><nav><a href="#product">Product</a><a href="#solution">Solution</a><div><span>Resources</span><a href="/about">About</a><a href="/team">Team</a></div><a href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">Book Demo ↗</a></nav></div>
        <div className="footer-bottom"><small>© 2026 Medivo AI. All rights reserved.</small></div>
      </footer>
    </main>
  );
}
