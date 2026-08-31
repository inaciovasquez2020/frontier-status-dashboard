# Public Repository Deep Audit — 2026-08-31

STATUS := PUBLIC_REPOSITORY_INVENTORY_AUDITED_NO_THEOREM_PROMOTION

## Scope

This audit inventories every GitHub-visible public repository owned by `inaciovasquez2020` at the audit time and separates research-frontier surfaces from infrastructure, exposition, registry, profile, and website surfaces.

GitHub-visible public repository count at audit time: **18**.

Boundary: repository visibility, build success, CI success, verifier success, dashboards, status ledgers, conditional reductions, interface objects, or bounded certificates do not imply theorem-level closure unless the relevant theorem is explicitly proved with its assumptions discharged.

## Full public inventory

| Repository | Audit role | Current bounded reading |
|---|---|---|
| `chronos-urf-rr` | flagship executable research frontier | active conditional frontier; recent gravity work reaches anchored radial momentum recovery but does not prove the missing matter-source-to-gravitational-energy/boundary-flux estimate or unrestricted gravity closure |
| `cslib-fmt` | Lean finite-model-theory library | reusable locality/EF-game infrastructure with bounded closed surfaces; general FMT/Gaifman-locality frontier remains open |
| `darkness-region-dynamics-null-test` | falsification/null-test schema | conditional test schema only; no darkness medium/field or new-physics detection claim |
| `dfm-mkc-cosmology` | executable cosmology research surface | active cosmology/theory surface; latest public work includes a physical wavenumber unit map; prepared scalar coercivity remains bounded by an unresolved positivity step |
| `fo4-constraint-isolation` | proof-hygiene/open-problem boundary | FO^4 variable-budget isolation only; terminal rigidity/counterexample question remains open |
| `frontier-status-dashboard` | public status/integrity dashboard | synchronization and claim-boundary infrastructure; not a theorem source |
| `inaciovasquez2020` | GitHub profile/start-here map | documentation/routing surface only |
| `inaciovasquez2020.github.io` | public website | documentation/website surface only |
| `poincare-new-derivation` | Poincaré proof program | active verified intermediate proof-drive checkpoints; `Poincare.JIID` remains unproved |
| `theorem-closure-classifier` | closure-audit method/control suite | bounded classifier/control infrastructure; classifier labels do not prove theorem truth |
| `urf-11-translation-subproblem-registry` | translation/subproblem registry | registry/dependency surface only; no upstream mathematical closure |
| `urf-core` | URF trusted/axiomatic base | verified bounded objects and zero active-obligation ledger state coexist with explicit axioms/admit boundaries; no whole-URF theorem closure |
| `urf-spine-public` | sanitized audit mirror | public audit/certificate surface; not theorem-prover-complete |
| `urf-templates` | outsider adoption templates | bounded runnable examples; no universal scientific validation or external adoption claim |
| `urf-textbook` | exposition/archive layer | documentation and explanation surface; not an independent proof source |
| `urf-verifier` | deterministic verifier infrastructure | certificate/signature verification only; does not generate mathematical proofs |
| `vasquez-index` | canonical navigation/index layer | public registry/navigation surface; not an independent theorem source |
| `zero_day_restricted_closures` | restricted-closure boundary program | conditional required-class/SH reduction surfaces only; no unconditional ZeroDayClosure or global algebraicity source proof |

## Current high-activity research fronts

### 1. Poincaré

Recent main history reaches the verified high-fan recurrence checkpoint (`fecb4043dc137777fa5e253399b3c8894083fc55`) after a sequence of finite filling, source-face, recurrent-crossing, boundary-escape, and high-fan lemmas.

The merge message explicitly preserves the boundary:

```text
Poincare.JIID remains unproved.
```

Audit reading: materially stronger intermediate structure than the repository README currently describes, but no Poincaré theorem closure.

### 2. Chronos / gravity

Recent public gravity commits progress through:

```text
#1290 exact perturbation-energy absorption reduction
#1291 necessary lapse-energy bound
#1292 lapse-only control-energy unboundedness
#1294 current-carrier universal absorption impossibility
#1295 sharp momentum-combination norm
#1296 typed momentum-source constraint binding
#1297 fixed-convention radial momentum constraint law
#1298 radial-gradient momentum constraint law
#1299 anchored radial momentum recovery
```

The current bounded obstruction is physical/analytic rather than algebraic: the repository still needs a repository-native estimate controlling the selected matter momentum source by the gravitational energy and/or boundary flux strongly enough to instantiate the existing source bound.

Boundary: no unrestricted gravity closure, no Cosmic Censorship proof, no Hoop Conjecture proof, no unrestricted Chronos-RR, no H4.1/FGL, no P vs NP, and no Clay-problem closure.

### 3. DFM-MKC cosmology

Recent public main history includes PR #282 / commit `2eafc76` adding the bounded H0-normalized physical/code wavenumber conversion needed before sigma8/DESI projection.

The preceding prepared scalar canonical-energy coercivity probe isolates a first leading-minor strict-positivity obligation rather than claiming coercivity.

Boundary: no metric-potential coercivity, no E_grav/boundary-flux comparison, no gravity absorption theorem, and no unrestricted cosmology/gravity closure follows from the current executable surface.

### 4. cslib-fmt

PR #192 adds a concrete reflexive `LocalPointedBackAndForth` witness and is explicitly bounded to the reflexive base case.

Boundary: no nontrivial distinct-assignment local back-and-forth system and no Gaifman locality theorem is inferred.

### 5. Zero Day restricted closures

The public status records only conditional boundary surfaces and an anti-unconditional verifier.

Boundary includes:

```text
no unconditional completeness theorem
no proof of the missing global algebraicity source
no proof that all required K3^[n] Hodge classes lie in SH(X,Q)
no unconditional ZeroDayClosure
```

## Synchronization gaps found

1. `frontier-status-dashboard/scripts/update-status-data.mjs` hard-coded six repositories and rewrote the ledger to that subset. This audit branch replaces that behavior with paginated discovery of every public repository while preserving historical rows.
2. `frontier-status-dashboard/src/App.tsx` hard-coded five top-level repository names. This audit branch classifies canonical repository-root rows dynamically instead.
3. The profile repository currently states **16** public repositories; the live owner inventory is **18**.
4. `vasquez-index` currently states **17** public repositories; the live owner inventory is **18**, with `poincare-new-derivation` absent from that inventory table.
5. The Poincaré README still describes the project as a deprecated conditional sketch and does not reflect the newer August 30 verified intermediate proof-drive checkpoints.
6. The dashboard's historical status rows are materially older than the newest Poincaré, Chronos/gravity, DFM, and Zero Day public work, so status freshness must be treated separately from repository visibility.

## Dashboard repair on audit branch

Branch:

```text
audit/public-repo-ingestion-20260831
```

Changes through this audit:

- dynamic paginated public-repository discovery;
- preservation of existing historical status rows;
- conservative fallback status for newly discovered public repositories;
- dynamic repository-root card classification;
- committed 18-repository public inventory snapshot;
- this deep-audit note.

No theorem status is promoted by these dashboard changes.

BOUNDARY := ¬ public_repository_inventory_or_dashboard_sync_implies_theorem_level_closure
