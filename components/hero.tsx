import { Icon } from "./icon";
import { DeveloperWorkbench } from "./developer-workbench";

const disciplines = ["Frontend craft", "Full-stack engineering", "Mobile experiences", "AI integrations"];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow mono"><span className="dot" /> MUHAMMAD ARSALAN · FULL STACK DEVELOPER</p>
          <h1 id="hero-title">I build<br /><span className="hero-title-accent">digital</span><br />experiences<span className="hero-period">.</span></h1>
          <p className="hero-description">Custom websites and full-stack applications.{" "}<br />I turn complex requirements into clear, connected <strong>web and mobile experiences</strong>.</p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#work">Explore my work <Icon name="arrow-up-right" /></a>
            <a className="button button-secondary" href="#contact">Let’s talk <Icon name="arrow-right" /></a>
          </div>
          <div className="hero-footnote mono"><Icon name="pin" /> ISLAMABAD, PAKISTAN <span className="sep" /> BUILDING SINCE 2022</div>
        </div>
        <div className="hero-composition" data-motion-scope="">
          <DeveloperWorkbench />
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
