---
tags: [architecture, operations]
---

# Health Model

Three signals are kept strictly separate:

| Signal | Where | Meaning |
|---|---|---|
| **Observer health** | `GET /health` on the [[Control API]] | are the observer's own components alive? |
| **Target health** | your application's own checks | is the app under observation alive? |
| **Mission result** | [[Mission Runner]] exit codes | did the journey pass its [[Checks Reference]]? |

A broken target must never mark the observer unhealthy — demonstrated: stopping the [[Sample App]] container leaves `/health` at HTTP 200 `ok`, while stopping x11vnc flips it to HTTP 503 `degraded` with the failing component named (see [[Project History]]).

## Components checked

| Component | Check |
|---|---|
| `xvfb` | X socket `/tmp/.X11-unix/X99` exists |
| `window-manager` | openbox process running |
| `x11vnc` | TCP 5900 accepts connections |
| `novnc` | TCP 6080 accepts connections |
| `chromium-playwright` | shared context alive and `page.evaluate` responds |
| `cdp` | Chromium DevTools port accepts connections |
| `artifacts-dir` | `/artifacts` is writable (probe file) |

All components belong to the [[Display Stack]] or the [[Observer Server]].

## Consumers

- `make health` — pretty-printed report.
- Docker healthcheck — `curl /health` every 15 s drives the container's `healthy` status in `docker compose ps`.
- Integration tests assert all seven components (see [[Testing]]).

Recovery: supervisord restarts crashed programs automatically; individual components can be restarted via `supervisorctl` (see [[Display Stack]] and [[Troubleshooting]]).
