---
tags: [security]
---

# Secret Redaction

Credentials must never reach disk or agent context via captured evidence. Redaction happens **at capture time** — inside the evidence collectors of the [[Observer Server]] and the [[Mission Runner]] — so secrets never exist in [[Artifacts]], API responses, or ring buffers.

## What gets redacted (→ `[REDACTED]`)

| Surface | Rule |
|---|---|
| **Headers** | `authorization`, `proxy-authorization`, `cookie`, `set-cookie`, `x-api-key`, `x-auth-token`, `x-csrf-token` |
| **URL query params** | keys matching token / secret / password / api-key / auth / session / credential / bearer |
| **URL userinfo** | passwords in `user:pass@host` |
| **Free text** | `Bearer …` / `Basic …` values embedded in console messages |
| **Object keys** | same sensitive-key regex, applied recursively |
| **Bodies** | request/response bodies are **never captured at all** |

Implementation: `apps/shared/src/redaction.ts`, shared by both capture paths.

## Verified, not assumed

- The [[Sample App]]'s `/network-fail` page sends `Authorization: Bearer sample-secret-token-12345`.
- Interactive capture ([[Control API]] `GET /network`) records `authorization: [REDACTED]`.
- Mission evidence: asserted that the secret substring appears **nowhere** in `network.json`.
- Unit tests cover each rule; an integration test re-verifies against the live stack ([[Testing]]).

## Boundaries

- Redaction is pattern-based: an app that leaks a credential inside ordinary prose under a non-suspicious key can evade it. Treat [[Artifacts]] as sensitive regardless ([[Security Model]]).
- Screenshots and video are pixels — a page that *displays* a secret will show it. Prefer test accounts; reset [[Profiles]] before sharing evidence.
