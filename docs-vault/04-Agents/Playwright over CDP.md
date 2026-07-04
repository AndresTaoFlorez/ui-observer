---
tags: [agents]
---

# Playwright over CDP

The most powerful surface: attach a Playwright client to the [[CDP Endpoint]] and drive the exact browser the human watches.

```js
import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
const context = browser.contexts()[0];        // the shared persistent context
const page = context.pages()[0];              // the human-visible page

await page.goto('http://sample-app:3000/form');
await page.getByLabel('Full name').fill('Ada Lovelace');
await page.getByRole('button', { name: 'Sign up' }).click();
await page.screenshot({ path: 'evidence.png' });

await browser.close();                        // detach only — session keeps running
```

## Key facts

- **URLs resolve inside the container network** — the browser itself does the fetching, so `http://sample-app:3000` and `http://host.docker.internal:<port>` work from a host-side script.
- The [[URL Policy]] applies to observer-driven navigation (API/CLI/missions); direct CDP `page.goto` is the agent's own responsibility — stay on authorized targets.
- Cookies/storage set here live in the shared profile — relevant for [[Profiles]] workflows (e.g. asserting login state a human created through noVNC).
- Version alignment: the container runs Playwright 1.61.1 / Chromium 149; keep the client Playwright close to that version.

## What CDP attach cannot do

`connectOverCDP` contexts do not support the full recording feature set (video, some tracing modes). For recorded, reproducible evidence use the [[Mission Runner]] — same display, native recording.

## Real demonstrations

The integration test suite ([[Testing]]) drives the modal through this exact path, and the phase-2 demo captured an agent-triggered modal on the human's framebuffer ([[Project History]]).

Related: [[Agent Integration]] · [[Playwright MCP]]
