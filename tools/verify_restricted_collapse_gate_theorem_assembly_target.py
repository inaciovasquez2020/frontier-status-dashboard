#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_collapse_gate_theorem_assembly_target_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "RESTRICTED_WELLPOSEDNESS_INTERFACE",
    "RESTRICTED_ENERGY_CONDITION_INTERFACE",
    "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE",
    "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA",
    "RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET",
}

REQUIRED_OBLIGATIONS = {
    "restricted_gate_predicate_satisfaction",
    "restricted_energy_condition_interface",
    "restricted_wellposedness_interface",
    "boundary_preserving_assembly_rule",
    "no_unrestricted_theorem_promotion",
    "no_empirical_validation_promotion",
}

REQUIRED_OPEN = {
    "restricted_collapse_gate_theorem_proof_object",
}

REQUIRED_BOUNDARIES = {
    "gravity closure",
    "collapse-gate theorem",
    "restricted collapse-gate theorem",
    "unrestricted collapse-gate theorem",
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

    assert data["object"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET"
    assert data["status"] == "ASSEMBLY_TARGET_ONLY_PROOF_OBJECT_NOT_SUPPLIED"
    assert "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))

    target = data["assembly_target"]
    assert target["name"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET"
    assert target["scope"] == "restricted_dashboard_source_map_layer"
    assert target["status"] == "TARGET_SUPPLIED_PROOF_OBJECT_NOT_SUPPLIED"
    assert "without promoting" in target["statement"]

    assert REQUIRED_OBLIGATIONS.issubset(set(data["required_assembly_obligations"]))
    assert REQUIRED_OPEN.issubset(set(data["remaining_open_obligations"]))
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for obligation in REQUIRED_OBLIGATIONS:
        assert obligation in doc

    for obligation in REQUIRED_OPEN:
        assert obligation in doc

    print("Restricted collapse-gate theorem assembly target verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
