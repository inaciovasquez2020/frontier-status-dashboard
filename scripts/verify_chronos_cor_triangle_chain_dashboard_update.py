#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATUS = ROOT / "data/status/chronos_cor_triangle_chain_2026_05_02.json"
DOC = ROOT / "docs/status/CHRONOS_COR_TRIANGLE_CHAIN_DASHBOARD_UPDATE_2026_05_02.md"

REQUIRED_JSON = {
    "id": "chronos-cor-triangle-chain-lean-frontier-2026-05-02",
    "repository": "chronos-urf-rr",
    "pull_request": 96,
    "commit_status": "merged_to_main",
    "artifact_type": "lean_theorem_frontier_skeleton",
    "status": "conditional_frontier"
}

REQUIRED_DOC = [
    "DASHBOARD STATUS UPDATE / CONDITIONAL FRONTIER",
    "PR #96",
    "13/13 successful",
    "443 passed",
    "Lake build: passed",
    "It does not prove finite-to-general lift.",
    "It does not prove locality-to-depth bridge.",
    "It does not prove theorem-level Chronos closure.",
    "It does not assert a Chronos closure theorem."
]

FORBIDDEN = [
    "finite-to-general lift is proved",
    "locality-to-depth bridge is proved",
    "theorem-level Chronos closure is proved",
    "Chronos closure theorem is proved",
    "P vs NP is solved"
]

def main() -> None:
    data = json.loads(STATUS.read_text())
    doc = DOC.read_text()

    mismatches = [
        key for key, value in REQUIRED_JSON.items()
        if data.get(key) != value
    ]
    if mismatches:
        raise SystemExit(f"status json mismatch: {mismatches}")

    missing_doc = [token for token in REQUIRED_DOC if token not in doc]
    if missing_doc:
        raise SystemExit(f"missing doc tokens: {missing_doc}")

    joined = json.dumps(data, sort_keys=True) + "\n" + doc
    forbidden = [token for token in FORBIDDEN if token in joined]
    if forbidden:
        raise SystemExit(f"forbidden overclaim tokens: {forbidden}")

    print("Chronos COR triangle-chain dashboard update verified.")

if __name__ == "__main__":
    main()
