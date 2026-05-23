import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const artifactPath = path.join(
  root,
  "artifacts/mathoverflow/mathoverflow_great_theorems_2026_onward_source_map_2026_05_22.json",
);
const docPath = path.join(
  root,
  "docs/status/MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD_SOURCE_MAP_2026_05_22.md",
);

describe("MathOverflow great theorems 2026-onward source map", () => {
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const doc = fs.readFileSync(docPath, "utf8");

  it("records the MathOverflow reference-list source", () => {
    expect(artifact.id).toBe("MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD_SOURCE_MAP");
    expect(artifact.status).toBe("REFERENCE_LIST_SOURCE_ONLY_NO_THEOREM_PROMOTION");
    expect(artifact.source.title).toBe("Great theorems with elementary statements: 2026-onward");
    expect(artifact.source.platform).toBe("MathOverflow");
    expect(artifact.source.page_status).toBe("closed");
    expect(artifact.source.accepting_answers).toBe(false);
  });

  it("keeps the page as source-map only", () => {
    expect(artifact.urf_relevance.admissible_use).toBe("source-map record only");
    expect(artifact.required_before_promotion).toContain("choose one specific theorem from the page");
    expect(artifact.required_before_promotion).toContain("verify the primary source independently");
    expect(artifact.next_admissible_object).toBe(
      "SPECIFIC_THEOREM_EXTRACTION_TARGET_FROM_MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD",
    );
  });

  it("preserves no-promotion boundaries", () => {
    const blocked = [
      "any theorem listed on the MathOverflow page",
      "URF theorem promotion",
      "Chronos-RR",
      "H4.1/FGL",
      "P vs NP",
      "any Clay problem",
      "DFM-MKC validation",
      "Lambda-CDM failure",
      "dark matter resolution",
      "dark energy resolution",
      "gravity closure",
    ];

    for (const item of blocked) {
      expect(artifact.does_not_prove).toContain(item);
      expect(doc).toContain(item);
    }
  });
});
