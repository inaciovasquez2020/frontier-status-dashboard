import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def test_chronos_cor_triangle_chain_dashboard_update_verifier_passes():
    subprocess.run(
        ["python3", "scripts/verify_chronos_cor_triangle_chain_dashboard_update.py"],
        cwd=ROOT,
        check=True,
    )
