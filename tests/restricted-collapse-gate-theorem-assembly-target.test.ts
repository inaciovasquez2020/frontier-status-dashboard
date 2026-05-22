import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/restricted_collapse_gate_theorem_assembly_target_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET_2026_05_22.md",
  "utf8",
);

describe("restricted collapse-gate theorem assembly target", () => {
  it("records the assembly target without supplying the proof object", () => {
    expect(artifact.object).toBe("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET");
    expect(artifact.status).toBe("ASSEMBLY_TARGET_ONLY_PROOF_OBJECT_NOT_SUPPLIED");
    expect(artifact.supplies).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET");
  });

  it("depends on the completed restricted interface chain", () => {
    expect(artifact.depends_on).toContain("RESTRICTED_WELLPOSEDNESS_INTERFACE");
    expect(artifact.depends_on).toContain("RESTRICTED_ENERGY_CONDITION_INTERFACE");
    expect(artifact.depends_on).toContain("RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET");
  });

  it("keeps the proof object unsupplied", () => {
    expect(artifact.assembly_target.name).toBe("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET");
    expect(artifact.assembly_target.scope).toBe("restricted_dashboard_source_map_layer");
    expect(artifact.assembly_target.status).toBe("TARGET_SUPPLIED_PROOF_OBJECT_NOT_SUPPLIED");
    expect(artifact.remaining_open_obligations).toContain("restricted_collapse_gate_theorem_proof_object");
  });

  it("records the required assembly obligations", () => {
    expect(artifact.required_assembly_obligations).toContain("restricted_gate_predicate_satisfaction");
    expect(artifact.required_assembly_obligations).toContain("restricted_energy_condition_interface");
    expect(artifact.required_assembly_obligations).toContain("restricted_wellposedness_interface");
    expect(artifact.required_assembly_obligations).toContain("boundary_preserving_assembly_rule");
    expect(artifact.required_assembly_obligations).toContain("no_unrestricted_theorem_promotion");
    expect(artifact.required_assembly_obligations).toContain("no_empirical_validation_promotion");
  });

  it("selects restricted collapse-gate theorem proof object as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe(
      "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT",
    );
    expect(doc).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT");
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("gravity closure");
    expect(artifact.does_not_prove).toContain("collapse-gate theorem");
    expect(artifact.does_not_prove).toContain("restricted collapse-gate theorem");
    expect(artifact.does_not_prove).toContain("unrestricted collapse-gate theorem");
    expect(artifact.does_not_prove).toContain("analytic gravity theorem");
    expect(artifact.does_not_prove).toContain("wellposedness theorem");
    expect(artifact.does_not_prove).toContain("energy condition theorem");
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
