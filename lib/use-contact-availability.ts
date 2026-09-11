"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Availability = "checking" | "available" | "unavailable" | "error";

/** Keep the page static; check delivery configuration only as the form approaches view. */
export function useContactAvailability() {
  const container = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const [availability, setAvailability] = useState<Availability>("checking");

  const checkAvailability = useCallback(async () => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setAvailability("checking");
    try {
      const response = await fetch("/api/contact", {
        cache: "no-store",
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]),
      });
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== "object" || !("available" in result) || typeof result.available !== "boolean") {
        throw new Error("Invalid availability response");
      }
      if (!controller.signal.aborted) setAvailability(result.available ? "available" : "unavailable");
    } catch {
      if (!controller.signal.aborted) setAvailability("error");
    }
  }, []);

  useEffect(() => {
    const element = container.current;
    let observer: IntersectionObserver | undefined;
    if (element && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer?.disconnect();
          void checkAvailability();
        }
      }, { rootMargin: "240px" });
      observer.observe(element);
    } else {
      void checkAvailability();
    }
    return () => { observer?.disconnect(); request.current?.abort(); };
  }, [checkAvailability]);

  return { container, availability, checkAvailability };
}
