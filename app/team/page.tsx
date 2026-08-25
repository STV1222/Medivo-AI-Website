import type { Metadata } from "next";
import Image from "next/image";
import { EditorialFooter, EditorialHeader } from "../components/EditorialChrome";
import { Trans, type DictionaryKey } from "../components/I18n";

export const metadata: Metadata = {
  title: "Team — Medivo AI",
  description: "Meet the founders building Medivo AI at the intersection of healthcare, engineering and artificial intelligence.",
};

const founders = [
  {
    number: "01",
    name: "Chang-Syu Chen",
    roleKey: "team.chang.role",
    image: "/chang-syu-chen.webp",
    alt: "Chang-Syu Chen, Founder and CEO of Medivo AI",
    statementKey: "team.chang.statement",
    detailKeys: [
      "team.chang.detail1",
      "team.chang.detail2",
      "team.chang.detail3",
    ],
  },
  {
    number: "02",
    name: "Jiale Li",
    roleKey: "team.jiale.role",
    image: "/jiale-li.webp",
    alt: "Jiale Li, Cofounder and CTO of Medivo AI",
    statementKey: "team.jiale.statement",
    detailKeys: [
      "team.jiale.detail1",
      "team.jiale.detail2",
      "team.jiale.detail3",
    ],
  },
  {
    number: "03",
    name: "Heye Fan",
    roleKey: "team.heye.role",
    image: null,
    alt: "Heye Fan, Cofounder and Technical Lead of Medivo AI",
    statementKey: "team.heye.statement",
    detailKeys: [
      "team.heye.detail1",
      "team.heye.detail2",
    ],
  },
] satisfies {
  number: string;
  name: string;
  roleKey: DictionaryKey;
  image: string | null;
  alt: string;
  statementKey: DictionaryKey;
  detailKeys: DictionaryKey[];
}[];

export default function TeamPage() {
  return (
    <main className="editorial-page team-page">
      <EditorialHeader />

      <section className="editorial-hero team-hero">
        <div>
          <p className="editorial-kicker"><Trans k="team.kicker" /></p>
          <h1><Trans k="team.title" /></h1>
        </div>
        <p className="editorial-manifesto"><Trans k="team.manifesto" /></p>
      </section>

      <section className="founder-list">
        {founders.map((founder) => (
          <article className="founder-profile" key={founder.name}>
            <div className="founder-image-wrap">
              {founder.image ? (
                <Image src={founder.image} alt={founder.alt} fill sizes="(max-width: 900px) 100vw, 53vw" />
              ) : (
                <div className="founder-placeholder" aria-label={founder.alt}>
                  <b>{founder.name.split(" ").map((part) => part[0]).join("")}</b>
                </div>
              )}
              <span>{founder.number}</span>
            </div>
            <div className="founder-copy">
              <p className="editorial-kicker"><Trans k={founder.roleKey} /></p>
              <h2>{founder.name}</h2>
              <p className="founder-statement"><Trans k={founder.statementKey} /></p>
              <ul>
                {founder.detailKeys.map((detailKey) => <li key={detailKey}><Trans k={detailKey} /></li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="team-principle">
        <p className="editorial-kicker"><Trans k="team.approach" /></p>
        <h2><Trans k="team.principle" /></h2>
        <p><Trans k="team.principleBody" /></p>
        <span className="editorial-index">04</span>
      </section>

      <section className="cta-band">
        <h2><Trans k="cta.title" /></h2>
        <a className="button" href="mailto:hello@medivo.ai?subject=Medivo%20AI%20Product%20Demo"><Trans k="nav.bookDemoLower" /> <span>↗</span></a>
      </section>

      <EditorialFooter />
    </main>
  );
}
