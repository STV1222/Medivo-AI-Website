"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const workflow = [
  { step: "01", title: "Prepare", body: "Select the medical field and care pathway, then add the relevant instructions for the patient’s procedure and recovery." },
  { step: "02", title: "Review", body: "Healthcare professionals view the content, confirm the clinical details and approve the patient-facing guidance." },
  { step: "03", title: "Create", body: "Medivo AI runs the approved brief through its generation system and creates a clear patient education video." },
  { step: "04", title: "Deliver", body: "The patient receives a mobile link and can revisit the video after leaving care." },
];

const platformTabs = ["Prepare", "Review", "Preview", "Deliver"];

const problemCards = [
  {
    step: "01",
    title: "Preparation",
    body: "Fasting, timing and transport requirements arrive before the procedure.",
    tags: ["Nothing after midnight", "Arrival time", "Transport home"],
  },
  {
    step: "02",
    title: "Recovery",
    body: "Diet, activity and symptom guidance matter most once the patient is home.",
    tags: ["What to eat", "Activity limits", "Expected symptoms"],
  },
  {
    step: "03",
    title: "Medication",
    body: "Dose changes and side effects are easy to confuse after a stressful visit.",
    tags: ["Dose & timing", "Side effects", "When to restart"],
  },
  {
    step: "04",
    title: "Follow-up",
    body: "Appointments and warning signs compete with everything else the patient has heard.",
    tags: ["Return date", "When to seek help", "Who to contact"],
  },
];

function Logo({ priority = false }: { priority?: boolean }) {
  return <Image className="brand-logo" src="/medivo-logo-white-v2.png" alt="Medivo AI" width="1006" height="205" priority={priority} />;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [platform, setPlatform] = useState(0);
  const [menu, setMenu] = useState(false);
  const [resources, setResources] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const problemTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-workflow-step]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(Number((entry.target as HTMLElement).dataset.workflowStep)));
    }, { rootMargin: "-38% 0px -48%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const closeMenu = () => { setMenu(false); setResources(false); };
  const scrollProblems = (direction: number) => {
    const track = problemTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.82, 760), behavior: "smooth" });
  };

  return (
    <main>
      <header className={headerScrolled ? "site-header scrolled" : "site-header"}>
        <a className="brand" href="#top" aria-label="Medivo AI home"><Logo priority /></a>
        <nav className={menu ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#product" onClick={closeMenu}>Product</a>
          <a href="#solution" onClick={closeMenu}>Solution</a>
          <div className="resource-menu">
            <button onClick={() => setResources(!resources)} aria-expanded={resources}>Resources <span>⌄</span></button>
            <div className={resources ? "resource-dropdown show" : "resource-dropdown"}>
              <span className="resource-dropdown-label">Resources</span>
              <a href="/about" onClick={closeMenu}>About</a>
              <a href="/team" onClick={closeMenu}>Team</a>
            </div>
          </div>
        </nav>
        <a className="button button-light header-cta" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">Book demo <span>↗</span></a>
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
        <div className="problem-heading">
          <p className="section-eyebrow">The problem</p>
          <h2>Patients receive important instructions in minutes.<br/><span>They are expected to remember them for days.</span></h2>
        </div>

        <div className="problem-track" ref={problemTrackRef}>
          {problemCards.map((card) => (
            <article className="problem-card" key={card.step}>
              <span className="problem-card-index">{card.step}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="problem-tags">
                {card.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="problem-controls" aria-label="Browse instruction categories">
          <button type="button" onClick={() => scrollProblems(-1)} aria-label="Previous categories">←</button>
          <button type="button" onClick={() => scrollProblems(1)} aria-label="Next categories">→</button>
        </div>

        <div className="problem-editorial">
          <div className="problem-image-slot" role="img" aria-label="An older patient at home reviewing discharge instructions">
            <span>01</span>
          </div>
          <div className="problem-editorial-copy">
            <h3>The information matters most<br/><span className="muted-line">after the patient leaves.</span></h3>
            <p>But patients are often left to reconstruct it from memory, paperwork and hurried conversations.</p>
          </div>
        </div>
      </section>

      <section className="solution" id="solution">
        <div className="solution-heading">
          <p className="section-eyebrow">Our solution</p>
          <h2>Guidance that stays<br/><span className="muted-line">with the patient.</span></h2>
          <p className="solution-lead">Medivo AI turns confirmed medical instructions into a clear, personalised video patients can watch—and revisit—from their phone.</p>
        </div>

        <div className="solution-outcome" aria-label="A Medivo AI endoscopy recovery guide delivered to a patient’s phone">
          <div className="solution-message">
            <p>From a stressful conversation<br/><span className="muted-line">to a calm, visual guide.</span></p>
            <div className="solution-proof">
              <span>CLINICIAN-REVIEWED</span>
              <span>AVAILABLE AT HOME</span>
            </div>
          </div>

          <div className="patient-phone">
            <video
              className="patient-phone-demo"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/medivo-phone-demo-poster.png"
              aria-label="A patient education video playing on a phone"
            >
              <source src="/medivo-phone-demo.mp4" type="video/mp4" />
              <source src="/medivo-phone-demo.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </section>

      <section className="workflow" id="product">
        <div className="workflow-intro"><p className="section-eyebrow">Product workflow</p><h2>From clinical instruction<br/><span className="muted-line">to patient understanding.</span></h2></div>
        <div className="workflow-body">
          <div className="workflow-visual">
          <div className={`workflow-showcase stage-${active}`} aria-hidden="true">
            <div className="workflow-scene scene-prepare">
              <div className="workflow-browser">
                <div className="browser-bar"><i /><i /><i /><span>Medivo AI</span></div>
                <div className="browser-body">
                  <p className="field-label">Medical field</p>
                  <div className="select-control">Endoscopy <span>⌄</span></div>
                  <div className="select-menu">
                    <span>Endoscopy</span>
                    <span>Cardiology</span>
                    <span>Orthopaedics</span>
                    <span>Medication review</span>
                  </div>
                  <div className="brief-card">
                    <b>Patient pathway</b>
                    <p>Preparation, recovery and follow-up instructions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="workflow-scene scene-review">
              <div className="workflow-browser review-browser">
                <div className="browser-bar"><i /><i /><i /><span>Clinical review</span></div>
                <div className="browser-body">
                  <div className="review-row"><span>Procedure</span><b>Confirmed</b></div>
                  <div className="review-row"><span>Diet guidance</span><b>Confirmed</b></div>
                  <div className="review-row"><span>Medication changes</span><b>Confirmed</b></div>
                  <div className="review-note">
                    <strong>Ready for video creation</strong>
                    <p>Reviewed by care team before delivery.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="workflow-scene scene-create">
              <div className="workflow-browser create-browser">
                <div className="browser-bar"><i /><i /><i /><span>Video creation</span></div>
                <div className="browser-body">
                  <div className="create-status">
                    <span>CREATE VIDEO</span>
                    <h3>Generating patient education video</h3>
                    <div className="generation-meter"><i /></div>
                    <div className="generation-steps">
                      <p><b /> Structuring approved content</p>
                      <p><b /> Creating visuals and narration</p>
                      <p><b /> Preparing mobile preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="workflow-scene scene-deliver">
              <Image src="/workflow-deliver.png" alt="" fill sizes="(max-width: 900px) 82vw, 46vw" />
            </div>
          </div>
          <div className="step-indicator">{workflow.map((_, i) => <button key={i} className={active === i ? "active" : ""} onClick={() => document.querySelector(`[data-workflow-step='${i}']`)?.scrollIntoView({behavior:"smooth"})} aria-label={`View workflow step ${i + 1}`}><i/></button>)}</div>
          </div>
          <div className="workflow-copy">
            {workflow.map((item, i) => <article key={item.step} data-workflow-step={i}><p className="section-label">{item.step}</p><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="platform">
        <div className="section-head"><div><p className="section-eyebrow">The platform</p><h2>One platform for patient education.</h2></div></div>
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
        <p className="section-eyebrow">Patient journey</p>
        <h2>Support patients before and after their procedure.</h2>
        <div className="journey">
          <article><span>01</span><h3>Before</h3><p>Preparation requirements, timing and what to expect.</p></article>
          <article><span>02</span><h3>At the hospital</h3><p>Healthcare professionals confirm the relevant instructions.</p></article>
          <article><span>03</span><h3>After</h3><p>Recovery, diet, medication and follow-up guidance.</p></article>
          <article><span>04</span><h3>At home</h3><p>Patients and families revisit the information when questions arise.</p></article>
        </div>
      </section>

      <section className="value">
        <p className="section-eyebrow">Why Medivo AI</p>
        <h2>Extend patient communication beyond the hospital visit.<br/><span>Not just another instruction sheet.</span></h2>
        <div className="comparison-grid">
          <article className="comparison-card comparison-traditional">
            <h3>Traditional communication</h3>
            <ul>
              <li>Explain instructions once during a busy appointment</li>
              <li>Send patients home with paper leaflets or static PDFs</li>
              <li>Repeat the same guidance across phone calls and visits</li>
              <li>Leave families to interpret details after care</li>
            </ul>
          </article>
          <article className="comparison-card comparison-medivo">
            <div className="comparison-brand"><Logo/><span>AI</span></div>
            <ul>
              <li>Turn approved instructions into clear personalised video</li>
              <li>Give patients a mobile guide they can revisit at home</li>
              <li>Keep education aligned with the care team’s review</li>
              <li>Scale consistent guidance across pathways and languages</li>
              <li>Support understanding before questions become confusion</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="cta-band">
        <h2>Bring patient education video into a real care pathway.</h2>
        <a className="button" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Product%20Demo">Book demo <span>↗</span></a>
      </section>

      <footer>
        <div className="footer-main"><a className="brand" href="#top" aria-label="Medivo AI home"><Logo/></a><nav><a href="#product">Product</a><a href="#solution">Solution</a><div><span>Resources</span><a href="/about">About</a><a href="/team">Team</a></div><a href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">Book Demo ↗</a></nav></div>
        <div className="footer-bottom"><small>© 2026 Medivo AI. All rights reserved.</small></div>
      </footer>
    </main>
  );
}
