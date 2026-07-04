---
tags: [missions, reference]
---

# Actions Reference

All 22 actions accepted by the [[Mission Format]] schema. Interaction steps use the locator strategies described there.

## Navigation

| Action | Parameters | Notes |
|---|---|---|
| `goto` / `navigate` | `path` or `url` | checked by the [[URL Policy]] |
| `reload` | — | |
| `back` / `forward` | — | browser history |

## Interaction

| Action | Parameters | Notes |
|---|---|---|
| `click` | locator | |
| `fill` | locator, `value` | replaces field content |
| `type` | locator, `value`, `delay_ms?` | keystroke by keystroke |
| `press` | `key`, `selector?` | `Escape`, `Tab`, `Enter`, … |
| `select` | locator, `value` | `<select>` option |
| `check` / `uncheck` | locator | checkboxes |
| `hover` | locator | |
| `scroll` | `to: top\|bottom` or `y: <px>` | |

## Waiting

| Action | Parameters | Notes |
|---|---|---|
| `wait` | `ms` (max 60000) | fixed pause |
| `wait_for_ready` | `timeout_ms?` | `load` state + best-effort `networkidle` |
| `wait_for_selector` | `selector`, `state?`, `timeout_ms?` | states: attached/detached/visible/hidden |

## Evidence & inspection

| Action | Parameters | Output |
|---|---|---|
| `screenshot` | `name`, `full_page?` | PNG in the run's `screenshots/` ([[Artifacts]]) |
| `inspect_accessibility` | `name?` | aria snapshot + heuristic issues → `accessibility.json`, feeds [[Findings]] |
| `capture_console` / `capture_network` | — | markers; evidence is collected continuously with [[Secret Redaction]] |
| `check_horizontal_overflow` | — | scroll vs client width + offending elements → `inspections.json` |
| `set_viewport` | `width`, `height` | for responsive sweeps, see [[Sample Missions]] |

## Failure semantics

Any action that throws (element not found, timeout, policy rejection) **stops the mission** and produces a high `functional` finding with the reproduction steps so far — see [[Mission Runner]].

## Deliberately unsupported

File uploads, drag-and-drop, multi-tab orchestration, conditionals/loops. Use [[Playwright over CDP]] for those.
