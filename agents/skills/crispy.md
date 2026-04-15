---
name: crispy
description: Start the 8-phase implementation pipeline
user-invocable: true
handler: ./dist/index.js
parameters:
  - name: intent
    description: A description of the vertical slice or feature you want to build
    required: true
---

Initiates the CRISPY Orchestrator. This command sets up the project structure, activates the context firewalls, and begins Phase 01 (Questioning) to define the scope of the new vertical slice.