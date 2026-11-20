import type { CSSProperties } from "react";
import type { ProjectId } from "@/data/projects";

/** Decorative concept illustrations, not production screenshots. */
export function ProjectArtwork({ id, order }: { id: ProjectId; order: number }) {
  const number = String(order).padStart(2, "0");
  switch (id) {
    case "xceltube":
    case "pherrix":
      return (
        <div className={`project-visual text-project-visual ${id}-text-visual`} aria-hidden="true">
          <div className="visual-label"><span className="tiny-square" />{id === "xceltube" ? "XCELTUBE / LEARNING" : "PHERRIX / CORPORATE"}</div>
          <span className="visual-number mono">{number}</span>
          <span className="text-project-symbol">{id === "xceltube" ? "x." : "p."}</span>
          <div className="text-project-heading">{id === "xceltube" ? <>Learn.<br />Practice.<br /><span>Understand.</span></> : <>Science,<br /><span>clearly presented.</span></>}</div>
          <p className="text-project-caption mono">{id === "xceltube" ? "VIDEO · NOTES · PRACTICE · AI" : "IDENTITY · NAVIGATION · CONTENT"}</p>
        </div>
      );
    case "cvvid":
      return (
        <div className="project-visual cvvid-visual" aria-hidden="true"><div className="visual-label"><span className="tiny-square" />CVVID / VIDEO STUDIO</div><span className="visual-number mono">{number}</span><div className="mock-editor"><div className="editor-topbar"><div className="editor-tools"><i /><i /><i /></div><span className="editor-wordmark">cvvid.</span><span className="editor-export">Export video ↗</span></div><div className="editor-main"><div className="editor-sidebar"><i /><i /><i /></div><div className="editor-screen"><div className="screen-title">Your story.<br /><em>In motion.</em></div><div className="screen-play" /></div></div><div className="timeline-ruler"><span>00:00</span><span>00:15</span><span>00:30</span><span>00:45</span><span>01:00</span></div><div className="editor-timeline"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="audio-track" /></div><div className="cvvid-badge">Create. Edit. Share. ↗</div></div>
      );
    case "screening":
      return (
        <div className="project-visual screening-visual" aria-hidden="true">
          <div className="visual-label"><span className="tiny-square" />SCREENING / COMPLIANCE</div>
          <span className="visual-number mono">{number}</span>
          <div className="screen-dash">
            <div className="screen-dash-top"><span>Screening overview</span><span className="screen-dash-chip mono">30 DAYS</span></div>
            <div className="screen-kpis">
              {["SEARCHES", "MATCHES", "QUOTA"].map((label, index) => (
                <div className="screen-kpi" key={label}><small className="mono">{label}</small><i style={{"--w": `${[78, 46, 62][index]}%`} as CSSProperties} /></div>
              ))}
            </div>
            <div className="screen-bars">
              {[[18, 8], [26, 10], [14, 6], [34, 16], [22, 9], [40, 18], [30, 12], [48, 22], [36, 14], [56, 26], [44, 20], [62, 28]].map(([clear, match], index) => (
                <span className="screen-bar" key={index}><i className="clear" style={{"--h": `${clear}px`} as CSSProperties} /><i className="match" style={{"--h": `${match}px`} as CSSProperties} /></span>
              ))}
            </div>
          </div>
          <div className="screen-badge"><svg className="icon" aria-hidden="true"><use href="#i-shield" /></svg>Batch · 300,000 records</div>
        </div>
      );
    case "biometrics":
      return (
        <div className="project-visual biometrics-visual" aria-hidden="true">
          <div className="visual-label"><span className="tiny-square" />BIOMETRICS / IDENTITY</div>
          <span className="visual-number mono">{number}</span>
          <div className="bio-print" />
          <div className="bio-phone">
            <div className="bio-face"><span className="bio-corner c1" /><span className="bio-corner c2" /><span className="bio-corner c3" /><span className="bio-corner c4" /><span className="bio-head" /><span className="bio-scan" /></div>
            <div className="bio-caption mono">LIVENESS CHECK</div>
          </div>
          <div className="bio-verified"><svg className="icon" aria-hidden="true"><use href="#i-check" /></svg>Identity verified</div>
        </div>
      );
    case "cell":
      return (
        <div className="project-visual cell-visual" aria-hidden="true"><div className="visual-label"><span className="tiny-square" />CELL OPERATIVE / INVENTORY</div><span className="visual-number mono">{number}</span><div className="inventory-window"><div className="inventory-nav"><span className="inventory-logo" /><span>Cell Operative</span></div><div className="inventory-body"><div className="inventory-heading">Your inventory. In view.</div><div className="inventory-chart"><i style={{"--h": "28%"} as CSSProperties} /><i style={{"--h": "47%"} as CSSProperties} /><i style={{"--h": "39%"} as CSSProperties} /><i style={{"--h": "65%"} as CSSProperties} /><i style={{"--h": "52%"} as CSSProperties} /><i style={{"--h": "77%"} as CSSProperties} /><i style={{"--h": "67%"} as CSSProperties} /><i style={{"--h": "89%"} as CSSProperties} /></div><div className="inventory-row"><span>Inventory overview</span><span>Web + Mobile</span></div></div></div><div className="mini-phone"><div className="phone-title">Inventory</div><div className="phone-mini-card">Store overview<span /><span /></div><div className="phone-mini-card">Stock details<span /><span /></div><div className="phone-mini-card">Inventory list<span /><span /></div></div></div>
      );
    case "visa":
      return (
        <div className="project-visual visa-visual" aria-hidden="true"><div className="visual-label"><span className="tiny-square" />VISA / APPLICATION FLOW</div><span className="visual-number mono">{number}</span><div className="flow-grid" /><div className="visa-heading">Flexible by design.</div><svg className="flow-lines" viewBox="0 0 400 112" preserveAspectRatio="none"><path d="M80 24H315M320 24v76H85M90 25v74" /></svg><div className="flow-node n1"><svg className="icon" aria-hidden="true"><use href="#i-user" /></svg>Applicant</div><div className="flow-node n2"><svg className="icon" aria-hidden="true"><use href="#i-globe" /></svg>Country requirements</div><div className="flow-node n3"><svg className="icon" aria-hidden="true"><use href="#i-check" /></svg>Review</div><div className="flow-node n4"><svg className="icon" aria-hidden="true"><use href="#i-file" /></svg>Documents</div></div>
      );
    case "ddid":
      return (
        <div className="project-visual ddid-visual" aria-hidden="true"><div className="visual-label"><span className="tiny-square" />DDID / DIGITAL WALLET</div><span className="visual-number mono">{number}</span><div className="identity-card"><div className="identity-logo"><svg className="icon" aria-hidden="true"><use href="#i-shield" /></svg>DDID WALLET</div><div className="identity-title">Your documents.<br />Your digital wallet.</div><div className="identity-lines"><i /><i /><i /></div><div className="identity-chip" /></div><div className="verified-stamp"><svg className="icon" aria-hidden="true"><use href="#i-shield" /></svg></div><div className="identity-label mono">DIGITALLY SIGNED. SECURELY STORED.</div></div>
      );
    case "fitcoin":
      return (
        <div className="project-visual fitcoin-visual" aria-hidden="true"><div className="visual-label"><span className="tiny-square" />FITCOIN / WEB3</div><span className="visual-number mono">{number}</span><div className="coin-ring" /><div className="coin-ring r2" /><div className="fitcoin-coin">f</div><div className="coin-point p1">&lt;/&gt;</div><div className="coin-point p2"><svg className="icon" aria-hidden="true"><use href="#i-mobile" /></svg></div><div className="coin-caption mono">ONE CONNECTED ECOSYSTEM</div></div>
      );
  }
}
