import { Icon } from "./icon";
import { HeroScene } from "./hero-scene";

const disciplines = ["Frontend craft", "Full-stack engineering", "Mobile experiences", "AI integrations"];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow mono"><span className="dot" /> MUHAMMAD ARSALAN UL HAQ</p>
          <h1 id="hero-title">I build<br /><span className="hero-title-accent">digital<svg viewBox="0 0 320 18" fill="none" aria-hidden="true"><path d="M3 13C83 1 207 1 315 8" /></svg></span><br />experiences<span className="hero-period">.</span></h1>
          <p className="hero-description">A full-stack developer with a frontend obsession.<br />Turning complex ideas into <strong>web, mobile, and AI products</strong> that feel effortless.</p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#work">Explore my work <Icon name="arrow-up-right" /></a>
            <a className="button button-secondary" href="#contact">Let’s talk <Icon name="arrow-right" /></a>
          </div>
          <div className="hero-footnote mono"><Icon name="pin" /> ISLAMABAD, PAKISTAN <span className="sep" /> BUILDING SINCE 2022</div>
        </div>
        <div className="hero-composition" data-motion-scope="">
          <div className="scene-grid" aria-hidden="true" />
          <div className="scene-caption mono"><span className="scene-cross">+</span> CREATIVE MIND. ENGINEERING CORE.</div>
          <HeroScene />
          <div className="scene-coordinate mono" aria-hidden="true">33.6844° N<br />73.0479° E</div>
          <div className="scene-tag scene-tag-web"><Icon name="code" /><span>Thoughtful interfaces<small>React / Next.js / TypeScript</small></span></div>
          <div className="scene-tag scene-tag-ai"><Icon name="sparkle" /><span>A little intelligence.<small>A lot of possibility.</small></span></div>
          <a className="hero-showreel-link" href="#showcase" data-cursor="PLAY">
            <span className="showreel-play" aria-hidden="true">↗</span>
            <span>Proof, in motion.<small className="mono">WATCH THE SHOWREEL · 00:58</small></span>
            <span className="reel-lines" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          </a>
          <p className="scene-hint mono"><span className="dot" /> IDEAS IN ORBIT <span>MOVE AROUND. EXPLORE.</span></p>
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
