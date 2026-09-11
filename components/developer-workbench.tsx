"use client";

import { useState } from "react";
import { Icon } from "./icon";

type PreviewSize = "desktop" | "mobile";

function InterfacePreview({ size }: { size: PreviewSize }) {
  return (
    <div className={`workbench-output workbench-output-${size}`}>
      <div className="workbench-output-bar"><span className="workbench-window-dots"><i /><i /><i /></span><span>{size === "desktop" ? "DESKTOP" : "MOBILE"}</span><Icon name={size === "desktop" ? "globe" : "mobile"} /></div>
      <div className="workbench-interface">
        <div className="workbench-mini-nav"><span className="workbench-monogram">a<span>.</span></span><span className="workbench-mini-menu"><i /><i /></span></div>
        <div className="workbench-mini-heading">Made to<br /><span>feel right.</span></div>
        <div className="workbench-mini-copy"><i /><i /></div>
        <span className="workbench-mini-cta">Explore the possibilities <Icon name="arrow-up-right" /></span>
        <div className="workbench-mini-grid">
          <div className="workbench-tile workbench-tile-one"><Icon name="code" /><span>Web</span></div>
          <div className="workbench-tile workbench-tile-two"><Icon name="mobile" /><span>Mobile</span></div>
          <div className="workbench-tile workbench-tile-three"><Icon name="sparkle" /><span>AI</span></div>
        </div>
      </div>
    </div>
  );
}

/** Decorative HTML/CSS illustration; React only handles the two preview controls. */
export function DeveloperWorkbench() {
  const [size, setSize] = useState<PreviewSize>("desktop");

  return (
    <div className="developer-workbench" data-preview={size}>
      <p className="workbench-caption mono"><span /> A LITTLE LOGIC. A LOT OF CRAFT.</p>
      <div className="workbench-stage" aria-hidden="true">
        <div className="workbench-grid" />
        <div className="workbench-editor">
          <div className="workbench-editor-bar"><span className="workbench-file"><Icon name="code" /> interface.tsx</span><Icon name="react" /></div>
          <div className="workbench-code">
            <div className="workbench-code-focus" />
            <code>
              <span className="workbench-code-line"><i>01</i><span><b>const</b> Portfolio = () =&gt; (</span></span>
              <span className="workbench-code-line"><i>02</i><span>&nbsp; &lt;<em>Experience</em></span></span>
              <span className="workbench-code-line"><i>03</i><span>&nbsp;&nbsp;&nbsp; design=<strong>&quot;thoughtful&quot;</strong></span></span>
              <span className="workbench-code-line"><i>04</i><span>&nbsp;&nbsp;&nbsp; motion=<strong>&quot;purposeful&quot;</strong></span></span>
              <span className="workbench-code-line"><i>05</i><span>&nbsp;&nbsp;&nbsp; builtFor=<strong>&quot;people&quot;</strong></span></span>
              <span className="workbench-code-line"><i>06</i><span>&nbsp; /&gt;</span></span>
              <span className="workbench-code-line"><i>07</i><span>);<span className="workbench-caret" /></span></span>
            </code>
          </div>
          <div className="workbench-editor-footer"><span><Icon name="check" /> Details, considered.</span><span>TSX</span></div>
        </div>
        <div className="workbench-connection"><span className="workbench-signal" /></div>
        <div className="workbench-preview">
          <InterfacePreview size="desktop" />
          <InterfacePreview size="mobile" />
        </div>
        <span className="workbench-annotation mono"><span /> FROM CODE TO EXPERIENCE</span>
      </div>
      <div className="workbench-controls">
        <span className="workbench-controls-label">One idea. Every screen.</span>
        <div className="workbench-view-switch" role="group" aria-label="Interface preview size">
          <button type="button" aria-label="Desktop preview" aria-pressed={size === "desktop"} onClick={() => setSize("desktop")}><Icon name="code" /><span>Desktop</span></button>
          <button type="button" aria-label="Mobile preview" aria-pressed={size === "mobile"} onClick={() => setSize("mobile")}><Icon name="mobile" /><span>Mobile</span></button>
        </div>
      </div>
    </div>
  );
}
