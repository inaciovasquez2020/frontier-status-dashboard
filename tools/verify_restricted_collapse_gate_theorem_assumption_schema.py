#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_collapse_gate_theorem_assumption_schema_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET",
    "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE",
    "RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE",
    "RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE",
}

REQUIRED_ASSUMPTION_SLOTS = {
    "restricted_collapse_gate_assumption_schema",
    "restricted_gate_predicate_satisfaction",
    "restricted_energy_condition_interface",
    "restricted_wellposedness_interface",
    "boundary_preserving_theorem_statement",
    "no_unrestricted_gravity_promotion",
    "no_empirical_validation_promotion",
}

REQUIRED_CLOSED = {
    "restricted_collapse_gate_assumption_schema",
    "boundary_preserving_theorem_statement",
    "no_unrestricted_gravity_promotion",
    "no_empirical_validation_promotion",
}

REQUIRED_OPEN = {
    "restricted_gate_predicate_satisfaction",
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

    assert data["object"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA"
    assert data["status"] == "ASSUMPTION_SCHEMA_ONLY_THEOREM_NOT_PROVED"
    assert "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))

    schema = data["assumption_schema"]
    assert schema["name"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA"
    assert schema["scope"] == "restricted_dashboard_source_map_layer"
    assert schema["status"] == "SCHEMA_SUPPLIED_THEOREM_NOT_PROVED"
    assert REQUIRED_ASSUMPTION_SLOTS.issubset(set(schema["assumption_slots"]))

    assert REQUIRED_CLOSED.issubset(set(data["closed_schema_obligations"]))
    assert REQUIRED_OPEN.issubset(set(data["remaining_open_obligations"]))
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for slot in REQUIRED_ASSUMPTION_SLOTS:
        assert slot in doc

    for obligation in REQUIRED_OPEN:
        assert obligation in doc

    print("Restricted collapse-gate theorem assumption schema verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
