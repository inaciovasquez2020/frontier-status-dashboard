#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_gate_predicate_satisfaction_certificate_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA",
    "RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET",
    "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE",
    "RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE",
}

REQUIRED_PREDICATES = {
    "restricted_gate_input_admissible",
    "restricted_gate_boundary_preserved",
    "restricted_gate_no_unrestricted_claim",
    "restricted_gate_no_empirical_claim",
    "restricted_gate_no_analytic_theorem_promotion",
}

REQUIRED_CLOSED = {
    "restricted_gate_predicate_satisfaction",
}

REQUIRED_OPEN = {
    "restricted_energy_condition_interface",
    "restricted_wellposedness_interface",
}

REQUIRED_BOUNDARIES = {
    "gravity closure",
    "collapse-gate theorem",
    "restricted collapse-gate theorem",
    "unrestricted collapse-gate theorem",
    "analytic gravity theorem",
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

    assert data["object"] == "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE"
    assert data["status"] == "PREDICATE_SATISFACTION_CERTIFICATE_ONLY_THEOREM_NOT_PROVED"
    assert "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))

    cert = data["certificate"]
    assert cert["name"] == "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE"
    assert cert["scope"] == "restricted_dashboard_source_map_layer"
    assert cert["status"] == "CERTIFICATE_SUPPLIED_THEOREM_NOT_PROVED"
    assert REQUIRED_PREDICATES.issubset(set(cert["satisfied_predicates"]))
    assert "do not supply analytic, empirical, or unrestricted theorem content" in cert["certification_rule"]

    assert REQUIRED_CLOSED.issubset(set(data["closed_theorem_obligations"]))
    assert REQUIRED_OPEN.issubset(set(data["remaining_open_obligations"]))
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_ENERGY_CONDITION_INTERFACE"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for predicate in REQUIRED_PREDICATES:
        assert predicate in doc

    for obligation in REQUIRED_OPEN:
        assert obligation in doc

    print("Restricted gate predicate satisfaction certificate verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
