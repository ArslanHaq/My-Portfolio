"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import { profile } from "@/lib/site";
import { Icon } from "./icon";
import { ProjectArtwork } from "./project-artwork";

type Filter = "all" | ProjectCategory;
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All projects" }, { id: "web", label: "Web & AI" },
  { id: "mobile", label: "Mobile" }, { id: "web3", label: "Web3" },
];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const visible = (project: Project) => filter === "all" || project.categories.includes(filter);
  const count = projects.filter(visible).length;

  useEffect(() => {
    if (!selected) return;
    const element = dialog.current;
    if (!element) return;
    if (!element.open) element.showModal();
    element.scrollTop = 0;
    document.body.classList.add("modal-open");
    return () => { document.body.classList.remove("modal-open"); };
  }, [selected]);

  function explore(project: Project, button: HTMLButtonElement) {
    trigger.current = button;
    setSelected(project);
  }

  function onClose() {
    setSelected(null);
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <section className="section work" id="work" data-nav="" aria-labelledby="work-title">
      <div className="wrap">
        <div className="section-heading reveal">
          <div><p className="section-kicker mono"><span className="index">01 /</span> SELECTED WORK</p><h2 id="work-title">Ideas into experiences.</h2></div>
          <p className="section-subtitle">A selection of products I’ve helped bring to life—from video platforms to intelligent learning.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter projects by category">
          {filters.map(item => <button key={item.id} className="filter" type="button" aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}>{item.label}</button>)}
          <span className="project-count mono" id="project-count" role="status" aria-live="polite">{String(count).padStart(2, "0")} projects</span>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <article className="project-card reveal" key={project.id} id={`project-${project.id}`} hidden={!visible(project)}>
              <ProjectArtwork id={project.id} />
              <div className="project-content">
                <div className="project-meta mono">{project.meta}</div>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  {project.url ? (
                    <a className="round-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} (opens in a new tab)`}><Icon name="arrow-up-right" /></a>
                  ) : (
                    <button className="round-link" type="button" aria-label={`Read about ${project.title}`} onClick={event => explore(project, event.currentTarget)}><Icon name="arrow-up-right" /></button>
                  )}
                </div>
                <p className="project-description">{project.short}</p>
                <div className="project-tags">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
                <div className="project-bottom">
                  <button className="details-button" type="button" aria-label={`Explore ${project.title}`} onClick={event => explore(project, event.currentTarget)}>Explore project <Icon name="arrow-right" /></button>
                  <span className="project-status">{project.scope}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="visual-note"><Icon name="info" />Project visuals are custom interface illustrations, not production screenshots.</p>
      </div>
      <dialog className="project-dialog" ref={dialog} id="project-dialog" aria-labelledby="dialog-title" onClose={onClose}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const box = event.currentTarget.getBoundingClientRect();
          if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
        }}>
        {selected && <div className="dialog-inner">
          <div className="dialog-header">
            <div><p className="dialog-eyebrow mono">{selected.category}</p><h2 className="dialog-title" id="dialog-title">{selected.title}</h2></div>
            <button className="icon-button" type="button" aria-label="Close project details" onClick={() => dialog.current?.close()}><Icon name="close" /></button>
          </div>
          <p className="dialog-role">{selected.role}</p>
          <p className="dialog-summary">{selected.summary}</p>
          <h3 className="dialog-section-title">My contribution</h3>
          <ul className="dialog-list">{selected.contributions.map(point => <li key={point}>{point}</li>)}</ul>
          <h3 className="dialog-section-title">Technology</h3>
          <div className="dialog-tags">{selected.tech.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
          <div className="dialog-links">
            {selected.url && <a className="button button-primary" href={selected.url} target="_blank" rel="noopener noreferrer">Visit project <Icon name="arrow-up-right" /></a>}
            <a className="button button-secondary" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let’s talk about ${selected.title}`)}`}>Discuss a similar project</a>
          </div>
          <p className="dialog-note">{selected.url ? "Project link supplied in my resume. Project availability and the current product may change." : "No public project link was included in my resume. Get in touch to discuss my contribution."}</p>
        </div>}
      </dialog>
    </section>
  );
}
