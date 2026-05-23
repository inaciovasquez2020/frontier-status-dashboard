#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/gravity_cosmology_2026_source_alignment_map_2026_05_22.json"
DOC = ROOT / "docs/status/GRAVITY_COSMOLOGY_2026_SOURCE_ALIGNMENT_MAP_2026_05_22.md"

EXPECTED_STATUS = "SOURCE_ALIGNMENT_ONLY_NO_THEOREM_PROMOTION"

EXPECTED_CLASSES = {
    "conference",
    "peer_reviewed_theory",
    "science_news_report",
    "preprint",
}

EXPECTED_INTERNAL_OBJECTS = {
    "gravity_stack",
    "DFM_MKC",
    "dark_sector_model",
    "empirical_validation",
    "no_overclaim_boundary",
}

EXPECTED_DOES_NOT_PROVE = {
    "dark matter resolution",
    "modified gravity failure",
    "DFM-MKC validation",
    "gravity closure",
    "Clay problem",
    "dark matter detection",
}

EXPECTED_SOURCE_KEYS = {
    "gravity2026_new_frontiers_in_cosmology",
    "open_system_approach_to_gravity_jhep_2026_241",
    "gravity_newton_einstein_cosmic_scales_news",
    "hot_dark_matter_origin_sciencedaily",
    "dark_matter_multiple_forms_astronomy_now",
    "minimal_dark_matter_cosmic_intensity_frontier_jhep_2026_177",
    "dark_matter_early_smbh_arxiv_2508_11846v2",
    "supercdms_snolab_detector_milestone_phys_org_2026_04_10",
}


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


def main() -> None:
    require(ARTIFACT.exists(), f"Missing artifact: {ARTIFACT}")
    require(DOC.exists(), f"Missing status doc: {DOC}")

    data = json.loads(ARTIFACT.read_text(encoding="utf-8"))
    doc = DOC.read_text(encoding="utf-8")

    require(data.get("id") == "GRAVITY_COSMOLOGY_2026_SOURCE_ALIGNMENT_MAP", "Bad artifact id")
    require(data.get("status") == EXPECTED_STATUS, "Bad status")
    require(data.get("verification_target") == EXPECTED_STATUS, "Bad verification target")

    require(set(data.get("allowed_source_classes", [])) == EXPECTED_CLASSES, "Bad allowed source classes")
    require(set(data.get("allowed_internal_objects", [])) == EXPECTED_INTERNAL_OBJECTS, "Bad allowed internal objects")
    require(set(data.get("does_not_prove", [])) == EXPECTED_DOES_NOT_PROVE, "Bad does_not_prove list")

    sources = data.get("sources")
    require(isinstance(sources, list), "sources must be a list")
    require(len(sources) == 8, "Expected exactly eight supplied sources")

    keys = {source.get("key") for source in sources}
    require(keys == EXPECTED_SOURCE_KEYS, "Source key set mismatch")

    for source in sources:
        require(source.get("source_class") in EXPECTED_CLASSES, f"Bad source_class for {source.get('key')}")
        require(source.get("internal_object") in EXPECTED_INTERNAL_OBJECTS, f"Bad internal_object for {source.get('key')}")
        require(source.get("url", "").startswith("https://"), f"Bad URL for {source.get('key')}")
        require(bool(source.get("alignment")), f"Missing alignment for {source.get('key')}")
        require(bool(source.get("claim_status")), f"Missing claim_status for {source.get('key')}")

    for forbidden_claim in EXPECTED_DOES_NOT_PROVE:
        require(forbidden_claim in doc, f"Missing doc boundary: {forbidden_claim}")

    require(EXPECTED_STATUS in doc, "Doc missing verification status")

    print("Gravity/cosmology 2026 source alignment map verification OK.")
    print(f"Status: {data['status']}")
    print("Does not prove:")
    for item in data["does_not_prove"]:
        print(f"- {item}")


if __name__ == "__main__":
    main()
