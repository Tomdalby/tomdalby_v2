import Image from "next/image";
import BurgerMenu from "@/components/BurgerMenu";
import { aboutContent, contactContent } from "@/data/site";

export default function AboutPage() {
  return (
    <main className="content-page about-page">
      <BurgerMenu />
      <div className="content-wrap">
        <div className="about-content">
          <h1>{aboutContent.title}</h1>
          <p>{aboutContent.bio}</p>
          <div className="about-divider" aria-hidden />
          <section className="about-clients">
            <h2>Selected Clients</h2>
            <p>{aboutContent.selectedClients}</p>
          </section>
          <div className="contact-links-block">
            <div className="contact-links">
              <p className="contact-address">{contactContent.address}</p>
              <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
              <a href={`tel:${contactContent.mobile}`}>{contactContent.mobile}</a>
              <a href={contactContent.instagram} rel="noreferrer" target="_blank">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="about-images">
          <div className="about-image-main">
            <Image
              alt="Portrait of Thomas Dalby"
              className="about-image"
              height={1100}
              sizes="(max-width: 900px) 55vw, 28vw"
              src={aboutContent.image}
              width={900}
            />
          </div>
          <div className="about-image-side">
            {aboutContent.sideImages.map((src, i) => (
              <Image
                key={src}
                alt={`Thomas Dalby — photo ${i + 1}`}
                className="about-image"
                height={1100}
                sizes="(max-width: 900px) 38vw, 18vw"
                src={src}
                width={900}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
