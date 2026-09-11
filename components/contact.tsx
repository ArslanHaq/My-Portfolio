import { profile } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { CopyEmailButton } from "./copy-email-button";
import { Icon } from "./icon";

const socialLinks = [
  { label: "LinkedIn", detail: "Background & experience", href: profile.linkedin, mark: "in" },
  { label: "GitHub", detail: "Code & projects", href: profile.github, mark: "</>" },
  { label: "Fiverr", detail: "Work with me", href: profile.fiverr, mark: "fi" },
];

export function Contact() {
  const enabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);

  return (
    <section className="section contact" id="contact" data-nav="" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact-panel reveal">
          <div className="contact-grid">
            <div className="contact-introduction">
              <p className="section-kicker mono"><span className="index">04 /</span> LET’S BUILD SOMETHING GOOD</p>
              <h2 id="contact-title">Good things start<br />with a conversation.</h2>
              <p className="contact-copy">A product idea, a technical challenge, or your next collaboration. Tell me what you’re thinking, and let’s explore what we can build together.</p>
              <div className="contact-methods">
                <div>
                  <span className="contact-method-label mono">EMAIL ME</span>
                  <div className="email-row"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a><CopyEmailButton /></div>
                </div>
                <div>
                  <span className="contact-method-label mono">GIVE ME A CALL</span>
                  <a className="contact-phone" href={`tel:${profile.phone}`}><Icon name="mobile" />{profile.phoneDisplay}<Icon name="arrow-up-right" /></a>
                </div>
              </div>
              <nav className="contact-socials" aria-label="Connect with Muhammad Arsalan">
                {socialLinks.map(link => <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer">
                  <span className="contact-social-mark" aria-hidden="true">{link.mark}</span>
                  <span><strong>{link.label}</strong><small>{link.detail}</small></span>
                  <Icon name="arrow-up-right" /><span className="sr-only">Opens in a new tab</span>
                </a>)}
              </nav>
            </div>
            <ContactForm enabled={enabled} />
          </div>
          <div className="contact-bottom">
            <div className="contact-location"><Icon name="pin" />Based in {profile.location}</div>
            <a className="contact-resume" href={profile.resume} download="Muhammad-Arsalan-Resume.pdf">Download my resume <Icon name="download" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
