#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts" / "gravity" / "gravity_external_validation_source_bundle_2026_05_22.json"

data = json.loads(ARTIFACT.read_text())

assert data["id"] == "GRAVITY_EXTERNAL_VALIDATION_SOURCE_BUNDLE_2026_05_22"
assert data["status"] == "EXTERNAL_SOURCE_BUNDLE_ONLY_NO_THEOREM_OR_EMPIRICAL_PROMOTION"

sources = {source["id"]: source for source in data["sources"]}

assert "SIMONS_ACT_GRAVITY_COSMIC_SCALE_TEST_SOURCE" in sources
assert "ICTP_SAIFR_CLASSICAL_GRAVITY_PRIZE_2026_SOURCE" in sources
assert "GEOMGRAVX_2026_EXTENDED_GRAVITY_VENUE_SOURCE" in sources

simons = sources["SIMONS_ACT_GRAVITY_COSMIC_SCALE_TEST_SOURCE"]
assert simons["claim_status"] == "observational_support_source_only_not_gravity_solution"
assert simons["reported_surface"]["instrument"] == "Atacama Cosmology Telescope"
assert simons["next_required_object"] == "PRIMARY_ACT_GRAVITY_TEST_PAPER_AND_DATA_PIPELINE_AUDIT"

ictp = sources["ICTP_SAIFR_CLASSICAL_GRAVITY_PRIZE_2026_SOURCE"]
assert ictp["claim_status"] == "recognition_venue_source_only_not_validation"
assert ictp["reported_surface"]["scope"] == "classical_gravity_and_applications"
assert ictp["reported_surface"]["nomination_deadline"] == "2026-05-31"
assert ictp["next_required_object"] == "RELEVANT_CONTACT_OR_SUBMISSION_OPPORTUNITY_RECORD_SUPPLIED"

geomgravx = sources["GEOMGRAVX_2026_EXTENDED_GRAVITY_VENUE_SOURCE"]
assert geomgravx["claim_status"] == "expert_venue_source_only_not_evidence"
assert geomgravx["reported_surface"]["dates"] == "2026-06-29_to_2026-07-03"
assert geomgravx["reported_surface"]["venue"] == "Physicum, University of Tartu"
assert "dark_matter" in geomgravx["reported_surface"]["topics"]
assert "AI_in_gravity_research" in geomgravx["reported_surface"]["topics"]
assert geomgravx["next_required_object"] == "GEOMGRAVX_CONTACT_OR_ABSTRACT_RELEVANCE_RECORD_SUPPLIED"

bundle_next = set(data["bundle_next_required_objects"])
for item in [
    "PRIMARY_ACT_GRAVITY_TEST_PAPER_AND_DATA_PIPELINE_AUDIT",
    "RELEVANT_CONTACT_OR_SUBMISSION_OPPORTUNITY_RECORD_SUPPLIED",
    "GEOMGRAVX_CONTACT_OR_ABSTRACT_RELEVANCE_RECORD_SUPPLIED",
]:
    assert item in bundle_next

required = set(data["required_before_promotion"])
for item in [
    "PRIMARY_PAPER_REVIEWED",
    "PUBLIC_DATA_PIPELINE_REPRODUCED",
    "MODEL_COMPARISON_AUDIT_SUPPLIED",
    "INDEPENDENT_REPLICATION_SUPPLIED",
    "SYSTEMATICS_AUDIT_SUPPLIED",
    "COMMUNITY_FEEDBACK_RECORD_SUPPLIED",
]:
    assert item in required

boundary = "\n".join(data["boundary"])
for line in [
    "External source bundle only.",
    "No gravity solution is claimed.",
    "No modified-gravity refutation theorem is claimed.",
    "No dark matter detection is claimed.",
    "No dark matter particle identification is claimed.",
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
    "gravity solution",
    "modified-gravity refutation theorem",
    "dark matter detection",
    "dark matter particle identification",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "dark-energy resolution",
    "dark-matter resolution",
    "Euclid Q2 empirical claim",
    "any Clay problem",
]:
    assert forbidden in does_not_prove

print("Gravity external validation source bundle verification OK.")
print(f"Status: {data['status']}")
print("Next required objects:")
for item in data["bundle_next_required_objects"]:
    print(f"- {item}")
