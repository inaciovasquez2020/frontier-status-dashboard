import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rowText = (entry: Record<string, unknown>) =>
  `${entry.id ?? ""} ${entry.name ?? ""} ${entry.repository ?? ""} ${entry.url ?? ""}`.toLowerCase();

const average = (values: number[]) =>
  Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);

describe("closure-scale rows contribute without theorem promotion", () => {
  it("keeps urf-core and chronos theorem-metric-inapplicable", () => {
    for (const needle of ["urf-core", "chronos-urf-rr"]) {
      const row = statusData.find((entry) => rowText(entry).includes(needle));
      expect(row).toBeTruthy();
      expect(row?.theoremMetricApplicable).toBe(false);
      expect(row?.closureScaleMetricApplicable).toBe(true);
    }
  });

  it("excludes proof-hygiene, registry, and index rows from closure scale", () => {
    for (const needle of ["fo4-constraint-isolation", "urf-11", "vasquez-index"]) {
      const row = statusData.find((entry) => rowText(entry).includes(needle));
      expect(row).toBeTruthy();
      expect(row?.theoremMetricApplicable).toBe(false);
      expect(row?.closureScaleMetricApplicable).toBe(false);
    }
  });

  it("computes the visible closure scale from closure-scale rows only", () => {
    const rows = statusData
      .filter((entry) => !entry.metadataOnly && !entry.excludeFromMetrics)
      .filter((entry) => entry.closureScaleMetricApplicable !== false);

    expect(average(rows.map((entry) => entry.theoremClosure))).toBe(77);
  });
});
