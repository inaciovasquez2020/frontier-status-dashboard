import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/restricted_collapse_gate_predicate_interface_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE_2026_05_22.md",
  "utf8",
);

describe("restricted collapse-gate predicate interface", () => {
  it("records the predicate interface without proving surface-to-gate", () => {
    expect(artifact.object).toBe("RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE");
    expect(artifact.status).toBe("PREDICATE_INTERFACE_ONLY_SURFACE_TO_GATE_NOT_PROVED");
    expect(artifact.supplies).toContain("RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE");
  });

  it("depends on the restricted surface-to-gate target and prior chain", () => {
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_TARGET");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE");
    expect(artifact.depends_on).toContain(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE",
    );
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE");
  });

  it("records all restricted gate predicate slots", () => {
    expect(artifact.predicate_interface.predicate_slots).toContain("restricted_gate_input_admissible");
    expect(artifact.predicate_interface.predicate_slots).toContain("restricted_gate_boundary_preserved");
    expect(artifact.predicate_interface.predicate_slots).toContain("restricted_gate_no_unrestricted_claim");
    expect(artifact.predicate_interface.predicate_slots).toContain("restricted_gate_no_empirical_claim");
    expect(artifact.predicate_interface.predicate_slots).toContain(
      "restricted_gate_no_analytic_theorem_promotion",
    );
  });

  it("separates allowed and forbidden predicate sources", () => {
    expect(artifact.predicate_interface.allowed_sources).toContain("RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE");
    expect(artifact.predicate_interface.allowed_sources).toContain("declared_restricted_stack_predicates");
    expect(artifact.predicate_interface.allowed_sources).toContain("declared_boundary_tokens");
    expect(artifact.predicate_interface.allowed_sources).toContain("declared_source_map_indices");
    expect(artifact.predicate_interface.forbidden_sources).toContain("analytic_gravity_theorem_content");
    expect(artifact.predicate_interface.forbidden_sources).toContain("unrestricted_collapse_data");
    expect(artifact.predicate_interface.forbidden_sources).toContain("empirical_validation_claims");
    expect(artifact.predicate_interface.forbidden_sources).toContain("cosmic_censorship_claims");
    expect(artifact.predicate_interface.forbidden_sources).toContain("dark_matter_resolution_claims");
  });

  it("closes only predicate-interface obligations", () => {
    expect(artifact.closed_predicate_obligations).toContain("restricted_gate_predicate_interface");
    expect(artifact.closed_predicate_obligations).toContain("input_surface_consumption_rule");
    expect(artifact.closed_predicate_obligations).toContain("boundary_preserving_gate_translation");
    expect(artifact.closed_predicate_obligations).toContain("no_unrestricted_collapse_gate_promotion");
    expect(artifact.closed_predicate_obligations).toContain("no_empirical_validation_promotion");
  });

  it("selects restricted surface-to-gate as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE");
    expect(doc).toContain("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE");
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
