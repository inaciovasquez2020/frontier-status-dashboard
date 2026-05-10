import { describe, expect, it } from "vitest";
import statusData from "./data/status-data.json";

const text = JSON.stringify(statusData);
const rows = Array.isArray(statusData)
  ? statusData
  : Object.values(statusData).find(Array.isArray) ?? [];

describe("URF-11 registry dashboard status", () => {
  it("records the registry-only source of truth", () => {
    expect(text).toContain("urf-11-translation-subproblem-registry");
    expect(text).toContain("URF11_REGISTRY_ONLY");
    expect(text).toContain("22a8e88");
    expect(text).toContain("ed3e5b9");
  });

  it("keeps the row compatible with public dashboard helpers", () => {
    const row = rows.find((item: any) => item.id === "urf-11-translation-subproblem-registry") as any;

    expect(row.url).toBe("https://github.com/inaciovasquez2020/urf-11-translation-subproblem-registry");
    expect(typeof row.domain).toBe("string");
    expect(typeof row.boundary).toBe("string");
    expect(typeof row.integrity).toBe("number");
    expect(typeof row.theoremClosure).toBe("number");
  });

  it("preserves theorem-boundary exclusions", () => {
    for (const token of [
      "No unrestricted Chronos-RR closure.",
      "No H4.1/FGL closure.",
      "No UniversalFiberEntropyGap theorem.",
      "No P vs NP.",
      "No Clay-problem closure.",
      "No unrestricted graph-rigidity theorem.",
      "No unrestricted Cayley-graph rigidity theorem.",
    ]) {
      expect(text).toContain(token);
    }
  });
});
