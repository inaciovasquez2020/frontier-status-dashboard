# TKSV Pachner research status — 2026-11-22

**Independent global Poincaré:** OPEN.  
**Universal strict net vertex descent G:** OPEN; mathematically equivalent to Poincaré within finite connected closed simply connected combinatorial three-manifolds, using standard PL theorems for the reverse direction.  
**Conditional theorem G => Poincaré:** PROVED_ON_PAPER (strong induction, with five-vertex base and topology-preserving Pachner moves).  
**Lean verification of this abstract assembly:** NOT_RUN.

Validated example families as reported by the researcher's Mac:
- 153 suspended-cycle reductions, 3,213 checked legal moves.
- 45 global blocker removal examples, 747 checked moves.
- 640 stacked g2=0 complete descents, 20,800 checked moves.
- 298 g2=1/2 family descents, 5,181 checked moves.
- 148 additional g2=2 family descents, 3,700 checked moves.
- 97 optimal C4*Cn family descents, 9,991 checked moves.

Mathematical result: for m,n>=4, d_P(Cm*Cn, boundary Delta4) >= (m-2)(n-2)+3, with equality demonstrated constructively for m=4 (2n-1). The lower bound does not imply general reachability.

Two certified blockers prevent unsupported promotion: an induced suspended-cycle link does not imply the suspension edge is absent globally; and some edges cannot be deleted while preserving a chosen vertex star, all original vertices and zero net vertex cost.

**Scope:** Finite certificates apply only to the checked inputs. They do not prove unrestricted global descent. Geometric G2 module status is not the numerical g2 invariant. Do not treat successful CI, published status, or external classical recognition as independent proof closure.

Primary notes: [TKSV research document](https://github.com/inaciovasquez2020/poincare-new-derivation/blob/research/tksv-conditional-equivalence-audit-20261122/docs/research/TKSV_CONDITIONAL_POINCARE_EQUIVALENCE_2026-11-22.md).  
Public explanation: [TKSV status page](https://inaciovasquez2020.github.io/research/tksv-pachner-status-20261122.html).

GLOBAL_POINCARE := OPEN
