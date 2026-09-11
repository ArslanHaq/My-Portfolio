"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMark, Icon } from "./icon";
import { toggleTheme, useTheme, toggleMotion, usePausedMotion } from "@/lib/preferences";
import { profile } from "@/lib/site";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const paused = usePausedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const query = window.matchMedia("(min-width: 761px)");
    const onResize = () => { if (query.matches) setOpen(false); };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("pointerdown", onPointer);
    }
    query.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      query.removeEventListener("change", onResize);
    };
  }, [open]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-nav]"));
      const current = sections.filter(section => section.getBoundingClientRect().top <= Math.max(120, window.innerHeight * 0.32)).at(-1);
      setActive(current?.id ?? "");
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="site-header" ref={header}>
      <div className="wrap nav-row">
        <a className="brand" href="#top" aria-label="Muhammad Arsalan, back to top" onClick={() => setOpen(false)}>
          <BrandMark /><span>arsalan<span>.dev</span></span>
        </a>
        <nav className={`nav-links${open ? " open" : ""}`} id="main-navigation" aria-label="Main navigation">
          {links.map(link => (
            <a key={link.id} href={`#${link.id}`} className={active === link.id ? "active" : undefined}
              aria-current={active === link.id ? "location" : undefined} onClick={() => setOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="header-motion js-only" id="header-motion-toggle" type="button" onClick={toggleMotion}
            aria-label={paused ? "Enable website animations" : "Pause website animations"} aria-pressed={paused}>
            <span className="motion-bars" aria-hidden="true"><i /><i /><i /></span><span>{paused ? "Motion off" : "Motion on"}</span>
          </button>
          <button className="icon-button" id="theme-toggle" type="button" onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <a className="resume-nav" href={profile.resume} download="Muhammad-Arsalan-Resume.pdf">Resume <Icon name="download" /></a>
          <button className="icon-button menu-toggle" id="menu-toggle" ref={menuButton} type="button"
            aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation"
            onClick={() => setOpen(value => !value)}><Icon name={open ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
  );
}
