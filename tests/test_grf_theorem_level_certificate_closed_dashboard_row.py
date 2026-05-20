import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/data/status-data.json"

STATUS = "GRF_THEOREM_LEVEL_CERTIFICATE_CLOSED"

def walk(obj):
    if isinstance(obj, dict):
        yield obj
        for value in obj.values():
            yield from walk(value)
    elif isinstance(obj, list):
        for item in obj:
            yield from walk(item)

def matching_rows():
    data = json.loads(DATA.read_text(encoding="utf-8"))
    return [
        obj for obj in walk(data)
        if isinstance(obj, dict) and STATUS in json.dumps(obj, sort_keys=True)
    ]

def test_grf_theorem_level_certificate_closed_row_exists():
    assert matching_rows()

def test_grf_theorem_level_certificate_closed_boundary_is_present():
    text = json.dumps(json.loads(DATA.read_text(encoding="utf-8")), sort_keys=True).lower()
    assert "repository-level certificate closure" in text
    assert "no external acceptance claim" in text
    assert "no clay-problem claim" in text or "no clay problem claim" in text

def test_grf_theorem_level_certificate_closed_row_does_not_enter_closure_scale():
    for row in matching_rows():
        assert row.get("closureScaleMetricApplicable") is False
        assert row.get("theoremMetricApplicable") is False
