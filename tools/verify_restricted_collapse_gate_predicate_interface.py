#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted_collapse_gate_predicate_interface_2026_05_22.json"
DOC = ROOT / "docs/status/RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE_2026_05_22.md"

REQUIRED_DEPENDENCIES = {
    "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE_TARGET",
    "RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE",
    "CHRONOS_GRAVITY_STACK_RESTRICTED_SOUNDNESS_TO_COLLAPSE_GATE_BRIDGE",
    "RESTRICTED_COLLAPSE_GATE_CONSUMER_INTERFACE",
}

REQUIRED_PREDICATE_SLOTS = {
    "restricted_gate_input_admissible",
    "restricted_gate_boundary_preserved",
    "restricted_gate_no_unrestricted_claim",
    "restricted_gate_no_empirical_claim",
    "restricted_gate_no_analytic_theorem_promotion",
}

REQUIRED_ALLOWED_SOURCES = {
    "RESTRICTED_COLLAPSE_GATE_INPUT_SURFACE",
    "declared_restricted_stack_predicates",
    "declared_boundary_tokens",
    "declared_source_map_indices",
}

REQUIRED_FORBIDDEN_SOURCES = {
    "analytic_gravity_theorem_content",
    "unrestricted_collapse_data",
    "empirical_validation_claims",
    "cosmic_censorship_claims",
    "dark_matter_resolution_claims",
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

    assert data["object"] == "RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE"
    assert data["status"] == "PREDICATE_INTERFACE_ONLY_SURFACE_TO_GATE_NOT_PROVED"
    assert "RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE" in data["supplies"]

    assert REQUIRED_DEPENDENCIES.issubset(set(data["depends_on"]))

    interface = data["predicate_interface"]
    assert interface["name"] == "RESTRICTED_COLLAPSE_GATE_PREDICATE_INTERFACE"
    assert interface["scope"] == "restricted_dashboard_source_map_layer"
    assert interface["status"] == "INTERFACE_SUPPLIED_SURFACE_TO_GATE_NOT_PROVED"
    assert REQUIRED_PREDICATE_SLOTS.issubset(set(interface["predicate_slots"]))
    assert REQUIRED_ALLOWED_SOURCES.issubset(set(interface["allowed_sources"]))
    assert REQUIRED_FORBIDDEN_SOURCES.issubset(set(interface["forbidden_sources"]))

    assert REQUIRED_OBLIGATIONS.issubset(set(data["closed_predicate_obligations"]))
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_COLLAPSE_GATE_SURFACE_TO_GATE"

    does_not_prove = set(data["does_not_prove"])
    assert REQUIRED_BOUNDARIES.issubset(does_not_prove)

    for phrase in REQUIRED_BOUNDARIES:
        assert phrase in doc

    for slot in REQUIRED_PREDICATE_SLOTS:
        assert slot in doc

    for obligation in REQUIRED_OBLIGATIONS:
        assert obligation in doc

    print("Restricted collapse-gate predicate interface verification OK.")
    print(f"Status: {data['status']}")
    print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")

if __name__ == "__main__":
    main()
