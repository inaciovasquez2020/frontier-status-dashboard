import { describe, expect, it } from "vitest";
import fs from "node:fs";

const artifact = JSON.parse(
  fs.readFileSync(
    "artifacts/source_maps/top_ranked_source_theorem_extraction_packet_2026_05_22.json",
    "utf8",
  ),
);

const doc = fs.readFileSync(
  "docs/status/TOP_RANKED_SOURCE_THEOREM_EXTRACTION_PACKET_2026_05_22.md",
  "utf8",
);

describe("top-ranked source theorem extraction packet", () => {
  it("records extraction-only status", () => {
    expect(artifact.status).toBe("THEOREM_EXTRACTION_PACKET_ONLY_NO_GRAVITY_CLOSURE");
    expect(doc).toContain("Status: THEOREM_EXTRACTION_PACKET_ONLY_NO_GRAVITY_CLOSURE.");
  });

  it("selects the top-ranked source map", () => {
    expect(artifact.top_ranked_source).toBe("LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP");
    expect(doc).toContain("LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP");
  });

  it("requires the finite-dimensional transfer blocker field", () => {
    expect(artifact.required_extracted_fields).toContain("finite_d_transfer_policy");
    expect(artifact.required_extracted_fields).toContain(
      "blocking_gap_to_four_dimensional_non_symmetric_gravity",
    );
  });

  it("preserves no-promotion boundaries", () => {
    for (const token of [
      "gravity closure",
      "cosmic censorship",
      "hoop conjecture",
      "four-dimensional collapse theorem",
      "P vs NP",
      "any Clay problem",
      "external theorem import",
    ]) {
      expect(artifact.forbidden_use).toContain(token);
      expect(doc).toContain(token);
    }
  });
});
