import { about } from "../content.js";
import { Reveal, SmartImage } from "./ui.jsx";

export default function About() {
  return (
    <section id="about" className="py-32 scroll-mt-20">
      <div className="max-w-page mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <span className="h-px w-12 bg-accent" />
            <span className="eyebrow">About</span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_0.55fr] gap-14 md:gap-20 items-start">
          <Reveal delay={0.06}>
            <p className="font-serif text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.35] tracking-[-0.01em] text-ink/90">
              {about.body}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="relative group">
              <SmartImage
                src={about.portrait}
                alt="Portrait"
                label="your photo"
                className="w-full aspect-[4/5] object-cover rounded-2xl border border-line
                           grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <span className="absolute -bottom-3 left-6 h-px w-16 bg-accent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
