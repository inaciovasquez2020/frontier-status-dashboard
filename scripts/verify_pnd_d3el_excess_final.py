from pathlib import Path

DOC = Path("docs/status/PND_D3EL_EXCESS_FINAL_2026_05_03.md")

REQUIRED = [
    "Status: VERIFIED_CONDITIONAL_CLOSURE",
    "`PND_D3EL_excess_final`",
    "`PLEquivalence`",
    "`ImportedPachnerTheorem3D`",
    "excessDegreeBeta(S) = 3 * (T(S.K) - V(S.K))",
    "formal_Pachner_connectivity_3D",
    "theoremClosure      = 0",
    "conditionalClosure  = 100",
    "frontierReduction   = 100",
    "integrity           = 100",
    "This status file does not claim unconditional theorem closure.",
    "This status file does not claim a formal proof of Pachner connectivity in Lean.",
    "This status file does not claim that `ImportedPachnerTheorem3D` has been internally proved.",
]

FORBIDDEN = [
    "Pachner connectivity is proved in Lean",
    "ImportedPachnerTheorem3D has been internally proved",
    "theoremClosure      = 100",
    "theoremClosure = 100",
]

def main() -> None:
    if not DOC.exists():
        raise SystemExit(f"missing status doc: {DOC}")

    text = DOC.read_text()

    missing = [token for token in REQUIRED if token not in text]
    if missing:
        raise SystemExit("missing required tokens:\n" + "\n".join(missing))

    claim_lines = [
        line.strip()
        for line in text.splitlines()
        if not line.strip().startswith("This status file does not claim")
        and not line.strip().startswith("- Does not claim")
    ]

    forbidden_hits = []
    for token in FORBIDDEN:
        if any(token in line for line in claim_lines):
            forbidden_hits.append(token)

    if forbidden_hits:
        raise SystemExit("forbidden overclaim tokens:\n" + "\n".join(forbidden_hits))

    print("PND-D3EL excess final status verified: VERIFIED_CONDITIONAL_CLOSURE")

if __name__ == "__main__":
    main()
