import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const flattenRows = (x: unknown): any[] => {
  if (Array.isArray(x)) return x.flatMap(flattenRows);
  if (x && typeof x === "object") {
    const r = x as Record<string, unknown>;
    const looksLikeRow =
      "theoremClosure" in r ||
      "boundary" in r ||
      "repository" in r ||
      "repo" in r ||
      "id" in r ||
      "name" in r ||
      "title" in r;

    if (looksLikeRow && ("theoremClosure" in r || "boundary" in r)) return [r];
    return Object.values(r).flatMap(flattenRows);
  }
  return [];
};

describe("predicate-surface theorem metric rule", () => {
  const rows = flattenRows(statusData);
  const row = rows.find((r) => {
    const label = `${r.id ?? ""} ${r.slug ?? ""} ${r.key ?? ""} ${r.name ?? ""} ${r.title ?? ""}`;
    return label.includes("predicate-surface-closure") || label.toLowerCase().includes("predicate surface closure");
  });

  it("adds a closure-scale row without theorem promotion", () => {
    expect(row).toBeTruthy();
    expect(row.theoremClosure).toBe(100);
    expect(row.includeInClosureScale).toBe(true);
    expect(row.theoremPromotion).toBe(false);
    expect(row.theoremMetricKind).toBe("predicate_surface_closure");
    expect(String(row.boundary)).toMatch(/no unrestricted theorem promotion/i);
  });

  it("records a positive theorem-closure delta artifact", () => {
    const artifactPath = path.join(
      process.cwd(),
      "artifacts/dashboard/predicate_surface_theorem_metric_rule_2026_05_15.json",
    );
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    expect(artifact.status).toBe("VERIFIED_DASHBOARD_METRIC_RULE_ONLY");
    expect(artifact.accepted_object).toBe("predicate_surface_closure");
    expect(artifact.theorem_closure_delta).toBeGreaterThan(0);
    expect(artifact.boundary.no_unrestricted_theorem_promotion).toBe(true);
  });

  it("locks the non-promotion boundary in the status document", () => {
    const docPath = path.join(
      process.cwd(),
      "docs/status/DASHBOARD_PREDICATE_SURFACE_THEOREM_METRIC_RULE_2026_05_15.md",
    );
    const doc = fs.readFileSync(docPath, "utf8");

    expect(doc).toContain("VERIFIED_DASHBOARD_METRIC_RULE_ONLY");
    expect(doc).toContain("THEOREM_CLOSURE_DELTA > 0");
    expect(doc).toContain("no_unrestricted_theorem_promotion");
    expect(doc).toContain("no_P_vs_NP_closure");
    expect(doc).toContain("no_Clay_problem_closure");
  });
});
