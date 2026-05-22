import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/chronos_gravity_stack_binding_soundness_lemma_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA_2026_05_22.md",
  "utf8",
);

describe("Chronos gravity stack binding soundness lemma", () => {
  it("records the restricted soundness lemma object", () => {
    expect(artifact.object).toBe("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
    expect(artifact.status).toBe("RESTRICTED_SOUNDNESS_LEMMA_ONLY_NO_GRAVITY_CLOSURE");
    expect(artifact.supplies).toContain("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
  });

  it("depends on the binding map, target, and integration matrix", () => {
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET");
    expect(artifact.depends_on).toContain("GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX");
  });

  it("closes only structural dashboard binding obligations", () => {
    expect(artifact.closed_obligations).toContain("slot_totality");
    expect(artifact.closed_obligations).toContain("slot_type_compatibility");
    expect(artifact.closed_obligations).toContain("boundary_preservation");
    expect(artifact.closed_obligations).toContain("no_theorem_promotion");
    expect(artifact.closed_obligations).toContain("downstream_read_restriction");
  });

  it("selects the restricted collapse-gate bridge target as the next object", () => {
    expect(artifact.remaining_next_object).toBe(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET",
    );
    expect(doc).toContain("CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET");
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("gravity closure");
    expect(artifact.does_not_prove).toContain("analytic gravity theorem");
    expect(artifact.does_not_prove).toContain("four-dimensional collapse theorem");
    expect(artifact.does_not_prove).toContain("unrestricted non-symmetric collapse theorem");
    expect(artifact.does_not_prove).toContain("unrestricted cosmic censorship");
    expect(artifact.does_not_prove).toContain("hoop conjecture");
    expect(artifact.does_not_prove).toContain("unrestricted primordial black hole formation theorem");
    expect(artifact.does_not_prove).toContain("unrestricted primordial black hole evaporation theorem");
    expect(artifact.does_not_prove).toContain("dark matter detection");
    expect(artifact.does_not_prove).toContain("dark matter resolution");
    expect(artifact.does_not_prove).toContain("DFM-MKC validation");
    expect(artifact.does_not_prove).toContain("Lambda-CDM failure");
    expect(artifact.does_not_prove).toContain("empirical validation");
    expect(artifact.does_not_prove).toContain("any Clay problem");
  });
});
