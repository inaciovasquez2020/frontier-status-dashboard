#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/source_maps/source_map_evidence_boundary_matrix_2026_05_22.json"
DOC = ROOT / "docs/status/SOURCE_MAP_EVIDENCE_BOUNDARY_MATRIX_2026_05_22.md"

EXPECTED_ID = "SOURCE_MAP_EVIDENCE_BOUNDARY_MATRIX_2026_05_22"
EXPECTED_STATUS = "SOURCE_LEVEL_EVIDENCE_MATRIX_ONLY_NO_THEOREM_OR_EMPIRICAL_CLAIM_PROMOTION"
EXPECTED_NEXT = "TOP_RANKED_SOURCE_THEOREM_EXTRACTION_PACKET"

EXPECTED_SOURCE_MAPS = {
    "LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP",
    "HIERARCHICAL_BLACK_HOLE_MERGER_MASS_GAP_SOURCE_MAP",
    "SUPER_METRIC_FIXED_POINT_THEOREMS_SOURCE_MAP",
    "MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD_SOURCE_MAP",
    "NUCLEAR_CHERN_TOPOLOGICAL_MATTER_SOURCE_MAP",
    "SOURCE_MAP_PRIORITY_MATRIX_2026_05_22",
}

EXPECTED_CLASSES = {
    "TECHNICAL_THEORY_RELEVANCE_EVIDENCE",
    "EMPIRICAL_ASTROPHYSICS_RELEVANCE_EVIDENCE",
    "MATHEMATICAL_VOCABULARY_RELEVANCE_EVIDENCE",
    "WATCHLIST_AND_DISCOVERY_RELEVANCE_EVIDENCE",
    "UNIFICATION_MOTIF_RELEVANCE_EVIDENCE",
    "RESEARCH_PIPELINE_MATURITY_EVIDENCE",
}

REQUIRED_ALLOWED = {
    "evidence of external relevance",
    "evidence of vocabulary alignment",
    "evidence of source coverage",
    "evidence of extraction priority",
    "evidence of frontier-planning maturity",
}

REQUIRED_FORBIDDEN = {
    "proof of URF theorem",
    "proof of Chronos-RR",
    "proof of H4.1/FGL",
    "proof of P vs NP",
    "proof of any Clay problem",
    "proof of gravity closure",
    "proof of DFM-MKC validation",
    "proof of Lambda-CDM failure",
    "proof of dark matter resolution",
    "proof of dark energy resolution",
    "empirical validation without executed likelihood or primary-data analysis",
    "external theorem import without exact theorem extraction",
}

REQUIRED_BLOCKED = {
    "URF theorem promotion",
    "Chronos-RR",
    "H4.1/FGL",
    "P vs NP",
    "any Clay problem",
    "gravity closure",
    "cosmic censorship",
    "hoop conjecture",
    "four-dimensional collapse theorem",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "dark matter resolution",
    "dark energy resolution",
    "empirical validation",
    "external source theorem import",
}

def main() -> None:
    data = json.loads(ARTIFACT.read_text())
    doc = DOC.read_text()

    assert data["id"] == EXPECTED_ID
    assert data["status"] == EXPECTED_STATUS
    assert data["next_admissible_object"] == EXPECTED_NEXT

    assert REQUIRED_ALLOWED.issubset(set(data["evidence_policy"]["allowed_evidence_use"]))
    assert REQUIRED_FORBIDDEN.issubset(set(data["evidence_policy"]["forbidden_evidence_use"]))

    entries = data["evidence_entries"]
    assert len(entries) == 6
    assert {entry["source_map_id"] for entry in entries} == EXPECTED_SOURCE_MAPS
    assert {entry["evidence_class"] for entry in entries} == EXPECTED_CLASSES

    for entry in entries:
        assert entry["strength"]
        assert entry["admissible_claim"]
        assert entry["not_admissible_as"]
        assert entry["next_required_object"]

    assert REQUIRED_BLOCKED.issubset(set(data["does_not_prove"]))
    assert "source-level evidence" in data["aggregate_admissible_claim"]
    assert "does not provide proof-level evidence" in data["aggregate_forbidden_claim"]

    assert EXPECTED_STATUS in doc
    assert EXPECTED_NEXT in doc
    for source_map_id in EXPECTED_SOURCE_MAPS:
        assert source_map_id in doc
    for blocked in REQUIRED_BLOCKED:
        assert blocked in doc
    for forbidden in REQUIRED_FORBIDDEN:
        assert forbidden in doc

    print("Source-map evidence boundary matrix verification OK.")
    print(f"Status: {EXPECTED_STATUS}")
    print(f"Next admissible object: {EXPECTED_NEXT}")

if __name__ == "__main__":
    main()
