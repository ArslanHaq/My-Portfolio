"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/site";
import { Icon } from "./icon";

export function CopyEmailButton() {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    let feedback = "Please select and copy the email address shown.";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profile.email);
        feedback = "Email address copied. Let’s talk.";
      }
    } catch { /* Keep the visible address and mailto link available as a fallback. */ }
    setMessage(feedback);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 4000);
  };

  return (
    <>
      <button className="copy-email" id="copy-email" type="button" aria-label="Copy email address" title="Copy email address" onClick={copy}>
        <Icon name="copy" />
      </button>
      <div className={`toast${message ? " visible" : ""}`} role="status" aria-live="polite">{message}</div>
    </>
  );
}
