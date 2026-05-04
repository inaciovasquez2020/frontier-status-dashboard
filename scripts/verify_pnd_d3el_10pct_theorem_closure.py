from pathlib import Path

DOC = Path("docs/status/PND_D3EL_10PCT_THEOREM_CLOSURE_2026_05_03.md")

REQUIRED = [
    "Status: VERIFIED_PARTIAL_THEOREM_CLOSURE",
    "`PND_D3EL_excess_10pct`",
    "{ PLEquivalence, ImportedPachnerTheorem3D }",
    "{ ImportedPachnerTheorem3D }",
    "class PLHomeomorphicEquivalence where",
    "instance PLEquivalence_from_PLHomeomorphic",
    "theorem PND_D3EL_excess_10pct",
    "theoremClosure      = 10",
    "conditionalClosure  = 100",
    "frontierReduction   = 100",
    "integrity           = 100",
    "formal_Pachner_connectivity_3D",
    "This status file records only the discharge of the `PLEquivalence` gate.",
    "This status file does not record a proof of `formal_Pachner_connectivity_3D`.",
    "`ImportedPachnerTheorem3D` remains external.",
    "If `PLHomeomorphicEquivalence` is added as an axiom rather than proved from the repository definitions, then the theorem-closure value remains 0.",
]

FORBIDDEN = [
    "theoremClosure      = 100",
    "theoremClosure = 100",
    "formal_Pachner_connectivity_3D is proved",
    "ImportedPachnerTheorem3D is proved",
    "ImportedPachnerTheorem3D internally proved",
]


def main() -> None:
    if not DOC.exists():
        raise SystemExit(f"missing status doc: {DOC}")

    text = DOC.read_text()

    missing = [token for token in REQUIRED if token not in text]
    if missing:
        raise SystemExit("missing required tokens:\n" + "\n".join(missing))

    forbidden_hits = [token for token in FORBIDDEN if token in text]
    if forbidden_hits:
        raise SystemExit("forbidden overclaim tokens:\n" + "\n".join(forbidden_hits))

    print("PND-D3EL 10% theorem-closure status verified: VERIFIED_PARTIAL_THEOREM_CLOSURE")


if __name__ == "__main__":
    main()
