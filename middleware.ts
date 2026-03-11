import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { isAllowedEmail } from "@/lib/allowlist";

export default auth((request) => {
  const email = request.auth?.user?.email;

  if (!email) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (!isAllowedEmail(email)) {
    return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"]
};
