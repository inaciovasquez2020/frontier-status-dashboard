import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const artifactPath = path.join(root, "artifacts/source_maps/source_map_evidence_boundary_matrix_2026_05_22.json");
const docPath = path.join(root, "docs/status/SOURCE_MAP_EVIDENCE_BOUNDARY_MATRIX_2026_05_22.md");

describe("source-map evidence boundary matrix", () => {
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const doc = fs.readFileSync(docPath, "utf8");

  it("records source-level evidence without claim promotion", () => {
    expect(artifact.id).toBe("SOURCE_MAP_EVIDENCE_BOUNDARY_MATRIX_2026_05_22");
    expect(artifact.status).toBe("SOURCE_LEVEL_EVIDENCE_MATRIX_ONLY_NO_THEOREM_OR_EMPIRICAL_CLAIM_PROMOTION");
    expect(artifact.next_admissible_object).toBe("TOP_RANKED_SOURCE_THEOREM_EXTRACTION_PACKET");
  });

  it("includes all current source-map evidence entries", () => {
    expect(artifact.evidence_entries.map((entry: { source_map_id: string }) => entry.source_map_id).sort()).toEqual([
      "HIERARCHICAL_BLACK_HOLE_MERGER_MASS_GAP_SOURCE_MAP",
      "LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP",
      "MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD_SOURCE_MAP",
      "NUCLEAR_CHERN_TOPOLOGICAL_MATTER_SOURCE_MAP",
      "SOURCE_MAP_PRIORITY_MATRIX_2026_05_22",
      "SUPER_METRIC_FIXED_POINT_THEOREMS_SOURCE_MAP",
    ].sort());
  });

  it("allows relevance evidence while forbidding proof evidence", () => {
    expect(artifact.evidence_policy.allowed_evidence_use).toContain("evidence of external relevance");
    expect(artifact.evidence_policy.allowed_evidence_use).toContain("evidence of vocabulary alignment");
    expect(artifact.evidence_policy.allowed_evidence_use).toContain("evidence of extraction priority");
    expect(artifact.evidence_policy.forbidden_evidence_use).toContain("proof of Chronos-RR");
    expect(artifact.evidence_policy.forbidden_evidence_use).toContain("proof of DFM-MKC validation");
    expect(artifact.evidence_policy.forbidden_evidence_use).toContain("empirical validation without executed likelihood or primary-data analysis");
  });

  it("preserves no-promotion boundaries in artifact and doc", () => {
    const blocked = [
      "URF theorem promotion",
      "Chronos-RR",
      "H4.1/FGL",
      "P vs NP",
      "any Clay problem",
      "gravity closure",
      "cosmic censorship",
      "hoop conjecture",
      "four-dimensional collapse theorem",
      "DFM-MKC validation",
      "Lambda-CDM failure",
      "dark matter resolution",
      "dark energy resolution",
      "empirical validation",
      "external source theorem import",
    ];

    for (const item of blocked) {
      expect(artifact.does_not_prove).toContain(item);
      expect(doc).toContain(item);
    }
  });
});
