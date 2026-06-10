import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { profile } from "../content.js";

const links = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/#work" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 140 && y > last); // hide on scroll down, show on up
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (to) => (e) => {
    e.preventDefault();
    const hash = to.includes("#") ? "#" + to.split("#")[1] : "";
    if (location.pathname !== "/") return navigate("/" + hash);
    if (!hash) window.scrollTo({ top: 0, behavior: "smooth" });
    else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${scrolled ? "backdrop-blur-md bg-bg/70 border-b border-line" : "bg-transparent border-b border-transparent"}`}
    >
      <nav className="max-w-page mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={go("/")}
          className="font-serif text-xl tracking-tight"
        >
          {profile.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-8">
          <span className="hidden md:inline-flex items-center gap-2 text-[0.72rem] font-mono text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for work
          </span>
          <ul className="flex items-center gap-6">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.to}
                  onClick={go(l.to)}
                  className="font-mono text-sm text-muted hover:text-ink transition-colors duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
