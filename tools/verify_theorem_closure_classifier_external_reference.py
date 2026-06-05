import json
from pathlib import Path

data = json.loads(Path("artifacts/frontier/theorem_closure_classifier_external_reference_2026_06_05.json").read_text())

assert data["status"] == "EXTERNAL_METHOD_REFERENCE_ONLY"
assert data["version"] == "v0.1.1"
assert data["verification"]["control_suite"] == "7 / 7 controls pass"
assert data["dashboard_boundary"]["track_as_method_artifact"] is True
assert data["dashboard_boundary"]["not_a_theorem_closure"] is True
assert data["dashboard_boundary"]["not_empirical_evidence"] is True
assert data["dashboard_boundary"]["not_zenodo_archived_yet"] is False
assert data["zenodo"]["archived"] is True
assert data["zenodo"]["release"] == "v0.1.3"
assert data["zenodo"]["doi"] == "10.5281/zenodo.20561778"
assert data["zenodo"]["record"] == "https://zenodo.org/records/20561778"

print("FRONTIER_THEOREM_CLOSURE_CLASSIFIER_REFERENCE_OK")
