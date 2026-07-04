---
tags: [operations]
---

# Testing

37 tests across three tiers — the integration and e2e tiers use the **real containerized Chromium**, never mocks (a hard project requirement).

```bash
npm test                # everything (stack must be up: make up)
npm run test:unit       # no stack needed
npm run test:integration
npm run test:e2e
```

## Unit (`tests/unit/`) — 28 tests

| Suite | Covers |
|---|---|
| `url-policy.test.ts` | [[URL Policy]]: dangerous schemes rejected, host allow-list, case-insensitivity |
| `redaction.test.ts` | [[Secret Redaction]]: headers, query params, bearer-in-text, nested objects |
| `mission-schema.test.ts` | [[Mission Format]]: defaults, unknown actions/checks rejected, locator requirements |
| `findings.test.ts` | [[Findings]]: severity grading, allow patterns (incl. console location), step-failure findings |

## Integration (`tests/integration/`) — against the live stack

- `/health` returns all 7 components ok ([[Health Model]]); noVNC serves on loopback.
- `connectOverCDP` drives the shared browser: navigates the [[Sample App]], opens and closes the modal ([[Playwright over CDP]]).
- [[Control API]]: URL-policy rejections (422), screenshots land in the artifacts mount, network capture shows `authorization: [REDACTED]`.

## E2E (`tests/e2e/`) — full mission runs

- `generic-smoke` passes and produces the complete [[Artifacts]] tree (manifest, report, trace, video, screenshots).
- `error-hunt` exits 1 with high findings — proving detection, not just absence of crashes.

## Conventions

- Tests that need the stack fail fast with a clear "run make up" error.
- Timeouts are generous (60 s default, 150 s for missions) because real browsers are involved.
- Add regression tests next to the tier they belong to; keep real-browser coverage for anything touching evidence or control paths.

Related: [[CI Mode]] · [[Project History]]
