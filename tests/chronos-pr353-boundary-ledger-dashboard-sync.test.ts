import { describe, expect, it } from "vitest";
import fs from "node:fs";

const rows = JSON.parse(fs.readFileSync("src/data/status-data.json", "utf8"));

function chronosRows(): any[] {
  return rows.filter((row: any) =>
    JSON.stringify(row).toLowerCase().includes("chronos-urf-rr"),
  );
}

describe("Chronos PR353 boundary ledger dashboard sync", () => {
  it("keeps the Chronos row present", () => {
    expect(chronosRows().length).toBeGreaterThan(0);
  });

  it("records the boundary ledger telemetry without theorem promotion", () => {
    const blob = JSON.stringify(chronosRows());

    expect(blob).toContain("PR #353");
    expect(blob).toContain("boundary-ledger assumption tracker");
    expect(blob).toContain("boundaries.toml");
    expect(blob).toContain("reconcile_ledger.py");
    expect(blob).toContain("check_forbidden_overclaims.py");
    expect(blob).toContain("frontier-status.json");
    expect(blob).toContain("no theorem promotion");
    expect(blob).toContain("no unrestricted Chronos-RR");
    expect(blob).toContain("no unrestricted H4.1/FGL");
    expect(blob).toContain("no P vs NP");
  });

  it("does not claim theorem closure from the ledger sync", () => {
    const blob = JSON.stringify(chronosRows()).toLowerCase();

    expect(blob).not.toContain("pr #353 proves");
    expect(blob).not.toContain("boundary ledger proves");
    expect(blob).not.toContain("unrestricted chronos-rr solved");
    expect(blob).not.toContain("unrestricted h4.1/fgl solved");
    expect(blob).not.toContain("p vs np solved");
  });
});
