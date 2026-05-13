import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

describe("non-theorem dashboard rows", () => {
  it("marks non-theorem rows as not theorem-metric applicable", () => {
    const nonTheoremRows = statusData.filter(
      (row) => row.theoremMetricApplicable === false,
    );

    expect(nonTheoremRows.length).toBeGreaterThan(0);

    for (const row of nonTheoremRows) {
      expect(row.theoremMetricApplicable).toBe(false);
      expect(row.theoremClosureLabel).toMatch(
        /false|only|surface|registry|exposition|profile|index|aggregate|certificate|readiness/i,
      );
    }
  });
});
