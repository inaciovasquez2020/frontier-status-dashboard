#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts" / "gravity" / "critical_collapse_primary_review_map_2026_05_22.json"

data = json.loads(ARTIFACT.read_text())

assert data["id"] == "CRITICAL_COLLAPSE_PRIMARY_REVIEW_MAP_2026_05_22"
assert data["status"] == "PRIMARY_REVIEW_MAP_SURFACE_ONLY_NO_FORMAL_PROMOTION"

source = data["source"]
assert source["title"] == "Analytic Discrete Self-Similar Solutions of Einstein-Klein-Gordon at Large D"
assert source["arxiv"] == "2601.14358"
assert source["doi"] == "10.1103/qgl5-5l3t"
assert source["journal"] == "Physical Review Letters"

review = data["review_surface"]
assert review["system"] == "Einstein-massless-Klein-Gordon"
assert review["phenomenon"] == "critical gravitational collapse"
assert review["solution_type"] == "discrete_self_similarity"
assert review["method"] == "large_D_expansion"
assert review["reported_output"] == "closed_analytic_infinite_family_of_solutions"

relevance = data["formal_relevance_map"]
assert relevance["chronos_gravity_stack_relevance"] == "ANALYTIC_COLLAPSE_MODEL_SOURCE_ONLY"
assert "critical_collapse" in relevance["possible_links"]
assert "Einstein_Klein_Gordon" in relevance["possible_links"]
assert "large_D_asymptotic_model" in relevance["possible_links"]
assert "four_dimensional_physical_collapse_theorem" in relevance["blocked_links"]
assert "cosmic_censorship" in relevance["blocked_links"]

assert data["resolved_from_previous_next_required_object"] == "PRIMARY_PRL_CRITICAL_COLLAPSE_PAPER_REVIEW_AND_FORMAL_RELEVANCE_MAP"

remaining = set(data["remaining_next_required_objects"])
for item in [
    "EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED",
    "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
]:
    assert item in remaining

required = set(data["required_before_promotion"])
for item in [
    "FULL_PAPER_LINE_BY_LINE_REVIEW_SUPPLIED",
    "EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED",
    "LARGE_D_LIMIT_ROLE_AUDITED",
    "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
    "CONNECTION_TO_CHRONOS_GRAVITY_STACK_FORMALIZED",
    "INDEPENDENT_EXPERT_REVIEW_OR_REPLICATION_SUPPLIED",
]:
    assert item in required

boundary = "\n".join(data["boundary"])
for line in [
    "Primary review map surface only.",
    "No theorem promotion is claimed.",
    "No gravity solution is claimed.",
    "No four-dimensional collapse theorem is claimed.",
    "No black-hole production claim is made.",
    "No primordial-black-hole abundance claim is made.",
    "No dark matter detection is claimed.",
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
    "four-dimensional collapse theorem",
    "black-hole production",
    "primordial-black-hole abundance",
    "dark matter detection",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "dark-energy resolution",
    "dark-matter resolution",
    "Euclid Q2 empirical claim",
    "any Clay problem",
]:
    assert forbidden in does_not_prove

print("Critical collapse primary review map verification OK.")
print(f"Status: {data['status']}")
print("Remaining next required objects:")
for item in data["remaining_next_required_objects"]:
    print(f"- {item}")
