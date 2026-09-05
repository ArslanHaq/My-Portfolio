import type { SVGProps } from "react";

export type IconName = "arrow-up-right" | "arrow-right" | "arrow-down" | "arrow-up" | "download" | "sun" | "moon" | "menu" | "pin" | "react" | "code" | "cloud" | "mobile" | "sparkle" | "mic" | "file" | "user" | "globe" | "check" | "shield" | "info" | "award" | "graduation" | "certificate" | "copy" | "pause" | "close" | "next" | "aws";

export function Icon({ name, className = "icon", ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...props}><use href={`#i-${name}`} /></svg>;
}

export function BrandMark() {
  return (
    <svg className="brand-logo" viewBox="0 0 38 38" aria-hidden="true" fill="none">
      <path d="M10 7 3 19l7 12M28 7l7 12-7 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m14 25 5-12 5 12m-8-4h6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
