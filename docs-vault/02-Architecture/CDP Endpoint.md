---
tags: [architecture, agents]
---

# CDP Endpoint

The Chrome DevTools Protocol endpoint at **`http://127.0.0.1:9222`** gives agents full Playwright control of the *shared* browser — the exact session the human watches (see [[Shared Browser Model]]).

## Why there is a relay

Headed Chromium refuses to bind its DevTools listener to anything but container-loopback (`--remote-debugging-address` is ignored for headed browsers, a Chromium security measure). So:

```
host 127.0.0.1:9222  →  container :9222 (socat relay)  →  chromium :9221 (loopback)
```

The socat program lives in the [[Display Stack]] supervisord config. Compose publishes the port to host loopback **only** — CDP is unauthenticated by nature, and loopback binding is the control (see [[Security Model]]).

## Verifying it

```bash
curl http://127.0.0.1:9222/json/version     # → Chrome/149.…, webSocketDebuggerUrl
```

## Using it

```js
import { chromium } from 'playwright';
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
const page = browser.contexts()[0].pages()[0];   // the human-visible page
```

Full patterns in [[Playwright over CDP]]; MCP-based agents attach the same endpoint via [[Playwright MCP]].

## Limitations

- `connectOverCDP` contexts do not support Playwright's full recording feature set — which is why the [[Mission Runner]] uses its own context for trace/video.
- `browser.close()` on a CDP client only **detaches**; the shared browser keeps running under the [[Observer Server]] watchdog.

Related: [[Agent Integration]] · [[Control API]]
