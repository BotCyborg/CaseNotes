# Project Overview

Case Notes Phase 1A is a **minimal privacy-first clinical case notes platform** built using **Next.js (App Router)** and **Auth.js** with **Google OAuth authentication**.

The project is designed as a **secure foundation for therapist and clinician tooling**, prioritizing:

* strong authentication
* minimal infrastructure complexity
* privacy-first architecture
* secure deployment

The current version focuses on **secure access control and deployment infrastructure** rather than application features. It establishes a safe operational baseline for future development.

Key characteristics of the architecture:

* **Stateless application design**
* **Google OAuth authentication**
* **Explicit email allowlist access control**
* **Secrets stored in Google Secret Manager**
* **Containerized deployment via Cloud Run**

The goal of this phase is to create a **secure base layer** that later phases can extend with:

* session transcription
* AI-generated case notes
* structured clinical reports
* secure patient record management

# Security Model

This project is designed with a **privacy-first architecture** suitable for clinical and therapy-related workflows.

The current implementation focuses on minimizing the risk of accidental data exposure while keeping the infrastructure simple.

## Access Control

Access to the application is restricted using two layers:

1. **Google OAuth authentication**
2. **Explicit email allowlist**

Only users whose email appears in `ALLOWED_EMAILS` can access the protected dashboard.

This ensures that even if the OAuth client is shared or misconfigured, unauthorized users cannot access the system.

```
User → Google OAuth → Auth.js → Email Allowlist → Dashboard
```

Google OAuth uses the OAuth 2.0 authorization framework so applications can verify identity without handling user passwords directly. ([The New Stack][1])

## Secrets Management

All sensitive values are stored in **Google Secret Manager**, not in source code or container images.

Secrets include:

* `AUTH_SECRET`
* `GOOGLE_CLIENT_ID`
* `GOOGLE_CLIENT_SECRET`
* `ALLOWED_EMAILS`

At deployment time, Cloud Run injects these secrets as environment variables.

Benefits:

* No secrets committed to Git
* Secrets can be rotated without rebuilding the container
* IAM policies control which services can access secrets

## Stateless Application Design

The application currently runs **without a database**.

Benefits:

* No persistent storage of sensitive clinical data
* Reduced attack surface
* Simpler infrastructure
* Easy horizontal scaling

Future phases will introduce **encrypted data storage with strict access control**.

## Infrastructure Security

Deployment uses the following GCP services:

* **Cloud Run** — container execution
* **Cloud Build** — container builds
* **Artifact Registry** — container image storage
* **Secret Manager** — secret storage

Service accounts are separated by role:

| Service Account         | Purpose              |
| ----------------------- | -------------------- |
| `cloud-run-build-sa`    | Builds containers    |
| `case-notes-runtime-sa` | Runs the application |

This separation limits blast radius if a service account is compromised.

## Privacy Principles

The project follows several guiding principles:

* least-privilege IAM
* no plaintext secrets in code
* minimal data retention
* explicit access allowlists
* simple and auditable architecture

These design choices make the system suitable as a foundation for **sensitive clinical workflows**.

# Project Roadmap

This repository represents **Phase 1A** of a larger clinical tooling platform.

Each phase introduces additional capabilities while maintaining strict privacy and security guarantees.

## Phase 1A — Secure Authentication Foundation

Status: **Complete**

Goals:

* Minimal secure web application
* Google OAuth login
* Explicit email allowlist
* Protected dashboard
* Health endpoint for infrastructure checks
* Containerized deployment
* Cloud Run deployment pipeline

This phase establishes the **secure operational baseline** for future development.

## Phase 2 — Session Ingestion & Transcription

Planned capabilities:

* Upload or ingest therapy session recordings
* Automatic speech-to-text transcription
* Speaker diarization (therapist / client)
* Timestamped transcripts
* Secure transcript storage

Possible technology stack:

* Whisper / WhisperX
* Pyannote diarization
* object storage for audio
* background transcription workers

Expected pipeline:

```
Session Audio
    ↓
Speech-to-Text
    ↓
Speaker Diarization
    ↓
Structured Transcript
```

This phase focuses on **accurate session capture** while maintaining strict privacy controls.

## Phase 3 — AI-Assisted Case Notes

Planned capabilities:

* automated clinical summaries
* GRIP case notes
* structured therapy reports
* session highlights
* risk or issue extraction

Example outputs:

* clinical case report
* GRIP notes (Goal / Reality / Issues / Plan)
* session summary
* therapist action items

Architecture concept:

```
Transcript
   ↓
LLM processing
   ↓
Clinical report
```

## Phase 4 — Secure Clinical Data Layer

Future improvements may include:

* encrypted case storage
* patient record management
* session history
* therapist dashboards
* role-based access control
* audit logs

At this stage the platform evolves into a **full clinical workflow system** rather than a transcription utility.

## Long-Term Vision

The long-term goal of this project is to create a **secure AI-assisted clinical documentation system** that helps therapists:

* reduce administrative burden
* maintain accurate session records
* generate structured reports
* preserve patient privacy

The system prioritizes:

* transparency
* security
* simplicity
* clinician control

[1]: https://thenewstack.io/implement-third-party-authentication-with-google-in-next-js/?utm_source=chatgpt.com "Implement Third-Party Authentication With Google in Next.js"



## Requirements

- Node.js 20 or newer
- npm
- Google OAuth web application credentials
- Google Cloud project for Cloud Run deployment

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
AUTH_SECRET=replace-with-a-long-random-secret
AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=replace-with-google-client-id
GOOGLE_CLIENT_SECRET=replace-with-google-client-secret
ALLOWED_EMAILS=person1@gmail.com,person2@gmail.com
```

Notes:

- Keep `ALLOWED_EMAILS` as a comma-separated list with no spaces.
- Use a strong random value for `AUTH_SECRET`, for example:

```bash
openssl rand -base64 32
```

## Google OAuth configuration

Create a Google OAuth web application and configure:

- Authorized JavaScript origins:
  - `http://localhost:3000`
  - `https://YOUR_CLOUD_RUN_URL`
- Authorized redirect URIs:
  - `http://localhost:3000/api/auth/callback/google`
  - `https://YOUR_CLOUD_RUN_URL/api/auth/callback/google`

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build locally

This project uses Next.js standalone output.

```bash
npm run build
npm start
```

The standalone server uses port `3000` by default. To test the Cloud Run port locally:

```bash
PORT=8080 node .next/standalone/server.js
```

## Docker build

```bash
docker build -t case-notes-phase-1a .
docker run --rm -p 8080:8080 --env-file .env.local case-notes-phase-1a
```

## Cloud Run deployment

### 1. Install and initialize Google Cloud CLI

```bash
gcloud init
gcloud config set project YOUR_PROJECT_ID
gcloud config set run/region YOUR_REGION
```

### 2. Enable required services

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com
```

### 3. Create Secret Manager secrets

Load local env vars into your shell:

```bash
set -a
source .env.local
set +a
```

Create the secrets the first time:

```bash
printf "%s" "$AUTH_SECRET" | gcloud secrets create auth-secret --data-file=-
printf "%s" "$GOOGLE_CLIENT_ID" | gcloud secrets create google-client-id --data-file=-
printf "%s" "$GOOGLE_CLIENT_SECRET" | gcloud secrets create google-client-secret --data-file=-
printf "%s" "$ALLOWED_EMAILS" | gcloud secrets create allowed-emails --data-file=-
```

If the secrets already exist, add new versions instead:

```bash
printf "%s" "$AUTH_SECRET" | gcloud secrets versions add auth-secret --data-file=-
printf "%s" "$GOOGLE_CLIENT_ID" | gcloud secrets versions add google-client-id --data-file=-
printf "%s" "$GOOGLE_CLIENT_SECRET" | gcloud secrets versions add google-client-secret --data-file=-
printf "%s" "$ALLOWED_EMAILS" | gcloud secrets versions add allowed-emails --data-file=-
```

### 4. Create service accounts

Build service account:

```bash
PROJECT_ID=YOUR_PROJECT_ID
BUILD_SA_NAME=cloud-run-build-sa
BUILD_SA_EMAIL="${BUILD_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts create "$BUILD_SA_NAME" \
  --display-name="Cloud Run build service account"
```

Runtime service account:

```bash
PROJECT_ID=YOUR_PROJECT_ID
RUNTIME_SA_NAME=case-notes-runtime-sa
RUNTIME_SA_EMAIL="${RUNTIME_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts create "$RUNTIME_SA_NAME" \
  --display-name="Case Notes runtime service account"
```

### 5. Grant required IAM roles

```bash
PROJECT_ID=YOUR_PROJECT_ID
BUILD_SA_EMAIL="cloud-run-build-sa@${PROJECT_ID}.iam.gserviceaccount.com"
RUNTIME_SA_EMAIL="case-notes-runtime-sa@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${BUILD_SA_EMAIL}" \
  --role="roles/logging.logWriter"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${BUILD_SA_EMAIL}" \
  --role="roles/storage.objectViewer"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${BUILD_SA_EMAIL}" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${BUILD_SA_EMAIL}" \
  --role="roles/run.builder"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${RUNTIME_SA_EMAIL}" \
  --role="roles/secretmanager.secretAccessor"
```

### 6. Deploy from source

First deployment:

```bash
PROJECT_ID=YOUR_PROJECT_ID
REGION=YOUR_REGION
BUILD_SA_EMAIL="cloud-run-build-sa@${PROJECT_ID}.iam.gserviceaccount.com"
RUNTIME_SA_EMAIL="case-notes-runtime-sa@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud run deploy case-notes-phase1a \
  --source . \
  --region "$REGION" \
  --build-service-account="projects/${PROJECT_ID}/serviceAccounts/${BUILD_SA_EMAIL}" \
  --service-account="${RUNTIME_SA_EMAIL}" \
  --allow-unauthenticated \
  --set-env-vars AUTH_TRUST_HOST=true \
  --set-secrets AUTH_SECRET=auth-secret:latest,GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,ALLOWED_EMAILS=allowed-emails:latest
```

After you receive the service URL, redeploy with `AUTH_URL` set to that exact URL:

```bash
SERVICE_URL=https://YOUR_CLOUD_RUN_URL

gcloud run deploy case-notes-phase1a \
  --source . \
  --region "$REGION" \
  --build-service-account="projects/${PROJECT_ID}/serviceAccounts/${BUILD_SA_EMAIL}" \
  --service-account="${RUNTIME_SA_EMAIL}" \
  --allow-unauthenticated \
  --set-env-vars AUTH_TRUST_HOST=true,AUTH_URL="${SERVICE_URL}" \
  --set-secrets AUTH_SECRET=auth-secret:latest,GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,ALLOWED_EMAILS=allowed-emails:latest
```

### 7. If public invoker IAM is blocked by organization policy

Some organizations block adding `allUsers` as `roles/run.invoker`. If deployment finishes with an IAM warning, update the service to disable the invoker IAM check:

```bash
gcloud run services update case-notes-phase1a \
  --region "$REGION" \
  --no-invoker-iam-check
```

### 8. Verify the deployment

```bash
curl -i https://YOUR_CLOUD_RUN_URL/api/health
```

Expected response:

```json
{"ok":true}
```

### 9. Update Google OAuth production settings

After deployment, update your Google OAuth app with:

- Authorized JavaScript origin:
  - `https://YOUR_CLOUD_RUN_URL`
- Authorized redirect URI:
  - `https://YOUR_CLOUD_RUN_URL/api/auth/callback/google`
