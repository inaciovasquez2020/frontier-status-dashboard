#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/mathoverflow/mathoverflow_great_theorems_2026_onward_source_map_2026_05_22.json"
DOC = ROOT / "docs/status/MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD_SOURCE_MAP_2026_05_22.md"

EXPECTED_ID = "MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD_SOURCE_MAP"
EXPECTED_STATUS = "REFERENCE_LIST_SOURCE_ONLY_NO_THEOREM_PROMOTION"
EXPECTED_NEXT = "SPECIFIC_THEOREM_EXTRACTION_TARGET_FROM_MATHOVERFLOW_GREAT_THEOREMS_2026_ONWARD"

REQUIRED_DOES_NOT_PROVE = {
    "any theorem listed on the MathOverflow page",
    "URF theorem promotion",
    "Chronos-RR",
    "H4.1/FGL",
    "P vs NP",
    "any Clay problem",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "dark matter resolution",
    "dark energy resolution",
    "gravity closure",
}

REQUIRED_PROMOTION_BLOCKERS = {
    "choose one specific theorem from the page",
    "verify the primary source independently",
    "extract exact theorem statement",
    "extract assumptions and domain of validity",
    "classify the theorem elementary statement complexity",
    "map theorem structure into URF vocabulary",
    "add no-overclaim boundary audit",
}

def main() -> None:
    data = json.loads(ARTIFACT.read_text())
    doc = DOC.read_text()

    assert data["id"] == EXPECTED_ID
    assert data["status"] == EXPECTED_STATUS
    assert data["next_admissible_object"] == EXPECTED_NEXT

    source = data["source"]
    assert source["title"] == "Great theorems with elementary statements: 2026-onward"
    assert source["platform"] == "MathOverflow"
    assert source["url"].endswith("/questions/503460/great-theorems-with-elementary-statements-2026-onward")
    assert source["post_type"] == "reference-request / soft-question / big-list"
    assert source["page_status"] == "closed"
    assert source["accepting_answers"] is False

    assert data["urf_relevance"]["admissible_use"] == "source-map record only"
    assert REQUIRED_PROMOTION_BLOCKERS.issubset(set(data["required_before_promotion"]))
    assert REQUIRED_DOES_NOT_PROVE.issubset(set(data["does_not_prove"]))

    assert EXPECTED_STATUS in doc
    assert EXPECTED_NEXT in doc
    for blocked in REQUIRED_DOES_NOT_PROVE:
        assert blocked in doc

    print("MathOverflow great-theorems 2026-onward source-map verification OK.")
    print(f"Status: {EXPECTED_STATUS}")
    print(f"Next admissible object: {EXPECTED_NEXT}")

if __name__ == "__main__":
    main()
