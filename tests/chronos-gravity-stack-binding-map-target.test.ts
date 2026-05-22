import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/chronos_gravity_stack_binding_map_target_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET_2026_05_22.md",
  "utf8",
);

describe("Chronos gravity stack binding map target", () => {
  it("records the target object without proving binding soundness", () => {
    expect(artifact.object).toBe("CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET");
    expect(artifact.status).toBe("TARGET_ONLY_BINDING_SOUNDNESS_NOT_PROVED");
    expect(artifact.supplies).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET");
  });

  it("depends on the merged binding map and current source-map layer", () => {
    expect(artifact.requires_existing_objects).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
    expect(artifact.requires_existing_objects).toContain("GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX");
    expect(artifact.requires_existing_objects).toContain("KERR_DESITTER_WCCC_SOURCE_MAP");
    expect(artifact.requires_existing_objects).toContain("PBH_SLOW_FOPT_SOURCE_MAP");
    expect(artifact.requires_existing_objects).toContain("PBH_THERMAL_EVAPORATION_SOURCE_MAP");
    expect(artifact.requires_existing_objects).toContain("FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED");
    expect(artifact.requires_existing_objects).toContain("EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED");
  });

  it("isolates the soundness lemma as open", () => {
    expect(artifact.target_statement.name).toBe("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
    expect(artifact.target_statement.status).toBe("OPEN_NOT_PROVED");
    expect(artifact.weakest_sufficient_next_object).toBe("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
    expect(doc).toContain("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
  });

  it("records the binding soundness obligations", () => {
    expect(artifact.binding_soundness_obligations).toContain("slot_totality");
    expect(artifact.binding_soundness_obligations).toContain("slot_type_compatibility");
    expect(artifact.binding_soundness_obligations).toContain("boundary_preservation");
    expect(artifact.binding_soundness_obligations).toContain("no_theorem_promotion");
    expect(artifact.binding_soundness_obligations).toContain("downstream_read_restriction");
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("gravity closure");
    expect(artifact.does_not_prove).toContain("Chronos gravity stack binding soundness");
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
