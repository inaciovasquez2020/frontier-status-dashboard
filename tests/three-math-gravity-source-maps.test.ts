import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const readJson = (relativePath: string) =>
  JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const readText = (relativePath: string) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

describe("three math/gravity source maps", () => {
  const fixedPoint = readJson("artifacts/math/super_metric_fixed_point_theorems_source_map_2026_05_22.json");
  const merger = readJson("artifacts/gravity/hierarchical_black_hole_merger_mass_gap_source_map_2026_05_22.json");
  const largeD = readJson("artifacts/gravity/large_d_black_hole_effective_theory_source_map_2026_05_22.json");

  const fixedPointDoc = readText("docs/status/SUPER_METRIC_FIXED_POINT_THEOREMS_SOURCE_MAP_2026_05_22.md");
  const mergerDoc = readText("docs/status/HIERARCHICAL_BLACK_HOLE_MERGER_MASS_GAP_SOURCE_MAP_2026_05_22.md");
  const largeDDoc = readText("docs/status/LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP_2026_05_22.md");

  it("records the super-metric fixed-point source map", () => {
    expect(fixedPoint.id).toBe("SUPER_METRIC_FIXED_POINT_THEOREMS_SOURCE_MAP");
    expect(fixedPoint.status).toBe("MODEL_SPECIFIC_FIXED_POINT_SOURCE_ONLY_NO_FRONTIER_PROMOTION");
    expect(fixedPoint.source.doi).toBe("10.5269/bspm.80745");
    expect(fixedPoint.next_admissible_object).toBe("SUPER_METRIC_FIXED_POINT_THEOREM_EXTRACTION_TARGET");
    expect(fixedPointDoc).toContain("URF fixed-point theorem");
  });

  it("records the hierarchical black-hole merger mass-gap source map", () => {
    expect(merger.id).toBe("HIERARCHICAL_BLACK_HOLE_MERGER_MASS_GAP_SOURCE_MAP");
    expect(merger.status).toBe("MODEL_SPECIFIC_GRAVITATIONAL_WAVE_SOURCE_ONLY_NO_GRAVITY_CLOSURE");
    expect(merger.source.primary_journal_reference.doi).toBe("10.1038/s41550-026-02847-0");
    expect(merger.next_admissible_object).toBe("HIERARCHICAL_BLACK_HOLE_MERGER_PRIMARY_PAPER_EXTRACTION_TARGET");
    expect(mergerDoc).toContain("gravity closure");
  });

  it("records the large-D black-hole effective-theory source map", () => {
    expect(largeD.id).toBe("LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP");
    expect(largeD.status).toBe("MODEL_SPECIFIC_LARGE_D_BLACK_HOLE_EFT_SOURCE_ONLY_NO_GRAVITY_CLOSURE");
    expect(largeD.source.doi).toBe("10.1007/JHEP04(2026)034");
    expect(largeD.next_admissible_object).toBe("LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_EXTRACTION_TARGET");
    expect(largeDDoc).toContain("unrestricted black-hole dynamics");
  });

  it("preserves global no-promotion boundaries", () => {
    for (const artifact of [fixedPoint, merger, largeD]) {
      expect(artifact.urf_relevance.admissible_use).toBe("source-map record only");
      expect(artifact.does_not_prove).toContain("Chronos-RR");
      expect(artifact.does_not_prove).toContain("H4.1/FGL");
      expect(artifact.does_not_prove).toContain("P vs NP");
      expect(artifact.does_not_prove).toContain("any Clay problem");
    }
  });
});
