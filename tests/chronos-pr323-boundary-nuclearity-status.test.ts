import { describe, expect, it } from "vitest";
import data from "../src/data/status-data.json";

describe("Chronos PR323 boundary nuclearity dashboard sync", () => {
  it("records PR323 as a conditional frontier interface without theorem promotion", () => {
    const row = data.find((item: any) =>
      item.repo === "chronos-urf-rr" ||
      item.name === "chronos-urf-rr" ||
      String(item.url ?? "").includes("chronos-urf-rr")
    );

    expect(row).toBeTruthy();
    expect(row.boundary).toContain("PR #323 merged");
    expect(row.boundary).toContain("BoundaryNuclearityFromFiniteDetectorAlgebra");
    expect(row.boundary).toContain("BulkToBoundaryNuclearitySoundness");
    expect(row.boundary).toContain("Conditional frontier interface only");
    expect(row.boundary).toContain("no unrestricted UniversalBoundaryCompactness");
    expect(row.boundary).toContain("no unrestricted QL_CollapseGate");
    expect(row.boundary).toContain("no Cosmic Censorship");
    expect(row.boundary).toContain("no Hoop Conjecture");
    expect(row.boundary).toContain("no Clay closure");
  });
});
