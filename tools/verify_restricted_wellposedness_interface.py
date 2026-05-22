#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_wellposedness_interface_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_WELLPOSEDNESS_INTERFACE_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "RESTRICTED_ENERGY_CONDITION_INTERFACE",
    "RESTRICTED_GATE_PREDICATE_SATISFACTION_CERTIFICATE",
    "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSUMPTION_SCHEMA",
    "RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET",
}

REQUIRED_SLOTS = {
    "restricted_wellposedness_interface",
    "restricted_initial_data_domain",
    "restricted_evolution_rule_interface",
    "restricted_continuation_criterion_interface",
    "restricted_boundary_preservation",
    "restricted_wellposedness_no_unrestricted_promotion",
    "restricted_wellposedness_no_empirical_promotion",
}

REQUIRED_CLOSED = {
    "restricted_wellposedness_interface",
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

    assert data["object"] == "RESTRICTED_WELLPOSEDNESS_INTERFACE"
    assert data["status"] == "WELLPOSEDNESS_INTERFACE_ONLY_THEOREM_NOT_PROVED"
    assert "RESTRICTED_WELLPOSEDNESS_INTERFACE" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))

    interface = data["wellposedness_interface"]
    assert interface["name"] == "RESTRICTED_WELLPOSEDNESS_INTERFACE"
    assert interface["scope"] == "restricted_dashboard_source_map_layer"
    assert interface["status"] == "INTERFACE_SUPPLIED_THEOREM_NOT_PROVED"
    assert REQUIRED_SLOTS.issubset(set(interface["wellposedness_slots"]))

    assert REQUIRED_CLOSED.issubset(set(data["closed_theorem_obligations"]))
    assert REQUIRED_OPEN.issubset(set(data["remaining_open_obligations"]))
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_ASSEMBLY_TARGET"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for slot in REQUIRED_SLOTS:
        assert slot in doc

    for obligation in REQUIRED_OPEN:
        assert obligation in doc

    print("Restricted wellposedness interface verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
