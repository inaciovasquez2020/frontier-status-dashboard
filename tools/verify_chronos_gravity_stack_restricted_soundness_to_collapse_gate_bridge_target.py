#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/chronos_gravity_stack_restricted_soundness_to_collapse_gate_bridge_target_2026_05_22.json"
DOC = ROOT / "docs/status/CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA",
    "CHRONOS_GRAVITY_STACK_BINDING_MAP",
    "CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET",
    "GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX",
}

REQUIRED_OBLIGATIONS = {
    "restricted_stack_predicate_interface",
    "collapse_gate_consumer_read_restriction",
    "boundary_preserving_input_translation",
    "no_analytic_gravity_theorem_promotion",
    "no_empirical_validation_promotion",
}

REQUIRED_BOUNDARIES = {
    "gravity closure",
    "restricted collapse-gate bridge theorem",
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

    assert data["object"] == "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET"
    assert data["status"] == "BRIDGE_TARGET_ONLY_COLLAPSE_GATE_NOT_PROVED"
    assert "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))
    assert REQUIRED_OBLIGATIONS.issubset(set(data["required_bridge_obligations"]))

    target = data["target_statement"]
    assert target["name"] == "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE"
    assert target["scope"] == "restricted_dashboard_source_map_layer"
    assert target["status"] == "OPEN_NOT_PROVED"

    assert data["weakest_sufficient_next_object"] == "RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for obligation in REQUIRED_OBLIGATIONS:
        assert obligation in doc

    print("Chronos gravity stack restricted soundness to collapse-gate bridge target verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
