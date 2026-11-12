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

## 3. Exact DFM-MKC artifact/provenance audit

Repository: https://github.com/inaciovasquez2020/dfm-mkc-cosmology

### BAO artifacts found

1. `docs/status/DFM_MKC_FROZEN_PREDICTION_VECTOR_TARGET_2026_05_21.md` — Git blob SHA `80c3bee7a91f95c73aeef91a7ff5027ecd419721`. Its declared status is `FROZEN_PREDICTION_VECTOR_TARGET_ONLY_NOT_SUPPLIED`; it explicitly says no frozen values, parameter values, likelihood, or data comparison are supplied.
2. `artifacts/repo_intake/dfm_mkc_act_planck_desi_prediction_vector_v1_2026_05_27.json` — Git blob SHA `f7738a003990110ca8a80b4468782172fd96f608`. This is a prediction-vector **interface**. It declares BAO slots such as (D_M/r_d), (D_H/r_d), (D_V/r_d), (F_{AP}), (H(z)), and (D_A(z)), but states that background and perturbation solver outputs are not numerically supplied and that no numerical prediction vector or likelihood is supplied.
3. `artifacts/external_validation/frozen_dfm_mkc_prediction_vector_desi_order_2026_06_29.json` — Git blob SHA `bd5b39014b0a149e01535a6b837fc1ab9629a91a`. It contains a 36-entry all-zero vector labelled `zero_baseline_frozen_diagnostic_seed_only`; its covariance-order status says repository-internal order, not survey-likelihood order, and the covariance is bound only to adapter block dimension. This is a diagnostic seed, **not a physical DFM-MKC prediction**.

The repo's `tools/verify_observed_desi_dr2_bao_numeric_order_boundary.py` — Git blob SHA `01a451c8a7f22531a0677d0d52478325dff5086b` — explicitly checks that the observed 36-value DESI DR2 BAO vector and 36×36 covariance files are absent, and prints the missing paths:
- `public_data/desi_dr2/observed_bao_vector_36.csv`
- `public_data/desi_dr2/observed_bao_covariance_36x36.csv`

### Weak-lensing artifacts found

The interface JSON above declares weak-lensing slots `C_ell_shear`, `C_ell_galaxy_shear`, and `C_ell_galaxy_galaxy`, but says they are slots only, with no numerical vector or validated implementation. The frozen-vector target JSON `artifacts/repo_intake/dfm_mkc_frozen_prediction_vector_target_2026_05_21.json` — Git blob SHA `eaf9f47e6359c1b0647f01559b6854f937b37c66` — explicitly marks `WEAK_LENSING_AND_CLUSTERING` as `blocked_no_frozen_prediction_vector`. A repository search did not identify an existing numerical weak-lensing prediction vector or a pinned external weak-lensing data vector/covariance pair.

### External data candidates and comparison decision

- DESI DR2 BAO official publication and supplementary data: https://data.desi.lbl.gov/doc/papers/dr2/ and https://zenodo.org/records/16644577. The DESI supplementary archive provides a 1.3 GB zip for reproducing published results. A source citation is not itself a pinned, order-verified 36-vector/covariance pair.
- DES Y3 + KiDS-1000 weak-lensing data products: https://kids.strw.leidenuniv.nl/sciencedata.php. The release page identifies data vectors, covariance matrices, redshift distributions, and CosmoSIS configuration files.

**Comparison result: BLOCKED BEFORE NUMERICAL COMPARISON.** There is no non-diagnostic, numerically evaluated DFM-MKC BAO or weak-lensing prediction to compare. For BAO, the exact 36-point observed vector/covariance pair is explicitly absent in the repository's own boundary check. For weak lensing, only interface slots and target schemas were found, not numerical model predictions and a pinned matching data/covariance pair. Running a residual or chi-squared calculation now would compare a diagnostic zero seed or undefined slots against observations and would be scientifically invalid. No chi-squared, fit score, likelihood preference, or validation result is claimed.

This is a provenance finding from the named Git-tracked artifacts and verifier source; the listed blob SHAs identify those exact file contents. It is not a fresh end-to-end local execution of the repository or a SHA-256 digest of the files.

## 4. Atomic-gravity paper: competing prediction, not observation

Source: https://rxiverse.org/pdf/2603.0057v1.pdf

Title: *Gradient Material Field and Geodesic Network: Atomic Ontology of Gravity and Geometric Equivalent Interpretation of General Relativity*, Shun Yao, Yunsheng Shu, and Zhiyong Yao.

The paper proposes that gravitational strength tracks atom count and argues that atomic state/internal structure does not materially change the result. Its carbon-state section describes equal-atom-count graphite, gaseous carbon, and plasma carbon samples, but explicitly presents the numerical values as simulation and a route for future measurement. The paper does not report a completed physical measurement of those samples and does not compare diamond directly with graphite.

**Classification:** `COMPETING_THEORETICAL_PREDICTION; PROPOSED_EXPERIMENT_UNPERFORMED_IN_SOURCE`.

**Effect on portfolio:** it gives a potentially discriminating alternative prediction for structural/atomic gravity hypotheses, but it neither experimentally contradicts nor empirically supports a diamond-versus-graphite gravity difference. Keep the carbon/structural-gravity status open and unchanged. A genuine test requires a completed, controlled differential measurement with stated uncertainty and systematic-error budget.

## 5. Portfolio status policy

This review does not alter the status of Poincare/JIID, Chronos-URF-RR/GfE, Biological Friction Framework, CorrRank, radiative rigidity, CSLIB-FMT, or other retained research tracks. The reviewed sources have not supplied a specific reproducible result that closes one of their open obligations.

## 6. Next admissible work

1. Obtain and pin the official DESI DR2 observed vector and covariance, verify dimensions, ordering, units, source revision, and SHA-256, then define the same ordered observables for the baseline model.
2. Supply a real, numerically evaluated DFM-MKC BAO prediction from the frozen equations/parameters/solver. The all-zero diagnostic seed must not be substituted for it.
3. For weak lensing, choose one public release (for example DES Y3 + KiDS-1000), pin its vector/covariance/redshift distributions and nuisance conventions, and implement/validate a numerical DFM-MKC shear prediction before comparing it with Lambda-CDM under the same data selection and likelihood.
4. Freeze the likelihood, nuisance parameters, priors, and decision rule before evaluating the models; keep any holdout evaluation blind.
5. Do not promote a validation status until the numerical prediction vectors, source/data hashes, covariance-bound likelihood outputs, and independent reproduction receipts exist.

## Evidence boundary

This document is a source-traceable method comparison and artifact audit. It does not demonstrate DFM-MKC empirical validation, Lambda-CDM failure, dark-matter replacement, gravity closure, or an observed structure-dependent gravitational effect.
