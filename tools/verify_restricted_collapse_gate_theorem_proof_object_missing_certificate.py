#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_collapse_gate_theorem_proof_object_missing_certificate_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT_MISSING_CERTIFICATE_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET",
    "RESTRICTED_WELLPOSEDNESS_INTERFACE",
    "RESTRICTED_ENERGY_CONDITION_INTERFACE",
    "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE",
    "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA",
}

REQUIRED_ALREADY_SUPPLIED = {
    "restricted_gate_predicate_satisfaction",
    "restricted_energy_condition_interface",
    "restricted_wellposedness_interface",
    "boundary_preserving_assembly_rule",
}

REQUIRED_BLOCKED = {
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

    assert data["object"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT_MISSING_CERTIFICATE"
    assert data["status"] == "TERMINAL_MISSING_PROOF_OBJECT_CERTIFICATE_NO_THEOREM_PROVED"
    assert "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT_MISSING_CERTIFICATE" in data["supplies"]
    assert "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT" in data["does_not_supply"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))

    missing = data["missing_object"]
    assert missing["name"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT"
    assert missing["status"] == "MISSING_NOT_SUPPLIED"
    assert "deriving the restricted collapse-gate theorem" in missing["precise_requirement"]

    assert REQUIRED_BLOCKED.issubset(set(data["blocked_theorem_obligations"]))
    assert REQUIRED_ALREADY_SUPPLIED.issubset(set(data["already_supplied_interfaces"]))
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for obligation in REQUIRED_BLOCKED:
        assert obligation in doc

    print("Restricted collapse-gate theorem proof object missing certificate verification OK.")
    print(f"Status: {data['status']}")
    print(f"Missing object: {data['missing_object']['name']}")

if __name__ == "__main__":
    main()
