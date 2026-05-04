from pathlib import Path

DOC = Path("docs/status/PND_D3EL_10PCT_THEOREM_CLOSURE_2026_05_03.md")


def test_pnd_d3el_10pct_doc_exists():
    assert DOC.exists()


def test_pnd_d3el_10pct_status_tokens():
    text = DOC.read_text()
    assert "Status: VERIFIED_PARTIAL_THEOREM_CLOSURE" in text
    assert "`PND_D3EL_excess_10pct`" in text
    assert "class PLHomeomorphicEquivalence where" in text
    assert "instance PLEquivalence_from_PLHomeomorphic" in text
    assert "theorem PND_D3EL_excess_10pct" in text


def test_pnd_d3el_10pct_metrics():
    text = DOC.read_text()
    assert "theoremClosure      = 10" in text
    assert "conditionalClosure  = 100" in text
    assert "frontierReduction   = 100" in text
    assert "integrity           = 100" in text


def test_pnd_d3el_10pct_boundary():
    text = DOC.read_text()
    assert "This status file records only the discharge of the `PLEquivalence` gate." in text
    assert "This status file does not record a proof of `formal_Pachner_connectivity_3D`." in text
    assert "`ImportedPachnerTheorem3D` remains external." in text
    assert "If `PLHomeomorphicEquivalence` is added as an axiom rather than proved from the repository definitions, then the theorem-closure value remains 0." in text
    assert "theoremClosure      = 100" not in text
    assert "theoremClosure = 100" not in text
