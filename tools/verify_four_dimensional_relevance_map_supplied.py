#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts" / "gravity" / "four_dimensional_relevance_map_supplied_2026_05_22.json"

data = json.loads(ARTIFACT.read_text())

assert data["id"] == "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED_2026_05_22"
assert data["status"] == "FOUR_DIMENSIONAL_RELEVANCE_MAP_ONLY_NO_TRANSFER_THEOREM"
assert data["resolved_from_previous_next_required_object"] == "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED"
assert data["closed_object"] == "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED"

source = data["source"]
assert source["title"] == "Analytic Discrete Self-Similar Solutions of Einstein-Klein-Gordon at Large D"
assert source["arxiv"] == "2601.14358"
assert source["doi"] == "10.1103/qgl5-5l3t"
assert source["journal"] == "Physical Review Letters"

mapping = data["four_dimensional_relevance_map"]
assert mapping["D4_status"] == "RELEVANCE_ONLY_NOT_TRANSFERRED"
assert mapping["source_regime"] == "large_D_Einstein_massless_Klein_Gordon_critical_collapse"
assert mapping["target_regime"] == "four_dimensional_Einstein_massless_Klein_Gordon_critical_collapse"
assert "critical-collapse conceptual analogue" in mapping["admissible_relevance"]
assert "large-D asymptotic model for comparison only" in mapping["admissible_relevance"]
assert "large_D_to_D4_transfer_theorem" in mapping["non_admissible_promotions"]
assert "four_dimensional_physical_collapse_theorem" in mapping["non_admissible_promotions"]
assert "dark_matter_detection_claim" in mapping["non_admissible_promotions"]

obstruction_names = {row["name"] for row in data["transfer_obstructions"]}
for name in [
    "large_D_limit_gap",
    "spherical_symmetry_gap",
    "massless_scalar_matter_gap",
    "critical_threshold_gap",
    "chronos_stack_binding_gap",
]:
    assert name in obstruction_names

remaining = set(data["remaining_next_required_objects"])
for item in [
    "LARGE_D_TO_D4_ERROR_CONTROL_OR_TRANSFER_THEOREM",
    "NONSPHERICAL_STABILITY_OR_EXTENSION_THEOREM",
    "GENERAL_MATTER_TRANSFER_MAP",
    "CHRONOS_GRAVITY_STACK_BINDING_MAP",
]:
    assert item in remaining

boundary = "\n".join(data["boundary"])
for line in [
    "Four-dimensional relevance map only.",
    "No large-D to D=4 transfer theorem is claimed.",
    "No theorem promotion is claimed.",
    "No gravity solution is claimed.",
    "No unrestricted non-symmetric collapse theorem is claimed.",
    "No four-dimensional collapse theorem is claimed.",
    "No cosmic censorship result is claimed.",
    "No hoop conjecture result is claimed.",
    "No black-hole production claim is made.",
    "No primordial-black-hole abundance claim is made.",
    "No dark matter detection is claimed.",
    "No DFM-MKC validation is claimed.",
    "No Lambda-CDM failure is claimed.",
    "No Euclid Q2 empirical claim is made.",
    "No Clay problem is claimed.",
]:
    assert line in boundary

does_not_prove = set(data["does_not_prove"])
for forbidden in [
    "large-D to D=4 transfer theorem",
    "gravity solution",
    "unrestricted non-symmetric collapse theorem",
    "four-dimensional collapse theorem",
    "cosmic censorship",
    "hoop conjecture",
    "black-hole production",
    "primordial-black-hole abundance",
    "dark matter detection",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "any Clay problem",
]:
    assert forbidden in does_not_prove

print("Four-dimensional relevance map verification OK.")
print(f"Status: {data['status']}")
print("Remaining next required objects:")
for item in data["remaining_next_required_objects"]:
    print(f"- {item}")
