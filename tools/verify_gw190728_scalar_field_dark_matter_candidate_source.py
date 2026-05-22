#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts" / "gravity" / "gw190728_scalar_field_dark_matter_candidate_source_2026_05_22.json"

data = json.loads(ARTIFACT.read_text())

assert data["id"] == "GW190728_SCALAR_FIELD_DARK_MATTER_CANDIDATE_SOURCE_2026_05_22"
assert data["status"] == "CANDIDATE_SOURCE_ONLY_NO_DETECTION_CLAIM"

source = data["source"]
assert source["doi"] == "10.1103/fv9z-zkxx"
assert source["arxiv"] == "2510.17967"
assert source["primary_article_title"] == "Scalar Fields around Black Hole Binaries in LIGO-Virgo-KAGRA"

claim = data["claim_surface"]
assert claim["object"] == "GW190728"
assert claim["screened_events"] == 28
assert claim["vacuum_consistent_events"] == 27
assert claim["candidate_event"] == "GW190728"
assert claim["reported_status"] == "tentative evidence only"

required = set(data["required_before_empirical_promotion"])
for item in [
    "PRIMARY_PAPER_REVIEWED",
    "LVK_PUBLIC_EVENT_DATA_PIPELINE_REPRODUCED",
    "WAVEFORM_MODEL_IMPLEMENTATION_SUPPLIED",
    "BAYES_FACTOR_REPRODUCTION_SUPPLIED",
    "INDEPENDENT_GROUP_REPLICATION_SUPPLIED",
    "SYSTEMATICS_AND_SELECTION_EFFECTS_AUDIT_SUPPLIED",
]:
    assert item in required

assert data["next_required_object"] == "INDEPENDENT_REPRODUCTION_OF_GW190728_SCALAR_ENVIRONMENT_BAYES_FACTOR"

boundary = "\n".join(data["boundary"])
for line in [
    "Candidate source only.",
    "No dark matter detection is claimed.",
    "No gravity solution is claimed.",
    "No DFM-MKC validation is claimed.",
    "No Lambda-CDM failure is claimed.",
    "No dark-energy resolution is claimed.",
    "No dark-matter resolution is claimed.",
    "No Euclid Q2 empirical claim is made.",
    "No Clay problem is claimed.",
]:
    assert line in boundary

does_not_prove = set(data["does_not_prove"])
for forbidden in [
    "dark matter detection",
    "gravity solution",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "dark-energy resolution",
    "dark-matter resolution",
    "Euclid Q2 empirical claim",
    "any Clay problem",
]:
    assert forbidden in does_not_prove

print("GW190728 scalar-field dark-matter candidate source verification OK.")
print(f"Status: {data['status']}")
print(f"Next required object: {data['next_required_object']}")
