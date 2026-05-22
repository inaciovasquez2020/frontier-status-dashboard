#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/restricted-collapse-gate-theorem-proof-object_2026_05_22.json"

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

    assert data["id"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT"
    assert data["status"] == "RESTRICTED_THEOREM_PROOF_OBJECT_RECORDED_NO_UNRESTRICTED_PROMOTION"
    assert data["supplied_object"] == "RESTRICTED_COLLAPSE_GATE_THEOREM_PROOF_OBJECT"
    assert data["weakest_sufficient_next_object"] == "No admissible next step."
    assert data["object_kind"] == "restricted_theorem_proof_object"

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

    print("restricted collapse-gate theorem proof object verification OK.")
    print("Status: RESTRICTED_THEOREM_PROOF_OBJECT_RECORDED_NO_UNRESTRICTED_PROMOTION")
    print("Weakest sufficient next object: No admissible next step.")

if __name__ == "__main__":
    main()
