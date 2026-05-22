import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/restricted_gate_predicate_satisfaction_certificate_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE_2026_05_22.md",
  "utf8",
);

describe("restricted gate predicate satisfaction certificate", () => {
  it("records the certificate without proving a theorem", () => {
    expect(artifact.object).toBe("RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE");
    expect(artifact.status).toBe("PREDICATE_SATISFACTION_CERTIFICATE_ONLY_THEOREM_NOT_PROVED");
    expect(artifact.supplies).toContain("RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE");
  });

  it("depends on the restricted theorem assumption schema and prior chain", () => {
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE");
  });

  it("certifies all restricted gate predicates", () => {
    expect(artifact.certificate.satisfied_predicates).toContain("restricted_gate_input_admissible");
    expect(artifact.certificate.satisfied_predicates).toContain("restricted_gate_boundary_preserved");
    expect(artifact.certificate.satisfied_predicates).toContain("restricted_gate_no_unrestricted_claim");
    expect(artifact.certificate.satisfied_predicates).toContain("restricted_gate_no_empirical_claim");
    expect(artifact.certificate.satisfied_predicates).toContain("restricted_gate_no_analytic_theorem_promotion");
  });

  it("closes only restricted gate predicate satisfaction", () => {
    expect(artifact.closed_theorem_obligations).toContain("restricted_gate_predicate_satisfaction");
    expect(artifact.remaining_open_obligations).toContain("restricted_energy_condition_interface");
    expect(artifact.remaining_open_obligations).toContain("restricted_wellposedness_interface");
  });

  it("selects restricted energy condition interface as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe("RESTRICTED_ENERGY_CONDITION_INTERFACE");
    expect(doc).toContain("RESTRICTED_ENERGY_CONDITION_INTERFACE");
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
