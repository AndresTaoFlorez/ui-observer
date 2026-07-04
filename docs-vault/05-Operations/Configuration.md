---
tags: [operations, reference]
---

# Configuration

All configuration is environment-driven. Copy `.env.example` → `.env`; compose interpolates it (shell env overrides `.env`). Changing values requires `docker compose up -d` to recreate.

| Variable | Default | Purpose |
|---|---|---|
| `UI_OBSERVER_TARGET_URL` | `http://sample-app:3000` | URL the shared browser opens at startup and the default mission target — [[Sample App]], host apps, or any authorized URL |
| `UI_OBSERVER_ALLOWED_HOSTS` | `sample-app,host.docker.internal,localhost,127.0.0.1` | hostname allow-list enforced by the [[URL Policy]] |
| `UI_OBSERVER_NOVNC_PORT` | `6080` | host loopback port for noVNC ([[Display Stack]]) |
| `UI_OBSERVER_CDP_PORT` | `9222` | host loopback port for the [[CDP Endpoint]] |
| `UI_OBSERVER_API_PORT` | `8090` | host loopback port for the [[Control API]] |
| `UI_OBSERVER_SAMPLE_APP_PORT` | `3000` | host loopback port for the sample app |
| `UI_OBSERVER_VIEWPORT_WIDTH` / `_HEIGHT` | `1440` / `900` | Xvfb screen size and default mission viewport |
| `UI_OBSERVER_PROFILE_MODE` | `ephemeral` | `ephemeral` or `persistent` — see [[Profiles]] |
| `UI_OBSERVER_RECORD_VIDEO` | `true` | mission video recording ([[Artifacts]]) |
| `UI_OBSERVER_RECORD_TRACE` | `true` | mission trace recording |
| `UI_OBSERVER_ARTIFACT_RETENTION_DAYS` | `14` | window for `make cleanup` |
| `UI_OBSERVER_HEADLESS` | `false` | headless missions — see [[CI Mode]] |

## Precedence details

- Mission target resolution: mission `target_url` → `--target-url` CLI flag → `UI_OBSERVER_TARGET_URL` ([[Mission Runner]]).
- `.env` is git-ignored; never commit real hostnames or anything sensitive ([[Security Model]]).
- Ports only change the **host** binding; inside the container the services always use 6080/9222/8090.

Related: [[Quick Start]] · [[Commands Reference]]
