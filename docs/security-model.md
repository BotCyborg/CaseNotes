# Security Model

Case Notes is intended for sensitive clinical workflows, so the project is being built with a privacy-first and least-privilege security posture from the start.

This document describes the **current Phase 1A security model**, not the final end-state architecture.

## Current security controls

### Authentication and access control

Access to the protected application is restricted through two checks:

1. Google OAuth authentication via Auth.js
2. Explicit email allowlist verification through `ALLOWED_EMAILS`

Only authenticated users whose email addresses appear in the allowlist can access `/dashboard`.

Current flow:

```text
User -> Google OAuth -> Auth.js -> Email allowlist -> Protected routes
```

### Secret handling

Sensitive runtime values are kept out of source control and injected at deploy time.

Secrets currently used:

- `AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ALLOWED_EMAILS`

For Cloud Run deployments, these values are stored in Google Secret Manager and exposed to the service as environment variables.

### Infrastructure isolation

The deployment setup separates build and runtime responsibilities across different service accounts:

| Service Account | Purpose |
| --- | --- |
| `cloud-run-build-sa` | Builds and publishes the container |
| `case-notes-runtime-sa` | Runs the deployed application |

This keeps permissions narrower than using a single broad account for both steps.

## Important scope note

The app is currently stateless and does not yet include a database. That is a **phase limitation**, not a permanent architectural claim.

Today, the absence of stored clinical data reduces the amount of sensitive state handled by the app, but future phases are expected to introduce persistent storage for transcripts, notes, and related records. When that happens, the security model will expand to cover:

- encryption at rest
- application-level access controls
- auditability
- data retention and deletion policies
- secure storage boundaries for clinical records

## Security goals for later phases

As the product evolves, the security model is expected to grow toward:

- stronger protections around stored clinical data
- role-based authorization
- auditable access patterns
- secure processing pipelines for transcription and note generation
- clearer operational controls for production environments
