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

Additional docs:

- [Security Model](docs/security-model.md)
- [Cloud Run Deployment](docs/cloud-run-deployment.md)

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
