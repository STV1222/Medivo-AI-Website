import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialFooter, EditorialHeader } from "../components/EditorialChrome";

export const metadata: Metadata = {
  title: "Team — Medivo AI",
  description: "Meet the founders building Medivo AI at the intersection of healthcare, engineering and artificial intelligence.",
};

const founders = [
  {
    number: "01",
    name: "Chang-Syu Chen",
    role: "Founder & CEO",
    image: "/chang-syu-chen.webp",
    alt: "Chang-Syu Chen, Founder and CEO of Medivo AI",
    statement: "Building products where healthcare needs, engineering and patient experience meet.",
    details: [
      "Master’s in Medical Device Design and Entrepreneurship, Imperial College London",
      "BEng Mechatronic Engineering, University of Manchester",
      "Experience taking AI products from research and development through launch",
    ],
  },
  {
    number: "02",
    name: "Jiale Li",
    role: "Cofounder & CTO",
    image: "/jiale-li.webp",
    alt: "Jiale Li, Cofounder and CTO of Medivo AI",
    statement: "Turning advanced AI research into systems designed for real-world use.",
    details: [
      "MSc Artificial Intelligence and Robotics, University College London",
      "BEng Electrical and Electronic Engineering, University of Manchester",
      "Specialist experience in embodied artificial intelligence",
    ],
  },
];

export default function TeamPage() {
  return (
    <main className="editorial-page team-page">
      <EditorialHeader />

      <section className="editorial-hero team-hero">
        <div>
          <p className="editorial-kicker">THE TEAM</p>
          <h1>Who we are</h1>
        </div>
        <p className="editorial-manifesto">A team working at the intersection of healthcare, engineering and artificial intelligence.</p>
      </section>

      <section className="team-intro">
        <p className="editorial-kicker">WHY THIS TEAM</p>
        <h2>We combine medical-device thinking with experience building AI systems.</h2>
        <p>Medivo AI was founded to address a practical communication problem: patients often leave care with important instructions they cannot easily remember or revisit. Our role is to turn that problem into a focused, clinician-controlled product.</p>
        <span className="editorial-index">01</span>
      </section>

      <section className="founder-list">
        {founders.map((founder) => (
          <article className="founder-profile" key={founder.name}>
            <div className="founder-image-wrap">
              <Image src={founder.image} alt={founder.alt} fill sizes="(max-width: 900px) 100vw, 53vw" />
              <span>{founder.number}</span>
            </div>
            <div className="founder-copy">
              <p className="editorial-kicker">{founder.role}</p>
              <h2>{founder.name}</h2>
              <p className="founder-statement">{founder.statement}</p>
              <ul>
                {founder.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="team-principle">
        <p className="editorial-kicker">OUR APPROACH</p>
        <h2>Build with clinical teams. Validate the workflow. Keep patients at the centre.</h2>
        <p>We are developing Medivo AI through focused product work and clinical collaboration, beginning with clearly defined education scenarios rather than broad, unsupported claims.</p>
        <span className="editorial-index">04</span>
      </section>

      <section className="editorial-close">
        <p>One shared goal: make important medical information easier to understand.</p>
        <Link href="/about">Why we’re here <span>→</span></Link>
      </section>

      <EditorialFooter />
    </main>
  );
}
