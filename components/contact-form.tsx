"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { contactLimits, contactTopics, isContactResult, validateContact, type ContactErrors } from "@/lib/contact";
import { profile } from "@/lib/site";
import { useContactAvailability } from "@/lib/use-contact-availability";
import { Icon } from "./icon";

const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function ContactForm() {
  const { container, availability, checkAvailability } = useContactAvailability();
  const enabled = availability === "available";
  const hydrated = useSyncExternalStore(subscribeHydration, clientReady, serverReady);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const inFlight = useRef(false);
  const submission = useRef<{ fingerprint: string; id: string } | null>(null);

  function showErrors(form: HTMLFormElement, nextErrors: ContactErrors) {
    setErrors(nextErrors);
    const field = Object.keys(nextErrors)[0];
    const control = field ? form.elements.namedItem(field) : null;
    if (control instanceof HTMLElement) requestAnimationFrame(() => control.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || inFlight.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const values = Object.fromEntries(fields.entries());
    const parsed = validateContact(values);
    setFeedback(null);
    if (!parsed.ok) { showErrors(form, parsed.errors); return; }
    setErrors({});
    setPending(true);
    inFlight.current = true;
    try {
      const fingerprint = JSON.stringify(parsed.data);
      if (submission.current?.fingerprint !== fingerprint) submission.current = { fingerprint, id: crypto.randomUUID() };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: values.website, submissionId: submission.current.id }),
        signal: AbortSignal.timeout(35_000),
      });
      const result: unknown = await response.json();
      if (!isContactResult(result)) throw new Error("Unrecognized form response");
      if (!result.ok) {
        if (result.errors) showErrors(form, result.errors);
        setFeedback({ ok: false, text: result.message });
        return;
      }
      if (!response.ok) throw new Error("Unconfirmed submission");
      const confirmationText = result.confirmation === "sent"
        ? " A confirmation email is on its way. I’ll reply personally by email."
        : result.confirmation === "unavailable"
          ? " The confirmation email couldn’t be sent, but I have your enquiry and will reply by email."
          : " I’ll reply by email.";
      setFeedback({ ok: true, text: `Thanks for reaching out. Your message has been submitted.${confirmationText}` });
      submission.current = null;
      form.reset();
    } catch {
      setFeedback({ ok: false, text: "Sending wasn’t confirmed. Your message is still here—please retry it, or email me directly." });
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  const fieldError = (field: keyof ContactErrors) => errors[field] && <p className="contact-field-error" id={`contact-${field}-error`}>{errors[field]}</p>;

  return (
    <div className="contact-form-card" ref={container} aria-labelledby="contact-form-title">
      <p className="contact-form-kicker mono">START A CONVERSATION</p>
      <h3 id="contact-form-title">Tell me what you have in mind.</h3>
      <p className="contact-form-intro">Share a few details and the best email to reach you.</p>
      <div className="contact-availability" role="status" aria-live="polite">
        {availability === "checking" && <p className="contact-form-notice">Checking the contact form…</p>}
        {availability === "available" && <p className="contact-form-notice contact-form-ready"><Icon name="check" /> Ready for your message.</p>}
        {(availability === "unavailable" || availability === "error") && <p className="contact-form-notice">
          {availability === "unavailable" ? "The form is currently unavailable. " : "The contact form couldn’t connect. "}
          You can <a href={`mailto:${profile.email}`}>email me directly</a> or <button type="button" onClick={() => void checkAvailability()}>try again</button>.
        </p>}
      </div>
      <noscript>
        <style>{".contact-form-fields,.contact-availability{display:none!important}"}</style>
        <p className="contact-form-notice">To get in touch without JavaScript, <a href={`mailto:${profile.email}`}>send me an email</a>.</p>
      </noscript>
      <form className="contact-form-fields" data-configured={enabled} data-availability={availability} data-ready={hydrated} action="/api/contact" method="post" onSubmit={submit} noValidate aria-busy={pending || availability === "checking"}>
        <fieldset disabled={pending || !enabled || !hydrated}>
          <legend className="sr-only">Your contact details and enquiry</legend>
          <div className="contact-field-pair">
            <div className="contact-field">
              <label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label>
              <input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={contactLimits.name}
                aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} />
              {fieldError("name")}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={contactLimits.email}
                aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />
              {fieldError("email")}
            </div>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-topic">What can I help with? <span aria-hidden="true">*</span></label>
            <select id="contact-topic" name="topic" defaultValue="" required aria-invalid={!!errors.topic} aria-describedby={errors.topic ? "contact-topic-error" : undefined}>
              <option value="" disabled>Select an enquiry type</option>
              {contactTopics.map(topic => <option key={topic} value={topic}>{topic}</option>)}
            </select>
            {fieldError("topic")}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">Your message <span aria-hidden="true">*</span></label>
            <textarea id="contact-message" name="message" rows={5} placeholder="A little about your idea, goals, or the challenge you’re working on…" required minLength={contactLimits.minMessage} maxLength={contactLimits.message}
              aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"} />
            {fieldError("message")}
            <p className="contact-field-hint" id="contact-message-hint">20–4,000 characters. Please leave out passwords or other sensitive information.</p>
          </div>
          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button className="button button-primary contact-submit" type="submit" disabled={pending || !enabled || !hydrated}>
            {pending ? "Sending message…" : "Send message"}<Icon name={pending ? "cloud" : "arrow-up-right"} />
          </button>
        </fieldset>
        <div className={`contact-feedback${feedback ? feedback.ok ? " is-success" : " is-error" : ""}`} role="status" aria-live="polite" aria-atomic="true">
          {feedback && <p>{feedback.text}</p>}
        </div>
        <p className="contact-privacy">Your details are used to send a confirmation and respond to your enquiry.</p>
      </form>
    </div>
  );
}
