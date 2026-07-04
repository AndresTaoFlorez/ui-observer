---
tags: [architecture, agents]
---

# Control API

HTTP interface of the [[Observer Server]] at **`http://127.0.0.1:8090`**. Simpler than [[Playwright over CDP]] — no Playwright client needed, ideal for shell-driven agents (the [[Observer CLI]] wraps it).

## Routes

| Route | Purpose |
|---|---|
| `GET /health` | component health; 200 ok / 503 degraded — see [[Health Model]] |
| `GET /status` | version, [[Profiles]] mode, target, allowed hosts, open pages |
| `GET /cdp-info` | how to attach via the [[CDP Endpoint]] |
| `POST /navigate` `{"url": "…"}` | navigate the shared page; **422** if the [[URL Policy]] rejects |
| `POST /screenshot` `{"name?", "full_page?"}` | PNG into `artifacts/screenshots/`, see [[Artifacts]] |
| `GET /console?clear=1` | captured console + page errors (redacted) |
| `GET /network?problems=1&clear=1` | captured requests; `problems=1` filters failures/4xx/5xx |

## Examples

```bash
curl -s http://127.0.0.1:8090/health
curl -s -X POST http://127.0.0.1:8090/navigate \
     -H 'content-type: application/json' \
     -d '{"url":"http://sample-app:3000/network-fail"}'
curl -s "http://127.0.0.1:8090/network?problems=1"
```

## Behavior notes

- Console/network evidence is collected **continuously** into 2000-entry ring buffers by the [[Observer Server]] — you can ask *after* something went wrong.
- Every captured entry already passed [[Secret Redaction]]; verified: an `Authorization: Bearer …` header appears as `[REDACTED]`.
- Unknown routes return the route list — the API is self-describing for agents.

Related: [[Agent Integration]] · [[Configuration]]
