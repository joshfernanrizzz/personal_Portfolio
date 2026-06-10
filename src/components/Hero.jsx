import { motion } from "framer-motion";
import { profile } from "../content.js";
import { ArrowLink } from "./ui.jsx";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const sub = profile.heroSub || profile.herosub || "";
  const scrollToWork = () =>
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-page mx-auto px-6 w-full pt-16"
      >
        <motion.div variants={item} className="flex items-center gap-4 mb-10">
          <span className="h-px w-12 bg-accent" />
          <span className="eyebrow">{profile.role}</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-serif font-normal leading-[0.95] tracking-[-0.015em] text-[clamp(3.2rem,11vw,8.5rem)]"
        >
          {profile.heroLine}
        </motion.h1>
        <motion.h1
          variants={item}
          className="font-serif italic text-accent leading-[1.05] tracking-[-0.015em] text-[clamp(3.2rem,11vw,8.5rem)]"
        >
          {profile.heroEmphasis}
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
        >
          <p className="max-w-md text-muted text-[1.05rem] leading-relaxed font-light">
            {sub}
          </p>
          <div className="shrink-0">
            <ArrowLink
              label="View work"
              direction="down"
              onClick={scrollToWork}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
