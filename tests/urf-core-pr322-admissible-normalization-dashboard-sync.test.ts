import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rows = Array.isArray(statusData) ? statusData : [];

describe("URF-core PR322 admissible normalization dashboard sync", () => {
  const urfCore = rows.find((row: any) => row.repo === "urf-core" || row.repository === "urf-core") as any;

  it("records PR322 as an assumption-boundary closure", () => {
    expect(urfCore).toBeTruthy();
    expect(["ASSUMPTION_BOUNDARY_CLOSED", "THEOREM_SURFACE_CLOSED", "TEXTUAL_ASSUMPTION_BOUNDARY_CLOSED"]).toContain(urfCore.status);
    expect([urfCore.closedSurface, urfCore.previousClosedSurface]).toContain("urf_admissible_normalization_boundaries");
    expect([urfCore.previousClosedSurface, urfCore.previousTheoremSurface]).toContain("no_status_promotion_theorem");
    expect([322, 323, 324]).toContain(urfCore.latestPR);
    expect(["fd698e4", "0d6238f", "3bbc856"]).toContain(urfCore.latestCommit);
    expect(urfCore.assumptionBoundary).toBe(true);
    expect(urfCore.theoremPromotion).toBe(false);
  });

  it("records updated obligation counts", () => {
    expect([1, 2]).toContain(urfCore.removedAdmits);
    expect([46, 52, 53]).toContain(urfCore.axiomCount);
    expect([8, 9, 10]).toContain(urfCore.admitCount);
    expect(urfCore.sorryCount).toBe(0);
  });

  it("preserves non-closure boundaries", () => {
    const boundary = String(urfCore.boundary);
    expect(boundary).toMatch(/no whole-URF theorem closure/i);
    expect(boundary).toMatch(/no CRR closure/i);
    expect(boundary).toMatch(/no H4\.1\/FGL closure/i);
    expect(boundary).toMatch(/no P vs NP closure/i);
    expect(boundary).toMatch(/no Clay-problem closure/i);
  });

  it("records the dashboard sync artifact", () => {
    const artifact = JSON.parse(
      fs.readFileSync(
        path.join(
          process.cwd(),
          "artifacts/dashboard/urf_core_pr322_admissible_normalization_boundaries_2026_05_15.json",
        ),
        "utf8",
      ),
    );

    expect(artifact.status).toBe("DASHBOARD_SYNCED");
    expect(artifact.repository).toBe("urf-core");
    expect(artifact.source_pr).toBe(322);
    expect(artifact.source_commit).toBe("fd698e4");
    expect(artifact.removed_admits).toBe(2);
    expect(artifact.axiom_count).toBe(46);
    expect(artifact.admit_count).toBe(10);
    expect(artifact.sorry_count).toBe(0);
    expect(artifact.boundary.assumption_boundary_only).toBe(true);
    expect(artifact.boundary.not_theorem_closure).toBe(true);
  });

  it("records the dashboard sync status document", () => {
    const doc = fs.readFileSync(
      path.join(
        process.cwd(),
        "docs/status/URF_CORE_PR322_ADMISSIBLE_NORMALIZATION_BOUNDARIES_DASHBOARD_SYNC_2026_05_15.md",
      ),
      "utf8",
    );

    expect(doc).toContain("STATUS := DASHBOARD_SYNCED");
    expect(doc).toContain("SOURCE_PR := 322");
    expect(doc).toContain("SOURCE_COMMIT := fd698e4");
    expect(doc).toContain("removed_admits := 2");
    expect(doc).toContain("axiom_count := 46");
    expect(doc).toContain("admit_count := 10");
    expect(doc).toContain("sorry_count := 0");
    expect(doc).toContain("assumption_boundary_only");
    expect(doc).toContain("not_theorem_closure");
  });
});
