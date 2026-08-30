# PR #128249 exact-head Control UI proof

- Functional PR head: `3a73fee56c28e3673d75c939db7300d42e32f13b`
- Control UI build reported by the real Gateway: `2026.8.1-3a73fee56c28-2026-08-30T05-59-55.242Z`
- Gateway: real `openclaw gateway run`, loopback, isolated state directory
- Persistence: real SQLite session store and persisted transcripts
- Browser: headless Chrome for Testing through Playwright, 1440x1000
- Mutation: real `sessions.patch` RPC while capturing `sessions.changed` WebSocket frames
- No model request or external provider call was made

## Results

| Policy                   | Before patch event                        | After patch event | Matching events | Destructive `off` | RPC / label       |
| ------------------------ | ----------------------------------------- | ----------------- | --------------: | ----------------- | ----------------- |
| inherited `on`           | reasoning absent on the initial stale row | reasoning visible |               2 | no                | success / visible |
| inherited `stream`       | reasoning hidden                          | reasoning hidden  |               2 | no                | success / visible |
| model capability default | reasoning visible                         | reasoning visible |               2 | no                | success / visible |

The inherited-`on` case is the direct peer-refresh proof: the initial stale row omitted the reasoning projection, then the exact-head `sessions.patch` event repaired the Control UI to show the persisted reasoning block. The `stream` case remained hidden and the model-derived case remained visible.

Artifacts:

- `exact-3a73fee56-on.png`
- `exact-3a73fee56-stream.png`
- `exact-3a73fee56-model.png`
- `exact-head-proof-3a73fee56.json`
