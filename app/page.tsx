"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { flushSync } from "react-dom";
import { FooterLanguage } from "./components/FooterLanguage";
import { Trans, useT, type DictionaryKey } from "./components/I18n";

const workflow = [
  { step: "01", titleKey: "workflow.prepare.title", bodyKey: "workflow.prepare.body" },
  { step: "02", titleKey: "workflow.review.title", bodyKey: "workflow.review.body" },
  { step: "03", titleKey: "workflow.create.title", bodyKey: "workflow.create.body" },
  { step: "04", titleKey: "workflow.deliver.title", bodyKey: "workflow.deliver.body" },
] satisfies { step: string; titleKey: DictionaryKey; bodyKey: DictionaryKey }[];

const platformTabs = [
  "workflow.prepare.title",
  "workflow.review.title",
  "platform.preview",
  "workflow.deliver.title",
] satisfies DictionaryKey[];

const problemCards = [
  {
    step: "01",
    titleKey: "problem.preparation.title",
    bodyKey: "problem.preparation.body",
    tagKeys: ["problem.preparation.tag1", "problem.preparation.tag2", "problem.preparation.tag3"],
  },
  {
    step: "02",
    titleKey: "problem.recovery.title",
    bodyKey: "problem.recovery.body",
    tagKeys: ["problem.recovery.tag1", "problem.recovery.tag2", "problem.recovery.tag3"],
  },
  {
    step: "03",
    titleKey: "problem.medication.title",
    bodyKey: "problem.medication.body",
    tagKeys: ["problem.medication.tag1", "problem.medication.tag2", "problem.medication.tag3"],
  },
  {
    step: "04",
    titleKey: "problem.followup.title",
    bodyKey: "problem.followup.body",
    tagKeys: ["problem.followup.tag1", "problem.followup.tag2", "problem.followup.tag3"],
  },
] satisfies { step: string; titleKey: DictionaryKey; bodyKey: DictionaryKey; tagKeys: DictionaryKey[] }[];

const advantages = [
  { marker: "01", titleKey: "advantage.clinician.title", bodyKey: "advantage.clinician.body" },
  { marker: "02", titleKey: "advantage.personal.title", bodyKey: "advantage.personal.body" },
  { marker: "03", titleKey: "advantage.clear.title", bodyKey: "advantage.clear.body" },
  { marker: "75+", titleKey: "advantage.languages.title", bodyKey: "advantage.languages.body" },
] satisfies { marker: string; titleKey: DictionaryKey; bodyKey: DictionaryKey }[];

const hospitalBenefits = [
  {
    labelKey: "hospital.workload.label",
    titleKey: "hospital.workload.title",
    bodyKey: "hospital.workload.body",
    image: "/healthcare-workload.webp",
    altKey: "hospital.workload.alt",
  },
  {
    labelKey: "hospital.standard.label",
    titleKey: "hospital.standard.title",
    bodyKey: "hospital.standard.body",
    image: "/healthcare-standard.webp",
    altKey: "hospital.standard.alt",
  },
  {
    labelKey: "hospital.home.label",
    titleKey: "hospital.home.title",
    bodyKey: "hospital.home.body",
    image: "/healthcare-home.webp",
    altKey: "hospital.home.alt",
  },
] satisfies { labelKey: DictionaryKey; titleKey: DictionaryKey; bodyKey: DictionaryKey; image: string; altKey: DictionaryKey }[];

function Logo({ priority = false }: { priority?: boolean }) {
  return <Image className="brand-logo" src="/medivo-logo-white-v2.png" alt="Medivo AI" width="1006" height="205" priority={priority} unoptimized />;
}

export default function Home() {
  const t = useT();
  const [active, setActive] = useState(0);
  const [platform, setPlatform] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState(2);
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
  const selectBenefit = (index: number) => {
    if (index === activeBenefit) return;
    const previousRects = new Map(
      Array.from(document.querySelectorAll<HTMLElement>("[data-benefit-motion]")).map((item) => [
        item.dataset.benefitMotion,
        item.getBoundingClientRect(),
      ])
    );

    flushSync(() => setActiveBenefit(index));
    window.requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>("[data-benefit-motion]").forEach((item) => {
        const previous = previousRects.get(item.dataset.benefitMotion);
        const current = item.getBoundingClientRect();
        if (!previous) return;
        const x = previous.left - current.left;
        const y = previous.top - current.top;
        if (Math.abs(x) < 1 && Math.abs(y) < 1) return;
        item.animate(
          [{ transform: `translate3d(${x}px, ${y}px, 0)` }, { transform: "translate3d(0, 0, 0)" }],
          { duration: 620, easing: "cubic-bezier(.16,1,.3,1)" }
        );
      });
    });
  };
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
          <a href="#product" onClick={closeMenu}>{t("nav.product")}</a>
          <a href="#solution" onClick={closeMenu}>{t("nav.solution")}</a>
          <div className="resource-menu">
            <button onClick={() => setResources(!resources)} aria-expanded={resources}>{t("nav.resources")} <span>⌄</span></button>
            <div className={resources ? "resource-dropdown show" : "resource-dropdown"}>
              <span className="resource-dropdown-label">{t("nav.resources")}</span>
              <a href="/about" onClick={closeMenu}>{t("nav.about")}</a>
              <a href="/team" onClick={closeMenu}>{t("nav.team")}</a>
            </div>
          </div>
        </nav>
        <a className="button button-light header-cta" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">{t("nav.bookDemoLower")} <span>↗</span></a>
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
        <h1>{t("home.hero.title").split("\n").map((line, index) => <span key={line}>{index > 0 ? <br /> : null}{line}</span>)}</h1>
        <a className="scroll-note" href="#problem">{t("home.hero.scroll")} <span>↓</span></a>
      </section>

      <section className="problem" id="problem">
        <div className="problem-heading">
          <p className="section-eyebrow">{t("problem.eyebrow")}</p>
          <h2>{t("problem.title")}<br/><span>{t("problem.subtitle")}</span></h2>
        </div>

        <div className="problem-track" ref={problemTrackRef}>
          {problemCards.map((card) => (
            <article className="problem-card" key={card.step}>
              <span className="problem-card-index">{card.step}</span>
              <h3>{t(card.titleKey)}</h3>
              <p>{t(card.bodyKey)}</p>
              <div className="problem-tags">
                {card.tagKeys.map((tagKey) => <span key={tagKey}>{t(tagKey)}</span>)}
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
            <h3>{t("problem.editorial.title")}<br/><span className="muted-line">{t("problem.editorial.subtitle")}</span></h3>
            <p>{t("problem.editorial.body")}</p>
          </div>
        </div>
      </section>

      <section className="solution" id="solution">
        <div className="solution-heading">
          <p className="section-eyebrow">{t("solution.eyebrow")}</p>
          <h2>{t("solution.title")}<br/><span className="muted-line">{t("solution.subtitle")}</span></h2>
          <p className="solution-lead">{t("solution.lead")}</p>
        </div>

        <div className="solution-outcome" aria-label="A Medivo AI endoscopy recovery guide delivered to a patient’s phone">
          <div className="solution-message">
            <p>{t("solution.outcome.title")}<br/><span className="muted-line">{t("solution.outcome.subtitle")}</span></p>
            <div className="solution-proof">
              <span>{t("solution.proof.clinician")}</span>
              <span>{t("solution.proof.home")}</span>
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
        <div className="workflow-intro"><p className="section-eyebrow">{t("workflow.eyebrow")}</p><h2>{t("workflow.title")}<br/><span className="muted-line">{t("workflow.subtitle")}</span></h2></div>
        <div className="workflow-body">
          <div className="workflow-visual">
          <div className={`workflow-showcase stage-${active}`} aria-hidden="true">
            <div className="workflow-scene scene-prepare">
              <div className="workflow-browser">
                <div className="browser-bar"><i /><i /><i /><span>Medivo AI</span></div>
                <div className="browser-body">
                  <p className="field-label">{t("workflow.field")}</p>
                  <div className="select-control">{t("workflow.endoscopy")} <span>⌄</span></div>
                  <div className="select-menu">
                    <span>{t("workflow.endoscopy")}</span>
                    <span>{t("workflow.cardiology")}</span>
                    <span>{t("workflow.orthopaedics")}</span>
                    <span>{t("workflow.medicationReview")}</span>
                  </div>
                  <div className="brief-card">
                    <b>{t("workflow.pathway")}</b>
                    <p>{t("workflow.pathwayBody")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="workflow-scene scene-review">
              <div className="workflow-browser review-browser">
                <div className="browser-bar"><i /><i /><i /><span>{t("workflow.clinicalReview")}</span></div>
                <div className="browser-body">
                  <div className="review-row"><span>{t("workflow.procedure")}</span><b>{t("workflow.confirmed")}</b></div>
                  <div className="review-row"><span>{t("workflow.diet")}</span><b>{t("workflow.confirmed")}</b></div>
                  <div className="review-row"><span>{t("workflow.medChanges")}</span><b>{t("workflow.confirmed")}</b></div>
                  <div className="review-note">
                    <strong>{t("workflow.ready")}</strong>
                    <p>{t("workflow.reviewed")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="workflow-scene scene-create">
              <div className="workflow-browser create-browser">
                <div className="browser-bar"><i /><i /><i /><span>{t("workflow.videoCreation")}</span></div>
                <div className="browser-body">
                  <div className="create-status">
                    <span>{t("workflow.createVideo")}</span>
                    <h3>{t("workflow.generating")}</h3>
                    <div className="generation-meter"><i /></div>
                    <div className="generation-steps">
                      <p><b /> {t("workflow.step1")}</p>
                      <p><b /> {t("workflow.step2")}</p>
                      <p><b /> {t("workflow.step3")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="workflow-scene scene-deliver">
              <Image src="/workflow-deliver.png" alt="" fill sizes="(max-width: 900px) 82vw, 46vw" unoptimized />
            </div>
          </div>
          <div className="step-indicator">{workflow.map((_, i) => <button key={i} className={active === i ? "active" : ""} onClick={() => document.querySelector(`[data-workflow-step='${i}']`)?.scrollIntoView({behavior:"smooth"})} aria-label={`View workflow step ${i + 1}`}><i/></button>)}</div>
          </div>
          <div className="workflow-copy">
            {workflow.map((item, i) => <article key={item.step} data-workflow-step={i}><p className="section-label">{item.step}</p><h3>{t(item.titleKey)}</h3><p>{t(item.bodyKey)}</p></article>)}
          </div>
        </div>
      </section>

      <section className="platform">
        <div className="section-head"><div><p className="section-eyebrow">{t("platform.eyebrow")}</p><h2>{t("platform.title")}</h2></div></div>
        <div className="platform-tabs" role="tablist">{platformTabs.map((tabKey, i) => <button role="tab" aria-selected={platform === i} className={platform === i ? "active" : ""} onClick={() => setPlatform(i)} key={tabKey}><span>0{i+1}</span>{t(tabKey)}</button>)}</div>
        <div className={`platform-window view-${platform}`}>
          <div className="app-nav"><span><Logo/></span><i/><i/><i/></div>
          <div className="app-main">
            <div className="app-top"><small>{t("platform.education")}</small><b>{t(platformTabs[platform])}</b><span className="prototype">{t("platform.prototype")}</span></div>
            <div className="app-content">
              <div className="app-list"><i/><i/><i/><i/><i/></div>
              <div className="app-preview"><div className="preview-media"><span>{platform === 2 || platform === 3 ? "▶" : "✓"}</span></div><b>{platform === 0 ? t("platform.instructions") : platform === 1 ? t("platform.confirmation") : platform === 2 ? t("platform.videoPreview") : t("platform.deliveryStatus")}</b><p>{platform === 3 ? t("platform.ready") : t("platform.endoscopyEducation")}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="advantages">
        <div className="section-head">
          <div>
            <p className="section-eyebrow">{t("advantage.eyebrow")}</p>
            <h2>{t("advantage.title")}<br/><span>{t("advantage.subtitle")}</span></h2>
          </div>
        </div>
        <div className="advantage-grid">
          {advantages.map((item) => (
            <article className="advantage-card" key={item.titleKey}>
              <span className="advantage-marker">{item.marker}</span>
              <div>
                <h3>{t(item.titleKey)}</h3>
                <p>{t(item.bodyKey)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hospital-benefits">
        <div className="hospital-benefits-copy">
          <p className="section-eyebrow">{t("hospital.eyebrow")}</p>
          <h2>{t("hospital.title")}<br/><span>{t("hospital.subtitle")}</span></h2>
        </div>
        <div className="hospital-benefit-shell">
          <div className="hospital-benefit-slider">
            {hospitalBenefits.map((item, index) => (
              <Fragment key={item.titleKey}>
                {activeBenefit === index && (
                  <article className="benefit-content-card" data-benefit-motion="content" aria-live="polite">
                    <h3>{t(item.titleKey)}</h3>
                    <p>{t(item.bodyKey)}</p>
                  </article>
                )}
                <button
                  type="button"
                  className={activeBenefit === index ? "benefit-image-card active" : "benefit-image-card"}
                  onPointerEnter={() => selectBenefit(index)}
                  onMouseEnter={() => selectBenefit(index)}
                  onFocus={() => selectBenefit(index)}
                  onClick={() => selectBenefit(index)}
                  aria-pressed={activeBenefit === index}
                  data-benefit-motion={`card-${index}`}
                >
                  <span
                    className="benefit-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                    role="img"
                    aria-label={t(item.altKey)}
                  />
                  <span className="benefit-pill">{t(item.labelKey)}</span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="endoscopy">
        <p className="section-eyebrow">{t("journey.eyebrow")}</p>
        <h2>{t("journey.title")}</h2>
        <div className="journey">
          <article><span>01</span><h3>{t("journey.before.title")}</h3><p>{t("journey.before.body")}</p></article>
          <article><span>02</span><h3>{t("journey.hospital.title")}</h3><p>{t("journey.hospital.body")}</p></article>
          <article><span>03</span><h3>{t("journey.after.title")}</h3><p>{t("journey.after.body")}</p></article>
          <article><span>04</span><h3>{t("journey.home.title")}</h3><p>{t("journey.home.body")}</p></article>
        </div>
      </section>

      <section className="value">
        <p className="section-eyebrow">{t("value.eyebrow")}</p>
        <h2>{t("value.title")}<br/><span>{t("value.subtitle")}</span></h2>
        <div className="comparison-grid">
          <article className="comparison-card comparison-traditional">
            <h3>{t("value.traditional")}</h3>
            <ul>
              <li>{t("value.traditional1")}</li>
              <li>{t("value.traditional2")}</li>
              <li>{t("value.traditional3")}</li>
              <li>{t("value.traditional4")}</li>
            </ul>
          </article>
          <article className="comparison-card comparison-medivo">
            <div className="comparison-brand"><Logo/><span>AI</span></div>
            <ul>
              <li>{t("value.medivo1")}</li>
              <li>{t("value.medivo2")}</li>
              <li>{t("value.medivo3")}</li>
              <li>{t("value.medivo4")}</li>
              <li>{t("value.medivo5")}</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="cta-band">
        <h2>{t("cta.title")}</h2>
        <a className="button" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Product%20Demo">{t("nav.bookDemoLower")} <span>↗</span></a>
      </section>

      <footer>
        <div className="footer-main"><a className="brand" href="#top" aria-label="Medivo AI home"><Logo/></a><nav><a href="#product">{t("nav.product")}</a><a href="#solution">{t("nav.solution")}</a><div><span>{t("nav.resources")}</span><a href="/about">{t("nav.about")}</a><a href="/team">{t("nav.team")}</a></div><a href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Demo">{t("nav.bookDemo")} ↗</a></nav></div>
        <div className="footer-bottom"><small><Trans k="footer.rights" /></small><FooterLanguage /></div>
      </footer>
    </main>
  );
}
