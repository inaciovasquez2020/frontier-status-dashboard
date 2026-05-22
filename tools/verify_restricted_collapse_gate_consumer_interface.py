#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_collapse_gate_consumer_interface_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE_TARGET",
    "CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA",
    "CHRONOS_GRAVITY_STACK_BINDING_MAP",
}

REQUIRED_INTERFACE_SLOTS = {
    "restricted_stack_predicate_interface",
    "collapse_gate_consumer_read_restriction",
    "boundary_preserving_input_translation",
    "no_analytic_gravity_theorem_promotion",
    "no_empirical_validation_promotion",
}

REQUIRED_ALLOWED_READS = {
    "declared_restricted_stack_predicates",
    "declared_boundary_tokens",
    "declared_source_map_indices",
}

REQUIRED_FORBIDDEN_READS = {
    "analytic_gravity_theorem_content",
    "unrestricted_collapse_data",
    "empirical_validation_claims",
    "cosmic_censorship_claims",
    "dark_matter_resolution_claims",
}

REQUIRED_BOUNDARIES = {
    "gravity closure",
    "restricted collapse-gate bridge theorem",
    "collapse-gate theorem",
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

    assert data["object"] == "RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE"
    assert data["status"] == "CONSUMER_INTERFACE_ONLY_COLLAPSE_GATE_BRIDGE_NOT_PROVED"
    assert "RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))
    assert REQUIRED_INTERFACE_SLOTS.issubset(set(data["interface_slots"]))

    contract = data["consumer_contract"]
    assert contract["name"] == "RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE"
    assert contract["scope"] == "restricted_dashboard_source_map_layer"
    assert contract["status"] == "INTERFACE_SUPPLIED_BRIDGE_NOT_PROVED"
    assert REQUIRED_ALLOWED_READS.issubset(set(contract["allowed_reads"]))
    assert REQUIRED_FORBIDDEN_READS.issubset(set(contract["forbidden_reads"]))

    assert data["weakest_sufficient_next_object"] == "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for slot in REQUIRED_INTERFACE_SLOTS:
        assert slot in doc

    print("Restricted collapse-gate consumer interface verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
