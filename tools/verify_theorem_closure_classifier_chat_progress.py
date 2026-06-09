#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "artifacts/status/theorem_closure_classifier_chat_progress_2026_06_09.json"
DOC = ROOT / "docs/status/THEOREM_CLOSURE_CLASSIFIER_CHAT_PROGRESS_2026_06_09.md"

REQUIRED_MERGED = {
    "ClassificationBoundaryLock",
    "AdditionalIndependentBenchmarkControl",
    "FixtureCoverageAudit",
    "ConcreteFixtureManifest",
    "ManifestDrivenFixtureTest",
}

REQUIRED_NONCLAIMS = {
    "new_theorem_proof",
    "external_theorem_acceptance",
    "classifier_output_as_proof",
    "automatic_theorem_promotion",
    "Clay_problem_closure",
}

def main() -> int:
    data = json.loads(ART.read_text())
    doc = DOC.read_text()

    assert data["status"] == "THEOREM_CLOSURE_CLASSIFIER_CHAT_PROGRESS"
    assert data["source_repo"] == "theorem-closure-classifier"
    assert data["current_main_commit"] == "60abad1"
    assert data["current_open_branch"] == "docs/classifier-decision-surface-20260609"
    assert data["current_open_pr"] == 6
    assert data["next_admissible_object"] == "MergePR6OrStop"

    merged = {entry["closed_object"] for entry in data["merged_stack"]}
    assert REQUIRED_MERGED <= merged

    assert data["open_stack"][0]["open_object"] == "ClassifierDecisionSurface"
    assert "CLASSIFIER_DECISION_SURFACE_OK" in data["open_stack"][0]["latest_local_verification"]
    assert "16_pytest_tests_passed" in data["open_stack"][0]["latest_local_verification"]
    assert "git_diff_check_passed" in data["open_stack"][0]["latest_local_verification"]

    assert REQUIRED_NONCLAIMS <= set(data["claims_not_made"])

    assert "THEOREM_CLOSURE_CLASSIFIER_CHAT_PROGRESS" in doc
    assert "ClassifierDecisionSurface" in doc
    assert "16 pytest tests passed" in doc
    assert "MergePR6OrStop" in doc

    print("THEOREM_CLOSURE_CLASSIFIER_CHAT_PROGRESS_OK")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
