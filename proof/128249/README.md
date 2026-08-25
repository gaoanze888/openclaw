# PR #128249 real Control UI proof

- OpenClaw commit: `4b9c018694e6cb4ac1fae3afd4900db16565cc8f`
- Gateway: real `openclaw gateway run`, loopback, isolated state directory
- Persistence: real SQLite session store and exact assistant transcript APIs
- Browser: headless Google Chrome via Playwright, 1440x1000
- No model request was made; transcripts use fixed non-sensitive proof markers.

## Results

```json
{"id":"on","thinkingCount":1,"thinkingTextCount":1,"finalVisible":true,"reasoningVisible":true}
{"id":"stream","thinkingCount":0,"thinkingTextCount":0,"finalVisible":true,"reasoningVisible":false}
{"id":"model","thinkingCount":1,"thinkingTextCount":1,"finalVisible":true,"reasoningVisible":true}
```

The `on` agent inherited `reasoningDefault: "on"`; the `stream` agent inherited `reasoningDefault: "stream"`; the `model` agent had no session or agent reasoning override and used a reasoning-capable prepared model catalog entry.

Screenshots:

- `on.png`: completed inherited-on reasoning remains visible.
- `stream.png`: final answer remains visible and completed reasoning is absent.
- `model.png`: completed model-default reasoning remains visible.
