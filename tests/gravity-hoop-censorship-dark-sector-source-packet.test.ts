import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const artifact = JSON.parse(
  fs.readFileSync(
    path.join(root, "artifacts/gravity/gravity_hoop_censorship_dark_sector_source_packet_2026_05_22.json"),
    "utf8",
  ),
);
const doc = fs.readFileSync(
  path.join(root, "docs/status/GRAVITY_HOOP_CENSORSHIP_DARK_SECTOR_SOURCE_PACKET_2026_05_22.md"),
  "utf8",
);

describe("GRAVITY_HOOP_CENSORSHIP_DARK_SECTOR_SOURCE_PACKET", () => {
  it("records the packet as source alignment only", () => {
    expect(artifact.id).toBe("GRAVITY_HOOP_CENSORSHIP_DARK_SECTOR_SOURCE_PACKET");
    expect(artifact.status).toBe("GRAVITY_HOOP_CENSORSHIP_DARK_SECTOR_SOURCE_PACKET_ONLY_NO_THEOREM_PROMOTION");
    expect(artifact.verification_target).toBe(
      "GRAVITY_HOOP_CENSORSHIP_DARK_SECTOR_SOURCE_PACKET_ONLY_NO_THEOREM_PROMOTION",
    );
    expect(artifact.sources).toHaveLength(5);
  });

  it("maps each source to one allowed internal object", () => {
    const allowedObjects = new Set(["gravity_stack", "dark_sector_model", "no_overclaim_boundary"]);
    const allowedClasses = new Set(["peer_reviewed_theory", "preprint_repository_record", "preprint"]);

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
      "unrestricted cosmic censorship",
      "hoop conjecture",
      "dark matter resolution",
      "modified gravity failure",
      "DFM-MKC validation",
      "dark-sector empirical validation",
      "P vs NP",
      "any Clay problem",
    ];

    expect(new Set(artifact.does_not_prove)).toEqual(new Set(boundaries));

    for (const boundary of boundaries) {
      expect(doc).toContain(boundary);
    }
  });
});
