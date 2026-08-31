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
const enriched = [...existing];

for (const repo of publicRepos) {
  const metadata = {
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    defaultBranch: repo.default_branch,
    updatedAt: repo.updated_at,
    publicInventory: true,
  };

  const index = enriched.findIndex((entry) => entry.name === repo.name);

  if (index >= 0) {
    enriched[index] = {
      ...enriched[index],
      ...metadata,
    };
    continue;
  }

  enriched.push({
    name: repo.name,
    domain: "Public Repository",
    status: "Status-Locked Frontier",
    integrity: 0,
    theoremClosure: 0,
    ci: "yellow",
    boundary:
      "Public repository indexed automatically. Repository visibility and metadata do not imply theorem-level closure, CI success, or scientific validation.",
    repository: repo.name,
    repo: repo.name,
    theoremClosureLabel: "not assessed — repository inventory row",
    theoremMetricApplicable: false,
    closureScaleMetricApplicable: false,
    ...metadata,
  });
}

const inventory = publicRepos.map((repo) => ({
  name: repo.name,
  url: repo.html_url,
  defaultBranch: repo.default_branch,
}));

await fs.writeFile(inventoryPath, JSON.stringify(inventory, null, 2) + "\n");
await fs.writeFile(existingPath, JSON.stringify(enriched, null, 2) + "\n");
console.log(`Updated ${existingPath} and ${inventoryPath} from ${publicRepos.length} public repositories`);
