import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/restricted_collapse_gate_surface_to_gate_target_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_TARGET_2026_05_22.md",
  "utf8",
);

describe("restricted collapse-gate surface-to-gate target", () => {
  it("records the target without proving a collapse-gate theorem", () => {
    expect(artifact.object).toBe("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_TARGET");
    expect(artifact.status).toBe("TARGET_ONLY_COLLAPSE_GATE_NOT_PROVED");
    expect(artifact.supplies).toContain("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_TARGET");
  });

  it("depends on the restricted input surface and bridge chain", () => {
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE");
    expect(artifact.depends_on).toContain(
      "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE",
    );
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE");
    expect(artifact.depends_on).toContain("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
  });

  it("keeps the surface-to-gate theorem open", () => {
    expect(artifact.target_statement.name).toBe("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE");
    expect(artifact.target_statement.scope).toBe("restricted_dashboard_source_map_layer");
    expect(artifact.target_statement.status).toBe("OPEN_NOT_PROVED");
    expect(doc).toContain("OPEN_NOT_PROVED");
  });

  it("records the required target obligations", () => {
    expect(artifact.required_target_obligations).toContain("restricted_gate_predicate_interface");
    expect(artifact.required_target_obligations).toContain("input_surface_consumption_rule");
    expect(artifact.required_target_obligations).toContain("boundary_preserving_gate_translation");
    expect(artifact.required_target_obligations).toContain("no_unrestricted_collapse_gate_promotion");
    expect(artifact.required_target_obligations).toContain("no_empirical_validation_promotion");
  });

  it("selects the restricted collapse-gate predicate interface as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe("RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE");
    expect(doc).toContain("RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE");
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
