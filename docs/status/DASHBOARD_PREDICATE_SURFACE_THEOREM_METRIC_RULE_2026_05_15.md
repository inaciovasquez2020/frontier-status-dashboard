# Dashboard Predicate-Surface Theorem-Metric Rule — 2026-05-15

STATUS := VERIFIED_DASHBOARD_METRIC_RULE_ONLY

ACCEPTED_OBJECT := predicate_surface_closure

RULE :=
  predicate_surface_closure may contribute to dashboard theorem-closure scale
  iff the row explicitly marks theoremPromotion := false
  and preserves no_unrestricted_theorem_promotion.

RESULT :=
  THEOREM_CLOSURE_DELTA > 0

BOUNDARY :=
  no_unrestricted_theorem_promotion
  no_unrestricted_Chronos_RR_closure
  no_unrestricted_H4_1_FGL_closure
  no_P_vs_NP_closure
  no_Clay_problem_closure
