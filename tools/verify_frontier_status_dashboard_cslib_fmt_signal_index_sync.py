#!/usr/bin/env python3
from pathlib import Path
import json

artifact_path = Path("artifacts/frontier_status_dashboard/cslib_fmt_signal_dashboard_index_sync_2026_06_21.json")
doc_path = Path("docs/status/FRONTIER_STATUS_DASHBOARD_CSLIB_FMT_SIGNAL_INDEX_SYNC_2026_06_21.md")

data = json.loads(artifact_path.read_text())
doc = doc_path.read_text()

assert data["status"] == "FRONTIER_STATUS_DASHBOARD_CSLIB_FMT_SIGNAL_INDEX_SYNC_2026_06_21"
assert data["dashboard_effect"] == "cross_repository_status_dashboard_sync_only"
assert len(data["source_updates"]) == 3

core = data["source_updates"][0]
textbook = data["source_updates"][1]
index = data["source_updates"][2]

assert core["repo"] == "urf-core"
assert core["commit"] == "857e954"
assert core["pr"] == 474
assert "CSLIB_FMT_FULL_FORMULA_RADIUS_EXTERNAL_STATUS_SIGNAL_OK" in core["statuses"]
assert "URF_CORE_FULL_PYTEST_BASELINE_BLOCKERS_OK" in core["statuses"]

assert textbook["repo"] == "urf-textbook"
assert textbook["commit"] == "d026cfe"
assert textbook["status"] == "URF_CORE_CSLIB_FMT_SIGNAL_TEXTBOOK_SYNC_OK"

assert index["repo"] == "vasquez-index"
assert index["commit"] == "61f4975"
assert index["status"] == "VASQUEZ_INDEX_URF_CORE_TEXTBOOK_CSLIB_FMT_SIGNAL_UPDATE_OK"

assert "dashboard synchronization only" in data["boundary"]
assert "no new theorem" in data["boundary"]
assert "no proof import" in data["boundary"]
assert "no URF-core repair" in data["boundary"]
assert "no CSLIB-FMT repair" in data["boundary"]

assert "Status: `FRONTIER_STATUS_DASHBOARD_CSLIB_FMT_SIGNAL_INDEX_SYNC_2026_06_21`" in doc
assert "commit `857e954`" in doc
assert "commit `d026cfe`" in doc
assert "commit `61f4975`" in doc
assert "CSLIB_FMT_FULL_FORMULA_RADIUS_EXTERNAL_STATUS_SIGNAL_OK" in doc
assert "URF_CORE_FULL_PYTEST_BASELINE_BLOCKERS_OK" in doc
assert "URF_CORE_CSLIB_FMT_SIGNAL_TEXTBOOK_SYNC_OK" in doc
assert "VASQUEZ_INDEX_URF_CORE_TEXTBOOK_CSLIB_FMT_SIGNAL_UPDATE_OK" in doc
assert "dashboard synchronization only" in doc

print("FRONTIER_STATUS_DASHBOARD_CSLIB_FMT_SIGNAL_INDEX_SYNC_OK")
