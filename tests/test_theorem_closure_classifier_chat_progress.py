from pathlib import Path
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "artifacts/status/theorem_closure_classifier_chat_progress_2026_06_09.json"
DOC = ROOT / "docs/status/THEOREM_CLOSURE_CLASSIFIER_CHAT_PROGRESS_2026_06_09.md"
VERIFY = ROOT / "tools/verify_theorem_closure_classifier_chat_progress.py"

def test_theorem_closure_classifier_chat_progress_artifact():
    data = json.loads(ART.read_text())
    assert data["status"] == "THEOREM_CLOSURE_CLASSIFIER_CHAT_PROGRESS"
    assert data["current_main_commit"] == "60abad1"
    assert data["current_open_pr"] == 6
    assert len(data["merged_stack"]) == 5
    assert data["open_stack"][0]["open_object"] == "ClassifierDecisionSurface"
    assert data["next_admissible_object"] == "MergePR6OrStop"

def test_theorem_closure_classifier_chat_progress_doc():
    text = DOC.read_text()
    assert "THEOREM_CLOSURE_CLASSIFIER_CHAT_PROGRESS" in text
    assert "ClassificationBoundaryLock" in text
    assert "ManifestDrivenFixtureTest" in text
    assert "ClassifierDecisionSurface" in text
    assert "No new theorem proof" not in text
    assert "new theorem proof" in text
    assert "Clay-problem closure" in text

def test_theorem_closure_classifier_chat_progress_verifier():
    result = subprocess.run(
        [sys.executable, str(VERIFY)],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    assert "THEOREM_CLOSURE_CLASSIFIER_CHAT_PROGRESS_OK" in result.stdout
