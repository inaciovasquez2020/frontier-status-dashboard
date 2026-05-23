#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

OBJECTS = [
    {
        "path": ROOT / "artifacts/math/super_metric_fixed_point_theorems_source_map_2026_05_22.json",
        "doc": ROOT / "docs/status/SUPER_METRIC_FIXED_POINT_THEOREMS_SOURCE_MAP_2026_05_22.md",
        "id": "SUPER_METRIC_FIXED_POINT_THEOREMS_SOURCE_MAP",
        "status": "MODEL_SPECIFIC_FIXED_POINT_SOURCE_ONLY_NO_FRONTIER_PROMOTION",
        "next": "SUPER_METRIC_FIXED_POINT_THEOREM_EXTRACTION_TARGET",
        "blocked": {
            "URF fixed-point theorem",
            "Chronos-RR",
            "H4.1/FGL",
            "P vs NP",
            "any Clay problem",
            "gravity closure",
            "DFM-MKC validation",
            "Lambda-CDM failure",
        },
    },
    {
        "path": ROOT / "artifacts/gravity/hierarchical_black_hole_merger_mass_gap_source_map_2026_05_22.json",
        "doc": ROOT / "docs/status/HIERARCHICAL_BLACK_HOLE_MERGER_MASS_GAP_SOURCE_MAP_2026_05_22.md",
        "id": "HIERARCHICAL_BLACK_HOLE_MERGER_MASS_GAP_SOURCE_MAP",
        "status": "MODEL_SPECIFIC_GRAVITATIONAL_WAVE_SOURCE_ONLY_NO_GRAVITY_CLOSURE",
        "next": "HIERARCHICAL_BLACK_HOLE_MERGER_PRIMARY_PAPER_EXTRACTION_TARGET",
        "blocked": {
            "gravity closure",
            "black-hole formation theorem",
            "cosmic censorship",
            "hoop conjecture",
            "dark matter resolution",
            "dark energy resolution",
            "DFM-MKC validation",
            "Lambda-CDM failure",
            "Chronos-RR",
            "H4.1/FGL",
            "P vs NP",
            "any Clay problem",
        },
    },
    {
        "path": ROOT / "artifacts/gravity/large_d_black_hole_effective_theory_source_map_2026_05_22.json",
        "doc": ROOT / "docs/status/LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP_2026_05_22.md",
        "id": "LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP",
        "status": "MODEL_SPECIFIC_LARGE_D_BLACK_HOLE_EFT_SOURCE_ONLY_NO_GRAVITY_CLOSURE",
        "next": "LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_EXTRACTION_TARGET",
        "blocked": {
            "unrestricted black-hole dynamics",
            "gravity closure",
            "cosmic censorship",
            "hoop conjecture",
            "four-dimensional collapse theorem",
            "DFM-MKC validation",
            "Lambda-CDM failure",
            "dark matter resolution",
            "dark energy resolution",
            "Chronos-RR",
            "H4.1/FGL",
            "P vs NP",
            "any Clay problem",
        },
    },
]

def main() -> None:
    for obj in OBJECTS:
        data = json.loads(obj["path"].read_text())
        doc = obj["doc"].read_text()

        assert data["id"] == obj["id"]
        assert data["status"] == obj["status"]
        assert data["next_admissible_object"] == obj["next"]
        assert data["urf_relevance"]["admissible_use"] == "source-map record only"
        assert obj["blocked"].issubset(set(data["does_not_prove"]))

        assert obj["status"] in doc
        assert obj["next"] in doc
        for blocked in obj["blocked"]:
            assert blocked in doc

    print("Three math/gravity source-map verification OK.")
    for obj in OBJECTS:
        print(f"{obj['id']}: {obj['status']}")

if __name__ == "__main__":
    main()
