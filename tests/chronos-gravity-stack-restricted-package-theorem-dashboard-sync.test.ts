import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";
import artifact from "../artifacts/dashboard/chronos_gravity_stack_restricted_package_theorem_2026_05_22.json";

function collectRows(value: unknown): any[] {
  if (Array.isArray(value)) {
    const direct = value.filter((item) => item && typeof item === "object" && !Array.isArray(item));
    const nested = value.flatMap((item) => collectRows(item));
    return [...direct, ...nested];
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap((item) => collectRows(item));
  }
  return [];
}

describe("Chronos gravity stack restricted-package theorem dashboard sync", () => {
  const rows = collectRows(statusData);
  const row = rows.find((entry) => {
    const serialized = JSON.stringify(entry);
    return (
      serialized.includes("chronos-gravity-stack-restricted-package-theorem-2026-05-22") ||
      (
        serialized.includes("Chronos gravity stack restricted-package theorem") &&
        serialized.includes("RESTRICTED_PACKAGE_THEOREM_ONLY")
      )
    );
  });

  it("adds the restricted-package theorem dashboard row", () => {
    expect(row).toBeTruthy();
    expect(JSON.stringify(row)).toContain("RESTRICTED_PACKAGE_THEOREM_ONLY");
    expect(JSON.stringify(row)).toContain("SixFieldAnalyticPackageHypothesis");
    expect(JSON.stringify(row)).toContain("chronos-urf-rr");
  });

  it("marks theorem promotion as not applicable while preserving dashboard metric schema", () => {
    expect(artifact.theorem_metric_applicable).toBe(false);
    if (row && "theoremMetricApplicable" in row) {
      expect(row.theoremMetricApplicable).toBe(false);
    }
    if (row && "theoremClosure" in row) {
      expect(typeof row.theoremClosure).toBe("number");
      expect(row.theoremClosure).toBe(0);
    }
    if (row && "url" in row) {
      expect(row.url).toBe("https://github.com/inaciovasquez2020/chronos-urf-rr");
    }
  });

  it("preserves no-promotion boundaries", () => {
    const serialized = JSON.stringify(row);
    expect(serialized).toContain("unrestricted SixFieldAnalyticPackageHypothesis");
    expect(serialized).toContain("P vs NP");
    expect(serialized).toContain("any Clay problem");
    expect(serialized).not.toContain("proves unrestricted SixFieldAnalyticPackageHypothesis");
    expect(serialized).not.toContain("proves unrestricted cosmic censorship");
    expect(serialized).not.toContain("proves P vs NP");
  });
});
