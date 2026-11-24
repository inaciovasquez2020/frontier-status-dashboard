# Public merged source/verification ledger — 2026-11-24 UTC

**Scope:** Public provenance for four confirmed GitHub PR merges. Two other actions were performed in private repositories and are intentionally not named or linked here. This dashboard does not expose private repository identities, commits, titles, or source details.

| Public artifact / exact merge commit | Evidence | Scope limit |
| --- | --- | --- |
| [URF Core #599 — sharp finite-tag rank theorem](https://github.com/inaciovasquez2020/urf-core/commit/422294157daa95a8e7d95a0ce79caf5492821a9c) | `LEAN_VERIFIED_ISOLATED` | Full production-module integration NOT_RUN; a faithful graph-to-tag encoding and nonvacuous fixed FO-k H1 locality remain OPEN. |
| [URF Core #602 — FO-k and H1 semantic corrections](https://github.com/inaciovasquez2020/urf-core/commit/afdc0a20960b0f396b0a7fca85216a21f46ca14c) | `SOURCE_SCOPE_CORRECTION` | Graph-to-tag semantic faithfulness and unrestricted H1 locality remain OPEN. |
| [DFM-MKC #327 — gravity/magnetism evidence boundaries](https://github.com/inaciovasquez2020/dfm-mkc-cosmology/commit/436b2a132edd1fb98665887a530f0b337db88f1f) | `SOURCE_SCOPE_CORRECTION` | No source-derived gravity–magnetism coupling, numerical magnetic-energy bound, or new gravitational theory validation follows. |
| [Poincaré #197 — finite U(16) unlocking certificate](https://github.com/inaciovasquez2020/poincare-new-derivation/commit/8842f3bf42c7ddc604a1b545d9116ef34effdc25) | `COMPUTATION_PASS` | Not a Lean-verified global theorem, not universal strict Pachner descent, and not an independent Poincaré derivation. GLOBAL_POINCARE := OPEN. |

The four public GitHub merge commits are `422294157daa95a8e7d95a0ce79caf5492821a9c` (URF Core #599), `afdc0a20960b0f396b0a7fca85216a21f46ca14c` (URF Core #602), `436b2a132edd1fb98665887a530f0b337db88f1f` (DFM-MKC #327), and `8842f3bf42c7ddc604a1b545d9116ef34effdc25` (Poincaré #197).

**Rigor boundary:** URF #599's Lean run was performed by the researcher on a Mac with a reported 6/6 permitted-axiom audit; this is **isolated**, not a production build. Poincaré #197's finite witness digest was replayed on PR-head CI; no universal proof follows. The other PRs preserve documentation/specification and evidence limitations. No numeric theorem-closure/readiness scalar was changed by this update. Unrestricted URF H1, global Poincaré, and new gravity theory verification remain OPEN.
