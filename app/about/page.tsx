import type { Metadata } from "next";
import Link from "next/link";
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
          <Link className="editorial-text-link" href="/#product"><span>Explore the product</span><b>→</b></Link>
        </div>
        <span className="editorial-index">02</span>
      </section>

      <section className="about-belief">
        <p className="editorial-kicker">OUR BELIEF</p>
        <div className="about-belief-list">
          <article><h3>Clinician controlled</h3><p>Healthcare professionals check and confirm the relevant information before patient delivery.</p></article>
          <article><h3>Built for understanding</h3><p>Voice, visuals and clear language help make complex instructions easier to revisit.</p></article>
          <article><h3>Available beyond the visit</h3><p>Patients and families can return to their guidance after leaving the hospital.</p></article>
        </div>
        <span className="editorial-index">03</span>
      </section>

      <section className="cta-band">
        <h2>Bring patient education video into a real care pathway.</h2>
        <a className="button" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Product%20Demo">Book demo <span>↗</span></a>
      </section>

      <EditorialFooter />
    </main>
  );
}
