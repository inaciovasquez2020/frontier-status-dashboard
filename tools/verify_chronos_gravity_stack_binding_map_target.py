#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/chronos_gravity_stack_binding_map_target_2026_05_22.json"
DOC = ROOT / "docs/status/CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET_2026_05_22.md"

REQUIRED_OBJECTS = {
    "CHRONOS_GRAVITY_STACK_BINDING_MAP",
    "GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX",
    "KERR_DESITTER_WCCC_SOURCE_MAP",
    "PBH_SLOW_FOPT_SOURCE_MAP",
    "PBH_THERMAL_EVAPORATION_SOURCE_MAP",
    "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
    "EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED",
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
    "Chronos gravity stack binding soundness",
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

    assert data["object"] == "CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET"
    assert data["status"] == "TARGET_ONLY_BINDING_SOUNDNESS_NOT_PROVED"
    assert "CHRONOS_GRAVITY_STACK_BINDING_MAP_TARGET" in data["supplies"]

    assert REQUIRED_OBJECTS.issubset(set(data["requires_existing_objects"]))
    assert REQUIRED_OBLIGATIONS.issubset(set(data["binding_soundness_obligations"]))

    target = data["target_statement"]
    assert target["name"] == "CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA"
    assert target["status"] == "OPEN_NOT_PROVED"

    assert data["weakest_sufficient_next_object"] == "CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for obligation in REQUIRED_OBLIGATIONS:
        assert obligation in doc

    print("Chronos gravity stack binding map target verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
