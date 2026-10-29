# Portfolio Literature Comparison and Competing-Prediction Record — 2026-10-29

Status: `METHODS_IDENTIFIED; NO_RESEARCH_STATUS_PROMOTED`

Purpose: compare the recent literature batch against existing DFM-MKC validation obligations, record one competing atomic-gravity prediction with its evidence tier, and preserve unrelated project statuses unchanged. This is a literature triage record, not a model-validation result.

## 1. DFM-MKC: existing validation target

The repository's `DARK_MATTER_REPLACEMENT_VALIDATION_TOOLKIT_2026_05_27.md` requires a frozen, explicit model with field equations, matter coupling, cosmological background and perturbation system, prediction-vector generator, likelihood, fixed parameter table, public-data binding, baseline Lambda-CDM comparison, blind forecast, and external replication. Required observables include BAO, CMB spectra/lensing, weak and strong lensing, rotation curves, cluster offsets, matter power, growth, cluster abundance, and cosmic shear.

The external-solver status record explicitly says the gate itself does not establish an executed external solver, numerical prediction vector, data comparison, likelihood improvement, BAO fit, weak-lensing fit, or empirical validation. Therefore, literature methods below are candidate test-design inputs only.

## 2. Literature-to-obligation comparison

### A. Lyman-alpha BAO reconstruction — arXiv:2610.37664

Source: https://arxiv.org/abs/2610.37664

The paper tests a Zel'dovich-style reconstruction on idealized Lyman-alpha forest mocks painted on N-body simulations. It reports reduced BAO damping and, in the stated mock configurations, uncertainty reductions of about 25% radial and 15% transverse in fully sampled periodic boxes; survey-mask results differ. These are method-performance results on mocks, not a DFM-MKC fit or an observational confirmation of any alternative gravity/dark-sector model.

**Potential use:** when DFM-MKC produces a frozen BAO prediction vector, compare against a clearly specified DESI/Lyman-alpha BAO data product using a fixed reconstruction pipeline, covariance, mask treatment, and baseline Lambda-CDM analysis. Keep radial and transverse observables separate; report shifts and uncertainty changes, not only best-fit values. Do not import the paper's percentage gains as expected DFM-MKC performance.

**Obligation affected:** BAO data binding, prediction-vector comparison, and likelihood/baseline protocol. **No obligation closed by this paper alone.**

### B. Halo mass-size relation and weak-lensing systematics — arXiv:2610.36531

Source: https://arxiv.org/abs/2610.36531

The paper uses mock-observed halo samples and reports that projection combined with scatter in observed luminosities can induce Eddington bias and suppress inferred density profiles; miscentering can increase uncertainty, and a mitigation based on weak-lensing mass calibration approximately recovers the simulated relation. The magnitude depends on mass, selection, and survey properties.

**Potential use:** for any DFM-MKC weak-lensing or cluster-mass comparison, use forward modeling of the actual selection function and include projection, mass-observable scatter/Eddington bias, and center-offset uncertainty in the observation model. Compare the model and Lambda-CDM under the same data cuts and nuisance-parameter treatment. Treat systematics as modelled nuisance structure, not as free corrections chosen after seeing which theory benefits.

**Obligation affected:** weak-lensing/cluster observable likelihood and fair baseline comparison. **No evidence for DFM-MKC specifically; no obligation closed.**

### C. Interacting-dark-matter constraints — arXiv:2610.37604

Source: https://arxiv.org/abs/2610.37604

The reported bounds are conditional on the paper's interaction operators, datasets, cosmological assumptions, and parameterization. They cannot be copied into DFM-MKC unless its field equations imply the same effective interaction and a derivation maps DFM-MKC parameters onto the constrained parameters.

**Potential use:** first derive the mapping (or document that no mapping exists); only then perform a like-for-like likelihood comparison. Do not treat the numerical limits as generic bounds on any model called dark matter.

**Obligation affected:** explicit equations, parameter mapping, and likelihood definition. **No transferable numerical constraint established without the mapping.**

### D. Relativistic N-body simulations and weak-lensing cluster mass modeling

The reviewed relativistic N-body and CLMM papers may inform numerical implementation or inference practice, but no specific DFM-MKC-compatible field equation, validated solver interface, or transferable result has yet been identified. They remain context until a named method is mapped to an existing code path and tested.

## 3. Atomic-gravity paper: competing prediction, not observation

Source: https://rxiverse.org/pdf/2603.0057v1.pdf

Title: *Gradient Material Field and Geodesic Network: Atomic Ontology of Gravity and Geometric Equivalent Interpretation of General Relativity*, Shun Yao, Yunsheng Shu, and Zhiyong Yao.

The paper proposes that gravitational strength tracks atom count and argues that atomic state/internal structure does not materially change the result. Its carbon-state section describes equal-atom-count graphite, gaseous carbon, and plasma carbon samples, but explicitly presents the numerical values as simulation and a route for future measurement. The paper does not report a completed physical measurement of those samples and does not compare diamond directly with graphite.

**Classification:** `COMPETING_THEORETICAL_PREDICTION; PROPOSED_EXPERIMENT_UNPERFORMED_IN_SOURCE`.

**Effect on portfolio:** it gives a potentially discriminating alternative prediction for structural/atomic gravity hypotheses, but it neither experimentally contradicts nor empirically supports a diamond-versus-graphite gravity difference. Keep the carbon/structural-gravity status open and unchanged. A genuine test requires a completed, controlled differential measurement with stated uncertainty and systematic-error budget.

## 4. Portfolio status policy

This review does not alter the status of Poincare/JIID, Chronos-URF-RR/GfE, Biological Friction Framework, CorrRank, radiative rigidity, CSLIB-FMT, or other retained research tracks. The reviewed sources have not supplied a specific reproducible result that closes one of their open obligations.

## 5. Next admissible work

1. For DFM-MKC, identify the exact frozen BAO and weak-lensing prediction artifacts and verify their provenance before selecting an external comparison.
2. Use the same data selection, covariance, nuisance treatment, and frozen parameter policy for DFM-MKC and Lambda-CDM; keep blind-holdout evaluation separate from model development.
3. Do not promote a validation status until external execution, prediction-vector hashes, likelihood outputs, and an independently reproducible result are present.
4. Retain the atomic-gravity paper as a competing proposal only; do not treat simulated carbon-state values as observed measurements.

## Evidence boundary

This document is a source-traceable method comparison and literature classification. It does not demonstrate DFM-MKC empirical validation, Lambda-CDM failure, dark-matter replacement, gravity closure, or an observed structure-dependent gravitational effect.
