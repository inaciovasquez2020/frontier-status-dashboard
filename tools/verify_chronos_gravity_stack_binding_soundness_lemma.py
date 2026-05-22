#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/chronos_gravity_stack_binding_soundness_lemma_2026_05_22.json"
DOC = ROOT / "docs/status/CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "CHRONOS_GRAVITY_STACK_BINDING_MAP",
    "CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET",
    "GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX",
}

REQUIRED_OBLIGATIONS = {
    "slot_totality",
    "slot_type_compatibility",
    "boundary_preservation",
    "no_theorem_promotion",
    "downstream_read_restriction",
}

REQUIRED_BOUNDARIES = {
    "gravity closure",
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

    assert data["object"] == "CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA"
    assert data["status"] == "RESTRICTED_SOUNDNESS_LEMMA_ONLY_NO_GRAVITY_CLOSURE"
    assert "CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))
    assert REQUIRED_OBLIGATIONS.issubset(set(data["closed_obligations"]))

    lemma = data["lemma_statement"]
    assert lemma["name"] == "CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA"
    assert lemma["scope"] == "restricted_dashboard_source_map_layer"
    assert "source-indexing input" in lemma["statement"]

    assert data["remaining_next_object"] == "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for obligation in REQUIRED_OBLIGATIONS:
        assert obligation in doc

    print("Chronos gravity stack binding soundness lemma verification OK.")
    print(f"Status: {data['status']}")
    print(f"Remaining next object: {data['remaining_next_object']}")

if __name__ == "__main__":
    main()
