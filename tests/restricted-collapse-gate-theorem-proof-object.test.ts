import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const artifactPath = path.join(
  process.cwd(),
  "artifacts/gravity/restricted-collapse-gate-theorem-proof-object_2026_05_22.json",
);

const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

describe("restricted-collapse-gate-theorem-proof-object", () => {
  it("records the supplied restricted-chain object", () => {
    expect(artifact.id).toBe("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT");
    expect(artifact.supplied_object).toBe("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT");
    expect(artifact.status).toBe("RESTRICTED_THEOREM_PROOF_OBJECT_RECORDED_NO_UNRESTRICTED_PROMOTION");
  });

  it("records the object kind", () => {
    expect(artifact.object_kind).toBe("restricted_theorem_proof_object");
  });

  it("records the weakest sufficient next object", () => {
    expect(artifact.weakest_sufficient_next_object).toBe("No admissible next step.");
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
