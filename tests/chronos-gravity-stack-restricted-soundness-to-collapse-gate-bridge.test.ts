import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync(
    "artifacts/gravity/chronos_gravity_stack_restricted_soundness_to_collapse_gate_bridge_2026_05_22.json",
    "utf8",
  ),
);

const doc = readFileSync(
  "docs/status/CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_2026_05_22.md",
  "utf8",
);

describe("Chronos gravity stack restricted soundness to collapse-gate bridge", () => {
  it("records the restricted bridge as closed only at the interface layer", () => {
    expect(artifact.object).toBe("CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE");
    expect(artifact.status).toBe("RESTRICTED_BRIDGE_CLOSED_INTERFACE_ONLY_NO_COLLAPSE_GATE_THEOREM");
    expect(artifact.supplies).toContain("CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE");
  });

  it("depends on the consumer interface and prior binding chain", () => {
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE");
    expect(artifact.depends_on).toContain(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET",
    );
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
  });

  it("states a restricted dashboard source-map bridge only", () => {
    expect(artifact.restricted_bridge_statement.name).toBe(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE",
    );
    expect(artifact.restricted_bridge_statement.scope).toBe("restricted_dashboard_source_map_layer");
    expect(artifact.restricted_bridge_statement.status).toBe("RESTRICTED_INTERFACE_BRIDGE_CLOSED");
  });

  it("closes the bridge obligations inherited from the consumer interface", () => {
    expect(artifact.closed_bridge_obligations).toContain("restricted_stack_predicate_interface");
    expect(artifact.closed_bridge_obligations).toContain("collapse_gate_consumer_read_restriction");
    expect(artifact.closed_bridge_obligations).toContain("boundary_preserving_input_translation");
    expect(artifact.closed_bridge_obligations).toContain("no_analytic_gravity_theorem_promotion");
    expect(artifact.closed_bridge_obligations).toContain("no_empirical_validation_promotion");
  });

  it("selects restricted collapse-gate input surface as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe("RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE");
    expect(doc).toContain("RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE");
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("gravity closure");
    expect(artifact.does_not_prove).toContain("collapse-gate theorem");
    expect(artifact.does_not_prove).toContain("unrestricted collapse-gate bridge theorem");
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
