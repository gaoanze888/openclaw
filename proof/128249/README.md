# PR #128249 real Control UI proof

- OpenClaw commit: `625d6303eb3f4ffabbc61034ee1d1f10fbee80d0`
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

## Event result

```json
{"before":{"thinkingCount":2,"reasoningVisible":true},"after":{"thinkingCount":2,"reasoningVisible":true,"eventVisible":true}}
```

The event proof used a real loopback Gateway and `sessions.patch` against the live session. No model request was made; the event only changed the session label.

## Screenshots

- `on.png`: completed inherited-on reasoning remains visible.
- `stream.png`: final answer remains visible and completed reasoning is absent.
- `model.png`: completed model-default reasoning remains visible.
- `on-after-session-event.png`: after a real `sessions.patch` lifecycle event, inherited-on reasoning remains visible while the updated session label is applied.
