import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

const artifact = JSON.parse(
  fs.readFileSync(
    path.join(root, "artifacts/gravity/gravity_dark_sector_theory_claim_boundary_packet_2026_05_22.json"),
    "utf8",
  ),
);

const doc = fs.readFileSync(
  path.join(root, "docs/status/GRAVITY_DARK_SECTOR_THEORY_CLAIM_BOUNDARY_PACKET_2026_05_22.md"),
  "utf8",
);

describe("GRAVITY_DARK_SECTOR_THEORY_CLAIM_BOUNDARY_PACKET", () => {
  it("records the packet as source alignment only", () => {
    expect(artifact.id).toBe("GRAVITY_DARK_SECTOR_THEORY_CLAIM_BOUNDARY_PACKET");
    expect(artifact.status).toBe("GRAVITY_DARK_SECTOR_THEORY_CLAIM_BOUNDARY_PACKET_ONLY_NO_THEOREM_PROMOTION");
    expect(artifact.verification_target).toBe(
      "GRAVITY_DARK_SECTOR_THEORY_CLAIM_BOUNDARY_PACKET_ONLY_NO_THEOREM_PROMOTION",
    );
    expect(artifact.sources).toHaveLength(4);
  });

  it("maps each source to one allowed internal object", () => {
    const allowedObjects = new Set(["no_overclaim_boundary", "dark_sector_model", "empirical_validation"]);
    const allowedClasses = new Set(["peer_reviewed_theory", "preprint", "ssrn_preprint"]);

    for (const source of artifact.sources as Array<{
      source_class: string;
      internal_object: string;
      alignment: string;
      claim_status: string;
      url: string;
    }>) {
      expect(allowedClasses.has(source.source_class)).toBe(true);
      expect(allowedObjects.has(source.internal_object)).toBe(true);
      expect(source.alignment.length).toBeGreaterThan(0);
      expect(source.claim_status.length).toBeGreaterThan(0);
      expect(source.url.startsWith("https://")).toBe(true);
    }
  });

  it("preserves no-promotion boundaries", () => {
    const boundaries = [
      "gravity closure",
      "modified gravity failure",
      "modified gravity success",
      "dark matter resolution",
      "dark energy resolution",
      "dark-sector empirical validation",
      "QICT validation",
      "DFM-MKC validation",
      "Lambda-CDM failure",
      "P vs NP",
      "any Clay problem",
    ];

    expect(new Set(artifact.does_not_prove)).toEqual(new Set(boundaries));

    for (const boundary of boundaries) {
      expect(doc).toContain(boundary);
    }
  });
});
