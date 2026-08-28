"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarClock, Check, ClipboardCheck, Languages, MessageCircle, Play, RefreshCcw, Route } from "lucide-react";
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

const advantageIcons = [ClipboardCheck, Route, RefreshCcw];

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

const journeyCards = [
  { step: "01", kind: "before", titleKey: "journey.before.title", bodyKey: "journey.before.body" },
  { step: "02", kind: "hospital", titleKey: "journey.hospital.title", bodyKey: "journey.hospital.body" },
  { step: "03", kind: "after", titleKey: "journey.after.title", bodyKey: "journey.after.body" },
  { step: "04", kind: "home", titleKey: "journey.home.title", bodyKey: "journey.home.body" },
] satisfies { step: string; kind: "before" | "hospital" | "after" | "home"; titleKey: DictionaryKey; bodyKey: DictionaryKey }[];

type Translate = (key: DictionaryKey) => string;

function Logo({ priority = false }: { priority?: boolean }) {
  return <Image className="brand-logo" src="/medivo-logo-white-v2.png" alt="Medivo AI" width="1006" height="205" priority={priority} unoptimized />;
}

function WorkflowSceneContent({ index, t }: { index: number; t: Translate }) {
  return (
    <>
      {index === 0 && (
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
      )}
      {index === 1 && (
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
      )}
      {index === 2 && (
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
      )}
      {index === 3 && (
        <div className="workflow-scene scene-deliver">
          <Image src="/workflow-deliver.png" alt="" fill sizes="(max-width: 900px) 82vw, 46vw" unoptimized />
        </div>
      )}
    </>
  );
}

function JourneyVisual({ kind }: { kind: "before" | "hospital" | "after" | "home" }) {
  if (kind === "before") {
    return (
      <div className="journey-visual journey-visual-before" aria-hidden="true">
        <div className="journey-screen journey-screen-before">
          <div className="journey-card-header"><span>Prep guide</span><strong>Ready</strong></div>
          <div className="prep-stack">
            <div><Check size={15}/><span>Fasting window</span><strong>10:00 PM</strong></div>
            <div><CalendarClock size={15}/><span>Arrival time</span><strong>8:30 AM</strong></div>
            <div><ClipboardCheck size={15}/><span>Bring ID + referral</span><strong>Set</strong></div>
          </div>
          <div className="patient-prompt">
            <span>Ask about preparation...</span>
            <ArrowRight size={15}/>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "hospital") {
    return (
      <div className="journey-visual journey-visual-hospital" aria-hidden="true">
        <div className="hospital-workflow">
          <div className="workflow-node node-source">
            <span>01</span>
            <strong>Care pathway</strong>
            <small>Endoscopy preparation</small>
          </div>
          <ArrowRight className="workflow-arrow" size={18}/>
          <div className="workflow-node node-review">
            <span>02</span>
            <strong>Clinical review</strong>
            <small>Medication, diet, warning signs</small>
          </div>
          <ArrowRight className="workflow-arrow" size={18}/>
          <div className="workflow-node node-approve">
            <span>03</span>
            <strong>Approved</strong>
            <small>Patient-ready explanation</small>
          </div>
          <div className="workflow-checklist">
            <span><Check size={13}/> Plain language</span>
            <span><Check size={13}/> Clinician confirmed</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "after") {
    return (
      <div className="journey-visual journey-visual-after" aria-hidden="true">
        <div className="journey-video-card">
          <div className="video-hero">
            <div><Play size={24} fill="currentColor"/></div>
            <span>75+ languages</span>
          </div>
          <div className="video-details">
            <strong>Recovery video</strong>
            <p>Diet, activity, medication and follow-up explained in chapters.</p>
            <div className="chapter-track"><i/><i/><i/></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="journey-visual journey-visual-home" aria-hidden="true">
      <div className="iphone-15-frame">
        <i className="iphone-button iphone-button-left-top"/>
        <i className="iphone-button iphone-button-left-mid"/>
        <i className="iphone-button iphone-button-left-low"/>
        <i className="iphone-button iphone-button-right"/>
        <div className="iphone-screen">
          <div className="dynamic-island"/>
          <div className="phone-status"><span>9:41</span><span>5G</span></div>
          <MessageCircle size={19}/>
          <div className="phone-message">Your recovery video is ready</div>
          <div className="phone-video">
            <Play size={18} fill="currentColor"/>
          </div>
          <div className="phone-actions">
            <span><RefreshCcw size={12}/> Replay</span>
            <span><Languages size={12}/> Translate</span>
          </div>
        </div>
      </div>
    </div>
  );
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
            {workflow.map((_, index) => <WorkflowSceneContent key={index} index={index} t={t} />)}
          </div>
          <div className="step-indicator">{workflow.map((_, i) => <button key={i} className={active === i ? "active" : ""} onClick={() => document.querySelector(`[data-workflow-step='${i}']`)?.scrollIntoView({behavior:"smooth"})} aria-label={`View workflow step ${i + 1}`}><i/></button>)}</div>
          </div>
          <div className="workflow-copy">
            {workflow.map((item, i) => (
              <article key={item.step} data-workflow-step={i}>
                <p className="section-label">{item.step}</p>
                <h3>{t(item.titleKey)}</h3>
                <p>{t(item.bodyKey)}</p>
                <div className={`workflow-mobile-showcase workflow-showcase stage-${i}`} aria-hidden="true">
                  <WorkflowSceneContent index={i} t={t} />
                </div>
              </article>
            ))}
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
          {advantages.map((item, index) => {
            const AdvantageIcon = advantageIcons[index];
            return (
              <article className="advantage-card" key={item.titleKey}>
                {index < 3 ? (
                  <AdvantageIcon className="advantage-icon" aria-hidden="true" strokeWidth={1.7} />
                ) : (
                  <span className="advantage-marker">{item.marker}</span>
                )}
                <div>
                  <h3>{t(item.titleKey)}</h3>
                  <p>{t(item.bodyKey)}</p>
                </div>
              </article>
            );
          })}
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
                  <span className="benefit-mobile-copy">
                    <strong>{t(item.titleKey)}</strong>
                    <span>{t(item.bodyKey)}</span>
                  </span>
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
          {journeyCards.map((item) => (
            <article className={`journey-card journey-card-${item.kind}`} key={item.kind}>
              <h3>{t(item.titleKey)}</h3>
              <JourneyVisual kind={item.kind} />
              <p>{t(item.bodyKey)}</p>
            </article>
          ))}
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
