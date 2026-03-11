function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function getAllowedEmails(): Set<string> {
  return new Set(
    (process.env.ALLOWED_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
      .map(normalizeEmail)
  );
}

export function isAllowedEmail(email?: string | null): boolean {
  if (!email) {
    return false;
  }

  return getAllowedEmails().has(normalizeEmail(email));
}
