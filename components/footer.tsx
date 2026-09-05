import { MotionToggle } from "./motion-toggle";

export function Footer() {
  return (
    <footer className="site-footer"><div className="wrap footer-row"><div className="footer-brand"><svg className="brand-logo" viewBox="0 0 38 38" aria-hidden="true" fill="none"><path d="M10 7 3 19l7 12M28 7l7 12-7 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><path d="m14 25 5-12 5 12m-8-4h6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg><span>© {new Date().getFullYear()} Muhammad Arsalan. Thoughtfully built.</span></div><div className="footer-actions"><MotionToggle /><a className="back-to-top" href="#top">Back to top <svg className="icon" aria-hidden="true"><use href="#i-arrow-up" /></svg></a></div></div></footer>
  );
}
