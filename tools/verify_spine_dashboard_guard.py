#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

STATUS_DATA_PATH = Path("src/data/status-data.json")
TARGET_REPOSITORY = "urf-spine-public"


def walk(value: Any) -> list[dict[str, Any]]:
    if isinstance(value, dict):
        found = [value]
        for child in value.values():
            found.extend(walk(child))
        return found

    if isinstance(value, list):
        found: list[dict[str, Any]] = []
        for child in value:
            found.extend(walk(child))
        return found

    return []


def main() -> None:
    data = json.loads(STATUS_DATA_PATH.read_text())

    candidates = [
        item
        for item in walk(data)
        if item.get("repository") == TARGET_REPOSITORY
        or item.get("repo") == TARGET_REPOSITORY
        or item.get("name") == TARGET_REPOSITORY
        or item.get("id") == TARGET_REPOSITORY
    ]

    assert len(candidates) == 1, (
        f"expected exactly one {TARGET_REPOSITORY} dashboard entry, "
        f"found {len(candidates)}"
    )

    entry = candidates[0]

    assert entry.get("theoremClosure") == 0
    assert entry.get("theoremMetricApplicable") is False
    assert entry.get("closureScaleMetricApplicable") is False
    assert entry.get("theoremPromotion") is False
    assert entry.get("theoremSurfaceClosed") is False
    assert entry.get("textualNoncompiledBoundary") is True

    assert entry.get("theoremClosure") != 100, (
        "urf-spine-public must not show theoremClosure 100 without a "
        "compiled/verifiable spine theorem or finite manifest completion certificate"
    )

    print("URF_SPINE_PUBLIC_DASHBOARD_GUARD_OK")


if __name__ == "__main__":
    main()
