#!/usr/bin/env node
'use strict';
console.log(`
┌─────────────────────────────────────────────────────────┐
│  raveneye-mcp-server installed                          │
│                                                         │
│  This MCP server requires the Raveneye Docker stack.    │
│  Before using it, start the stack:                      │
│                                                         │
│    Linux / Mac:  make up                                │
│    Windows:      docker compose up -d                   │
│                                                         │
│  Ports needed: 8090 (HTTP API) · 9222 (CDP / browser)  │
│  Check health:  curl http://127.0.0.1:8090/health       │
└─────────────────────────────────────────────────────────┘
`);
