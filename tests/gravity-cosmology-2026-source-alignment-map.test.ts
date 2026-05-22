import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const artifactPath = path.join(
  root,
  "artifacts/gravity/gravity_cosmology_2026_source_alignment_map_2026_05_22.json",
);
const docPath = path.join(
  root,
  "docs/status/GRAVITY_COSMOLOGY_2026_SOURCE_ALIGNMENT_MAP_2026_05_22.md",
);

const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
const doc = fs.readFileSync(docPath, "utf8");

describe("GRAVITY_COSMOLOGY_2026_SOURCE_ALIGNMENT_MAP", () => {
  it("classifies each supplied source without theorem promotion", () => {
    expect(artifact.id).toBe("GRAVITY_COSMOLOGY_2026_SOURCE_ALIGNMENT_MAP");
    expect(artifact.status).toBe("SOURCE_ALIGNMENT_ONLY_NO_THEOREM_PROMOTION");
    expect(artifact.verification_target).toBe("SOURCE_ALIGNMENT_ONLY_NO_THEOREM_PROMOTION");
    expect(artifact.sources).toHaveLength(7);

    const classes = new Set(artifact.sources.map((source: { source_class: string }) => source.source_class));
    expect(classes).toEqual(
      new Set(["conference", "peer_reviewed_theory", "science_news_report", "preprint"]),
    );
  });

  it("maps each source to exactly one admissible internal object", () => {
    const allowed = new Set([
      "gravity_stack",
      "DFM_MKC",
      "dark_sector_model",
      "empirical_validation",
      "no_overclaim_boundary",
    ]);

    for (const source of artifact.sources as Array<{ internal_object: string; alignment: string; url: string }>) {
      expect(allowed.has(source.internal_object)).toBe(true);
      expect(source.alignment.length).toBeGreaterThan(0);
      expect(source.url.startsWith("https://")).toBe(true);
    }
  });

  it("preserves explicit no-promotion boundaries", () => {
    const requiredBoundaries = [
      "dark matter resolution",
      "modified gravity failure",
      "DFM-MKC validation",
      "gravity closure",
      "Clay problem",
    ];

    expect(new Set(artifact.does_not_prove)).toEqual(new Set(requiredBoundaries));

    for (const boundary of requiredBoundaries) {
      expect(doc).toContain(boundary);
    }

    expect(doc).toContain("SOURCE_ALIGNMENT_ONLY_NO_THEOREM_PROMOTION");
  });
});
