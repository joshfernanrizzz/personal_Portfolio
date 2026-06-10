import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// Normalizes content.js paths: adds leading "/" to local assets if missing.
export function fixSrc(src) {
  if (!src || src.trim() === "") return "";
  const s = src.trim();
  if (s.startsWith("http") || s.startsWith("/") || s.startsWith("data:"))
    return s;
  return "/" + s;
}

export function Reveal({ children, delay = 0, y = 30, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SmartImage({
  src,
  alt = "",
  label = "Add image link",
  className = "",
  style,
}) {
  const s = fixSrc(src);
  if (s)
    return (
      <img
        src={s}
        alt={alt}
        loading="lazy"
        className={className}
        style={style}
      />
    );
  return (
    <div className={`img-placeholder ${className}`} style={style}>
      {label}
    </div>
  );
}

export function ArrowLink({
  label,
  direction = "right",
  to,
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) {
  const arrow = { right: "→", down: "↓", left: "←" }[direction];
  const isBack = direction === "left";
  const inner = (
    <>
      {isBack && <span className="btn-arrow btn-arrow--left">{arrow}</span>}
      <span>{label}</span>
      {!isBack && (
        <span className={`btn-arrow btn-arrow--${direction}`}>{arrow}</span>
      )}
    </>
  );
  const cls = `btn ${className}`.trim();
  if (to)
    return (
      <Link to={to} onClick={onClick} className={cls}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
