import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync(
    "artifacts/gravity/chronos_gravity_stack_restricted_soundness_to_collapse_gate_bridge_target_2026_05_22.json",
    "utf8",
  ),
);

const doc = readFileSync(
  "docs/status/CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET_2026_05_22.md",
  "utf8",
);

describe("Chronos gravity stack restricted soundness to collapse-gate bridge target", () => {
  it("records the bridge target without proving the collapse-gate bridge", () => {
    expect(artifact.object).toBe(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET",
    );
    expect(artifact.status).toBe("BRIDGE_TARGET_ONLY_COLLAPSE_GATE_NOT_PROVED");
    expect(artifact.supplies).toContain(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET",
    );
  });

  it("depends on the restricted binding soundness chain", () => {
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET");
    expect(artifact.depends_on).toContain("GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX");
  });

  it("keeps the bridge theorem open", () => {
    expect(artifact.target_statement.name).toBe(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE",
    );
    expect(artifact.target_statement.status).toBe("OPEN_NOT_PROVED");
    expect(doc).toContain("OPEN_NOT_PROVED");
  });

  it("records the required bridge obligations", () => {
    expect(artifact.required_bridge_obligations).toContain("restricted_stack_predicate_interface");
    expect(artifact.required_bridge_obligations).toContain("collapse_gate_consumer_read_restriction");
    expect(artifact.required_bridge_obligations).toContain("boundary_preserving_input_translation");
    expect(artifact.required_bridge_obligations).toContain("no_analytic_gravity_theorem_promotion");
    expect(artifact.required_bridge_obligations).toContain("no_empirical_validation_promotion");
  });

  it("selects the restricted collapse-gate consumer interface as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe("RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE");
    expect(doc).toContain("RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE");
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("gravity closure");
    expect(artifact.does_not_prove).toContain("restricted collapse-gate bridge theorem");
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
