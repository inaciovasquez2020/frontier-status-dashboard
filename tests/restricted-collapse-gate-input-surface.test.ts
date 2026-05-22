import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/restricted_collapse_gate_input_surface_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE_2026_05_22.md",
  "utf8",
);

describe("restricted collapse-gate input surface", () => {
  it("records the input surface without proving a collapse-gate theorem", () => {
    expect(artifact.object).toBe("RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE");
    expect(artifact.status).toBe("INPUT_SURFACE_ONLY_NO_COLLAPSE_GATE_THEOREM");
    expect(artifact.supplies).toContain("RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE");
  });

  it("depends on the restricted bridge and consumer interface", () => {
    expect(artifact.depends_on).toContain(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE",
    );
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE");
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
  });

  it("records admissible restricted inputs", () => {
    expect(artifact.input_surface.admissible_inputs).toContain("declared_restricted_stack_predicates");
    expect(artifact.input_surface.admissible_inputs).toContain("declared_boundary_tokens");
    expect(artifact.input_surface.admissible_inputs).toContain("declared_source_map_indices");
    expect(artifact.input_surface.admissible_inputs).toContain("restricted_collapse_gate_consumer_contract");
  });

  it("excludes non-admissible theorem and empirical material", () => {
    expect(artifact.input_surface.excluded_inputs).toContain("analytic_gravity_theorem_content");
    expect(artifact.input_surface.excluded_inputs).toContain("unrestricted_collapse_data");
    expect(artifact.input_surface.excluded_inputs).toContain("empirical_validation_claims");
    expect(artifact.input_surface.excluded_inputs).toContain("cosmic_censorship_claims");
    expect(artifact.input_surface.excluded_inputs).toContain("dark_matter_resolution_claims");
  });

  it("closes only input-surface structural obligations", () => {
    expect(artifact.closed_surface_obligations).toContain("source_slot_traceability");
    expect(artifact.closed_surface_obligations).toContain("consumer_read_contract_satisfied");
    expect(artifact.closed_surface_obligations).toContain("boundary_tokens_preserved");
    expect(artifact.closed_surface_obligations).toContain("no_unrestricted_data_admission");
    expect(artifact.closed_surface_obligations).toContain("no_empirical_claim_admission");
  });

  it("selects the surface-to-gate target as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_TARGET");
    expect(doc).toContain("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_TARGET");
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("gravity closure");
    expect(artifact.does_not_prove).toContain("collapse-gate theorem");
    expect(artifact.does_not_prove).toContain("restricted collapse-gate theorem");
    expect(artifact.does_not_prove).toContain("unrestricted collapse-gate theorem");
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
