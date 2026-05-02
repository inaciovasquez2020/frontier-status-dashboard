import { describe, expect, it } from "vitest";
import { average, filterRepos, repos, uniqueDomains } from "./App";

describe("frontier status dashboard helpers", () => {
  it("extracts unique domains with All first", () => {
    expect(uniqueDomains(repos)[0]).toBe("All");
    expect(uniqueDomains(repos)).toContain("Foundations");
  });

  it("filters by RA1n query", () => {
    expect(filterRepos(repos, "RA1n", "All").map((repo) => repo.name)).toEqual(["clay-problem-lab"]);
  });

  it("filters by exact domain", () => {
    expect(filterRepos(repos, "", "Mathematical Physics").map((repo) => repo.name)).toEqual(["ym-os-quantization"]);
  });

  it("computes rounded average", () => {
    expect(average([94, 96, 98])).toBe(96);
  });

  it("returns zero for empty averages", () => {
    expect(average([])).toBe(0);
  });

  it("keeps all repository urls on GitHub", () => {
    expect(repos.every((repo) => repo.url.startsWith("https://github.com/"))).toBe(true);
  });
});
