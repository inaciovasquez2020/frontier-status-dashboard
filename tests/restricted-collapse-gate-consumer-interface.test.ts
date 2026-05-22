import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/restricted_collapse_gate_consumer_interface_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE_2026_05_22.md",
  "utf8",
);

describe("restricted collapse-gate consumer interface", () => {
  it("records the consumer interface without proving the collapse-gate bridge", () => {
    expect(artifact.object).toBe("RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE");
    expect(artifact.status).toBe("CONSUMER_INTERFACE_ONLY_COLLAPSE_GATE_BRIDGE_NOT_PROVED");
    expect(artifact.supplies).toContain("RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE");
  });

  it("depends on the restricted soundness-to-collapse-gate target", () => {
    expect(artifact.depends_on).toContain(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET",
    );
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
  });

  it("records all restricted consumer interface slots", () => {
    expect(artifact.interface_slots).toContain("restricted_stack_predicate_interface");
    expect(artifact.interface_slots).toContain("collapse_gate_consumer_read_restriction");
    expect(artifact.interface_slots).toContain("boundary_preserving_input_translation");
    expect(artifact.interface_slots).toContain("no_analytic_gravity_theorem_promotion");
    expect(artifact.interface_slots).toContain("no_empirical_validation_promotion");
  });

  it("separates allowed reads from forbidden reads", () => {
    expect(artifact.consumer_contract.allowed_reads).toContain("declared_restricted_stack_predicates");
    expect(artifact.consumer_contract.allowed_reads).toContain("declared_boundary_tokens");
    expect(artifact.consumer_contract.allowed_reads).toContain("declared_source_map_indices");
    expect(artifact.consumer_contract.forbidden_reads).toContain("analytic_gravity_theorem_content");
    expect(artifact.consumer_contract.forbidden_reads).toContain("unrestricted_collapse_data");
    expect(artifact.consumer_contract.forbidden_reads).toContain("empirical_validation_claims");
    expect(artifact.consumer_contract.forbidden_reads).toContain("cosmic_censorship_claims");
    expect(artifact.consumer_contract.forbidden_reads).toContain("dark_matter_resolution_claims");
  });

  it("selects the restricted bridge as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE",
    );
    expect(doc).toContain("CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE");
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("gravity closure");
    expect(artifact.does_not_prove).toContain("restricted collapse-gate bridge theorem");
    expect(artifact.does_not_prove).toContain("collapse-gate theorem");
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
