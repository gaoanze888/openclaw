# PR #128249 exact-head Control UI proof

- Functional PR head: `49ad9dc4c9b903b2e53314be87ec5c29de7ca7ec`
- Control UI build reported by the real Gateway: `2026.8.1-49ad9dc4c9b9-2026-08-30T06-40-52.027Z`
- Gateway: real `openclaw gateway run`, loopback, isolated state directory
- Persistence: real SQLite session store and persisted transcripts
- Browser: headless Chrome for Testing through Playwright, 1440x1000
- Mutation: real `sessions.patch` RPC while capturing `sessions.changed` WebSocket frames
- No model request or external provider call was made

## Results

| Policy                   | Before patch event | After patch event | Matching events | Destructive `off` | RPC / label       |
| ------------------------ | ------------------ | ----------------- | --------------: | ----------------- | ----------------- |
| inherited `on`           | reasoning visible  | reasoning visible |               2 | no                | success / visible |
| inherited `stream`       | reasoning hidden   | reasoning hidden  |               2 | no                | success / visible |
| model capability default | reasoning visible  | reasoning visible |               2 | no                | success / visible |

All three cases passed the harness. The inherited-`on` and model-derived rows retained their completed reasoning blocks across a real lifecycle patch; inherited `stream` remained transient-only. Every updated label rendered in the same browser page.

Artifacts:

- `exact-49ad9dc4c-on.png`
- `exact-49ad9dc4c-stream.png`
- `exact-49ad9dc4c-model.png`
- `exact-head-proof-49ad9dc4c.json`
