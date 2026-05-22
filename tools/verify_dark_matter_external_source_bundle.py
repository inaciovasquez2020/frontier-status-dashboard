#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts" / "gravity" / "dark_matter_external_source_bundle_2026_05_22.json"

data = json.loads(ARTIFACT.read_text())

assert data["id"] == "DARK_MATTER_EXTERNAL_SOURCE_BUNDLE_2026_05_22"
assert data["status"] == "EXTERNAL_SOURCE_BUNDLE_ONLY_NO_EMPIRICAL_PROMOTION"

sources = {source["id"]: source for source in data["sources"]}

assert "MIT_GW190728_SCALAR_FIELD_METHOD_SOURCE" in sources
assert "NASA_WEBB_COSMOS_DARK_MATTER_MAP_SOURCE" in sources
assert "ICTP_SAIFR_HBSM2026_COMMUNITY_VALIDATION_VENUE_SOURCE" in sources

mit = sources["MIT_GW190728_SCALAR_FIELD_METHOD_SOURCE"]
assert mit["claim_status"] == "candidate_only_not_detection"
assert mit["reported_surface"]["screened_events"] == 28
assert mit["reported_surface"]["vacuum_consistent_events"] == 27
assert mit["reported_surface"]["candidate_event"] == "GW190728"
assert mit["next_required_object"] == "INDEPENDENT_REPRODUCTION_OF_GW190728_SCALAR_ENVIRONMENT_BAYES_FACTOR"

nasa = sources["NASA_WEBB_COSMOS_DARK_MATTER_MAP_SOURCE"]
assert nasa["claim_status"] == "observational_map_source_only_not_particle_identification"
assert nasa["reported_surface"]["instrument"] == "James Webb Space Telescope"
assert nasa["reported_surface"]["field"] == "COSMOS"
assert nasa["reported_surface"]["galaxy_count_reported"] == "nearly_800000"
assert nasa["next_required_object"] == "PRIMARY_WEBB_COSMOS_LENSING_MAP_DATA_AND_METHOD_AUDIT"

ictp = sources["ICTP_SAIFR_HBSM2026_COMMUNITY_VALIDATION_VENUE_SOURCE"]
assert ictp["claim_status"] == "venue_source_only_not_evidence"
assert ictp["reported_surface"]["dates"] == "2026-06-01_to_2026-06-12"
assert ictp["reported_surface"]["application_status"] == "closed"
assert ictp["next_required_object"] == "COMMUNITY_FEEDBACK_OR_CONTACT_RECORD_SUPPLIED"

bundle_next = set(data["bundle_next_required_objects"])
for item in [
    "INDEPENDENT_REPRODUCTION_OF_GW190728_SCALAR_ENVIRONMENT_BAYES_FACTOR",
    "PRIMARY_WEBB_COSMOS_LENSING_MAP_DATA_AND_METHOD_AUDIT",
    "COMMUNITY_FEEDBACK_OR_CONTACT_RECORD_SUPPLIED",
]:
    assert item in bundle_next

required = set(data["required_before_empirical_promotion"])
for item in [
    "PRIMARY_PAPER_REVIEWED",
    "PUBLIC_DATA_PIPELINE_REPRODUCED",
    "MODEL_OR_LENSING_METHOD_IMPLEMENTATION_SUPPLIED",
    "INDEPENDENT_REPLICATION_SUPPLIED",
    "SYSTEMATICS_AUDIT_SUPPLIED",
    "COMMUNITY_FEEDBACK_RECORD_SUPPLIED",
]:
    assert item in required

boundary = "\n".join(data["boundary"])
for line in [
    "External source bundle only.",
    "No dark matter detection is claimed.",
    "No dark matter particle identification is claimed.",
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
    "dark matter particle identification",
    "gravity solution",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "dark-energy resolution",
    "dark-matter resolution",
    "Euclid Q2 empirical claim",
    "any Clay problem",
]:
    assert forbidden in does_not_prove

print("Dark matter external source bundle verification OK.")
print(f"Status: {data['status']}")
print("Next required objects:")
for item in data["bundle_next_required_objects"]:
    print(f"- {item}")
