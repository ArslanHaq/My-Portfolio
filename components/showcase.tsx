import Image from "next/image";
import { showcaseImages, showreel } from "@/data/showcase";
import { workReferences } from "@/data/work-references";
import { Icon } from "./icon";

export function Showcase() {
  return (
    <section className="section showcase" id="showcase" aria-labelledby="showcase-title">
      <div className="wrap">
        <div className="section-heading reveal">
          <div>
            <p className="section-kicker mono"><span className="index">IN FOCUS /</span> DESIGN & DEVELOPMENT</p>
            <h2 id="showcase-title">See the work. Feel the detail.</h2>
          </div>
          <p className="section-subtitle">A closer look at the interfaces, interactions, and ideas behind the code.</p>
        </div>

        <div className="showcase-grid">
          <article className="showreel-card reveal" aria-labelledby="showreel-title">
            <div className="showreel-heading">
              <span className="mono"><span className="dot" /> THE SHOWREEL</span>
              <span className="showreel-duration mono">00:58</span>
            </div>
            <video className="showreel-video" controls playsInline preload="none"
              width={showreel.width} height={showreel.height} poster={showreel.poster}
              aria-label={showreel.title} aria-describedby="showreel-description">
              <source src={showreel.src} type="video/mp4" />
              Your browser does not support this video. <a href={showreel.src}>Open the showreel</a>.
            </video>
            <div className="showreel-content">
              <p className="showcase-category mono">WEB · INTERACTION · EXPERIENCE</p>
              <h3 id="showreel-title">From the first impression<br /> to the final interaction.</h3>
              <p id="showreel-description">{showreel.description}</p>
              <div className="showreel-links">
                <a className="details-button" href="#work">Explore the projects <Icon name="arrow-down" /></a>
                <a className="showreel-direct" href={showreel.src} target="_blank" rel="noopener noreferrer">Open video <span className="sr-only">in a new tab</span><Icon name="arrow-up-right" /></a>
              </div>
              <details className="showreel-overview">
                <summary>What’s in the video</summary>
                <p>Fitcoin product storytelling; XcelTube learning content and PDF notes; Think Study Learn calculators; SupplyED business interfaces; and Pherrix navigation. The closing sequence brings these interfaces together in a montage.</p>
              </details>
            </div>
          </article>

          {showcaseImages.map((item, index) => (
            <figure className="showcase-card reveal" key={item.id}>
              <a className="showcase-image-link" href={item.src} target="_blank" rel="noopener noreferrer"
                data-cursor="VIEW" aria-label={`Open ${item.title} full image (opens in a new tab)`}>
                <picture>
                  <source srcSet={`/media/${item.id}-640.webp 640w, /media/${item.id}-960.webp 960w, ${item.src} 1619w`}
                    sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1432px) calc((100vw - 142px) / 2), 645px" />
                <Image src={item.src} alt={item.alt} width={item.width} height={item.height}
                  unoptimized
                  className="showcase-image" />
                </picture>
                <span className="showcase-expand" aria-hidden="true"><Icon name="arrow-up-right" /></span>
              </a>
              <figcaption>
                <p className="showcase-category mono"><span>{String(index + 1).padStart(2, "0")}</span> {item.category}</p>
                <h3>{item.title}</h3>
                <p className="showcase-description">{item.description}</p>
                <div className="showcase-project-links" aria-label="Websites featured in this presentation">
                  {item.references.map(id => <a key={id} href={workReferences[id].url} target="_blank" rel="noopener noreferrer">
                    {workReferences[id].label}<Icon name="arrow-up-right" /><span className="sr-only"> (opens in a new tab)</span>
                  </a>)}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="visual-note"><Icon name="info" />Presentations include website interfaces, prototypes, and mobile UI concepts. Open any image for a closer look.</p>
      </div>
    </section>
  );
}
