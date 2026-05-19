import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rows: any[] = Array.isArray(statusData)
  ? statusData
  : (statusData as any).repositories ?? (statusData as any).items ?? [];

const chronos = rows.find((row) =>
  JSON.stringify(row).toLowerCase().includes("chronos-urf-rr"),
);

describe("Chronos PR #314 gravity open problem lock dashboard sync", () => {
  it("records the gravity open problem lock without unconditional promotion", () => {
    expect(chronos).toBeTruthy();

    const boundary = String(chronos.boundary ?? "");

    expect(boundary).toContain("Chronos PR #314 merged: Gravity OpenProblemLock added.");
    expect(boundary).toContain("A3 remains an assumption.");
    expect(boundary).toContain("A4 remains a restricted trapped-surface replacement.");
    expect(boundary).toContain("QL_CollapseGate remains conditional on A1--A6.");
    expect(boundary).toContain(
      "UniversalBoundaryCompactness remains replaced by BoundaryCompactness(F_Λ).",
    );

    expect(boundary).toContain("No Cosmic Censorship proof.");
    expect(boundary).toContain("No Hoop Conjecture proof.");
    expect(boundary).toContain("No unrestricted QL_CollapseGate.");
    expect(boundary).toContain("No unrestricted UniversalBoundaryCompactness.");

    expect(boundary).not.toContain("Cosmic Censorship is proved");
    expect(boundary).not.toContain("Hoop Conjecture is proved");
    expect(boundary).not.toContain("unrestricted QL_CollapseGate is proved");
    expect(boundary).not.toContain("unrestricted UniversalBoundaryCompactness is proved");
  });
});
