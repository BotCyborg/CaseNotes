# Case Notes

AI-assisted clinical documentation for therapists, built with privacy and security at its core.

⚠️ Early development project  
Current milestone: Phase 1A — Secure authentication foundation

# Project Overview

Case Notes is a privacy-first clinical documentation platform currently under active development.

The project started as a practical solution to a real problem: managing clinical documentation for therapists with heavy caseloads.

My wife is an addiction counsellor who conducts multiple therapy sessions each day. Like many clinicians, a significant portion of her time outside sessions is spent writing case notes, summarising conversations, and documenting progress for each client. This administrative workload can quickly become overwhelming and takes time away from the work that matters most — helping clients.

Case Notes aims to reduce that burden by helping transform recorded therapy sessions into structured clinical documentation.

The long-term goal is a secure workflow where a therapist can upload a session recording and receive:

- a structured transcript with speaker separation
- a concise clinical session summary
- professional case notes in formats commonly used in therapy practice, including GRIP notes
- ongoing summaries of client progress over time

Because therapy sessions contain highly sensitive information, the system is being designed from the start with strong privacy and security principles. The architecture prioritizes:

- minimal exposure of sensitive data
- secure handling of recordings and transcripts
- explicit access controls
- least-privilege infrastructure design

Although the project began as a tool to solve a real operational challenge for one counsellor, the architecture is being designed to support broader use by clinical psychologists, therapists, and counsellors who face similar documentation workloads.

This repository contains the code and documentation for the platform, along with the development roadmap that will guide the system from a secure foundation to a fully featured clinical documentation workflow.

# High-Level Architecture

The long-term system is designed as a modular pipeline:

```text
Session Audio
      ↓
Audio Ingestion
      ↓
Speech-to-Text + Speaker Diarization
      ↓
Structured Transcript
      ↓
LLM Processing
      ↓
Clinical Case Notes
      ↓
Secure Storage and Retrieval
```

This architecture becomes more relevant as later phases introduce:

- transcription workers
- secure storage
- LLM processing


# Why This Stack

Case Notes is being built with a technology stack chosen deliberately for **simplicity, security, and maintainability**, rather than maximum feature complexity.

The goal is to support sensitive clinical workflows while keeping the infrastructure understandable and easy to operate.

## Next.js (App Router)

Next.js provides a simple way to build a full-stack application with both frontend and backend capabilities in a single codebase.

Benefits for this project include:

* server-side rendering for secure routes
* integrated API routes
* simple deployment to container environments
* strong ecosystem and long-term support

Using a single framework reduces operational complexity and keeps the application architecture easier to maintain.

## Auth.js with Google OAuth

Authentication is handled using **Auth.js with Google OAuth**.

Reasons for this choice:

* avoids managing passwords directly
* leverages Google's mature identity infrastructure
* reduces security risks associated with custom authentication systems
* simple integration with Next.js

Access to the application is further restricted using an explicit email allowlist.

## Google Cloud Platform

The backend infrastructure is deployed on **Google Cloud Platform (GCP)**.

The initial stack includes:

* **Cloud Run** for containerized application hosting
* **Cloud Build** for automated container builds
* **Artifact Registry** for container image storage
* **Secret Manager** for secure runtime secrets

GCP was chosen primarily because:

* it integrates cleanly with container-based deployments
* it provides strong IAM and service account controls
* infrastructure can remain minimal for early development
* the system can scale later without major architectural changes

## Cloud Run

Cloud Run is used as the primary compute platform.

Advantages:

* fully managed container execution
* automatic scaling
* no infrastructure maintenance
* simple deployment pipeline

For early phases of the project, Cloud Run allows the system to run with **minimal operational overhead** while remaining production-ready.

## Secret Manager

Sensitive configuration values are stored in **Google Secret Manager** rather than environment files or source code.

This ensures:

* secrets are not committed to the repository
* runtime access is controlled through IAM
* secrets can be rotated without rebuilding containers

This is especially important for applications handling sensitive clinical workflows.

## Designing for Later Phases

Although the current implementation is intentionally minimal, the stack was chosen so it can support later capabilities such as:

* audio processing pipelines
* transcription workers
* secure transcript storage
* LLM-based document generation
* role-based access control

The architecture favors **incremental evolution** rather than premature complexity.


# Project Roadmap

This repository covers the full roadmap. The currently implemented milestone is **Phase 1A**.

### Status Legend

| Indicator | Meaning |
| --- | --- |
| 🟢 | Complete |
| 🟡 | Planned / next-up |
| ⚪ | Future |
| 🔵 | In progress |

### Phase Completion

| Phase | Scope | Status | Completion | Summary |
| --- | --- | --- | --- | --- |
| Phase 1A | Secure authentication foundation | 🟢 Complete | `100%` | Google OAuth, email allowlist, protected dashboard, health endpoint, Docker, Cloud Run deployment |
| Phase 2 | Session ingestion and transcription | 🟡 Planned | `0%` | Audio ingestion, speech-to-text, diarization, timestamped transcripts, secure transcript handling |
| Phase 3 | AI-assisted case notes | ⚪ Future | `0%` | Clinical summaries, GRIP notes, session highlights, therapist action items |
| Phase 4 | Secure clinical data layer | ⚪ Future | `0%` | Encrypted case storage, patient records, history, therapist dashboards, RBAC, audit logs |

### Roadmap Notes

- Phase 1A establishes the secure operational baseline for every later phase.
- Phase 2 focuses on accurate and privacy-preserving session capture.
- Phase 3 turns transcripts into structured clinical outputs.
- Phase 4 expands the product into a full secure clinical workflow system.


Additional docs:

- [Security Model](docs/security-model.md)
- [Cloud Run Deployment](docs/cloud-run-deployment.md)