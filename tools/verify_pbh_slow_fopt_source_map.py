#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts" / "gravity" / "pbh_slow_fopt_source_map_2026_05_22.json"

data = json.loads(ARTIFACT.read_text())

assert data["id"] == "PBH_SLOW_FOPT_SOURCE_MAP_2026_05_22"
assert data["status"] == "MODEL_SPECIFIC_PBH_SLOW_FOPT_SOURCE_ONLY_NO_GRAVITY_CLOSURE"

source = data["source"]
assert source["title"] == "Reviving primordial black hole formation in slow first-order phase transitions"
assert source["arxiv"] == "2605.11332v2"
assert source["category"] == "hep-ph"
assert source["version_date"] == "2026-05-21"
assert source["url"] == "https://arxiv.org/html/2605.11332v2"

for supplied in [
    "MODEL_SPECIFIC_PBH_SLOW_FOPT_FORMATION_SOURCE",
    "GAUGE_INVARIANT_DENSITY_CONTRAST_TREATMENT_SOURCE",
    "EARLY_MATTER_DOMINATED_PBH_GROWTH_SOURCE",
    "PBH_ABUNDANCE_PROFILE_MODEL_SOURCE",
]:
    assert supplied in data["supplies"]

does_not_supply = set(data["does_not_supply"])
for missing in [
    "CHRONOS_GRAVITY_STACK_BINDING_MAP",
    "FOUR_DIMENSIONAL_GRAVITY_CLOSURE_THEOREM",
    "UNRESTRICTED_PBH_DARK_MATTER_VALIDATION",
    "GENERAL_MATTER_TRANSFER_MAP",
    "NONSPHERICAL_STABILITY_OR_EXTENSION_THEOREM",
    "SIX_FIELD_ANALYTIC_PACKAGE_HYPOTHESIS",
]:
    assert missing in does_not_supply

assert data["weakest_sufficient_missing_lemma"] == "MODEL_SPECIFIC_PBH_SLOW_FOPT_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP"

secondary = set(data["secondary_missing_lemmas"])
for lemma in [
    "EMPIRICAL_PBH_ABUNDANCE_VALIDATION",
    "NON_GAUSSIAN_DEFORMATION_TENSOR_DISTRIBUTION_THEOREM",
    "FOPT_INITIAL_DATA_TO_CHRONOS_ADMISSIBLE_DATA_MAP",
    "PBH_FORMATION_PROFILE_TO_GRAVITY_STACK_OBSERVABLE_MAP",
]:
    assert lemma in secondary

boundary = "\n".join(data["boundary"])
for line in [
    "Model-specific PBH slow-FOPT source only.",
    "No gravity closure is claimed.",
    "No Chronos gravity stack binding map is claimed.",
    "No unrestricted primordial black hole formation theorem is claimed.",
    "No dark matter detection is claimed.",
    "No dark matter resolution is claimed.",
    "No DFM-MKC validation is claimed.",
    "No Lambda-CDM failure is claimed.",
    "No cosmic censorship result is claimed.",
    "No hoop conjecture result is claimed.",
    "No four-dimensional non-symmetric collapse theorem is claimed.",
    "No empirical validation is claimed.",
    "No Clay problem is claimed.",
]:
    assert line in boundary

does_not_prove = set(data["does_not_prove"])
for forbidden in [
    "gravity closure",
    "Chronos gravity stack binding map",
    "unrestricted primordial black hole formation theorem",
    "dark matter detection",
    "dark matter resolution",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "cosmic censorship",
    "hoop conjecture",
    "four-dimensional non-symmetric collapse theorem",
    "empirical validation",
    "any Clay problem",
]:
    assert forbidden in does_not_prove

print("PBH slow-FOPT source-map verification OK.")
print("Status: {}".format(data["status"]))
print("Weakest sufficient missing lemma: {}".format(data["weakest_sufficient_missing_lemma"]))
