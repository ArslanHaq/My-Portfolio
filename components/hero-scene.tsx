"use client";

import { useEffect, useRef } from "react";
import { usePausedMotion } from "@/lib/preferences";

/** The CSS sculpture is always present. WebGL is an optional desktop enhancement. */
export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  const paused = usePausedMotion();

  useEffect(() => {
    const element = host.current;
    if (!element || paused || document.documentElement.classList.contains("motion-paused")) return;
    const desktop = matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)) return;
    let disposed = false;
    let disposeScene: (() => void) | undefined;
    let loading = false;
    let visible = false;
    let idle: number | undefined;

    async function load() {
      if (disposed || loading || !visible || !desktop.matches || document.hidden) return;
      loading = true;
      try {
        const { createOrbitScene } = await import("@/lib/orbit-scene");
        if (!disposed && desktop.matches && visible && !document.hidden) disposeScene = createOrbitScene(element!);
      } catch {
        // Unsupported WebGL and failed chunks retain the complete CSS illustration.
      } finally { loading = false; }
    }
    function schedule() {
      if (!desktop.matches) { disposeScene?.(); disposeScene = undefined; return; }
      if (disposeScene || idle !== undefined) return;
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => { idle = undefined; void load(); }, { timeout: 1800 });
      else void load();
    }
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    });
    observer.observe(element);
    desktop.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      disposed = true;
      observer.disconnect();
      desktop.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      disposeScene?.();
    };
  }, [paused]);

  return (
    <div className="orbit-scene" ref={host} aria-hidden="true">
      <div className="orbit-fallback">
        <div className="orbit-aura" />
        <div className="orbit-fallback-spin"><div className="orbit-ribbon ribbon-one" /><div className="orbit-ribbon ribbon-two" /><div className="orbit-ribbon ribbon-three" /><div className="orbit-core">a<span>.</span></div></div>
        <span className="orbit-satellite satellite-one" /><span className="orbit-satellite satellite-two" />
      </div>
    </div>
  );
}
