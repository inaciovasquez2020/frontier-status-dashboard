export type ClaimStatus =
  | "machine-checked"
  | "verified-surface"
  | "conditional"
  | "open";

export interface Claim {
  id: string;
  title: string;
  statement: string;
  status: ClaimStatus;
  artifactUrl?: string;
  artifactLabel?: string;
  lastChecked?: string;
  dependencies?: string[];
  scope: string;
  limitations: string;
}

export const STATUS_META: Record<
  ClaimStatus,
  { label: string; description: string; className: string }
> = {
  "machine-checked": {
    label: "Machine-checked",
    description: "A proof/check artifact exists and is executable.",
    className: "status-verified",
  },
  "verified-surface": {
    label: "Verified surface",
    description: "Repository checks, guards, or status verifiers pass; theorem-level closure is not implied.",
    className: "status-reviewed",
  },
  conditional: {
    label: "Conditional",
    description: "Depends on a stated missing lemma, assumption, or external theorem.",
    className: "status-argued",
  },
  open: {
    label: "Open / frontier",
    description: "No proof is claimed; tracked as an explicit frontier.",
    className: "status-open",
  },
};

export const CLAIMS: Claim[] = [
  {
    "id": "urf-universal-recovery-20261127",
    "title": "URF — universal scalar recovery and affine transfer",
    "statement": "For an arbitrary system-observation compatibility relation, scalar worst-case error E is achievable exactly when all compatible target pairs differ by at most 2E. Affine transfer requires specified equivalences and target transformation.",
    "status": "machine-checked",
    "artifactUrl": "https://github.com/inaciovasquez2020/biological-friction-framework/blob/76317e758f932638945934bcac2ce9ffa7fa3d31/proofs/hidden-dissipation/recovery/UniversalRecovery.lean",
    "artifactLabel": "BFF #119 pinned Mac-verified PR revision",
    "lastChecked": "2026-11-27",
    "scope": "LEAN_VERIFIED: URF.Transfer.recoverable_iff_pairwise, exact_minimax, affine_transfer. Part of the 16 additional audited declarations; Linux reproduction pending at this checkpoint.",
    "limitations": "Arbitrary scalar estimators; no computational or measurability restrictions. Classical optimal-recovery foundations. Independent novelty and fundamental physical law OPEN."
  },
  {
    "id": "bff-noisy-recovery-20261127",
    "title": "Biological Friction — sharp noisy entropy recovery",
    "statement": "For the fixed stationary probabilities and traffic of the bounded cyclic Markov family, a single noisy diagonal generator-square observable has an exact minimax absolute entropy-production error. The final theorem proves entropy convexity rather than assuming it.",
    "status": "machine-checked",
    "artifactUrl": "https://github.com/inaciovasquez2020/biological-friction-framework/blob/76317e758f932638945934bcac2ce9ffa7fa3d31/proofs/hidden-dissipation/recovery/EntropyConvexity.lean",
    "artifactLabel": "BFF #119 pinned analytic source; 57 cumulative audited declarations",
    "lastChecked": "2026-11-27",
    "dependencies": [
      "urf-universal-recovery-20261127",
      "bff-cosmology-recovery-20261127"
    ],
    "scope": "LEAN_VERIFIED: noisy_ring_curvature_minimax_unconditional; 57/57 cumulative Mac audit, including 16 additional declarations. Linux reproduction pending at this checkpoint.",
    "limitations": "Fixed positive stationary probabilities and traffic; bounded circulating current, known baseline and curvature weight, deterministic bounded measurement error. Empirical feasibility, semigroup derivative, physical validation and independent novelty OPEN."
  },
  {
    "id": "bff-hidden-dissipation-20261127",
    "title": "Chronos–Biology — hidden dissipation",
    "statement": "For the specified finite cyclic Markov generators, fixed stationary probabilities, edge traffic, exit rates and independently gauged injective path observations can conceal distinct entropy production. The sharp absolute-error minimax value equals half maximal dissipation in the bounded current family.",
    "status": "machine-checked",
    "artifactUrl": "https://github.com/inaciovasquez2020/biological-friction-framework/blob/799b41b4692c71589587cba037f26f0ad4bff7fb/proofs/hidden-dissipation/receipt/HiddenDissipation.lean",
    "artifactLabel": "BFF #116 merged source; 33 audited declarations",
    "lastChecked": "2026-11-27",
    "scope": "LEAN_VERIFIED: Mac and fresh Linux PASS, 33/33 permitted-axiom audit. BFF.HiddenDissipation.ring_observation_minimax.",
    "limitations": "Specified observation model and positive ring hypotheses only. Empirical biological validation and independent novelty OPEN; not physical equivalence."
  },
  {
    "id": "bff-cosmology-recovery-20261127",
    "title": "Biology–Cosmology — second-order recovery",
    "statement": "One diagonal generator-square observable together with the original stationary observations identifies squared circulating current and entropy production. A restricted cosmological Fourier-mode coefficient identifies its coupling for known positive radius and nonzero mode.",
    "status": "machine-checked",
    "artifactUrl": "https://github.com/inaciovasquez2020/biological-friction-framework/blob/c5c8b2f24a0d4de57c764c161ab29c3689bec62f/proofs/hidden-dissipation/receipt/HiddenDissipation.lean",
    "artifactLabel": "BFF #117 merged source; 8 additional declarations",
    "lastChecked": "2026-11-27",
    "dependencies": [
      "bff-hidden-dissipation-20261127"
    ],
    "scope": "LEAN_VERIFIED: eight additional declarations, cumulative 41/41 Mac and Linux permitted-axiom audits. BFF.HiddenDissipation.entropy_identified_by_curvature and mode_identifiable.",
    "limitations": "Full matrix-exponential derivative, covariant action and Fourier derivations, empirical validation and independent novelty OPEN. No general cosmological parameter identification."
  },
  {
    "id": "chronos-cosmology-projection-20261127",
    "title": "Cosmology–Chronos — causal projection obstruction",
    "statement": "In the specified five-coordinate causal diamond, identical visible coordinates can conceal different causal comparability. Strip-area algebra and optimal pointwise binary decision loss are verified.",
    "status": "machine-checked",
    "artifactUrl": "https://github.com/inaciovasquez2020/chronos-urf-rr/blob/2ed7df1497824343fce34924501d42a220c3006f/research/certificates/cosmology_causal_projection/receipt/CausalProjection.lean",
    "artifactLabel": "Chronos #1392 exact PR revision, not a merge claim",
    "lastChecked": "2026-11-27",
    "scope": "LEAN_VERIFIED at pinned PR revision: 11/11 Mac audit, dedicated Linux Lean CI PASS; wider integration CI pending at this checkpoint. Chronos.CosmologyBridge.no_perfect_visible_decoder and strip_optimal_decoder.",
    "limitations": "Continuum measure formalization, physical fifth-dimension detection, independent novelty and full integration remain OPEN or pending. No empirical or universal spacetime claim."
  },
  {
    id: "urf-core-sharp-rank-20261124",
    title: "URF Core #599 — sharp finite-tag rank theorem",
    statement: "Six exact finite-obstruction rank/exhaustion declarations compiled in isolation on the researcher's Mac. The permitted-axiom audit reports 6/6 PASS. Exhaustion at the initial rank is equivalent to the initial finite tag count not exceeding that rank.",
    status: "machine-checked",
    artifactUrl: "https://github.com/inaciovasquez2020/urf-core/commit/422294157daa95a8e7d95a0ce79caf5492821a9c",
    artifactLabel: "Merged research-only Lean source and receipt",
    lastChecked: "2026-11-24",
    scope: "Mac-reported LEAN_VERIFIED_ISOLATED for four exact source declarations and six proposed theorems; permitted axioms propext, Classical.choice and Quot.sound.",
    limitations: "Full production-module integration NOT_RUN; a faithful graph-to-tag encoding and nonvacuous fixed FO-k H1 locality remain OPEN.",
  },
  {
    id: "urf-core-fo-k-boundary-20261124",
    title: "URF Core #602 — FO-k and H1 semantic corrections",
    statement: "Merged corrections record the fixed-semantics and cycle-type splitting limits of the FO-k/H1 manuscript without promoting a graph-level theorem.",
    status: "verified-surface",
    artifactUrl: "https://github.com/inaciovasquez2020/urf-core/commit/afdc0a20960b0f396b0a7fca85216a21f46ca14c",
    artifactLabel: "Merged manuscript-boundary correction",
    lastChecked: "2026-11-24",
    scope: "Documentation, formal hypothesis inventory and reproducibility provenance; no production Lean theorem was claimed by this PR.",
    limitations: "Graph-to-tag semantic faithfulness and unrestricted H1 locality remain OPEN.",
  },
  {
    id: "dfm-mkc-evidence-20261124",
    title: "DFM-MKC #327 — gravity/magnetism evidence boundaries",
    statement: "Merged a source-linked ledger for the NIST G determination, BlackTHUNDER spectroscopy and MICROSCOPE equivalence-principle measurement, including interpretation limits.",
    status: "verified-surface",
    artifactUrl: "https://github.com/inaciovasquez2020/dfm-mkc-cosmology/commit/436b2a132edd1fb98665887a530f0b337db88f1f",
    artifactLabel: "Merged source/observational evidence ledger",
    lastChecked: "2026-11-24",
    scope: "Cited measurements and explicitly restricted phenomenological implications; documentation only.",
    limitations: "No source-derived gravity–magnetism coupling, numerical magnetic-energy bound, or new gravitational theory validation follows.",
  },
  {
    id: "poincare-u16-witnesses-20261124",
    title: "Poincaré #197 — finite U(16) unlocking certificate",
    statement: "The dedicated PR-head GitHub Actions job reproduced the finite certificate and all 104 stabilized U(16) witness digest checks: 96 depth-two, eight depth-three unlocking paths.",
    status: "verified-surface",
    artifactUrl: "https://github.com/inaciovasquez2020/poincare-new-derivation/commit/8842f3bf42c7ddc604a1b545d9116ef34effdc25",
    artifactLabel: "Merged bounded U(16) computation and verifier",
    lastChecked: "2026-11-24",
    scope: "COMPUTATION_PASS for one specified 104-tetrahedron triangulation under the audited move predicates; the 104 refers to finite stabilization choices.",
    limitations: "Not a Lean-verified global theorem, not universal strict Pachner descent, and not an independent Poincaré derivation. GLOBAL_POINCARE := OPEN.",
  },
  {
    id: "melanoma-cd36-matched-baseline-exploratory-20261115",
    title: "Melanoma CD36 — matched-baseline exploratory negative result",
    statement:
      "In 12 matched baseline melanoma patients, the original malignant and candidate myeloid CD36 exact response-permutation tests were reproduced (214/495 and 346/495). Excluding 17 known malignant-cell overlaps from provisional myeloid clusters gave a corrected primary exact p-value of 288/495, with no statistically significant CD36–response association established.",
    status: "verified-surface",
    artifactUrl:
      "https://github.com/inaciovasquez2020/biological-friction-framework/tree/510bc502d67e6ac5289f56d2b73a44f2ba6bd313/research/melanoma/cd36-paired-baseline-2026-11-15",
    artifactLabel: "Pinned CD36 aggregate research checkpoint",
    lastChecked: "2026-11-15",
    scope:
      "Bounded reproducibility of exact 12-patient permutation statistics, known malignant-cell ID exclusion and aggregate negative exploratory evidence; 495 response-label allocations.",
    limitations:
      "Not a validated clinical predictor, a causal mechanism or proof of no biological effect. Definitive macrophage identity, independent cohort replication and source-supplement authentication remain open. No patient-level or raw specimen data are distributed through this claim.",
  },
  {
    id: "frontier-status-dashboard-private-metadata-policy",
    title: "Private metadata omission policy",
    statement:
      "Private and non-public repository metadata is omitted from the public dashboard and represented only by an aggregate internal verification surface.",
    status: "verified-surface",
    artifactUrl: "https://github.com/inaciovasquez2020/frontier-status-dashboard",
    artifactLabel: "frontier-status-dashboard",
    lastChecked: "2026-05-09",
    scope:
      "Covers public dashboard row exposure, private-repository metadata omission, and claim-boundary language.",
    limitations:
      "Does not verify private repositories, theorem-level mathematical closure, or hidden proof artifacts.",
  },
  {
    id: "vasquez-index-public-link-hygiene",
    title: "vasquez-index public link hygiene",
    statement:
      "The broken github.com/inaciovasquez2020/current README link was removed from the public vasquez-index surface.",
    status: "verified-surface",
    artifactUrl: "https://github.com/inaciovasquez2020/vasquez-index",
    artifactLabel: "vasquez-index",
    lastChecked: "2026-05-09",
    scope:
      "Covers public README link hygiene and repository verification checks.",
    limitations:
      "Does not assert completeness of all external links across every repository.",
  },
  {
    id: "chronos-selected-carrier-surfaces",
    title: "Chronos selected-carrier verified surfaces",
    statement:
      "Selected-carrier bridges, unrestricted Reg-SNF over the current real Chronos-admissible predicate, and repository-native verification surfaces are tracked separately from unrestricted Chronos-RR closure.",
    status: "verified-surface",
    artifactUrl: "https://github.com/inaciovasquez2020/chronos-urf-rr",
    artifactLabel: "chronos-urf-rr",
    lastChecked: "2026-05-09",
    dependencies: ["chronos-frontier-open-boundary"],
    scope:
      "Covers selected-carrier, zero-arity, Reg-SNF, and repository-native verified surfaces only.",
    limitations:
      "Does not prove unrestricted Chronos-RR, H4.1/FGL, P vs NP, or Clay-problem closure.",
  },
  {
    id: "chronos-frontier-open-boundary",
    title: "Chronos frontier-open boundary",
    statement:
      "Universal Fiber Entropy Gap from Reg-SNF, DepthBridge extension beyond the selected final carrier domain, Chronos-RR, H4.1/FGL, P vs NP, and Clay-problem closure remain explicit frontiers.",
    status: "open",
    artifactUrl: "https://github.com/inaciovasquez2020/chronos-urf-rr",
    artifactLabel: "chronos-urf-rr",
    lastChecked: "2026-05-09",
    scope:
      "Records the boundary between verified surfaces and theorem-level closure.",
    limitations:
      "No frontier theorem is proved by this status entry; PR #199 is a status snapshot, not a theorem-level closure artifact.",
  },
  {
    id: "analytic-entropy-frontier-contract",
    title: "Analytic entropy frontier contract",
    statement:
      "Finite entropy sum from log-kernel and analytic entropy contracts are verified as conditional frontier surfaces.",
    status: "conditional",
    artifactUrl: "https://github.com/inaciovasquez2020/chronos-urf-rr",
    artifactLabel: "Chronos analytic entropy frontier",
    lastChecked: "2026-05-09",
    dependencies: ["chronos-frontier-open-boundary"],
    scope:
      "Covers conditional formal surfaces for entropy-interface bookkeeping.",
    limitations:
      "Does not prove analytic real-log positivity or full finite-distribution Shannon entropy over Real.log.",
  },
];

export function getClaim(id: string): Claim | undefined {
  return CLAIMS.find((claim) => claim.id === id);
}
