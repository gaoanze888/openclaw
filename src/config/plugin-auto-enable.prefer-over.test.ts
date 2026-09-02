// Focused tests for the prefer-over scan deduplication: the O(candidates²)
// pair scan only needs plugin identity, so provider-model-configured refs from
// the same plugin collapse to one entry while channel-configured entries stay
// distinct per channel.
import { describe, expect, it } from "vitest";
import { dedupePluginAutoEnableCandidates } from "./plugin-auto-enable.prefer-over.js";

describe("dedupePluginAutoEnableCandidates", () => {
  it("dedupes provider-model-configured candidates by plugin id", () => {
    const candidates = [
      { pluginId: "p1", kind: "provider-model-configured", modelRef: "m1" },
      { pluginId: "p1", kind: "provider-model-configured", modelRef: "m2" },
      { pluginId: "p1", kind: "provider-model-configured", modelRef: "m3" },
      { pluginId: "p2", kind: "provider-model-configured", modelRef: "m4" },
    ] as const;
    expect(dedupePluginAutoEnableCandidates(candidates)).toEqual([
      { pluginId: "p1", kind: "provider-model-configured", modelRef: "m1" },
      { pluginId: "p2", kind: "provider-model-configured", modelRef: "m4" },
    ]);
  });

  it("keeps channel-configured candidates distinct per channel", () => {
    const candidates = [
      { pluginId: "p1", kind: "channel-configured", channelId: "c1" },
      { pluginId: "p1", kind: "channel-configured", channelId: "c2" },
    ] as const;
    expect(dedupePluginAutoEnableCandidates(candidates)).toEqual([...candidates]);
  });

  it("dedupes other non-channel kinds by plugin id", () => {
    const candidates = [
      { pluginId: "p1", kind: "provider-auth-configured", providerId: "a1" },
      { pluginId: "p1", kind: "provider-auth-configured", providerId: "a2" },
      { pluginId: "p2", kind: "provider-auth-configured", providerId: "a3" },
    ] as const;
    expect(dedupePluginAutoEnableCandidates(candidates)).toEqual([
      { pluginId: "p1", kind: "provider-auth-configured", providerId: "a1" },
      { pluginId: "p2", kind: "provider-auth-configured", providerId: "a3" },
    ]);
  });
});
