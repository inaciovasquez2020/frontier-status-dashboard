#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/gravity_dark_sector_theory_claim_boundary_packet_2026_05_22.json"
DOC = ROOT / "docs/status/GRAVITY_DARK_SECTOR_THEORY_CLAIM_BOUNDARY_PACKET_2026_05_22.md"

STATUS = "GRAVITY_DARK_SECTOR_THEORY_CLAIM_BOUNDARY_PACKET_ONLY_NO_THEOREM_PROMOTION"

EXPECTED_SOURCE_KEYS = {
    "cqg_2026_pathology_unified_dark_sectors_modified_gr",
    "preprints_202601_2247_qict_complex_phase_dark_sector",
    "arxiv_2601_07361_strong_evidence_dark_sector_interactions",
    "ssrn_6209718_beyond_matter_ii_hcsa_dark_sector_claims",
}

EXPECTED_CLASSES = {
    "peer_reviewed_theory",
    "preprint",
    "ssrn_preprint",
}

EXPECTED_OBJECTS = {
    "no_overclaim_boundary",
    "dark_sector_model",
    "empirical_validation",
}

EXPECTED_BOUNDARIES = {
    "gravity closure",
    "modified gravity failure",
    "modified gravity success",
    "dark matter resolution",
    "dark energy resolution",
    "dark-sector empirical validation",
    "QICT validation",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "P vs NP",
    "any Clay problem",
}

def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)

def main() -> None:
    require(ARTIFACT.exists(), f"Missing artifact: {ARTIFACT}")
    require(DOC.exists(), f"Missing doc: {DOC}")

    data = json.loads(ARTIFACT.read_text(encoding="utf-8"))
    doc = DOC.read_text(encoding="utf-8")

    require(data["id"] == "GRAVITY_DARK_SECTOR_THEORY_CLAIM_BOUNDARY_PACKET", "Bad id")
    require(data["status"] == STATUS, "Bad status")
    require(data["verification_target"] == STATUS, "Bad verification target")
    require(set(data["does_not_prove"]) == EXPECTED_BOUNDARIES, "Bad boundary set")

    sources = data["sources"]
    require(len(sources) == 4, "Expected four sources")
    require({source["key"] for source in sources} == EXPECTED_SOURCE_KEYS, "Bad source key set")

    for source in sources:
        require(source["source_class"] in EXPECTED_CLASSES, f"Bad class: {source['key']}")
        require(source["internal_object"] in EXPECTED_OBJECTS, f"Bad object: {source['key']}")
        require(source["url"].startswith("https://"), f"Bad URL: {source['key']}")
        require(source["alignment"], f"Missing alignment: {source['key']}")
        require(source["claim_status"], f"Missing claim_status: {source['key']}")

    require(STATUS in doc, "Doc missing status")
    for boundary in EXPECTED_BOUNDARIES:
        require(boundary in doc, f"Doc missing boundary: {boundary}")

    print("Gravity dark-sector theory claim-boundary packet verification OK.")
    print(f"Status: {STATUS}")

if __name__ == "__main__":
    main()
