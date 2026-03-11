# Security Policy

## Overview

Case Notes is a privacy-first clinical documentation platform under active development. Even in early phases, security issues should be treated seriously because later milestones are expected to handle sensitive clinical data.

This policy explains:

- which code is currently supported for security fixes
- how to report a vulnerability privately
- how reports will be handled

For the current technical security posture, see [docs/security-model.md](docs/security-model.md).

## Supported Versions

The project does not yet publish formal releases.

For now:

- the `main` branch is the actively supported version
- security fixes are expected to land against the latest development state
- older commits, forks, and experimental branches may not receive patches

This section should be updated once the project begins shipping versioned releases.

## Reporting a Vulnerability

Do **not** report security vulnerabilities in public GitHub issues.

Please report them privately by email to one of the following addresses:

- `sam@botcyb.org`
- `sambitbikaspal@gmail.com`

Use the subject line:

```text
[SECURITY] Case Notes vulnerability report
```

Include:

- a clear description of the issue
- steps to reproduce it
- affected components or files
- expected impact
- any suggested remediation, if known

## Response Expectations

Reports will be reviewed on a best-effort basis.

The maintainer will aim to:

- acknowledge receipt within a reasonable time
- validate the report and assess impact
- prepare a fix or mitigation as practical
- coordinate disclosure after a patch or mitigation is available

Please avoid public disclosure until the issue has been reviewed and a fix or mitigation plan is in place.

## Scope Notes

The current implementation is still early-stage. Some later-phase security controls described elsewhere in the repository are planned rather than already implemented.

In particular:

- the current app is still Phase 1A
- it does not yet include the later persistent clinical data flows described in the roadmap
- security review should focus on the code and infrastructure that currently exist, while still taking future sensitivity seriously

## Out of Scope

The following generally do not qualify as security vulnerabilities by themselves unless they lead to a concrete confidentiality, integrity, or availability impact:

- best-practice suggestions with no demonstrable exploit path
- self-XSS without privilege escalation or data exposure
- issues limited to local development environments
- theoretical findings that cannot be reproduced in this project context

## Responsible Disclosure

Please give the maintainer a reasonable opportunity to investigate and remediate reported issues before disclosing them publicly.

Responsible reporters may be credited unless anonymity is requested.
