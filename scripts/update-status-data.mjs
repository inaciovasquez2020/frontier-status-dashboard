import fs from "node:fs/promises";

const repos = [
  "urf-core",
  "chronos-urf-rr",
  "ym-os-quantization",
  "clay-problem-lab",
  "poincare-new-derivation",
  "biological-friction-framework"
];

const owner = "inaciovasquez2020";
const existingPath = "src/data/status-data.json";
const existing = JSON.parse(await fs.readFile(existingPath, "utf8"));
const byName = new Map(existing.map((repo) => [repo.name, repo]));

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

const enriched = [];

for (const name of repos) {
  const base = byName.get(name);
  const repo = await github(`/repos/${owner}/${name}`);
  enriched.push({
    ...base,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    defaultBranch: repo.default_branch,
    updatedAt: repo.updated_at
  });
}

await fs.writeFile(existingPath, JSON.stringify(enriched, null, 2) + "\n");
console.log(`Updated ${existingPath}`);
