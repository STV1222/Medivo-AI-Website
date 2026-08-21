import type { Metadata } from "next";
import { EditorialFooter, EditorialHeader } from "../components/EditorialChrome";

export const metadata: Metadata = {
  title: "About Medivo AI — Why We’re Here",
  description: "Medivo AI is building clinician-controlled patient education that remains clear, personal and available beyond the hospital visit.",
};

export default function AboutPage() {
  return (
    <main className="editorial-page about-page">
      <EditorialHeader />

      <section className="editorial-hero">
        <div>
          <p className="editorial-kicker">ABOUT MEDIVO AI</p>
          <h1>Why we’re here</h1>
        </div>
        <p className="editorial-manifesto">We believe important medical information should remain understandable after the hospital visit.</p>
      </section>

      <section className="about-film" aria-label="Patient education beyond the hospital visit">
        <video autoPlay muted loop playsInline preload="metadata" poster="/medivo-hero-poster.webp">
          <source src="/medivo-hero.mp4" type="video/mp4" />
        </video>
        <div className="about-film-shade" />
        <p>Patient understanding should not end when the conversation does.</p>
        <span className="editorial-index">01</span>
      </section>

      <section className="editorial-split about-purpose">
        <div>
          <p className="editorial-kicker">WHAT WE DO</p>
          <h2>From medical instruction to patient understanding.</h2>
        </div>
        <div className="editorial-copy-stack">
          <p className="editorial-lead">Medivo AI helps healthcare teams turn confirmed medical instructions into clear, personalised patient education videos.</p>
          <p>Healthcare professionals remain part of the workflow before anything is delivered. Patients receive a mobile-accessible guide they can see, hear and revisit when questions arise at home.</p>
          <a className="editorial-text-link" href="/#product"><span>Explore the product</span><b>→</b></a>
        </div>
        <span className="editorial-index">02</span>
      </section>

      <section className="about-belief">
        <p className="editorial-kicker">OUR BELIEF</p>
        <h2>Technology should support the conversations that matter—not replace them.</h2>
        <div className="about-belief-grid">
          <article><span>01</span><h3>Clinician controlled</h3><p>Healthcare professionals check and confirm the relevant information before patient delivery.</p></article>
          <article><span>02</span><h3>Built for understanding</h3><p>Voice, visuals and clear language help make complex instructions easier to revisit.</p></article>
          <article><span>03</span><h3>Designed for care beyond the visit</h3><p>Patients and families can return to their guidance after leaving the hospital.</p></article>
        </div>
        <span className="editorial-index">03</span>
      </section>

      <section className="editorial-split about-stage">
        <div>
          <p className="editorial-kicker">WHERE WE ARE</p>
          <h2>Starting focused. Learning with clinical teams.</h2>
        </div>
        <div className="editorial-copy-stack">
          <p className="editorial-lead">Medivo AI is currently developing its product prototype and hospital pilot partnerships.</p>
          <p>We are beginning with defined patient education workflows, including endoscopy, to understand clinical fit, healthcare-professional review, and the patient experience before expanding further.</p>
        </div>
        <span className="editorial-index">04</span>
      </section>

      <section className="editorial-close">
        <p>Let every medical explanation be truly understood.</p>
        <a href="/team">Meet the team <span>→</span></a>
      </section>

      <EditorialFooter />
    </main>
  );
}
