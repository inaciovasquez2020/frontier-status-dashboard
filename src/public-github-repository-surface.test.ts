import repos from "./data/status-data.json";

const requiredPublicRepositories = [
  "frontier-status-dashboard",
  "chronos-urf-rr",
  "urf-core",
  "inaciovasquez2020",
  "vasquez-index",
  "urf-textbook",
];

describe("public GitHub repository surface", () => {
  it("covers every public repository listed on the public GitHub repositories tab", () => {
    const names = new Set(repos.map((repo) => repo.name));

    for (const name of requiredPublicRepositories) {
      expect(names.has(name)).toBe(true);
    }
  });

  it("keeps profile and index rows non-theorem-bearing", () => {
    for (const name of ["inaciovasquez2020", "vasquez-index"]) {
      const row = repos.find((repo) => repo.name === name);
      expect(row?.theoremClosure).toBe(0);
      expect(row?.theoremMetricApplicable).toBe(false);
      expect(row?.boundary).toContain("no theorem claim is promoted");
      expect(row?.boundary).toContain("no P vs NP result");
      expect(row?.boundary).toContain("no Clay-problem closure");
    }
  });
});
