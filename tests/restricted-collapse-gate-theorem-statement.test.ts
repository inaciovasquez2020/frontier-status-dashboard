import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/restricted_collapse_gate_theorem_statement_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/RESTRICTED_COLLAPSE_GATE_THEOREM_STATEMENT_2026_05_22.md",
  "utf8",
);

describe("restricted collapse-gate theorem statement", () => {
  it("records the theorem statement without supplying the proof object", () => {
    expect(artifact.object).toBe("RESTRICTED_COLLAPSE_GATE_THEOREM_STATEMENT");
    expect(artifact.status).toBe("THEOREM_STATEMENT_ONLY_PROOF_NOT_SUPPLIED");
    expect(artifact.supplies).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_STATEMENT");
    expect(artifact.does_not_supply).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT");
  });

  it("depends on the terminal missing certificate and restricted interface chain", () => {
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT_MISSING_CERTIFICATE");
    expect(artifact.depends_on).toContain("RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET");
    expect(artifact.depends_on).toContain("RESTRICTED_WELLPOSEDNESS_INTERFACE");
    expect(artifact.depends_on).toContain("RESTRICTED_ENERGY_CONDITION_INTERFACE");
    expect(artifact.depends_on).toContain("RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE");
  });

  it("defines the exact restricted theorem statement", () => {
    expect(artifact.theorem_statement.name).toBe("RESTRICTED_COLLAPSE_GATE_THEOREM");
    expect(artifact.theorem_statement.status).toBe("STATEMENT_DEFINED_PROOF_NOT_SUPPLIED");
    expect(artifact.theorem_statement.formal_statement).toContain("restricted collapse-gate trigger");
    expect(artifact.theorem_statement.conclusion).toContain("D admits RESTRICTED_COLLAPSE_GATE_TRIGGER");
  });

  it("records the required premises", () => {
    expect(artifact.theorem_statement.premises).toContain("D is in RESTRICTED_INITIAL_DATA_CLASS");
    expect(artifact.theorem_statement.premises).toContain(
      "D satisfies RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE",
    );
    expect(artifact.theorem_statement.premises).toContain("D satisfies RESTRICTED_ENERGY_CONDITION_INTERFACE");
    expect(artifact.theorem_statement.premises).toContain("D satisfies RESTRICTED_WELLPOSEDNESS_INTERFACE");
    expect(artifact.theorem_statement.premises).toContain(
      "D remains inside the declared restricted gate domain",
    );
  });

  it("selects restricted initial-data class as next", () => {
    expect(artifact.weakest_sufficient_next_object).toBe("RESTRICTED_INITIAL_DATA_CLASS");
    expect(doc).toContain("RESTRICTED_INITIAL_DATA_CLASS");
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
