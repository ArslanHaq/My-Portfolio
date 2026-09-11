"use client";

import { useEffect, useRef } from "react";
import { usePausedMotion } from "@/lib/preferences";

/** Progressive enhancement: all content remains visible before hydration and without JavaScript. */
export function ScrollEffects() {
  const progress = useRef<HTMLDivElement>(null);
  const paused = usePausedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let observer: IntersectionObserver | undefined;
    let loopObserver: IntersectionObserver | undefined;
    if (!paused && "IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add("is-visible");
      });
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer?.unobserve(entry.target); }
        }
      }, { threshold: 0.06, rootMargin: "0px 0px 40px 0px" });
      elements.forEach(element => observer?.observe(element));
      loopObserver = new IntersectionObserver(entries => {
        for (const entry of entries) entry.target.toggleAttribute("data-in-view", entry.isIntersecting);
      });
      document.querySelectorAll("[data-motion-scope]").forEach(element => loopObserver?.observe(element));
      root.classList.add("motion-ready");
    }
    return () => {
      observer?.disconnect();
      loopObserver?.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [paused]);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let total = 0;
    let measure = true;
    const update = () => {
      frame = 0;
      if (measure) { total = root.scrollHeight - window.innerHeight; measure = false; }
      if (progress.current) progress.current.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
    };
    const schedule = () => { if (!frame && !document.hidden) frame = window.requestAnimationFrame(update); };
    const resize = () => { measure = true; schedule(); };
    const visibility = () => {
      root.classList.toggle("page-hidden", document.hidden);
      if (document.hidden && frame) { window.cancelAnimationFrame(frame); frame = 0; }
      if (!document.hidden) resize();
    };
    const observer = "ResizeObserver" in window ? new ResizeObserver(resize) : undefined;
    observer?.observe(document.body);
    update();
    visibility();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer?.disconnect();
      root.classList.remove("page-hidden");
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="scroll-progress" ref={progress} aria-hidden="true" />;
}
