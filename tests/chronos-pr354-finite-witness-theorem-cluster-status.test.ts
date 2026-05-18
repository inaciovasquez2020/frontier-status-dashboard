import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const statusDataPath = path.join(
  process.cwd(),
  "src",
  "data",
  "status-data.json",
);

const raw = fs.readFileSync(statusDataPath, "utf8");
const statusData = JSON.parse(raw);

function flatten(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(flatten).join("\n");
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).map(flatten).join("\n");
  }
  return "";
}

describe("Chronos PR #354 finite witness theorem cluster dashboard status", () => {
  const text = flatten(statusData);

  it("records the merged finite witness theorem cluster", () => {
    expect(text).toContain("PR #354");
    expect(text).toContain("finite witness theorem cluster");
    expect(text).toContain("dbb44992");
    expect(text).toContain("13/13 checks");
    expect(text).toContain("839 pytest tests");
  });

  it("preserves theorem boundary strength", () => {
    expect(text).toMatch(/finite witness certification only/i);
    expect(text).toContain("no unrestricted UniversalFiberEntropyGap");
    expect(text).toContain("no unrestricted Chronos-RR");
    expect(text).toContain("no H4.1/FGL");
    expect(text).toContain("no P vs NP");
    expect(text).toContain("no Clay problem");
    expect(text).toContain("no physics or cosmology closure");
  });
});
