import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signIn } from "@/lib/auth";
import { isAllowedEmail } from "@/lib/allowlist";

export default async function LoginPage() {
  const session = await auth();
  const email = session?.user?.email;

  if (email && isAllowedEmail(email)) {
    redirect("/dashboard");
  }

  if (email) {
    redirect("/unauthorized");
  }

  return (
    <section className="card stack">
      <p className="label">Authentication</p>
      <h1 className="title">Sign in</h1>
      <p className="muted">
        Use an allowlisted Google account to access the clinical notes dashboard.
      </p>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" }, { prompt: "select_account" });
        }}
      >
        <button className="button" type="submit">
          Sign in with Google
        </button>
      </form>
      <div className="actions">
        <Link className="buttonSecondary" href="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}
