import type { Metadata } from "next";
import Link from "next/link";
import { EditorialFooter, EditorialHeader } from "../components/EditorialChrome";
import { Trans } from "../components/I18n";

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
          <p className="editorial-kicker"><Trans k="about.kicker" /></p>
          <h1><Trans k="about.title" /></h1>
        </div>
        <p className="editorial-manifesto"><Trans k="about.manifesto" /></p>
      </section>

      <section className="about-film" aria-label="Patient education beyond the hospital visit">
        <video autoPlay muted loop playsInline preload="metadata" poster="/medivo-hero-poster.webp">
          <source src="/medivo-hero.mp4" type="video/mp4" />
        </video>
        <div className="about-film-shade" />
        <p><Trans k="about.film" /></p>
      </section>

      <section className="editorial-split about-purpose">
        <div>
          <p className="editorial-kicker"><Trans k="about.what" /></p>
          <h2><Trans k="about.purpose" /></h2>
        </div>
        <div className="editorial-copy-stack">
          <p className="editorial-lead"><Trans k="about.lead" /></p>
          <p><Trans k="about.body" /></p>
          <Link className="editorial-text-link" href="/#product"><span><Trans k="about.explore" /></span><b>→</b></Link>
        </div>
      </section>

      <section className="about-belief">
        <p className="editorial-kicker"><Trans k="about.belief" /></p>
        <div className="about-belief-list">
          <article><h3><Trans k="about.belief1.title" /></h3><p><Trans k="about.belief1.body" /></p></article>
          <article><h3><Trans k="about.belief2.title" /></h3><p><Trans k="about.belief2.body" /></p></article>
          <article><h3><Trans k="about.belief3.title" /></h3><p><Trans k="about.belief3.body" /></p></article>
        </div>
      </section>

      <section className="cta-band">
        <h2><Trans k="cta.title" /></h2>
        <a className="button" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Product%20Demo"><Trans k="nav.bookDemoLower" /> <span>↗</span></a>
      </section>

      <EditorialFooter />
    </main>
  );
}
