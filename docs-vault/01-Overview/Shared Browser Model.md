---
tags: [overview, architecture]
---

# Shared Browser Model

The core idea: **one visible Chromium session, two controllers**.

```
Human developer
      │ watches through noVNC (http://127.0.0.1:6080)
      ▼
Shared visible Chromium (Docker, display :99)
      ▲
      │ Playwright CDP · MCP · HTTP API · CLI
Coding agent
```

The [[Observer Server]] launches one long-lived headed Chromium via Playwright's `launchPersistentContext` on the virtual display provided by the [[Display Stack]]. That single session is simultaneously:

- **streamed to the human** through x11vnc → noVNC,
- **exposed to agents** through the [[CDP Endpoint]] on `127.0.0.1:9222`.

Anything the agent does (click, type, navigate) is instantly visible to the human. Anything the human does (e.g. logging in manually through noVNC, see [[Profiles]]) is visible to the agent. This was demonstrated with framebuffer evidence — an agent-triggered modal captured on the actual X display (`artifacts/phase2-shared-control-modal.png`, see [[Project History]]).

## The one deliberate exception

The [[Mission Runner]] does **not** reuse the shared CDP session. It launches its *own clean Playwright context* — on the same display, so the human still watches every step live — because Playwright's native trace and video recording is only fully supported on contexts Playwright itself creates. `connectOverCDP` has documented feature limitations.

| Mode | Browser | Human sees it | Recording |
|---|---|---|---|
| Interactive | shared session | ✔ | screenshots via [[Control API]] |
| Evaluation | mission-owned context | ✔ (same display) | full trace + video + HAR-grade network |

Both modes satisfy the project's shared-browser requirement; the trade-off is documented honestly rather than claimed away.

Related: [[Architecture Overview]] · [[Agent Integration]] · [[Reasoning Loop]]
