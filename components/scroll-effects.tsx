"use client";

import { useEffect, useRef } from "react";

/** Progressive enhancement: all content remains visible before hydration and without JavaScript. */
export function ScrollEffects() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add("is-visible");
      });
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer?.unobserve(entry.target); }
        }
      }, { threshold: 0.06, rootMargin: "0px 0px 25px 0px" });
      elements.forEach(element => observer?.observe(element));
      root.classList.add("motion-ready");
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = root.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer?.disconnect();
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="scroll-progress" ref={progress} aria-hidden="true" />;
}
