# Project Overview

Case Notes is a privacy-first clinical documentation platform under active development. This repository is the home for the full product roadmap, not just a single milestone.

The current implemented milestone is **Phase 1A**, which establishes the secure application and deployment baseline for later work.

Additional docs:

- [Security Model](docs/security-model.md)
- [Cloud Run Deployment](docs/cloud-run-deployment.md)

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
