import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const flattenRows = (x: unknown): any[] => {
  if (Array.isArray(x)) return x.flatMap(flattenRows);
  if (x && typeof x === "object") {
    const r = x as Record<string, unknown>;
    const looksLikeRow =
      "repository" in r ||
      "repo" in r ||
      "id" in r ||
      "name" in r ||
      "title" in r ||
      "boundary" in r;
    if (looksLikeRow && ("boundary" in r || "theoremClosure" in r || "status" in r)) return [r];
    return Object.values(r).flatMap(flattenRows);
  }
  return [];
};

describe("URF-core PR321 no-status-promotion dashboard sync", () => {
  const rows = flattenRows(statusData);
  const urfCore = rows.find((row) => {
    const label = `${row.id ?? ""} ${row.slug ?? ""} ${row.key ?? ""} ${row.name ?? ""} ${row.title ?? ""} ${row.repo ?? ""} ${row.repository ?? ""}`.toLowerCase();
    return label.includes("urf-core") || label.includes("urf core");
  });

  it("records the merged theorem surface without promotion", () => {
    expect(urfCore).toBeTruthy();
    expect(["THEOREM_SURFACE_CLOSED", "ASSUMPTION_BOUNDARY_CLOSED", "TEXTUAL_ASSUMPTION_BOUNDARY_CLOSED"]).toContain(urfCore.status);
    expect([urfCore.closedSurface, urfCore.previousClosedSurface, urfCore.previousTheoremSurface]).toContain("no_status_promotion_theorem");
    expect([321, 322, 323, 324]).toContain(urfCore.latestPR);
    expect(["3554540", "fd698e4", "0d6238f", "3bbc856"]).toContain(urfCore.latestCommit);
    expect(urfCore.theoremPromotion).toBe(false);
  });

  it("preserves the whole-URF non-closure boundary", () => {
    const boundary = String(urfCore.boundary);
    expect(boundary).toMatch(/no whole-URF theorem closure/i);
    expect(boundary).toMatch(/existing axioms and admits are not discharged/i);
    expect(boundary).toMatch(/no P vs NP closure/i);
    expect(boundary).toMatch(/no Clay-problem closure/i);
  });

  it("records the dashboard sync artifact", () => {
    const artifact = JSON.parse(
      fs.readFileSync(
        path.join(
          process.cwd(),
          "artifacts/dashboard/urf_core_pr321_no_status_promotion_theorem_closure_2026_05_15.json",
        ),
        "utf8",
      ),
    );

    expect(artifact.status).toBe("DASHBOARD_SYNCED");
    expect(artifact.repository).toBe("urf-core");
    expect(artifact.source_pr).toBe(321);
    expect(artifact.closed_surface).toBe("no_status_promotion_theorem");
    expect(artifact.boundary.no_whole_urf_theorem_closure).toBe(true);
    expect(artifact.boundary.existing_axioms_not_discharged).toBe(true);
    expect(artifact.boundary.existing_admits_not_discharged).toBe(true);
  });

  it("records the dashboard sync status document", () => {
    const doc = fs.readFileSync(
      path.join(
        process.cwd(),
        "docs/status/URF_CORE_PR321_NO_STATUS_PROMOTION_THEOREM_CLOSURE_DASHBOARD_SYNC_2026_05_15.md",
      ),
      "utf8",
    );

    expect(doc).toContain("STATUS := DASHBOARD_SYNCED");
    expect(doc).toContain("SOURCE_PR := 321");
    expect(doc).toContain("no_status_promotion_theorem");
    expect(doc).toContain("no_whole_URF_theorem_closure");
    expect(doc).toContain("existing_axioms_not_discharged");
    expect(doc).toContain("existing_admits_not_discharged");
  });
});
