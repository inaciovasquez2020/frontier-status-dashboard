#!/usr/bin/env python3
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts" / "gravity" / "gravity_source_map_integration_matrix_2026_05_22.json"
data = json.loads(ARTIFACT.read_text())
assert data["id"] == "GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX_2026_05_22"
assert data["status"] == "SOURCE_MAP_INTEGRATION_MATRIX_ONLY_NO_GRAVITY_CLOSURE"
assert data["closed_object"] == "GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX"
assert data["weakest_sufficient_next_object"] == "CHRONOS_GRAVITY_STACK_BINDING_MAP"
integrated = set(data["integrates_source_maps"])
assert {
"FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED_2026_05_22",
"KERR_DESITTER_WCCC_SOURCE_MAP_2026_05_22",
"PBH_SLOW_FOPT_SOURCE_MAP_2026_05_22",
}.issubset(integrated)
rows = data["integration_matrix"]
assert len(rows) == 3
source_objects = {row["source_object"] for row in rows}
assert {
"FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
"MODEL_SPECIFIC_WCCC_HORIZON_ROBUSTNESS_SOURCE",
"MODEL_SPECIFIC_PBH_SLOW_FOPT_FORMATION_SOURCE",
}.issubset(source_objects)
all_blockers = {item for row in rows for item in row["frontier_blockers"]}
assert {
"CHRONOS_GRAVITY_STACK_BINDING_MAP",
"MODEL_SPECIFIC_QKDS_WCCC_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP",
"MODEL_SPECIFIC_PBH_SLOW_FOPT_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP",
"LARGE_D_TO_D4_ERROR_CONTROL_OR_TRANSFER_THEOREM",
"NONSPHERICAL_STABILITY_OR_EXTENSION_THEOREM",
"GENERAL_MATTER_TRANSFER_MAP",
"SIX_FIELD_ANALYTIC_PACKAGE_HYPOTHESIS",
}.issubset(all_blockers)
remaining = set(data["remaining_next_required_objects"])
assert {
"CHRONOS_GRAVITY_STACK_BINDING_MAP",
"MODEL_SPECIFIC_QKDS_WCCC_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP",
"MODEL_SPECIFIC_PBH_SLOW_FOPT_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP",
"LARGE_D_TO_D4_ERROR_CONTROL_OR_TRANSFER_THEOREM",
"NONSPHERICAL_STABILITY_OR_EXTENSION_THEOREM",
"GENERAL_MATTER_TRANSFER_MAP",
"SIX_FIELD_ANALYTIC_PACKAGE_HYPOTHESIS",
}.issubset(remaining)
boundary = "\n".join(data["boundary"])
assert "Gravity source-map integration matrix only." in boundary
assert "No gravity closure is claimed." in boundary
assert "No Chronos gravity stack binding map is claimed." in boundary
assert "No four-dimensional collapse theorem is claimed." in boundary
assert "No unrestricted non-symmetric collapse theorem is claimed." in boundary
assert "No unrestricted cosmic censorship theorem is claimed." in boundary
assert "No hoop conjecture result is claimed." in boundary
assert "No unrestricted primordial black hole formation theorem is claimed." in boundary
assert "No dark matter detection is claimed." in boundary
assert "No dark matter resolution is claimed." in boundary
assert "No DFM-MKC validation is claimed." in boundary
assert "No Lambda-CDM failure is claimed." in boundary
assert "No empirical validation is claimed." in boundary
assert "No Clay problem is claimed." in boundary
does_not_prove = set(data["does_not_prove"])
assert {
"gravity closure",
"Chronos gravity stack binding map",
"four-dimensional collapse theorem",
"unrestricted non-symmetric collapse theorem",
"unrestricted cosmic censorship",
"hoop conjecture",
"unrestricted primordial black hole formation theorem",
"dark matter detection",
"dark matter resolution",
"DFM-MKC validation",
"Lambda-CDM failure",
"empirical validation",
"any Clay problem",
}.issubset(does_not_prove)
print("Gravity source-map integration matrix verification OK.")
print(f"Status: {data['status']}")
print(f"Weakest sufficient next object: {data['weakest_sufficient_next_object']}")
