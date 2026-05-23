#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/nuclear/nuclear_chern_topological_matter_source_map_2026_05_22.json"
DOC = ROOT / "docs/status/NUCLEAR_CHERN_TOPOLOGICAL_MATTER_SOURCE_MAP_2026_05_22.md"

EXPECTED_STATUS = "MODEL_SPECIFIC_TOPOLOGICAL_NUCLEAR_SOURCE_ONLY_NO_FRONTIER_PROMOTION"
EXPECTED_ID = "NUCLEAR_CHERN_TOPOLOGICAL_MATTER_SOURCE_MAP"
EXPECTED_NEXT = "NUCLEAR_CHERN_TOPOLOGICAL_MATTER_THEOREM_EXTRACTION_TARGET"

REQUIRED_DOES_NOT_PROVE = {
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "dark matter resolution",
    "dark energy resolution",
    "gravity closure",
    "Chronos-RR",
    "H4.1/FGL",
    "P vs NP",
    "any Clay problem",
    "nuclear theorem promotion inside URF",
}

REQUIRED_PROMOTION_BLOCKERS = {
    "exact theorem statement extracted from the paper",
    "explicit assumptions and domain of validity",
    "observable nuclear signatures",
    "map from Chern invariant to URF rigidity vocabulary",
    "independent verification or derivation record",
    "boundary audit preventing cross-domain overclaim",
}

def main() -> None:
    data = json.loads(ARTIFACT.read_text())
    doc = DOC.read_text()

    assert data["id"] == EXPECTED_ID
    assert data["status"] == EXPECTED_STATUS
    assert data["next_admissible_object"] == EXPECTED_NEXT

    source = data["source"]
    assert source["title"] == "Chern Theorem and Topological Matter in Fast-Rotating Atomic Nuclei"
    assert source["authors"] == ["Mike Guidry", "Yang Sun"]
    assert source["journal"] == "Physical Review Letters"
    assert source["volume"] == "136"
    assert source["issue"] == "6"
    assert source["article"] == "062502"
    assert source["publication_date"] == "2026-02-13"
    assert source["doi"] == "10.1103/lzdm-ng2k"
    assert source["aps_url"].endswith("/10.1103/lzdm-ng2k")
    assert source["doi_url"].endswith("/10.1103/lzdm-ng2k")
    assert "pubmed.ncbi.nlm.nih.gov/41765816" in source["pubmed_url"]

    assert data["urf_relevance"]["admissible_use"] == "source-map record only"
    assert REQUIRED_PROMOTION_BLOCKERS.issubset(set(data["required_before_promotion"]))
    assert REQUIRED_DOES_NOT_PROVE.issubset(set(data["does_not_prove"]))

    assert EXPECTED_STATUS in doc
    assert EXPECTED_NEXT in doc
    for blocked in REQUIRED_DOES_NOT_PROVE:
        assert blocked in doc

    print("Nuclear Chern topological matter source-map verification OK.")
    print(f"Status: {EXPECTED_STATUS}")
    print(f"Next admissible object: {EXPECTED_NEXT}")

if __name__ == "__main__":
    main()
