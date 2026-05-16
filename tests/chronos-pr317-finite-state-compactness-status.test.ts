import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rows: any[] = Array.isArray(statusData)
  ? statusData
  : ((statusData as any).repositories ?? (statusData as any).rows ?? []);

function textOf(row: any): string {
  return JSON.stringify(row);
}

describe("Chronos PR317 finite-state compactness dashboard status", () => {
  it("records finite-state compactness certificate reduction without unrestricted promotion", () => {
    const row = rows.find((r) => textOf(r).includes("chronos-urf-rr") || textOf(r).includes("Chronos"));
    expect(row).toBeTruthy();

    const text = textOf(row);

    expect(text).toContain("Chronos PR #317");
    expect(text).toContain("finite-state boundary compactness certificate reduction proved");
    expect(text).toContain("FiniteStateBoundaryCompactnessCertificate");
    expect(text).toContain("FiniteSpectralCompactnessCertificate");
    expect(text).toContain("PhysicalToTopologicalCompactnessInput");
    expect(text).toContain("restricted A3 bridge");
    expect(text).toContain("Remaining missing object");

    expect(text).toContain("No unrestricted UniversalBoundaryCompactness");
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
