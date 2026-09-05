"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";
const eventName = "arsalan-preferences-changed";
const motionQuery = "(prefers-reduced-motion: reduce)";

function store(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Preferences still work when storage is disabled. */ }
}

function saved(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function applySavedPreferences() {
  document.documentElement.dataset.theme = saved("arsalan-theme") === "light" ? "light" : "dark";
  document.documentElement.classList.toggle("motion-paused", window.matchMedia(motionQuery).matches || saved("arsalan-motion") === "paused");
}

function subscribe(listener: () => void) {
  const sync = () => { applySavedPreferences(); listener(); };
  const media = window.matchMedia(motionQuery);
  window.addEventListener(eventName, listener);
  window.addEventListener("storage", sync);
  media.addEventListener("change", sync);
  return () => {
    window.removeEventListener(eventName, listener);
    window.removeEventListener("storage", sync);
    media.removeEventListener("change", sync);
  };
}

function themeSnapshot(): Theme { return document.documentElement.dataset.theme === "light" ? "light" : "dark"; }
function motionSnapshot() { return document.documentElement.classList.contains("motion-paused"); }
const serverTheme = (): Theme => "dark";
const serverMotion = () => false;

export function useTheme() { return useSyncExternalStore(subscribe, themeSnapshot, serverTheme); }
export function usePausedMotion() { return useSyncExternalStore(subscribe, motionSnapshot, serverMotion); }

export function toggleTheme() {
  const next = themeSnapshot() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  store("arsalan-theme", next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0b0d0c" : "#f4f5ee");
  window.dispatchEvent(new Event(eventName));
}

export function toggleMotion() {
  // CSS also enforces the operating system's reduced-motion preference.
  const paused = window.matchMedia(motionQuery).matches || !motionSnapshot();
  document.documentElement.classList.toggle("motion-paused", paused);
  store("arsalan-motion", paused ? "paused" : "running");
  window.dispatchEvent(new Event(eventName));
}
