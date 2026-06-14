from __future__ import annotations

import subprocess
import sys


def test_spine_dashboard_guard_passes() -> None:
    result = subprocess.run(
        [sys.executable, "tools/verify_spine_dashboard_guard.py"],
        check=True,
        capture_output=True,
        text=True,
    )

    assert "URF_SPINE_PUBLIC_DASHBOARD_GUARD_OK" in result.stdout
