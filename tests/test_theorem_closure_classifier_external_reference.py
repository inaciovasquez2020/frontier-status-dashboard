import json
from pathlib import Path

def test_frontier_theorem_closure_classifier_reference():
    data = json.loads(Path("artifacts/frontier/theorem_closure_classifier_external_reference_2026_06_05.json").read_text())
    assert data["status"] == "EXTERNAL_METHOD_REFERENCE_ONLY"
    assert data["dashboard_boundary"]["not_a_theorem_closure"] is True
    assert data["dashboard_boundary"]["not_empirical_evidence"] is True
