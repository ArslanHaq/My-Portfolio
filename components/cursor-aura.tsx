"use client";

import { useEffect, useRef } from "react";
import { usePausedMotion } from "@/lib/preferences";

const interactive = "a,button,summary,[role='button']";
const nativeControls = "video,audio,iframe,dialog,input,textarea,select,[contenteditable]:not([contenteditable='false'])";

export function CursorAura() {
  const aura = useRef<HTMLDivElement>(null);
  const paused = usePausedMotion();

  useEffect(() => {
    const element = aura.current;
    if (!element || paused || document.documentElement.classList.contains("motion-paused")) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let detach = () => {};

    function connect() {
      detach();
      if (!pointer.matches || !element) return;
      const cursor = element;
      let frame = 0;
      let lastTime = 0;
      let x: number | null = null;
      let y = 0;
      let targetX = 0;
      let targetY = 0;
      let blocked = false;

      function hide() {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        x = null;
        delete cursor.dataset.visible;
        delete cursor.dataset.pressed;
      }

      function draw(time: number) {
        frame = 0;
        const blend = 1 - Math.exp(-Math.min(time - lastTime || 16, 64) / 55);
        lastTime = time;
        x = (x ?? targetX) + (targetX - (x ?? targetX)) * blend;
        y += (targetY - y) * blend;
        const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.2;
        if (settled) { x = targetX; y = targetY; }
        cursor.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;
        cursor.dataset.visible = "true";
        // No permanent animation loop: the next pointer movement restarts it.
        if (!settled) frame = window.requestAnimationFrame(draw);
      }

      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse" || blocked || document.hidden) { hide(); return; }
        targetX = event.clientX;
        targetY = event.clientY;
        if (x === null) { x = targetX; y = targetY; }
        if (!frame) { lastTime = performance.now(); frame = window.requestAnimationFrame(draw); }
      }

      function over(event: PointerEvent) {
        const target = event.target instanceof Element ? event.target : null;
        blocked = !!target?.closest(nativeControls);
        cursor.dataset.active = String(!!target?.closest(interactive));
        const label = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
        if (label) cursor.dataset.label = label;
        else delete cursor.dataset.label;
        const caption = cursor.querySelector<HTMLElement>(".cursor-aura-label");
        if (caption) caption.dataset.label = label ?? "";
        if (blocked) hide();
      }

      function press() { if (cursor.dataset.visible) cursor.dataset.pressed = "true"; }
      function release() { delete cursor.dataset.pressed; }
      function key(event: KeyboardEvent) { if (event.key === "Tab") hide(); }

      document.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over, { passive: true });
      document.addEventListener("pointerdown", press, { passive: true });
      document.addEventListener("pointerup", release, { passive: true });
      document.addEventListener("pointerleave", hide);
      document.addEventListener("pointercancel", hide);
      document.addEventListener("visibilitychange", hide);
      document.addEventListener("keydown", key);
      window.addEventListener("blur", hide);
      window.addEventListener("scroll", hide, { passive: true });
      detach = () => {
        hide();
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.removeEventListener("pointerdown", press);
        document.removeEventListener("pointerup", release);
        document.removeEventListener("pointerleave", hide);
        document.removeEventListener("pointercancel", hide);
        document.removeEventListener("visibilitychange", hide);
        document.removeEventListener("keydown", key);
        window.removeEventListener("blur", hide);
        window.removeEventListener("scroll", hide);
      };
    }

    connect();
    pointer.addEventListener("change", connect);
    return () => { detach(); pointer.removeEventListener("change", connect); };
  }, [paused]);

  return <div className="cursor-aura" ref={aura} aria-hidden="true"><span className="cursor-aura-ring" /><span className="cursor-aura-label" /></div>;
}
