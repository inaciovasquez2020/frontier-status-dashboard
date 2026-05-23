import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const artifactPath = path.join(root, "artifacts/source_maps/source_map_priority_matrix_2026_05_22.json");
const docPath = path.join(root, "docs/status/SOURCE_MAP_PRIORITY_MATRIX_2026_05_22.md");

describe("source-map priority matrix", () => {
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const doc = fs.readFileSync(docPath, "utf8");

  it("records the matrix status without theorem promotion", () => {
    expect(artifact.id).toBe("SOURCE_MAP_PRIORITY_MATRIX_2026_05_22");
    expect(artifact.status).toBe("SOURCE_MAP_PRIORITY_MATRIX_ONLY_NO_THEOREM_PROMOTION");
    expect(artifact.next_admissible_object).toBe("TOP_RANKED_SOURCE_THEOREM_EXTRACTION_PACKET");
  });

  it("ranks source maps in the intended order", () => {
    expect(artifact.entries.map((entry: { rank: number }) => entry.rank)).toEqual([1, 2, 3, 4, 5]);
    expect(artifact.entries.map((entry: { source_map_id: string }) => entry.source_map_id)).toEqual([
      "LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP",
      "HIERARCHICAL_BLACK_HOLE_MERGER_MASS_GAP_SOURCE_MAP",
      "SUPER_METRIC_FIXED_POINT_THEOREMS_SOURCE_MAP",
      "MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD_SOURCE_MAP",
      "NUCLEAR_CHERN_TOPOLOGICAL_MATTER_SOURCE_MAP",
    ]);
  });

  it("separates technical extraction, empirical source value, vocabulary, watchlist, and motif value", () => {
    expect(artifact.entries[0].priority_class).toBe("HIGH_THEOREM_EXTRACTION_VALUE");
    expect(artifact.entries[1].priority_class).toBe("MEDIUM_EMPIRICAL_SOURCE_VALUE");
    expect(artifact.entries[2].priority_class).toBe("MEDIUM_VOCABULARY_EXTRACTION_VALUE");
    expect(artifact.entries[3].priority_class).toBe("WATCHLIST_ONLY");
    expect(artifact.entries[4].priority_class).toBe("LOW_TO_MEDIUM_UNIFICATION_MOTIF_VALUE");
  });

  it("preserves no-promotion boundaries", () => {
    const blocked = [
      "URF theorem promotion",
      "Chronos-RR",
      "H4.1/FGL",
      "P vs NP",
      "any Clay problem",
      "gravity closure",
      "cosmic censorship",
      "hoop conjecture",
      "dark matter resolution",
      "dark energy resolution",
      "DFM-MKC validation",
      "Lambda-CDM failure",
      "empirical validation",
      "external source theorem import",
    ];

    for (const item of blocked) {
      expect(artifact.does_not_prove).toContain(item);
      expect(doc).toContain(item);
    }
  });
});
