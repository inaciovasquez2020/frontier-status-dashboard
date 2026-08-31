import fs from "node:fs/promises";

const statusPath = "src/data/status-data.json";
const rows = JSON.parse(await fs.readFile(statusPath, "utf8"));

const row = {
  name: "inaciovasquez2020.github.io",
  domain: "Documentation / Website Surface",
  status: "DOCUMENTATION_WEBSITE_SURFACE_ONLY",
  integrity: 100,
  theoremClosure: 0,
  theoremClosureLabel: "public research portal/documentation surface only; website publication is not theorem proof",
  theoremMetricApplicable: false,
  closureScaleMetricApplicable: false,
  ci: "green",
  boundary: "Current main commit 15a0b7a277a7935e291af75e6fe475bfe19ec45c publishes the Vasquez Index page and retains the canonical public research portal/verification path. The README formally classifies this repository as a Documentation / Website Surface and requires every theorem-level claim to inherit from an identified buildable formal source repository. Website publication, GitHub Pages deployment, dashboards, badges, ledgers, or index pages do not constitute theorem-level proof. This repository does not independently prove mathematical claims, Chronos-RR, H4.1/FGL, P vs NP, or any Clay problem.",
  url: "https://github.com/inaciovasquez2020/inaciovasquez2020.github.io",
  repository: "inaciovasquez2020.github.io",
  repo: "inaciovasquez2020.github.io",
  lastUpdate: "2026-06-22",
  summary: "Canonical GitHub Pages research portal and verification path; it routes readers to source repositories and does not independently establish theorem truth.",
  latestArtifact: "public research portal / Vasquez Index page",
  latestCommit: "15a0b7a277a7935e291af75e6fe475bfe19ec45c",
  theoremPromotion: false,
  publicInventory: true,
  evidence: [
    "README Formal Status says Documentation / Website Surface and explicitly states that the repository does not independently prove mathematical claims.",
    "The verify workflow completed successfully on exact main head 15a0b7a277a7935e291af75e6fe475bfe19ec45c."
  ]
};

const next = rows.some((entry) => entry.name === row.name)
  ? rows.map((entry) => entry.name === row.name ? row : entry)
  : [...rows, row];

await fs.writeFile(statusPath, JSON.stringify(next, null, 2) + "\n");
console.log("Migrated inaciovasquez2020.github.io root status row");
