import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync(
    "artifacts/gravity/restricted_collapse_gate_theorem_proof_object_missing_certificate_2026_05_22.json",
    "utf8",
  ),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT_MISSING_CERTIFICATE_2026_05_22.md",
  "utf8",
);

describe("restricted collapse-gate theorem proof object missing certificate", () => {
  it("records the missing certificate without supplying the proof object", () => {
    expect(artifact.object).toBe("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT_MISSING_CERTIFICATE");
    expect(artifact.status).toBe("TERMINAL_MISSING_PROOF_OBJECT_CERTIFICATE_NO_THEOREM_PROVED");
    expect(artifact.supplies).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT_MISSING_CERTIFICATE");
    expect(artifact.does_not_supply).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT");
  });

  it("depends on the completed restricted assembly chain", () => {
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET");
    expect(artifact.depends_on).toContain("RESTRICTED_WELLPOSEDNESS_INTERFACE");
    expect(artifact.depends_on).toContain("RESTRICTED_ENERGY_CONDITION_INTERFACE");
    expect(artifact.depends_on).toContain("RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA");
  });

  it("identifies the precise missing proof object", () => {
    expect(artifact.missing_object.name).toBe("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT");
    expect(artifact.missing_object.status).toBe("MISSING_NOT_SUPPLIED");
    expect(artifact.blocked_theorem_obligations).toContain("restricted_collapse_gate_theorem_proof_object");
    expect(doc).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT");
  });

  it("does not allow interfaces to replace the proof object", () => {
    expect(artifact.missing_object.not_replaceable_by).toContain("dashboard status row");
    expect(artifact.missing_object.not_replaceable_by).toContain("source-map binding");
    expect(artifact.missing_object.not_replaceable_by).toContain("predicate interface");
    expect(artifact.missing_object.not_replaceable_by).toContain("assumption schema");
    expect(artifact.missing_object.not_replaceable_by).toContain("assembly target");
  });

  it("records the already supplied interfaces", () => {
    expect(artifact.already_supplied_interfaces).toContain("restricted_gate_predicate_satisfaction");
    expect(artifact.already_supplied_interfaces).toContain("restricted_energy_condition_interface");
    expect(artifact.already_supplied_interfaces).toContain("restricted_wellposedness_interface");
    expect(artifact.already_supplied_interfaces).toContain("boundary_preserving_assembly_rule");
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("gravity closure");
    expect(artifact.does_not_prove).toContain("collapse-gate theorem");
    expect(artifact.does_not_prove).toContain("restricted collapse-gate theorem");
    expect(artifact.does_not_prove).toContain("unrestricted collapse-gate theorem");
    expect(artifact.does_not_prove).toContain("restricted collapse-gate theorem proof object");
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
