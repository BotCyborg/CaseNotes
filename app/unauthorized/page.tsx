import Link from "next/link";

import { auth, signOut } from "@/lib/auth";

export default async function UnauthorizedPage() {
  const session = await auth();

  return (
    <section className="card stack">
      <p className="label">Access denied</p>
      <h1 className="title">Unauthorized</h1>
      <p className="muted">
        Your Google account is authenticated, but the email address is not on the access
        allowlist for this app.
      </p>
      <div className="actions">
        {session?.user?.email ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="button" type="submit">
              Sign out
            </button>
          </form>
        ) : (
          <Link className="button" href="/login">
            Try another account
          </Link>
        )}
        <Link className="buttonSecondary" href="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
