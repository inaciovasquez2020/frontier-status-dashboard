#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_collapse_gate_theorem_statement_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_COLLAPSE_GATE_THEOREM_STATEMENT_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT_MISSING_CERTIFICATE",
    "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET",
    "RESTRICTED_WELLPOSEDNESS_INTERFACE",
    "RESTRICTED_ENERGY_CONDITION_INTERFACE",
    "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE",
}

REQUIRED_PREMISES = {
    "D is in RESTRICTED_INITIAL_DATA_CLASS",
    "D satisfies RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE",
    "D satisfies RESTRICTED_ENERGY_CONDITION_INTERFACE",
    "D satisfies RESTRICTED_WELLPOSEDNESS_INTERFACE",
    "D remains inside the declared restricted gate domain",
}

REQUIRED_REMAINING = {
    "restricted_initial_data_class",
    "restricted_energy_condition_preservation",
    "restricted_wellposedness_continuation",
    "restricted_collapse_gate_trigger_derivation",
    "restricted_collapse_gate_theorem_proof_object",
}

REQUIRED_BOUNDARIES = {
    "gravity closure",
    "collapse-gate theorem",
    "restricted collapse-gate theorem",
    "unrestricted collapse-gate theorem",
    "restricted collapse-gate theorem proof object",
    "analytic gravity theorem",
    "wellposedness theorem",
    "energy condition theorem",
    "four-dimensional collapse theorem",
    "unrestricted non-symmetric collapse theorem",
    "unrestricted cosmic censorship",
    "hoop conjecture",
    "unrestricted primordial black hole formation theorem",
    "unrestricted primordial black hole evaporation theorem",
    "dark matter detection",
    "dark matter resolution",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "empirical validation",
    "any Clay problem",
}

def main() -> None:
    data = json.loads(ARTIFACT.read_text())
    doc = DOC.read_text()

    assert data["object"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_STATEMENT"
    assert data["status"] == "THEOREM_STATEMENT_ONLY_PROOF_NOT_SUPPLIED"
    assert "RESTRICTED_COLLAPSE_GATE_THEOREM_STATEMENT" in data["supplies"]
    assert "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT" in data["does_not_supply"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))

    statement = data["theorem_statement"]
    assert statement["name"] == "RESTRICTED_COLLAPSE_GATE_THEOREM"
    assert statement["scope"] == "restricted_dashboard_source_map_layer"
    assert statement["status"] == "STATEMENT_DEFINED_PROOF_NOT_SUPPLIED"
    assert "restricted collapse-gate trigger" in statement["formal_statement"]
    assert REQUIRED_PREMISES.issubset(set(statement["premises"]))
    assert "D admits RESTRICTED_COLLAPSE_GATE_TRIGGER" in statement["conclusion"]

    assert "exact_restricted_collapse_gate_theorem_statement" in data["closed_statement_obligations"]
    assert REQUIRED_REMAINING.issubset(set(data["remaining_open_obligations"]))
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_INITIAL_DATA_CLASS"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for obligation in REQUIRED_REMAINING:
        assert obligation in doc

    print("Restricted collapse-gate theorem statement verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
