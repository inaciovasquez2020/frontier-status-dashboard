import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rows = Array.isArray(statusData) ? statusData : [];

describe("URF-core PR323 Law 3 dashboard sync", () => {
  const urfCore = rows.find((row: any) => row.repo === "urf-core" || row.repository === "urf-core") as any;

  it("records PR323 as a theorem-surface closure", () => {
    expect(urfCore).toBeTruthy();
    expect(urfCore.status).toBe("THEOREM_SURFACE_CLOSED");
    expect(urfCore.closedSurface).toBe("urf_law3");
    expect(urfCore.previousClosedSurface).toBe("urf_admissible_normalization_boundaries");
    expect(urfCore.previousTheoremSurface).toBe("no_status_promotion_theorem");
    expect(urfCore.latestPR).toBe(323);
    expect(urfCore.latestCommit).toBe("0d6238f");
    expect(urfCore.theoremSurfaceClosed).toBe(true);
    expect(urfCore.theoremPromotion).toBe(false);
  });

  it("records updated obligation counts", () => {
    expect(urfCore.removedAdmits).toBe(1);
    expect(urfCore.axiomCount).toBe(52);
    expect(urfCore.admitCount).toBe(9);
    expect(urfCore.sorryCount).toBe(0);
  });

  it("preserves non-closure boundaries", () => {
    const boundary = String(urfCore.boundary);
    expect(boundary).toMatch(/relative to existing\/new structural axioms/i);
    expect(boundary).toMatch(/capacity, chain_rule, and cmi_nonneg are not discharged/i);
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
          "artifacts/dashboard/urf_core_pr323_law3_entropy_nonamplification_2026_05_15.json",
        ),
        "utf8",
      ),
    );

    expect(artifact.status).toBe("DASHBOARD_SYNCED");
    expect(artifact.repository).toBe("urf-core");
    expect(artifact.source_pr).toBe(323);
    expect(artifact.source_commit).toBe("0d6238f");
    expect(artifact.closed_surface).toBe("urf_law3");
    expect(artifact.removed_admits).toBe(1);
    expect(artifact.axiom_count).toBe(52);
    expect(artifact.admit_count).toBe(9);
    expect(artifact.sorry_count).toBe(0);
    expect(artifact.boundary.theorem_closed_relative_to_structural_axioms).toBe(true);
    expect(artifact.boundary.no_whole_urf_theorem_closure).toBe(true);
  });

  it("records the dashboard sync status document", () => {
    const doc = fs.readFileSync(
      path.join(
        process.cwd(),
        "docs/status/URF_CORE_PR323_LAW3_ENTROPY_NONAMPLIFICATION_DASHBOARD_SYNC_2026_05_15.md",
      ),
      "utf8",
    );

    expect(doc).toContain("STATUS := DASHBOARD_SYNCED");
    expect(doc).toContain("SOURCE_PR := 323");
    expect(doc).toContain("SOURCE_COMMIT := 0d6238f");
    expect(doc).toContain("urf_law3");
    expect(doc).toContain("removed_admits := 1");
    expect(doc).toContain("axiom_count := 52");
    expect(doc).toContain("admit_count := 9");
    expect(doc).toContain("sorry_count := 0");
    expect(doc).toContain("capacity_not_discharged");
    expect(doc).toContain("no_whole_URF_theorem_closure");
  });
});
