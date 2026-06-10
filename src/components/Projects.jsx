import { Link } from "react-router-dom";
import { projects } from "../content.js";
import { Reveal, SmartImage } from "./ui.jsx";

function WorkRow({ p, i }) {
  return (
    <Reveal delay={0.04 * i}>
      <Link to={`/work/${p.slug}`} className="work-row group py-8 md:py-10">
        <div className="grid grid-cols-[auto_1fr] md:grid-cols-[60px_1fr_280px] gap-x-6 md:gap-x-10 gap-y-5 items-center">
          {/* index */}
          <span
            className="font-mono text-sm self-start pt-2 md:pt-3"
            style={{ color: p.accent }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* title + meta */}
          <div className="min-w-0">
            <h3
              className="work-title font-serif text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] tracking-[-0.01em]"
              style={{ fontFamily: p.titleFont || undefined }}
            >
              {p.title}
            </h3>
            <p className="mt-3 text-muted text-sm font-light max-w-md">
              {p.cardSubtitle}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              {p.tags.map((t, k) => (
                <span
                  key={t}
                  className="font-mono text-[0.68rem] tracking-wide text-muted"
                >
                  {t}
                  {k < p.tags.length - 1 && (
                    <span className="ml-3 opacity-40">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* thumbnail */}
          <div className="work-thumb col-span-2 md:col-span-1 aspect-[16/10]">
            <SmartImage
              src={p.cover}
              alt={p.title}
              label={`cover · ${p.slug}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-28 scroll-mt-20">
      <div className="max-w-page mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="eyebrow">Portfolio</span>
              <h2 className="font-serif text-[clamp(2.4rem,6vw,4rem)] leading-none mt-4">
                Selected <span className="italic text-accent">Work</span>
              </h2>
            </div>
            <span className="font-mono text-sm text-muted hidden sm:block">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </div>
        </Reveal>

        <div>
          {projects.map((p, i) => (
            <WorkRow key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
