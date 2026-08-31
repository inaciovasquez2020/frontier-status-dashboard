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

const withPoincare = existing.some((entry) => entry.name === poincareStatusRow.name)
  ? existing
  : [...existing, poincareStatusRow];
const statusRows = withPoincare.some((entry) => entry.name === dfmStatusRow.name)
  ? withPoincare
  : [...withPoincare, dfmStatusRow];

const chronosBoundaryPrefix = "CURRENT_GRAVITY_STATUS_2026_08_30:";
const chronosCurrentBoundary = `${chronosBoundaryPrefix} PR #1299 closes anchored radial momentum recovery in the bounded gravity route using explicit anchor value, radial source profile, and gravitational normalization inputs. Those inputs are not derived from the current Cauchy carrier. The remaining physical/analytic gap is a repository-native estimate controlling the selected matter momentum source by gravitational energy and/or boundary flux strongly enough to instantiate the existing source bound. No unrestricted gravity closure, Cosmic Censorship proof, Hoop Conjecture proof, unrestricted Chronos-RR closure, H4.1/FGL closure, P vs NP closure, or Clay-problem closure follows.`;

const currentStatusRows = statusRows.map((entry) => {
  const isChronosRoot =
    entry.name === "chronos-urf-rr" &&
    entry.domain === "Complexity / Graph Rigidity" &&
    entry.url === "https://github.com/inaciovasquez2020/chronos-urf-rr";

  if (!isChronosRoot) return entry;

  const boundary = String(entry.boundary).startsWith(chronosBoundaryPrefix)
    ? entry.boundary
    : `${chronosCurrentBoundary} Historical boundary: ${entry.boundary}`;
  const evidence = Array.isArray(entry.evidence) ? entry.evidence : [];
  const latestEvidence = "PR #1299 merged on 2026-08-30 at cd4f0e91416ab897bf6c3c6c897f038d8d588df4; proof head 28a740054be95cdc1b278ff949171f535ee4b2e9 passed CI and external-status-lock.";

  return {
    ...entry,
    boundary,
    currentGravityUpdate: "2026-08-30",
    latestGravityPr: "https://github.com/inaciovasquez2020/chronos-urf-rr/pull/1299",
    latestGravityCommit: "cd4f0e91416ab897bf6c3c6c897f038d8d588df4",
    currentGravityGap: "Repository-native matter-momentum-source control by gravitational energy and/or boundary flux sufficient to instantiate the existing source bound.",
    evidence: evidence.includes(latestEvidence) ? evidence : [latestEvidence, ...evidence],
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
