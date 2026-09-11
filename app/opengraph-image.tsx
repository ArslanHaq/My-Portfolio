import { ImageResponse } from "next/og";

export const alt = "Muhammad Arsalan — Full-Stack Developer. Web, Mobile, AI and Cloud.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#0c1119", color: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 23 }}>
        <span style={{ color: "#ff5f56" }}>Muhammad Arsalan</span>
        <span style={{ fontSize: 16, color: "#b0bac9", letterSpacing: "3px" }}>WEB / MOBILE / AI / CLOUD</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 86, letterSpacing: "-4px", lineHeight: 1.08 }}>
        <span>Ideas into</span><span>digital</span><span style={{ color: "#ff5f56" }}>experiences.</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #272e35", paddingTop: "22px", fontSize: 21 }}>
        <span>Muhammad Arsalan</span><span style={{ color: "#b0bac9" }}>Full-Stack Developer · Islamabad</span>
      </div>
    </div>,
    { ...size },
  );
}
