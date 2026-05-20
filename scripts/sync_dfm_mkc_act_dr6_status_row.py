#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
STATUS_DATA = ROOT / "src/data/status-data.json"
ARTIFACT = ROOT / "artifacts/dashboard/dfm_mkc_act_dr6_holdout_status_2026_05_20.json"
DOC = ROOT / "docs/status/DFM_MKC_ACT_DR6_HOLDOUT_STATUS_DASHBOARD_SYNC_2026_05_20.md"

ROW_ID = "dfm-mkc-act-dr6-holdout-status-2026-05-20"

ROW = {
    "id": ROW_ID,
    "name": "DFM-MKC ACT DR6 holdout status",
    "title": "DFM-MKC ACT DR6 holdout status",
    "domain": "Cosmology / status",
    "repo": "frontier-status-dashboard",
    "repository": "inaciovasquez2020/frontier-status-dashboard",
    "url": "https://github.com/inaciovasquez2020/frontier-status-dashboard",
    "status": "POSTHOC_LOCAL_ONLY + INDEPENDENT_HOLDOUT_OPEN",
    "classification": "POSTHOC_LOCAL_ONLY_INDEPENDENT_HOLDOUT_OPEN",
    "summary": "DFM-MKC remains post-hoc local only while the ACT DR6 independent holdout route remains open.",
    "boundary": "No ACT DR6 likelihood run, no prediction vector/hash, no Lambda-CDM comparison, no superiority claim.",
    "integrity": 100,
    "theoremClosure": 0,
    "ci": "green",
    "excludeFromMetrics": True,
    "closureScaleMetricApplicable": False,
    "theoremMetricApplicable": False,
    "metadataOnly": False,
    "theoremPromotion": False,
    "theoremLevel": False,
    "isTheorem": False,
    "percent": None,
    "proofPercent": None,
    "updated": "2026-05-20",
    "source": "DFM_MKC_ACT_DR6_HOLDOUT_STATUS_DASHBOARD_SYNC_2026_05_20",
    "doesNotProve": [
        "DFM-MKC",
        "Lambda-CDM failure",
        "mathematical superiority of DFM-MKC",
        "final cosmology closure",
        "dark-energy resolution",
        "dark-matter resolution",
        "Nobel-level physical discovery",
        "any Clay problem",
    ],
}

ARTIFACT_DATA = {
    "artifact": "DFM_MKC_ACT_DR6_HOLDOUT_STATUS_DASHBOARD_SYNC_2026_05_20",
    "dashboard_row": ROW,
    "boundary_preserved": True,
    "public_private_policy": {
        "private_repository_name_exposed": False,
        "public_url_is_github": True,
        "excluded_from_metrics": True,
        "numeric_metric_fields_present": True,
    },
}

DOC_TEXT = """# DFM-MKC ACT DR6 Holdout Status Dashboard Sync

Status: `POSTHOC_LOCAL_ONLY + INDEPENDENT_HOLDOUT_OPEN`

Public dashboard row: `DFM-MKC ACT DR6 holdout status`

## Dashboard row meaning

DFM-MKC remains classified as post-hoc local only.

The ACT DR6 independent holdout route remains open.

## Public/private policy

The dashboard row is owned by the public dashboard repository.

No private or non-public repository name is exposed.

The row is excluded from dashboard metrics.

The row has numeric metric fields to preserve aggregate invariants.

## Boundary

No ACT DR6 likelihood is run.

No ACT DR6 prediction vector is produced.

No ACT DR6 prediction hash is produced.

No Lambda-CDM comparison is performed.

No superiority claim is made.

## Does not prove

- DFM-MKC
- Lambda-CDM failure
- mathematical superiority of DFM-MKC
- final cosmology closure
- dark-energy resolution
- dark-matter resolution
- Nobel-level physical discovery
- any Clay problem
"""

def find_rows_container(data: Any) -> list[Any]:
    if isinstance(data, list):
        return data

    if not isinstance(data, dict):
        raise TypeError("status-data.json must be a JSON object or array")

    for key in ["rows", "statusRows", "statuses", "items", "data", "projects", "claims", "entries"]:
        value = data.get(key)
        if isinstance(value, list):
            return value

    for value in data.values():
        if isinstance(value, list) and all(isinstance(item, dict) for item in value):
            return value

    data["rows"] = []
    return data["rows"]

def main() -> None:
    data = json.loads(STATUS_DATA.read_text())
    rows = find_rows_container(data)

    rows[:] = [
        row for row in rows
        if not (isinstance(row, dict) and row.get("id") == ROW_ID)
    ]
    rows.append(dict(ROW))

    serialized = json.dumps(data, indent=2, sort_keys=False) + "\n"
    if "flagship-lean" in serialized:
        raise AssertionError("private/non-public repository name leaked into status-data.json")

    STATUS_DATA.write_text(serialized)
    ARTIFACT.write_text(json.dumps(ARTIFACT_DATA, indent=2, sort_keys=True) + "\n")
    DOC.write_text(DOC_TEXT)

    print("DFM-MKC ACT DR6 dashboard status row synced.")
    print(f"Status: {ROW['status']}")

if __name__ == "__main__":
    main()
