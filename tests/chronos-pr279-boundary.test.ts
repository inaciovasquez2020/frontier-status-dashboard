import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const serialized = JSON.stringify(statusData);

describe("chronos PR279 boundary", () => {
  it("records the FO4 cycle-overlap open problem boundary without theorem promotion", () => {
    expect(serialized).toContain("PR #279 merged at 84545b3");
    expect(serialized).toContain("OPEN_PROBLEM_REQUIRED");
    expect(serialized).toContain("{ Delta := 0, R := 0, colapRank := 0, cycleOverlapRank := 1 }");
    expect(serialized).toContain("Restricted domination closes only by explicit cycleOverlap_le_colap");
    expect(serialized).toContain("No unconditional graph-theoretic cycle-overlap rank bound");
    expect(serialized).toContain("No P vs NP closure");
    expect(serialized).toContain("No Clay-problem closure");
  });
});
