#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_energy_condition_interface_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_ENERGY_CONDITION_INTERFACE_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE",
    "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA",
    "RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET",
    "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE",
}

REQUIRED_SLOTS = {
    "restricted_energy_condition_interface",
    "restricted_energy_condition_domain",
    "restricted_energy_condition_boundary_preservation",
    "restricted_energy_condition_no_unrestricted_promotion",
    "restricted_energy_condition_no_empirical_promotion",
}

REQUIRED_CLOSED = {
    "restricted_energy_condition_interface",
}

REQUIRED_OPEN = {
    "restricted_wellposedness_interface",
}

REQUIRED_BOUNDARIES = {
    "gravity closure",
    "collapse-gate theorem",
    "restricted collapse-gate theorem",
    "unrestricted collapse-gate theorem",
    "analytic gravity theorem",
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

    assert data["object"] == "RESTRICTED_ENERGY_CONDITION_INTERFACE"
    assert data["status"] == "ENERGY_CONDITION_INTERFACE_ONLY_THEOREM_NOT_PROVED"
    assert "RESTRICTED_ENERGY_CONDITION_INTERFACE" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))

    interface = data["energy_condition_interface"]
    assert interface["name"] == "RESTRICTED_ENERGY_CONDITION_INTERFACE"
    assert interface["scope"] == "restricted_dashboard_source_map_layer"
    assert interface["status"] == "INTERFACE_SUPPLIED_THEOREM_NOT_PROVED"
    assert REQUIRED_SLOTS.issubset(set(interface["energy_condition_slots"]))

    assert REQUIRED_CLOSED.issubset(set(data["closed_theorem_obligations"]))
    assert REQUIRED_OPEN.issubset(set(data["remaining_open_obligations"]))
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_WELLPOSEDNESS_INTERFACE"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for slot in REQUIRED_SLOTS:
        assert slot in doc

    for obligation in REQUIRED_OPEN:
        assert obligation in doc

    print("Restricted energy condition interface verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
