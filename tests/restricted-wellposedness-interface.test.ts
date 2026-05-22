import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/restricted_wellposedness_interface_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_WELLPOSEDNESS_INTERFACE_2026_05_22.md",
  "utf8",
);

describe("restricted wellposedness interface", () => {
  it("records the wellposedness interface without proving a theorem", () => {
    expect(artifact.object).toBe("RESTRICTED_WELLPOSEDNESS_INTERFACE");
    expect(artifact.status).toBe("WELLPOSEDNESS_INTERFACE_ONLY_THEOREM_NOT_PROVED");
    expect(artifact.supplies).toContain("RESTRICTED_WELLPOSEDNESS_INTERFACE");
  });

  it("depends on the restricted energy condition interface and theorem chain", () => {
    expect(artifact.depends_on).toContain("RESTRICTED_ENERGY_CONDITION_INTERFACE");
    expect(artifact.depends_on).toContain("RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET");
  });

  it("records all restricted wellposedness slots", () => {
    expect(artifact.wellposedness_interface.wellposedness_slots).toContain(
      "restricted_wellposedness_interface",
    );
    expect(artifact.wellposedness_interface.wellposedness_slots).toContain(
      "restricted_initial_data_domain",
    );
    expect(artifact.wellposedness_interface.wellposedness_slots).toContain(
      "restricted_evolution_rule_interface",
    );
    expect(artifact.wellposedness_interface.wellposedness_slots).toContain(
      "restricted_continuation_criterion_interface",
    );
    expect(artifact.wellposedness_interface.wellposedness_slots).toContain(
      "restricted_boundary_preservation",
    );
    expect(artifact.wellposedness_interface.wellposedness_slots).toContain(
      "restricted_wellposedness_no_unrestricted_promotion",
    );
    expect(artifact.wellposedness_interface.wellposedness_slots).toContain(
      "restricted_wellposedness_no_empirical_promotion",
    );
  });

  it("closes only the restricted wellposedness interface obligation", () => {
    expect(artifact.closed_theorem_obligations).toContain("restricted_wellposedness_interface");
    expect(artifact.remaining_open_obligations).toContain("restricted_collapse_gate_theorem_proof_object");
  });

  it("selects restricted collapse-gate theorem assembly target as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe(
      "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET",
    );
    expect(doc).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET");
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
