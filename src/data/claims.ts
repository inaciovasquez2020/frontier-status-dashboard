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
