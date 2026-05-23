#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/source_maps/source_map_priority_matrix_2026_05_22.json"
DOC = ROOT / "docs/status/SOURCE_MAP_PRIORITY_MATRIX_2026_05_22.md"

EXPECTED_ID = "SOURCE_MAP_PRIORITY_MATRIX_2026_05_22"
EXPECTED_STATUS = "SOURCE_MAP_PRIORITY_MATRIX_ONLY_NO_THEOREM_PROMOTION"
EXPECTED_NEXT = "TOP_RANKED_SOURCE_THEOREM_EXTRACTION_PACKET"

EXPECTED_ORDER = [
    "LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP",
    "HIERARCHICAL_BLACK_HOLE_MERGER_MASS_GAP_SOURCE_MAP",
    "SUPER_METRIC_FIXED_POINT_THEOREMS_SOURCE_MAP",
    "MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD_SOURCE_MAP",
    "NUCLEAR_CHERN_TOPOLOGICAL_MATTER_SOURCE_MAP",
]

EXPECTED_PRIORITY_CLASSES = {
    "HIGH_THEOREM_EXTRACTION_VALUE",
    "MEDIUM_EMPIRICAL_SOURCE_VALUE",
    "MEDIUM_VOCABULARY_EXTRACTION_VALUE",
    "WATCHLIST_ONLY",
    "LOW_TO_MEDIUM_UNIFICATION_MOTIF_VALUE",
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
    "dark matter resolution",
    "dark energy resolution",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "empirical validation",
    "external source theorem import",
}

def main() -> None:
    data = json.loads(ARTIFACT.read_text())
    doc = DOC.read_text()

    assert data["id"] == EXPECTED_ID
    assert data["status"] == EXPECTED_STATUS
    assert data["next_admissible_object"] == EXPECTED_NEXT

    entries = data["entries"]
    assert len(entries) == 5
    assert [entry["rank"] for entry in entries] == [1, 2, 3, 4, 5]
    assert [entry["source_map_id"] for entry in entries] == EXPECTED_ORDER
    assert {entry["priority_class"] for entry in entries} == EXPECTED_PRIORITY_CLASSES

    for entry in entries:
        assert entry["next_admissible_object"]
        assert entry["promotion_blocker"]
        assert entry["usefulness"]

    assert REQUIRED_BLOCKED.issubset(set(data["does_not_prove"]))

    assert EXPECTED_STATUS in doc
    assert EXPECTED_NEXT in doc
    for source_map_id in EXPECTED_ORDER:
        assert source_map_id in doc
    for blocked in REQUIRED_BLOCKED:
        assert blocked in doc

    print("Source-map priority matrix verification OK.")
    print(f"Status: {EXPECTED_STATUS}")
    print(f"Next admissible object: {EXPECTED_NEXT}")

if __name__ == "__main__":
    main()
