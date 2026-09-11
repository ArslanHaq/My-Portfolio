import { Icon } from "./icon";
import Image from "next/image";

const disciplines = ["Frontend craft", "Full-stack engineering", "Mobile experiences", "AI integrations"];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow mono"><span className="dot" /> MUHAMMAD ARSALAN UL HAQ</p>
          <h1 id="hero-title">I build<br /><span className="hero-title-accent">digital</span><br />experiences<span className="hero-period">.</span></h1>
          <p className="hero-description">A full-stack developer with a frontend obsession.<br />Turning complex ideas into <strong>web, mobile, and AI products</strong> that feel effortless.</p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#work">Explore my work <Icon name="arrow-up-right" /></a>
            <a className="button button-secondary" href="#contact">Let’s talk <Icon name="arrow-right" /></a>
          </div>
          <div className="hero-footnote mono"><Icon name="pin" /> ISLAMABAD, PAKISTAN <span className="sep" /> BUILDING SINCE 2022</div>
        </div>
        <div className="hero-composition" data-motion-scope="">
          <p className="hero-preview-label mono"><span /> FROM IDEA TO INTERFACE</p>
          <div className="hero-preview-backdrop" aria-hidden="true" />
          <a className="hero-browser" href="#showcase" data-cursor="VIEW" aria-label="Explore the Fitcoin website presentation and more of my work">
            <div className="hero-browser-bar" aria-hidden="true"><span className="browser-dots"><i /><i /><i /></span><span>SELECTED WORK / FITCOIN</span><Icon name="arrow-up-right" /></div>
            <div className="hero-preview-image">
              <Image src="/media/custom-websites.webp" alt="Fitcoin website preview from my custom website presentation, with its fitness hero and coral call to action." width={1619} height={971} unoptimized loading="eager" fetchPriority="high" />
            </div>
          </a>
          <div className="hero-code-card" aria-hidden="true">
            <div className="hero-code-heading mono"><Icon name="code" /> THE DETAILS MATTER<span>TSX</span></div>
            <code><span>const</span> experience = &#123;<br />&nbsp; design: <b>&apos;thoughtful&apos;</b>,<br />&nbsp; builtFor: <b>&apos;people&apos;</b><br />&#125;;</code>
          </div>
          <div className="hero-stack-card"><Icon name="react" /><span>Ideas into products.<small>Web · Mobile · AI</small></span></div>
          <a className="hero-showreel-link" href="#showcase" data-cursor="VIEW">
            <span className="showreel-play" aria-hidden="true">↗</span>
            <span>See the work in motion.<small className="mono">EXPLORE THE SHOWREEL · 00:58</small></span>
            <span className="reel-lines" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          </a>
        </div>
      </div>
      <div className="discipline-band" data-motion-scope="" aria-label={disciplines.join(", ")}>
        <div className="discipline-track" aria-hidden="true">
          {[0, 1].map(copy => <div className="discipline-group" key={copy}>{disciplines.map(item => <span key={item}><Icon name="sparkle" />{item}</span>)}</div>)}
        </div>
      </div>
      <div className="wrap hero-lower"><span className="mono">GOOD DESIGN. SOLID FOUNDATIONS.</span><a className="scroll-cue mono" href="#showcase">THE WORK SPEAKS <Icon name="arrow-down" /></a></div>
    </section>
  );
}
