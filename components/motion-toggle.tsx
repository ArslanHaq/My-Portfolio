"use client";

import { toggleMotion, usePausedMotion } from "@/lib/preferences";
import { Icon } from "./icon";

export function MotionToggle() {
  const paused = usePausedMotion();
  return (
    <button className="motion-toggle" id="motion-toggle" type="button" aria-pressed={paused} onClick={toggleMotion}>
      <Icon name="pause" /><span>{paused ? "Motion paused" : "Pause motion"}</span>
    </button>
  );
}
