import Link from "next/link";

export default function HomePage() {
  return (
    <section className="card stack">
      <p className="label">Phase 1A</p>
      <h1 className="title">Case Notes</h1>
      <p className="muted">
        Minimal privacy-first clinical case notes app with Google Sign-In and allowlist-based
        access control.
      </p>
      <div className="actions">
        <Link className="button" href="/login">
          Sign in
        </Link>
        <Link className="buttonSecondary" href="/dashboard">
          Go to dashboard
        </Link>
      </div>
    </section>
  );
}
