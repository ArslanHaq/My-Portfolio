import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap min-h-screen flex flex-col items-start justify-center gap-6">
      <p className="section-kicker mono">404 / A SMALL DETOUR</p>
      <h1 className="text-5xl tracking-tight">Nothing here. Plenty to explore.</h1>
      <p className="hero-description">The page you’re looking for isn’t available. My work is one click away.</p>
      <Link className="button button-primary" href="/">Back to my portfolio →</Link>
    </main>
  );
}
