import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rows: any[] = Array.isArray(statusData)
  ? statusData
  : ((statusData as any).repositories ?? (statusData as any).rows ?? []);

function textOf(row: any): string {
  return JSON.stringify(row);
}

describe("Chronos PR315 gravity A3 compactness dashboard status", () => {
  it("records the restricted conditional A3 compactness bridge without unrestricted promotion", () => {
    const row = rows.find((r) => textOf(r).includes("chronos-urf-rr") || textOf(r).includes("Chronos"));
    expect(row).toBeTruthy();

    const text = textOf(row);

    expect(text).toContain("Chronos PR #315");
    expect(text).toContain("Restricted A3 compactness bridge");
    expect(text).toContain("PhysicalToTopologicalCompactnessInput");
    expect(text).toContain("conditional repository-certified bridge");

    expect(text).toContain("no unrestricted UniversalBoundaryCompactness");
    expect(text).toContain("unrestricted QL_CollapseGate");
    expect(text).toContain("Cosmic Censorship");
    expect(text).toContain("Hoop Conjecture");
    expect(text).toContain("P vs NP");
    expect(text).toContain("Clay-problem closure");

    expect(text).not.toContain("proves unrestricted UniversalBoundaryCompactness");
    expect(text).not.toContain("proves unrestricted QL_CollapseGate");
    expect(text).not.toContain("proves Cosmic Censorship");
    expect(text).not.toContain("proves the Hoop Conjecture");
    expect(text).not.toContain("solves P vs NP");
    expect(text).not.toContain("solves a Clay problem");
  });
});
