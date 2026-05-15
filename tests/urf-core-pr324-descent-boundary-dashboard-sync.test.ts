import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rows = Array.isArray(statusData) ? statusData : [];

describe("URF-core PR324 descent boundary dashboard sync", () => {
  const urfCore = rows.find(
    (row: any) => row.repo === "urf-core" || row.repository === "urf-core",
  ) as any;

  it("records PR324 as a textual assumption-boundary closure", () => {
    expect(urfCore).toBeTruthy();
    expect(urfCore.status).toBe("TEXTUAL_ASSUMPTION_BOUNDARY_CLOSED");
    expect(urfCore.closedSurface).toBe("descent_first_remaining_admit_boundary");
    expect(urfCore.previousClosedSurface).toBe("urf_law3");
    expect(urfCore.previousAssumptionBoundarySurface).toBe("urf_admissible_normalization_boundaries");
    expect(urfCore.previousTheoremSurface).toBe("no_status_promotion_theorem");
    expect(urfCore.latestPR).toBe(324);
    expect(urfCore.latestCommit).toBe("3bbc856");
    expect(urfCore.assumptionBoundary).toBe(true);
    expect(urfCore.textualNoncompiledBoundary).toBe(true);
    expect(urfCore.theoremPromotion).toBe(false);
  });

  it("records updated obligation counts", () => {
    expect(urfCore.removedAdmits).toBe(1);
    expect(urfCore.axiomCount).toBe(53);
    expect(urfCore.admitCount).toBe(8);
    expect(urfCore.sorryCount).toBe(0);
  });

  it("preserves non-closure boundaries", () => {
    const boundary = String(urfCore.boundary);
    expect(boundary).toMatch(/textual\/noncompiled assumption boundary/i);
    expect(boundary).toMatch(/target file is not standalone Lean-compiled/i);
    expect(boundary).toMatch(/does not discharge the descent assumption/i);
    expect(boundary).toMatch(/existing axioms and admits are not discharged/i);
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
          "artifacts/dashboard/urf_core_pr324_descent_first_remaining_admit_boundary_2026_05_15.json",
        ),
        "utf8",
      ),
    );

    expect(artifact.status).toBe("DASHBOARD_SYNCED");
    expect(artifact.repository).toBe("urf-core");
    expect(artifact.source_pr).toBe(324);
    expect(artifact.source_commit).toBe("3bbc856");
    expect(artifact.closed_surface).toBe("descent_first_remaining_admit_boundary");
    expect(artifact.removed_admits).toBe(1);
    expect(artifact.axiom_count).toBe(53);
    expect(artifact.admit_count).toBe(8);
    expect(artifact.sorry_count).toBe(0);
    expect(artifact.boundary.textual_noncompiled_boundary_only).toBe(true);
    expect(artifact.boundary.not_theorem_closure).toBe(true);
    expect(artifact.boundary.no_whole_urf_theorem_closure).toBe(true);
  });

  it("records the dashboard sync status document", () => {
    const doc = fs.readFileSync(
      path.join(
        process.cwd(),
        "docs/status/URF_CORE_PR324_DESCENT_FIRST_REMAINING_ADMIT_BOUNDARY_DASHBOARD_SYNC_2026_05_15.md",
      ),
      "utf8",
    );

    expect(doc).toContain("STATUS := DASHBOARD_SYNCED");
    expect(doc).toContain("SOURCE_PR := 324");
    expect(doc).toContain("SOURCE_COMMIT := 3bbc856");
    expect(doc).toContain("descent_first_remaining_admit_boundary");
    expect(doc).toContain("removed_admits := 1");
    expect(doc).toContain("axiom_count := 53");
    expect(doc).toContain("admit_count := 8");
    expect(doc).toContain("sorry_count := 0");
    expect(doc).toContain("textual_noncompiled_boundary_only");
    expect(doc).toContain("not_theorem_closure");
  });
});
