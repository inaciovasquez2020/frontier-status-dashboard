#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/source_maps/top_ranked_source_theorem_extraction_packet_2026_05_22.json"
DOC = ROOT / "docs/status/TOP_RANKED_SOURCE_THEOREM_EXTRACTION_PACKET_2026_05_22.md"

REQUIRED_STATUS = "THEOREM_EXTRACTION_PACKET_ONLY_NO_GRAVITY_CLOSURE"
REQUIRED_TOP_SOURCE = "LARGE_D_BLACK_HOLE_EFFECTIVE_THEORY_SOURCE_MAP"
REQUIRED_NEXT = "FILLED_TOP_RANKED_SOURCE_THEOREM_EXTRACTION_PACKET"

REQUIRED_FIELDS = {
    "source_identifier",
    "source_locator",
    "theorem_or_result_name",
    "exact_statement_plaintext",
    "mathematical_assumptions",
    "dimension_regime",
    "symmetry_regime",
    "large_d_limit_policy",
    "finite_d_transfer_policy",
    "collapse_or_black_hole_quantity",
    "estimate_type",
    "error_terms",
    "constants_or_parameters",
    "boundary_conditions",
    "compatibility_with_restricted_collapse_gate",
    "blocking_gap_to_four_dimensional_non_symmetric_gravity",
}

FORBIDDEN_PROMOTIONS = {
    "gravity closure",
    "cosmic censorship",
    "hoop conjecture",
    "four-dimensional collapse theorem",
    "URF theorem promotion",
    "Chronos-RR",
    "H4.1/FGL",
    "P vs NP",
    "any Clay problem",
    "DFM-MKC validation",
    "Lambda-CDM failure",
    "dark matter resolution",
    "dark energy resolution",
    "empirical validation",
    "external theorem import",
}

def main() -> None:
    data = json.loads(ARTIFACT.read_text())
    doc = DOC.read_text()

    assert data["status"] == REQUIRED_STATUS
    assert data["top_ranked_source"] == REQUIRED_TOP_SOURCE
    assert data["next_admissible_object"] == REQUIRED_NEXT
    assert set(data["required_extracted_fields"]) == REQUIRED_FIELDS

    forbidden = set(data["forbidden_use"])
    missing = FORBIDDEN_PROMOTIONS - forbidden
    assert not missing, f"missing forbidden promotions: {sorted(missing)}"

    for token in [
        REQUIRED_STATUS,
        REQUIRED_TOP_SOURCE,
        REQUIRED_NEXT,
        "Does not prove:",
        "gravity closure",
        "cosmic censorship",
        "hoop conjecture",
        "four-dimensional collapse theorem",
        "P vs NP",
        "any Clay problem",
    ]:
        assert token in doc, token

    print("Top-ranked source theorem extraction packet verification OK.")
    print(f"Status: {data['status']}")
    print(f"Next admissible object: {data['next_admissible_object']}")

if __name__ == "__main__":
    main()
