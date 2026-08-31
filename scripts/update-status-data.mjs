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

const statusRows = existing.some((entry) => entry.name === poincareStatusRow.name)
  ? existing
  : [...existing, poincareStatusRow];

const enriched = statusRows
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
