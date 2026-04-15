---
name: crispy-resume
description: Resume from the last validated state
user-invocable: true
handler: ./dist/index.js
---

Reloads the state machine from `.crispy/state.json`. Use this if the session was interrupted or if you are moving between workstations (e.g., WSL2 to Mac) and need to pick up where the orchestrator left off.