import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/restricted_collapse_gate_theorem_assumption_schema_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA_2026_05_22.md",
  "utf8",
);

describe("restricted collapse-gate theorem assumption schema", () => {
  it("records the assumption schema without proving a theorem", () => {
    expect(artifact.object).toBe("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA");
    expect(artifact.status).toBe("ASSUMPTION_SCHEMA_ONLY_THEOREM_NOT_PROVED");
    expect(artifact.supplies).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA");
  });

  it("depends on the restricted theorem target and prior interface chain", () => {
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE");
  });

  it("records all theorem assumption slots", () => {
    expect(artifact.assumption_schema.assumption_slots).toContain("restricted_collapse_gate_assumption_schema");
    expect(artifact.assumption_schema.assumption_slots).toContain("restricted_gate_predicate_satisfaction");
    expect(artifact.assumption_schema.assumption_slots).toContain("restricted_energy_condition_interface");
    expect(artifact.assumption_schema.assumption_slots).toContain("restricted_wellposedness_interface");
    expect(artifact.assumption_schema.assumption_slots).toContain("boundary_preserving_theorem_statement");
    expect(artifact.assumption_schema.assumption_slots).toContain("no_unrestricted_gravity_promotion");
    expect(artifact.assumption_schema.assumption_slots).toContain("no_empirical_validation_promotion");
  });

  it("separates closed schema obligations from open theorem obligations", () => {
    expect(artifact.closed_schema_obligations).toContain("restricted_collapse_gate_assumption_schema");
    expect(artifact.closed_schema_obligations).toContain("boundary_preserving_theorem_statement");
    expect(artifact.closed_schema_obligations).toContain("no_unrestricted_gravity_promotion");
    expect(artifact.closed_schema_obligations).toContain("no_empirical_validation_promotion");

    expect(artifact.remaining_open_obligations).toContain("restricted_gate_predicate_satisfaction");
    expect(artifact.remaining_open_obligations).toContain("restricted_energy_condition_interface");
    expect(artifact.remaining_open_obligations).toContain("restricted_wellposedness_interface");
  });

  it("selects restricted gate predicate satisfaction certificate as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe(
      "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE",
    );
    expect(doc).toContain("RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE");
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
