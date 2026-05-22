#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts" / "gravity" / "critical_collapse_spacetime_crystal_source_2026_05_22.json"

data = json.loads(ARTIFACT.read_text())

assert data["id"] == "CRITICAL_COLLAPSE_SPACETIME_CRYSTAL_SOURCE_2026_05_22"
assert data["status"] == "ANALYTIC_GRAVITY_SOURCE_ONLY_NO_THEOREM_PROMOTION"

sources = {source["id"]: source for source in data["sources"]}
assert "PHYSORG_CRITICAL_COLLAPSE_SPACETIME_CRYSTAL_SOURCE" in sources

source = sources["PHYSORG_CRITICAL_COLLAPSE_SPACETIME_CRYSTAL_SOURCE"]
assert source["claim_status"] == "analytic_critical_collapse_source_only"
assert source["next_required_object"] == "PRIMARY_PRL_CRITICAL_COLLAPSE_PAPER_REVIEW_AND_FORMAL_RELEVANCE_MAP"

surface = source["reported_surface"]
assert surface["public_report_date"] == "2026-05-21"
assert surface["phenomenon"] == "critical collapse"
assert surface["informal_descriptor"] == "spacetime crystal"
assert surface["method"] == "large_D_analytic_solution"
assert surface["journal"] == "Physical Review Letters"
assert surface["paper_title"] == "Analytic Discrete Self-Similar Solutions of Einstein-Klein-Gordon at Large D"
assert surface["doi"] == "10.1103/qgl5-5l3t"

bundle_next = set(data["bundle_next_required_objects"])
for item in [
    "PRIMARY_PRL_CRITICAL_COLLAPSE_PAPER_REVIEW_AND_FORMAL_RELEVANCE_MAP",
    "EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED",
    "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
]:
    assert item in bundle_next

required = set(data["required_before_promotion"])
for item in [
    "PRIMARY_PAPER_REVIEWED",
    "EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED",
    "LARGE_D_LIMIT_ROLE_AUDITED",
    "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
    "CONNECTION_TO_CHRONOS_GRAVITY_STACK_FORMALIZED",
    "INDEPENDENT_EXPERT_REVIEW_OR_REPLICATION_SUPPLIED",
]:
    assert item in required

boundary = "\n".join(data["boundary"])
for line in [
    "Analytic gravity source only.",
    "No gravity solution is claimed.",
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

print("Critical collapse spacetime-crystal source verification OK.")
print(f"Status: {data['status']}")
print("Next required objects:")
for item in data["bundle_next_required_objects"]:
    print(f"- {item}")
