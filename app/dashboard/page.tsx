import { redirect } from "next/navigation";

import { auth, signOut } from "@/lib/auth";
import { isAllowedEmail } from "@/lib/allowlist";

export default async function DashboardPage() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  if (!isAllowedEmail(email)) {
    redirect("/unauthorized");
  }

  return (
    <section className="card stack">
      <p className="label">Protected route</p>
      <h1 className="title">Dashboard</h1>
      <p className="muted">This route is only available to signed-in users on the email allowlist.</p>
      <div className="metaRow">
        <div>
          <p className="label">Signed in as</p>
          <p className="value">{email}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="buttonSecondary" type="submit">
            Log out
          </button>
        </form>
      </div>
    </section>
  );
}
