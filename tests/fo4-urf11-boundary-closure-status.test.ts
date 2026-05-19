import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const findRow = (...needles: string[]) =>
  statusData.find((entry) => {
    const haystack = `${entry.domain ?? ""} ${entry.repo ?? ""} ${entry.name ?? ""} ${entry.url ?? ""}`.toLowerCase();
    return needles.some((needle) => haystack.includes(needle));
  });

describe("FO4 and URF-11 boundary closure status", () => {
  const fo4 = findRow("fo4", "constraint-isolation");
  const urf11 = findRow("urf-11", "translation-subproblem");

  it("keeps FO4 as an open-problem status boundary", () => {
    expect(fo4).toBeTruthy();
    expect(fo4?.boundary).toContain("OPEN_PROBLEM_REQUIRED");
    expect(fo4?.boundary).toContain("not theorem closure");
    expect(fo4?.boundary).toContain("No unrestricted graph rigidity closure");
    expect(fo4?.boundary).toContain("No Cayley-graph rigidity closure");
  });

  it("keeps URF-11 as registry bookkeeping only", () => {
    expect(urf11).toBeTruthy();
    expect(urf11?.boundary).toContain("dependency-surface tracking only");
    expect(urf11?.boundary).toContain("non-claim tracking");
    expect(urf11?.boundary).toContain("No theorem-level translation closure");
    expect(urf11?.boundary).toContain("No upstream mathematical closure");
  });

  it("preserves shared downstream non-claims", () => {
    for (const row of [fo4, urf11]) {
      expect(row?.boundary).toContain("No Chronos-RR closure");
      expect(row?.boundary).toContain("No H4.1/FGL closure");
      expect(row?.boundary).toContain("No UniversalFiberEntropyGap closure");
      expect(row?.boundary).toContain("No P vs NP or Clay-problem closure");
    }
  });
});
