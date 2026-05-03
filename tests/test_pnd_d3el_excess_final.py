from pathlib import Path

DOC = Path("docs/status/PND_D3EL_EXCESS_FINAL_2026_05_03.md")


def test_pnd_d3el_excess_final_doc_exists():
    assert DOC.exists()


def test_pnd_d3el_excess_final_status_tokens():
    text = DOC.read_text()
    assert "Status: VERIFIED_CONDITIONAL_CLOSURE" in text
    assert "`PND_D3EL_excess_final`" in text
    assert "`PLEquivalence`" in text
    assert "`ImportedPachnerTheorem3D`" in text
    assert "formal_Pachner_connectivity_3D" in text


def test_pnd_d3el_excess_final_metrics():
    text = DOC.read_text()
    assert "theoremClosure      = 0" in text
    assert "conditionalClosure  = 100" in text
    assert "frontierReduction   = 100" in text
    assert "integrity           = 100" in text


def test_pnd_d3el_excess_final_boundary():
    text = DOC.read_text()
    assert "This status file does not claim unconditional theorem closure." in text
    assert "This status file does not claim a formal proof of Pachner connectivity in Lean." in text
    assert "This status file does not claim that `ImportedPachnerTheorem3D` has been internally proved." in text
    assert "theoremClosure      = 100" not in text
    assert "theoremClosure = 100" not in text
