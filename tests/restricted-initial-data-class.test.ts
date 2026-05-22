import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const artifactPath = path.join(
  process.cwd(),
  "artifacts/gravity/restricted-initial-data-class_2026_05_22.json",
);

const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

describe("restricted-initial-data-class", () => {
  it("records the supplied restricted-chain object", () => {
    expect(artifact.id).toBe("RESTRICTED_INITIAL_DATA_CLASS");
    expect(artifact.supplied_object).toBe("RESTRICTED_INITIAL_DATA_CLASS");
    expect(artifact.status).toBe("INITIAL_DATA_CLASS_SUPPLIED_RESTRICTED_ONLY");
  });

  it("records the object kind", () => {
    expect(artifact.object_kind).toBe("restricted_initial_data_class");
  });

  it("records the weakest sufficient next object", () => {
    expect(artifact.weakest_sufficient_next_object).toBe("RESTRICTED_ENERGY_CONDITION_PRESERVATION_PROOF");
  });

  it("records dependencies", () => {
    expect(Array.isArray(artifact.depends_on)).toBe(true);
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("unrestricted gravity closure");
    expect(artifact.does_not_prove).toContain("unrestricted cosmic censorship");
    expect(artifact.does_not_prove).toContain("unrestricted hoop conjecture");
    expect(artifact.does_not_prove).toContain("four-dimensional non-symmetric collapse theorem");
    expect(artifact.does_not_prove).toContain("Chronos gravity stack closure");
    expect(artifact.does_not_prove).toContain("any Clay problem");
  });
});
