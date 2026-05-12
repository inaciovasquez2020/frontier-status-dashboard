import { describe, expect, it } from "vitest";
import repos from "./data/status-data.json";

const requiredPublicRepositoryUrls = [
  "https://github.com/inaciovasquez2020/frontier-status-dashboard",
  "https://github.com/inaciovasquez2020/fo4-constraint-isolation",
  "https://github.com/inaciovasquez2020/chronos-urf-rr",
  "https://github.com/inaciovasquez2020/vasquez-index",
  "https://github.com/inaciovasquez2020/urf-core",
  "https://github.com/inaciovasquez2020/urf-11-translation-subproblem-registry",
  "https://github.com/inaciovasquez2020/inaciovasquez2020",
  "https://github.com/inaciovasquez2020/urf-textbook",
];

describe("public GitHub repository surface", () => {
  it("covers every public repository listed on the public GitHub repositories tab by URL", () => {
    const urls = new Set(repos.map((repo) => repo.url));

    for (const url of requiredPublicRepositoryUrls) {
      expect(urls.has(url)).toBe(true);
    }
  });

  it("keeps profile and index rows non-theorem-bearing", () => {
    for (const url of [
      "https://github.com/inaciovasquez2020/inaciovasquez2020",
      "https://github.com/inaciovasquez2020/vasquez-index",
    ]) {
      const row = repos.find((repo) => repo.url === url);
      expect(row?.theoremClosure).toBe(0);
      expect(row?.theoremMetricApplicable).toBe(false);
      expect(row?.boundary).toContain("no theorem claim is promoted");
      expect(row?.boundary).toContain("no P vs NP result");
      expect(row?.boundary).toContain("no Clay-problem closure");
    }
  });
});
