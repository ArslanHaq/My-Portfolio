import { ImageResponse } from "next/og";

export const alt = "Muhammad Arsalan — Full-Stack Developer. Web, Mobile, AI and Cloud.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#0b0d0c", color: "#f3f4ed", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 23 }}>
        <span style={{ color: "#c2f36b" }}>arsalan.dev</span>
        <span style={{ fontSize: 16, color: "#a5aaa0", letterSpacing: "3px" }}>WEB / MOBILE / AI / CLOUD</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 86, letterSpacing: "-4px", lineHeight: 1.08 }}>
        <span>Complex ideas.</span><span>Thoughtfully</span><span style={{ color: "#c2f36b" }}>engineered.</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #30372c", paddingTop: "22px", fontSize: 21 }}>
        <span>Muhammad Arsalan</span><span style={{ color: "#a5aaa0" }}>Full-Stack Developer · Islamabad</span>
      </div>
    </div>,
    { ...size },
  );
}
