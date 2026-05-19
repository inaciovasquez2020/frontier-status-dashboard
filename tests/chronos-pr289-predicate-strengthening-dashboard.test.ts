import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

function rowsOf(data: unknown): any[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    for (const key of ["repositories", "rows", "statusRows", "items"]) {
      if (Array.isArray(d[key])) return d[key] as any[];
    }
  }
  return [];
}

describe("Chronos PR289 predicate strengthening dashboard row", () => {
  it("records predicate-surface theorem without unrestricted theorem promotion", () => {
    const rows = rowsOf(statusData);
    const row = rows.find((r) => r.id === "chronos-pr289-canonical-to-nontrivial-strengthening-for-predicate");

    expect(row).toBeTruthy();
    expect(row.name).toContain("CanonicalToNontrivialStrengtheningForPredicate");
    expect(row.url).toBe("https://github.com/inaciovasquez2020/chronos-urf-rr/pull/289");
    expect(row.status).toContain("PROVED / PREDICATE_SURFACE_STRENGTHENING_CLOSED");
    expect(row.boundary).toContain("Predicate-surface theorem only");
    expect(row.boundary).toContain("Does not construct a genuinely nontrivial UniversalFiberEntropyGap");
    expect(row.boundary).toContain("unrestricted Chronos-RR");
    expect(row.boundary).toContain("P vs NP");
    expect(row.theoremClosure).toBe(0);
    expect(row.closureScaleMetricApplicable).toBe(false);
    expect(row.theoremMetricApplicable).toBe(false);
  });
});
