#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/chronos_gravity_stack_binding_map_2026_05_22.json"
DOC = ROOT / "docs/status/CHRONOS_GRAVITY_STACK_BINDING_MAP_2026_05_22.md"

REQUIRED_INPUTS = {
    "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
    "EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED",
    "KERR_DESITTER_WCCC_SOURCE_MAP",
    "PBH_SLOW_FOPT_SOURCE_MAP",
    "PBH_THERMAL_EVAPORATION_SOURCE_MAP",
    "GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX",
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

    assert data["object"] == "CHRONOS_GRAVITY_STACK_BINDING_MAP"
    assert data["status"] == "BINDING_MAP_ONLY_NO_GRAVITY_CLOSURE"
    assert "CHRONOS_GRAVITY_STACK_BINDING_MAP" in data["supplies"]
    assert data["next_required_object"] == "CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA"

    assert REQUIRED_INPUTS.issubset(set(data["input_objects"]))
    assert len(data["binding_rows"]) == 6

    source_objects = {row["source_object"] for row in data["binding_rows"]}
    assert REQUIRED_INPUTS.issubset(source_objects)

    stack_slots = set(data["chronos_gravity_stack_slots"])
    assert "restricted_collapse_gate_target" in stack_slots
    assert "boundary_compactness_target" in stack_slots
    assert "empirical_validation_target" in stack_slots

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    print("Chronos gravity stack binding map verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['next_required_object']}")

if __name__ == "__main__":
    main()
