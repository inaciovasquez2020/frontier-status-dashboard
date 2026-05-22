#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/gravity_hoop_censorship_dark_sector_source_packet_2026_05_22.json"
DOC = ROOT / "docs/status/GRAVITY_HOOP_CENSORSHIP_DARK_SECTOR_SOURCE_PACKET_2026_05_22.md"

STATUS = "GRAVITY_HOOP_CENSORSHIP_DARK_SECTOR_SOURCE_PACKET_ONLY_NO_THEOREM_PROMOTION"

EXPECTED_SOURCE_KEYS = {
    "epjc_2025_nonexistence_unified_hoop_conjecture",
    "prd_1998_hoop_conjecture_colliding_black_holes",
    "analog_charged_black_hole_percolation_cosmic_censorship_hoop",
    "arxiv_2604_21671_saturation_interacting_dark_sector",
    "epjc_2026_matter_creation_to_dark_sector_interactions",
}

EXPECTED_CLASSES = {
    "peer_reviewed_theory",
    "preprint_repository_record",
    "preprint",
}

EXPECTED_OBJECTS = {
    "gravity_stack",
    "dark_sector_model",
    "no_overclaim_boundary",
}

EXPECTED_BOUNDARIES = {
    "gravity closure",
    "unrestricted cosmic censorship",
    "hoop conjecture",
    "dark matter resolution",
    "modified gravity failure",
    "DFM-MKC validation",
    "dark-sector empirical validation",
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

    require(data["id"] == "GRAVITY_HOOP_CENSORSHIP_DARK_SECTOR_SOURCE_PACKET", "Bad id")
    require(data["status"] == STATUS, "Bad status")
    require(data["verification_target"] == STATUS, "Bad verification target")
    require(set(data["does_not_prove"]) == EXPECTED_BOUNDARIES, "Bad boundary set")

    sources = data["sources"]
    require(len(sources) == 5, "Expected five sources")
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

    print("Gravity hoop/censorship/dark-sector source packet verification OK.")
    print(f"Status: {STATUS}")

if __name__ == "__main__":
    main()
