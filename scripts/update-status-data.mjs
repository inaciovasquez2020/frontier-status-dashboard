import fs from "node:fs/promises";

const owner = "inaciovasquez2020";
const existingPath = "src/data/status-data.json";
const inventoryPath = "src/data/public-repositories.json";
const existing = JSON.parse(await fs.readFile(existingPath, "utf8"));

async function github(path) {
  const headers = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${path}`);
  return res.json();
}

async function listPublicRepos() {
  const repos = [];

  for (let page = 1; ; page += 1) {
    const batch = await github(
      `/users/${owner}/repos?type=public&sort=full_name&direction=asc&per_page=100&page=${page}`,
    );

    repos.push(...batch.filter((repo) => repo.private === false));
    if (batch.length < 100) break;
  }

  return repos;
}

const publicRepos = await listPublicRepos();
const publicByName = new Map(publicRepos.map((repo) => [repo.name, repo]));

const poincareStatusRow = {
  name: "poincare-new-derivation",
  domain: "Topology / Poincare proof program",
  status: "Status-Locked Frontier",
  integrity: 100,
  theoremClosure: 0,
  theoremClosureLabel: "verified intermediate checkpoint only; Poincare.JIID unproved",
  theoremMetricApplicable: false,
  closureScaleMetricApplicable: false,
  ci: "green",
  boundary: "PR #87 merged the fully green finite high-fan recurrence checkpoint at fecb4043dc137777fa5e253399b3c8894083fc55 from verified proof head afd61a176478e357d2e95ba8fcc1dbc3f6317367. This is an intermediate proof-drive checkpoint only. Poincare.JIID remains unproved; no Poincare theorem closure or Clay-problem closure is claimed.",
  url: "https://github.com/inaciovasquez2020/poincare-new-derivation",
  repository: "poincare-new-derivation",
  repo: "poincare-new-derivation",
  lastUpdate: "2026-08-30",
  summary: "Verified finite high-fan recurrence checkpoint banked on main while the final Poincare.JIID theorem remains open.",
  latestPr: "https://github.com/inaciovasquez2020/poincare-new-derivation/pull/87",
  latestPR: 87,
  latestCommit: "fecb4043dc137777fa5e253399b3c8894083fc55",
  theoremPromotion: false,
  publicInventory: true,
  evidence: [
    "PR #87 merged on 2026-08-30; its body explicitly states Poincare.JIID remains unproved.",
    "Verified proof head afd61a176478e357d2e95ba8fcc1dbc3f6317367 has successful Lean Action CI, external-status-lock, and lean-proof-portfolio-classification workflow runs."
  ]
};

const dfmStatusRow = {
  name: "dfm-mkc-cosmology",
  domain: "Cosmology / DFM-MKC",
  status: "Status-Locked Frontier",
  integrity: 100,
  theoremClosure: 0,
  theoremClosureLabel: "bounded executable cosmology surface; unrestricted cosmology/gravity closure false",
  theoremMetricApplicable: false,
  closureScaleMetricApplicable: false,
  ci: "green",
  boundary: "PR #282 merged the bounded H0-normalized physical/code wavenumber conversion needed before any sigma8 or DESI projection; it changes no perturbation equations or observational claims. Open PR #281 remains a verifier-backed coercivity probe and explicitly stops at the first leading minor whose strict positivity is not established. No metric-potential coercivity, E_grav/boundary-flux comparison, absorption theorem, nonspherical gravity result, unrestricted cosmology closure, unrestricted gravity closure, or Clay-problem closure is claimed.",
  url: "https://github.com/inaciovasquez2020/dfm-mkc-cosmology",
  repository: "dfm-mkc-cosmology",
  repo: "dfm-mkc-cosmology",
  lastUpdate: "2026-08-30",
  summary: "The physical/code wavenumber unit map is verified on main; the prepared scalar coercivity route remains blocked by an unresolved strict-positivity obligation in the open probe.",
  latestArtifact: "H0-normalized physical/code wavenumber conversion",
  latestPr: "https://github.com/inaciovasquez2020/dfm-mkc-cosmology/pull/282",
  latestPR: 282,
  latestCommit: "2eafc76d3b8e7a7b57cb24e738c2d1dafcd605eb",
  currentOpenProbe: "https://github.com/inaciovasquez2020/dfm-mkc-cosmology/pull/281",
  currentOpenGap: "Strict positivity of the first unresolved leading minor in the prepared scalar canonical-energy coercivity probe.",
  theoremPromotion: false,
  publicInventory: true,
  evidence: [
    "PR #282 merged on 2026-08-30 from head 90a2c17a6040c238580c02b52486ebbb21a09bcd; CI, cosmology-check, external-status-lock, and Lean CI (disabled) all reported success.",
    "PR #281 remains open and its body explicitly says the coercivity probe fails at the first leading minor whose strict positivity is not established."
  ]
};

const zeroDayStatusRow = {
  name: "zero_day_restricted_closures",
  domain: "Restricted closure / Hyper-Kahler",
  status: "CONDITIONAL_REDUCTION_ONLY",
  integrity: 100,
  theoremClosure: 0,
  theoremClosureLabel: "conditional K3^[n] degree-four reduction only; unconditional ZeroDayClosure false",
  theoremMetricApplicable: false,
  closureScaleMetricApplicable: false,
  ci: "green",
  boundary: "Commit 42850917647dbd76421f382b7158a99b8b094df4 records the current n >= 4 K3^[n]-type ZeroDayClosure route as a conditional reduction. Under a finite monodromy-stable required-class inventory, SH-membership for every non-degree-four required class, and vanishing of the explicit degree-four c2/2 scalar obstruction, the repository reduces RequiredClassesSubsetSH to ZeroDayClosure. The repository does not independently establish finiteness of the required-class inventory, the required equivariant monodromy action, SH-membership for all non-degree-four required classes, or c2/2-obstruction vanishing for the actual required degree-four classes. Unconditional ZeroDayClosure for n >= 4 is not proved, and the stopped K3^[3] required-class inventory branch remains stopped.",
  url: "https://github.com/inaciovasquez2020/zero_day_restricted_closures",
  repository: "zero_day_restricted_closures",
  repo: "zero_day_restricted_closures",
  lastUpdate: "2026-08-31",
  summary: "The degree-four finite-orbit obstruction is reduced to one explicit c2/2 scalar inside a conditional K3^[n] closure route; four independent input obligations still block unconditional closure.",
  latestArtifact: "specializations/k3n_hodge/receipts/degree_four_closure_reduction_status.md",
  latestCommit: "42850917647dbd76421f382b7158a99b8b094df4",
  currentOpenGap: "Independently construct the required-class inventory/equivariant monodromy data and discharge SH-membership plus the actual degree-four c2/2 scalar-vanishing obligations.",
  theoremPromotion: false,
  publicInventory: true,
  evidence: [
    "Commit 42850917647dbd76421f382b7158a99b8b094df4 explicitly states that unconditional ZeroDayClosure for n >= 4 is not proved and lists the four missing inputs.",
    "GitHub reports four successful workflow runs and zero failed workflow runs on exact head 42850917647dbd76421f382b7158a99b8b094df4 as checked on 2026-08-31."
  ]
};

const biologicalStatusRow = {
  name: "biological-friction-framework",
  domain: "Biology / preclinical resistance-state framework",
  status: "LITERATURE_BOUNDED_PRECLINICAL_RESIDUAL_MAP",
  integrity: 100,
  theoremClosure: 0,
  theoremClosureLabel: "literature-bounded preclinical state map only; no treatment or cure claim",
  theoremMetricApplicable: false,
  closureScaleMetricApplicable: false,
  ci: "green",
  boundary: "PRs #18-#30 build a literature-bounded melanoma residual-state/control map spanning parallel PI3K/AKT survival, FAK-linked routes, SOX10-low vulnerabilities, adenosine escape, ferroptosis-state switching, CD36+ starved-like melanoma cells, NCSC, pigmented/MITF-high OXPHOS adaptation, BRAF-V600E therapy-induced CSE/H2S-persulfide survival, and an mTOR-supported ATF4-MTHFD2 DNA-repair/tolerance route under RAF/MEK pressure. PR #30 is the latest merged checkpoint and explicitly records that MAPK control alone does not absorb the mTOR-ATF4-MTHFD2 residual and that same-context epistasis with the existing PI3K/AKT abstraction is unproved. These documents organize preclinical evidence and residual boundaries only. They do not establish universal state coverage, clinical efficacy, patient-specific guidance, treatment sufficiency, safety, a cancer cure, or a repository-level biological theorem.",
  url: "https://github.com/inaciovasquez2020/biological-friction-framework",
  repository: "biological-friction-framework",
  repo: "biological-friction-framework",
  lastUpdate: "2026-08-31",
  summary: "The melanoma persistence/resistance map now includes an mTOR-ATF4-MTHFD2 tolerance residual not absorbed by MAPK control; whether existing PI3K/AKT coverage absorbs it in the same context remains open.",
  latestArtifact: "mTOR-ATF4-MTHFD2 unabsorbed residual",
  latestPr: "https://github.com/inaciovasquez2020/biological-friction-framework/pull/30",
  latestPR: 30,
  latestCommit: "17fb1a96af639cdc62fc0c2e1e29eea9b52008c2",
  currentOpenGap: "Same-context epistasis showing whether the mTOR-ATF4-MTHFD2 tolerance route is actually absorbed by the existing PI3K/AKT control abstraction; broader matched longitudinal MRD-state/dependency coverage also remains open.",
  theoremPromotion: false,
  publicInventory: true,
  evidence: [
    "PR #30 merged on 2026-08-31 from head 3c5f73f880c0f4908bc3af696bf06cd4d6efc466 and explicitly makes no treatment or cure claim.",
    "Exact PR #30 head 3c5f73f880c0f4908bc3af696bf06cd4d6efc466 passed canonical-surface and external-status-lock workflows."
  ]
};

const cslibStatusRow = {
  name: "cslib-fmt",
  domain: "Finite Model Theory / Formal Verification",
  status: "Status-Locked Frontier",
  integrity: 100,
  theoremClosure: 0,
  theoremClosureLabel: "verified bounded locality infrastructure; nontrivial distinct-assignment/Gaifman locality open",
  theoremMetricApplicable: false,
  closureScaleMetricApplicable: false,
  ci: "green",
  boundary: "PR #192 merged the concrete localPointedBackAndForthRefl witness at cb1236729be818e08823258c86309824d4ac8f5b. The construction uses equality of assignments, the identity pointed-neighborhood equivalence, and same-witness quantified extensions. This is the reflexive base case only. No nontrivial local pointed back-and-forth system between distinct assignments and no Gaifman locality theorem is proved. The separately tracked finite graph distance layer remains a bounded closed theorem surface and does not promote general finite-model-theory locality or directed distance symmetry.",
  url: "https://github.com/inaciovasquez2020/cslib-fmt",
  repository: "cslib-fmt",
  repo: "cslib-fmt",
  lastUpdate: "2026-08-05",
  summary: "PR #192 closes the reflexive local pointed back-and-forth base case; the next live frontier is a genuinely nontrivial witness between distinct assignments, before any Gaifman-locality theorem claim.",
  latestArtifact: "localPointedBackAndForthRefl",
  latestPr: "https://github.com/inaciovasquez2020/cslib-fmt/pull/192",
  latestPR: 192,
  latestCommit: "cb1236729be818e08823258c86309824d4ac8f5b",
  currentOpenGap: "Construct and verify a nontrivial LocalPointedBackAndForth witness between distinct assignments sufficient to advance the locality route beyond the reflexive base case.",
  theoremPromotion: false,
  publicInventory: true,
  evidence: [
    "PR #192 merged on 2026-08-05 from proof head 9c8d4f39f27db2369ebc44ecf1301c01f32db0a6 and explicitly limits the result to the reflexive base case.",
    "PR #192 records successful targeted Lean compilation, lake build, proof-portfolio classification, and external-status-lock verification."
  ]
};

const darknessStatusRow = {
  name: "darkness-region-dynamics-null-test",
  domain: "Falsification / Null-test schema",
  status: "CONDITIONAL_TEST_SCHEMA_ONLY_NO_NEW_PHYSICS_CLAIM",
  integrity: 100,
  theoremClosure: 0,
  theoremClosureLabel: "conditional null-test schema only; no real measurement or new-physics claim",
  theoremMetricApplicable: false,
  closureScaleMetricApplicable: false,
  ci: "green",
  boundary: "The repository defines a bounded conditional null-test schema for dark-region matter traversal. Its current main checkpoint ddf3c9267c38d2a217b2f67c83e75dadc53d2792 adds RealMeasurementAcquisitionPacketTarget and explicitly stops because the required real-measurement packet is absent. The expected checker state remains STATUS=RAW_REAL_MEASUREMENT_INPUTS_MISSING with MINIMAL_MISSING_OBJECT=RawRealMeasurementRecording. No real measured trajectory dataset, real null result, real anomaly, DarknessFieldD, darkness medium, or new-physics detection is established.",
  url: "https://github.com/inaciovasquez2020/darkness-region-dynamics-null-test",
  repository: "darkness-region-dynamics-null-test",
  repo: "darkness-region-dynamics-null-test",
  lastUpdate: "2026-06-23",
  summary: "The null-test apparatus/schema is defined, but the repository remains stopped at acquisition of a concrete real-measurement packet before any empirical null-result or anomaly check can run.",
  latestArtifact: "RealMeasurementAcquisitionPacketTarget",
  latestCommit: "ddf3c9267c38d2a217b2f67c83e75dadc53d2792",
  currentOpenGap: "Acquire the concrete real measurement packet with raw recording, calibrated metadata, extracted boundary observations, and explicit uncertainty information required by the fail-closed checker.",
  theoremPromotion: false,
  publicInventory: true,
  evidence: [
    "README status remains CONDITIONAL_TEST_SCHEMA_ONLY_NO_NEW_PHYSICS_CLAIM and explicitly says no real null result, real anomaly, DarknessFieldD, darkness medium, or new physics is claimed.",
    "Commit ddf3c9267c38d2a217b2f67c83e75dadc53d2792 records REAL_MEASUREMENT_ACQUISITION_PACKET_TARGET_ONLY and expects tools/check_real_measurement_inputs.py to stop with RAW_REAL_MEASUREMENT_INPUTS_MISSING."
  ]
};

const withPoincare = existing.some((entry) => entry.name === poincareStatusRow.name)
  ? existing
  : [...existing, poincareStatusRow];
const withDfm = withPoincare.some((entry) => entry.name === dfmStatusRow.name)
  ? withPoincare
  : [...withPoincare, dfmStatusRow];
const withZeroDay = withDfm.some((entry) => entry.name === zeroDayStatusRow.name)
  ? withDfm
  : [...withDfm, zeroDayStatusRow];
const withBiological = withZeroDay.some((entry) => entry.name === biologicalStatusRow.name)
  ? withZeroDay.map((entry) => entry.name === biologicalStatusRow.name ? biologicalStatusRow : entry)
  : [...withZeroDay, biologicalStatusRow];
const withCslib = withBiological.some((entry) => entry.name === cslibStatusRow.name)
  ? withBiological.map((entry) => entry.name === cslibStatusRow.name ? cslibStatusRow : entry)
  : [...withBiological, cslibStatusRow];
const statusRows = withCslib.some((entry) => entry.name === darknessStatusRow.name)
  ? withCslib.map((entry) => entry.name === darknessStatusRow.name ? darknessStatusRow : entry)
  : [...withCslib, darknessStatusRow];

const fo4CurrentBoundary = "FO4 constraint-isolation remains OPEN_PROBLEM_REQUIRED. Constraint isolation is recorded as a status boundary, not theorem closure. Commit b1a3129b24fd17f5c821552a8feb233968a51cda adds FINITE_WITNESS_SEARCH_TARGET_ONLY for FO4FiniteCycleOverlapWitnessSearch below FO4CycleOverlapRankRigidityDichotomy; it does not solve the rigidity branch or the counterexample-family branch. The bounded search remains blocked until this repository contains formal definitions of the FO4 radius-R rooted local type and R-local cycle-overlap rank, a verified finite graph enumerator or externally supplied finite witness corpus, and a proof that the finite proxy agrees with the intended FO4/rank definitions on the searched class. No unrestricted graph rigidity closure. No Cayley-graph rigidity closure. No Chronos-RR closure. No H4.1/FGL closure. No UniversalFiberEntropyGap closure. No P vs NP or Clay-problem closure.";

const urf11CurrentBoundary = "URF-11 translation/subproblem registry remains dependency-surface tracking only. Registry closure means non-claim tracking and boundary-preserving reduction bookkeeping only. The canonical artifact at commit ed3e5b9e413f6b8d791a7531994b0527e5d1cd08 registers the FO4 constraint-isolation and Chronos selected-carrier dependency surfaces while theorem_closure remains false. No theorem-level translation closure. No upstream mathematical closure. No unrestricted graph-rigidity theorem. No unrestricted Cayley-graph rigidity theorem. No Chronos-RR closure. No unrestricted Chronos-RR closure. No H4.1/FGL closure. No UniversalFiberEntropyGap theorem. No UniversalFiberEntropyGap closure. No P vs NP. No P vs NP or Clay-problem closure.";

const chronosBoundaryPrefix = "CURRENT_GRAVITY_STATUS_2026_08_31:";
const chronosCurrentBoundary = `${chronosBoundaryPrefix} PR #1299 closes anchored radial momentum recovery in the bounded gravity route using explicit anchor value, radial source profile, and gravitational normalization inputs; those inputs are not derived from the current Cauchy carrier. PR #1300 adds a fail-closed gravity axiom audit and compiler-verified Newtonian-gauge proof-surface repairs; the audited endpoint theorems report only propext, Classical.choice, and Quot.sound, with no custom axiom introduced. PR #1300 does not supply the separate physical/analytic source-control estimate. The remaining gap is a repository-native estimate controlling the selected matter momentum source by gravitational energy and/or boundary flux strongly enough to instantiate the existing source bound. No unrestricted gravity closure, Cosmic Censorship proof, Hoop Conjecture proof, unrestricted Chronos-RR closure, H4.1/FGL closure, P vs NP closure, or Clay-problem closure follows.`;

const urfCoreBoundary = "CURRENT_URF_CORE_STATUS_2026_08_07: PR #534 synchronizes the current Lean-source obligation inventory to 5 axioms, 0 admits, and 0 sorry terms; the five remaining axioms are confined to the legacy prefab surface. PR #535 proves the repository-defined three-element arithmetic family has sharp uniform coercivity constant 1/2, including an exact equality witness, but does not establish an arithmetic-to-spectral bridge for a broader family or any unrestricted URF theorem. PR #536 makes URF-SG schema validation fail closed and strengthens certificate admission/container trust semantics without strengthening the mathematical spectral-gap theorem represented by a valid certificate. No whole-URF theorem closure, no CRR closure, no H4.1/FGL closure, unrestricted graph-rigidity closure, no P vs NP closure, and no Clay-problem closure follows.";
const urfCoreLatestEvidence = "PR #535 proof head 8f0467d693c22232ec5b637830dc495f2f57b9a2 passed CI, build, Lean Action CI, verify-surface, external-status-lock, lean-proof-portfolio-classification, zero-overclaim, and duplicate-namespace checks; PR #536 head f9498e9bb272d66ce5dc5d23ca88bdc3f17aa9ac passed the same verifier/build surface.";

const currentStatusRows = statusRows.map((entry) => {
  const isFo4Root =
    entry.id === "fo4-constraint-isolation" &&
    entry.repository === "inaciovasquez2020/fo4-constraint-isolation";

  if (isFo4Root) {
    return {
      ...entry,
      boundary: fo4CurrentBoundary,
    };
  }

  const isUrf11Root =
    entry.id === "urf-11-translation-subproblem-registry" &&
    entry.url === "https://github.com/inaciovasquez2020/urf-11-translation-subproblem-registry";

  if (isUrf11Root) {
    return {
      ...entry,
      boundary: urf11CurrentBoundary,
    };
  }

  const isUrfCoreRoot =
    entry.name === "urf-core" &&
    entry.domain === "Foundations" &&
    entry.url === "https://github.com/inaciovasquez2020/urf-core";

  if (isUrfCoreRoot) {
    const evidence = Array.isArray(entry.evidence) ? entry.evidence : [];
    return {
      ...entry,
      status: "BOUNDED_SHARP_COERCIVITY_AND_FAIL_CLOSED_VERIFIER",
      boundary: urfCoreBoundary,
      lastUpdate: "2026-08-07",
      summary: "Current source inventory is 5 axioms / 0 admits / 0 sorries; the sharp 1/2 coercivity constant is proved for the repository-defined three-element arithmetic family, and SG certificate admission now fails closed.",
      latestArtifact: "sharp arithmetic coercivity constant + fail-closed URF-SG verifier",
      latestPr: "https://github.com/inaciovasquez2020/urf-core/pull/536",
      latestPR: 536,
      latestCommit: "40eade50f16b70fdccd2e96dd29c6c5ab9fbff0d",
      axiomCount: 5,
      admitCount: 0,
      sorryCount: 0,
      theoremClosureLabel: "72% — dashboard readiness scale; unrestricted theorem closure false",
      currentOpenGap: "Establish a non-circular arithmetic-to-spectral bridge beyond the repository-defined three-element family and discharge or quarantine the five remaining legacy prefab axioms before any broader URF theorem claim.",
      theoremPromotion: false,
      evidence: evidence.includes(urfCoreLatestEvidence) ? evidence : [urfCoreLatestEvidence, ...evidence],
    };
  }

  const isChronosRoot =
    entry.name === "chronos-urf-rr" &&
    entry.domain === "Complexity / Graph Rigidity" &&
    entry.url === "https://github.com/inaciovasquez2020/chronos-urf-rr";

  if (!isChronosRoot) return entry;

  const boundary = String(entry.boundary).startsWith(chronosBoundaryPrefix)
    ? entry.boundary
    : `${chronosCurrentBoundary} Historical boundary: ${entry.boundary}`;
  const evidence = Array.isArray(entry.evidence) ? entry.evidence : [];
  const previousLatestEvidence = "PR #1299 merged on 2026-08-30 at cd4f0e91416ab897bf6c3c6c897f038d8d588df4; proof head 28a740054be95cdc1b278ff949171f535ee4b2e9 passed CI and external-status-lock.";
  const evidenceWithoutPreviousLatest = evidence.filter((item) => item !== previousLatestEvidence);
  const latestEvidence = "PR #1300 merged on 2026-08-31 at ce83fd1965f131a6b37cf9583495e2498feb330d; proof head a0ac2e155762eeb6225699cd270b61cdae6fd593 passed CI and external-status-lock.";

  return {
    ...entry,
    status: "Status-Locked Frontier",
    boundary,
    currentGravityUpdate: "2026-08-31",
    latestGravityPr: "https://github.com/inaciovasquez2020/chronos-urf-rr/pull/1300",
    latestGravityCommit: "ce83fd1965f131a6b37cf9583495e2498feb330d",
    currentGravityGap: "Repository-native matter-momentum-source control by gravitational energy and/or boundary flux sufficient to instantiate the existing source bound.",
    evidence: evidenceWithoutPreviousLatest.includes(latestEvidence) ? evidenceWithoutPreviousLatest : [latestEvidence, ...evidenceWithoutPreviousLatest],
  };
});

const enriched = currentStatusRows
  .filter((entry) => !entry.publicInventory || entry.domain !== "Public Repository")
  .map((entry) => {
    const repo = publicByName.get(entry.name);
    if (!repo) return entry;

    return {
      ...entry,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      defaultBranch: repo.default_branch,
      updatedAt: repo.updated_at,
      publicInventory: true,
    };
  });

const inventory = publicRepos.map((repo) => ({
  name: repo.name,
  url: repo.html_url,
  defaultBranch: repo.default_branch,
}));

await fs.writeFile(inventoryPath, JSON.stringify(inventory, null, 2) + "\n");
await fs.writeFile(existingPath, JSON.stringify(enriched, null, 2) + "\n");
console.log(`Updated ${existingPath} and ${inventoryPath} from ${publicRepos.length} public repositories`);
