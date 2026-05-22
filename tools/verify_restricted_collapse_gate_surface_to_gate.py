#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_collapse_gate_surface_to_gate_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE",
    "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_TARGET",
    "RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE",
    "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE",
}

REQUIRED_OBLIGATIONS = {
    "restricted_gate_predicate_interface",
    "input_surface_consumption_rule",
    "boundary_preserving_gate_translation",
    "no_unrestricted_collapse_gate_promotion",
    "no_empirical_validation_promotion",
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

    assert data["object"] == "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE"
    assert data["status"] == "RESTRICTED_SURFACE_TO_GATE_CLOSED_INTERFACE_ONLY_NO_COLLAPSE_GATE_THEOREM"
    assert "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))
    assert REQUIRED_OBLIGATIONS.issubset(set(data["closed_surface_to_gate_obligations"]))

    statement = data["restricted_surface_to_gate_statement"]
    assert statement["name"] == "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE"
    assert statement["scope"] == "restricted_dashboard_source_map_layer"
    assert statement["status"] == "RESTRICTED_INTERFACE_TRANSLATION_CLOSED"
    assert "preserving all no-promotion boundaries" in statement["statement"]

    assert data["weakest_sufficient_next_object"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_TARGET"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for obligation in REQUIRED_OBLIGATIONS:
        assert obligation in doc

    print("Restricted collapse-gate surface-to-gate verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
