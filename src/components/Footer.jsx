import { profile } from "../content.js";

export default function Footer() {
  return (
    <footer className="border-t border-line pt-16 pb-8 overflow-hidden">
      <div className="max-w-page mx-auto px-6">
        <p className="font-serif text-[clamp(2.6rem,9vw,6.5rem)] leading-none tracking-[-0.02em] text-ink/90">
          {profile.name}
          <span className="text-accent">.</span>
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-line pt-6">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
            © {new Date().getFullYear()} — Designed & built in India
          </span>
          <div className="flex gap-6 font-mono text-[0.72rem] text-muted">
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-ink transition-colors"
            >
              Email
            </a>
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink transition-colors"
            >
              Instagram
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-ink transition-colors bg-transparent border-0 cursor-pointer font-mono text-[0.72rem] text-muted p-0"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
