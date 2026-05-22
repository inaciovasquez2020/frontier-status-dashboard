#!/usr/bin/env python3
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts" / "gravity" / "einstein_klein_gordon_assumptions_extracted_2026_05_22.json"
data = json.loads(ARTIFACT.read_text())
assert data["id"] == "EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED_2026_05_22"
assert data["status"] == "ASSUMPTION_EXTRACTION_SURFACE_ONLY_NO_FORMAL_PROMOTION"
source = data["source"]
assert source["title"] == "Analytic Discrete Self-Similar Solutions of Einstein-Klein-Gordon at Large D"
assert source["arxiv"] == "2601.14358"
assert source["doi"] == "10.1103/qgl5-5l3t"
assert source["journal"] == "Physical Review Letters"
assumptions = data["extracted_assumptions"]
assert assumptions["gravitational_system"] == "spherically_symmetric_Einstein_gravity"
assert assumptions["spacetime_dimension"] == "D_spacetime_dimensions"
assert assumptions["matter_field"] == "massless_scalar_field"
assert assumptions["coupling"] == "minimal_coupling"
assert assumptions["field_symbol"] == "psi"
assert assumptions["solution_class"] == "discrete_self_similar_solutions"
assert assumptions["collapse_regime"] == "critical_gravitational_collapse"
assert assumptions["method"] == "large_D_expansion"
assert assumptions["reported_solution_family"] == "closed_analytic_infinite_family"
assert assumptions["comparison_surface"] == "finite_D_numerical_critical_solutions"
names = {row["name"] for row in data["assumption_table"]}
assert "spherical_symmetry" in names
assert "D_spacetime_dimensions" in names
assert "massless_scalar_field" in names
assert "minimal_coupling" in names
assert "discrete_self_similarity" in names
assert "large_D_expansion" in names
assert data["resolved_from_previous_next_required_object"] == "EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED"
assert data["remaining_next_required_objects"] == ["FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED"]
required = set(data["required_before_promotion"])
assert "FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED" in required
assert "LARGE_D_LIMIT_ERROR_OR_TRANSFER_AUDIT_SUPPLIED" in required
assert "CONNECTION_TO_CHRONOS_GRAVITY_STACK_FORMALIZED" in required
assert "INDEPENDENT_EXPERT_REVIEW_OR_REPLICATION_SUPPLIED" in required
boundary = "\n".join(data["boundary"])
assert "Assumption extraction surface only." in boundary
assert "No theorem promotion is claimed." in boundary
assert "No gravity solution is claimed." in boundary
assert "No unrestricted non-symmetric collapse theorem is claimed." in boundary
assert "No four-dimensional collapse theorem is claimed." in boundary
assert "No black-hole production claim is made." in boundary
assert "No primordial-black-hole abundance claim is made." in boundary
assert "No dark matter detection is claimed." in boundary
assert "No DFM-MKC validation is claimed." in boundary
assert "No Lambda-CDM failure is claimed." in boundary
assert "No Euclid Q2 empirical claim is made." in boundary
assert "No Clay problem is claimed." in boundary
does_not_prove = set(data["does_not_prove"])
assert "gravity solution" in does_not_prove
assert "unrestricted non-symmetric collapse theorem" in does_not_prove
assert "four-dimensional collapse theorem" in does_not_prove
assert "black-hole production" in does_not_prove
assert "primordial-black-hole abundance" in does_not_prove
assert "dark matter detection" in does_not_prove
assert "DFM-MKC validation" in does_not_prove
assert "Lambda-CDM failure" in does_not_prove
assert "any Clay problem" in does_not_prove
print("Einstein-Klein-Gordon assumptions extraction verification OK.")
print(f"Status: {data['status']}")
print("Remaining next required objects:")
print("- FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED")
