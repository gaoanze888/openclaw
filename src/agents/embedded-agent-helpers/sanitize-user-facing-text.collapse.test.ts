// Focused regression for the duplicate-block collapse stage of
// sanitizeUserFacingText: it must not split or re-trim fenced code, while it
// must still collapse genuinely duplicate text blocks outside code.
import { describe, expect, it } from "vitest";
import { sanitizeUserFacingText } from "./sanitize-user-facing-text.js";

describe("sanitizeUserFacingText duplicate-block collapse", () => {
  it("preserves fenced code indentation and repeated lines when collapsing duplicates", () => {
    const input = [
      "Here is the retry loop:",
      "",
      "```python",
      "class Worker:",
      "    def run(self):",
      '        self.log("retrying")',
      "",
      "    def log(self, msg):",
      "        print(msg)",
      "```",
      "",
      "```text",
      "[worker] retrying",
      "",
      "[worker] retrying",
      "",
      "[worker] retrying",
      "",
      "[worker] done",
      "```",
    ].join("\n");
    expect(sanitizeUserFacingText(input)).toBe(input);
  });

  it("still collapses consecutive duplicate text blocks outside code", () => {
    expect(sanitizeUserFacingText("same paragraph\n\nsame paragraph\n\nother paragraph")).toBe(
      "same paragraph\n\nother paragraph",
    );
  });
});
