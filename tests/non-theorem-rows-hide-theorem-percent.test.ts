import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rowText = (entry: Record<string, unknown>) =>
  `${entry.id ?? ""} ${entry.name ?? ""} ${entry.domain ?? ""} ${entry.repository ?? ""} ${entry.url ?? ""}`.toLowerCase();

describe("non-theorem dashboard rows are excluded from theorem percentage", () => {
  it("marks FO4, URF-11, and vasquez-index as theorem-metric-inapplicable", () => {
    const targets = ["fo4", "urf-11", "vasquez-index"];

    for (const needle of targets) {
      const row = statusData.find((entry) => rowText(entry).includes(needle));
      expect(row).toBeTruthy();
      expect(row?.theoremMetricApplicable).toBe(false);
    }
  });

  it("does not allow proof-hygiene, registry, or index rows to contribute 0% theorem closure", () => {
    const excluded = statusData.filter((entry) => entry.theoremMetricApplicable === false);

    expect(excluded.some((entry) => rowText(entry).includes("fo4"))).toBe(true);
    expect(excluded.some((entry) => rowText(entry).includes("urf-11"))).toBe(true);
    expect(excluded.some((entry) => rowText(entry).includes("vasquez-index"))).toBe(true);
  });
});
