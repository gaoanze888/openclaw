# PR #128249 exact-head Control UI proof

- Functional PR head: `eda763da5bc7b04747447f207f926621273e036c`
- Gateway: real `openclaw gateway run`, loopback, isolated state directory
- Persistence: real SQLite session store and persisted transcripts
- Browser: headless Google Chrome through Playwright, 1440x1000
- Mutation: real `sessions.patch` RPC while capturing `sessions.changed` websocket frames
- No model request or external network call was made

## Results

| Policy | Before lifecycle patch | After lifecycle patch | Matching events | Destructive `off` |
|---|---|---|---:|---|
| inherited `on` | reasoning visible | reasoning visible | 2 | no |
| inherited `stream` | reasoning hidden | reasoning hidden | 2 | no |
| model capability default | reasoning visible | reasoning visible | 2 | no |

Every patch returned success and its new label appeared in Control UI.

Screenshots:

- `exact-eda763da5-on.png`
- `exact-eda763da5-stream.png`
- `exact-eda763da5-model.png`
