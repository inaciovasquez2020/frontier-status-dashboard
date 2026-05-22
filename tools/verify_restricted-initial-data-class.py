#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted-initial-data-class_2026_05_22.json"

REQUIRED_BOUNDARIES = [
    "does not prove unrestricted gravity closure",
    "does not prove unrestricted cosmic censorship",
    "does not prove unrestricted hoop conjecture",
    "does not prove four-dimensional non-symmetric collapse theorem",
    "does not prove Chronos gravity stack closure",
    "does not prove any Clay problem",
]

def main() -> None:
    data = json.loads(ARTIFACT.read_text())

    assert data["id"] == "RESTRICTED_INITIAL_DATA_CLASS"
    assert data["status"] == "INITIAL_DATA_CLASS_SUPPLIED_RESTRICTED_ONLY"
    assert data["supplied_object"] == "RESTRICTED_INITIAL_DATA_CLASS"
    assert data["weakest_sufficient_next_object"] == "RESTRICTED_ENERGY_CONDITION_PRESERVATION_PROOF"
    assert data["object_kind"] == "restricted_initial_data_class"

    boundary = "\n".join(data["boundary"])
    does_not_prove = "\n".join(data["does_not_prove"])

    for token in REQUIRED_BOUNDARIES:
        assert token in boundary

    for token in [
        "unrestricted gravity closure",
        "unrestricted cosmic censorship",
        "unrestricted hoop conjecture",
        "four-dimensional non-symmetric collapse theorem",
        "Chronos gravity stack closure",
        "any Clay problem",
    ]:
        assert token in does_not_prove

    print("restricted initial data class verification OK.")
    print("Status: INITIAL_DATA_CLASS_SUPPLIED_RESTRICTED_ONLY")
    print("Weakest sufficient next object: RESTRICTED_ENERGY_CONDITION_PRESERVATION_PROOF")

if __name__ == "__main__":
    main()
