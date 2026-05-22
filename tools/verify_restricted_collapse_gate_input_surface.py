#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_collapse_gate_input_surface_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE",
    "RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE",
    "CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA",
    "CHRONOS_GRAVITY_STACK_BINDING_MAP",
}

REQUIRED_ADMISSIBLE_INPUTS = {
    "declared_restricted_stack_predicates",
    "declared_boundary_tokens",
    "declared_source_map_indices",
    "restricted_collapse_gate_consumer_contract",
}

REQUIRED_EXCLUDED_INPUTS = {
    "analytic_gravity_theorem_content",
    "unrestricted_collapse_data",
    "empirical_validation_claims",
    "cosmic_censorship_claims",
    "dark_matter_resolution_claims",
}

REQUIRED_SURFACE_OBLIGATIONS = {
    "source_slot_traceability",
    "consumer_read_contract_satisfied",
    "boundary_tokens_preserved",
    "no_unrestricted_data_admission",
    "no_empirical_claim_admission",
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

    assert data["object"] == "RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE"
    assert data["status"] == "INPUT_SURFACE_ONLY_NO_COLLAPSE_GATE_THEOREM"
    assert "RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))

    surface = data["input_surface"]
    assert surface["name"] == "RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE"
    assert surface["scope"] == "restricted_dashboard_source_map_layer"
    assert surface["status"] == "SURFACE_SUPPLIED_COLLAPSE_GATE_NOT_PROVED"
    assert REQUIRED_ADMISSIBLE_INPUTS.issubset(set(surface["admissible_inputs"]))
    assert REQUIRED_EXCLUDED_INPUTS.issubset(set(surface["excluded_inputs"]))

    assert REQUIRED_SURFACE_OBLIGATIONS.issubset(set(data["closed_surface_obligations"]))
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_TARGET"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for obligation in REQUIRED_SURFACE_OBLIGATIONS:
        assert obligation in doc

    print("Restricted collapse-gate input surface verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
