import { useState } from "react";
import { profile, about } from "../content.js";
import { Reveal, ArrowLink } from "./ui.jsx";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!profile.formspreeId) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name} (${form.email})`,
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  // split heading so the last word gets the italic accent
  const words = about.ctaHeading.split(" ");
  const last = words.pop();

  return (
    <section id="contact" className="py-32 scroll-mt-20 border-t border-line">
      <div className="max-w-page mx-auto px-6">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="font-serif text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.02] tracking-[-0.015em] mt-6 max-w-4xl">
            {words.join(" ")} <span className="italic text-accent">{last}</span>
          </h2>
          <p className="mt-8 text-muted leading-relaxed font-light max-w-xl text-[1.02rem]">
            {about.ctaBody}
          </p>
        </Reveal>

        {profile.intakeUrl && (
          <Reveal delay={0.08}>
            <div className="mt-14 py-10 border-y border-line flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              <div>
                <p className="font-serif text-2xl md:text-3xl">
                  Want to work together?
                </p>
                <p className="text-muted text-sm mt-2 font-light max-w-md">
                  Fill out a quick brief — what you need, your timeline, your
                  budget. I'll review and get back to you.
                </p>
              </div>
              <div className="shrink-0">
                <ArrowLink
                  label="Start a project"
                  direction="right"
                  href={profile.intakeUrl}
                />
              </div>
            </div>
          </Reveal>
        )}

        <div className="mt-20 grid md:grid-cols-2 gap-14 md:gap-24 items-start">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-8">Or just say hi</p>
            <div className="flex flex-col gap-5">
              <a href={`mailto:${profile.email}`} className="group">
                <span className="block text-[0.7rem] font-mono uppercase tracking-[0.12em] text-muted mb-1">
                  Email
                </span>
                <span className="font-serif text-xl md:text-2xl group-hover:text-accent transition-colors duration-300">
                  {profile.email}
                </span>
              </a>
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <span className="block text-[0.7rem] font-mono uppercase tracking-[0.12em] text-muted mb-1">
                  Instagram
                </span>
                <span className="font-serif text-xl md:text-2xl group-hover:text-accent transition-colors duration-300">
                  {profile.instagramHandle}
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
              <input
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={update("name")}
                className="input-line"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={update("email")}
                className="input-line"
              />
              <textarea
                required
                rows={3}
                placeholder="Quick message"
                value={form.message}
                onChange={update("message")}
                className="input-line resize-none"
              />
              <div className="self-start mt-6">
                <ArrowLink
                  type="submit"
                  direction="right"
                  disabled={status === "sending"}
                  label={
                    status === "sending"
                      ? "Sending…"
                      : status === "sent"
                        ? "Sent"
                        : "Send message"
                  }
                />
              </div>
              {status === "error" && (
                <p className="text-xs text-red-400 mt-2">
                  Something went wrong — email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
