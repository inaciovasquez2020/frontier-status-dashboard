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

it("records the YM-OS LSI-Herbst frontier without closure promotion", () => {
  const ym = repos.find((repo) => repo.name === "ym-os-quantization");
  expect(ym).toBeDefined();
  expect(ym?.integrity).toBeGreaterThanOrEqual(98);
  expect(ym?.theoremClosure).toBeGreaterThanOrEqual(67);
  expect(ym?.boundary).toContain("LSI/gradient/Herbst dependency surface");
  expect(ym?.boundary).toContain("FRONTIER_OPEN is preserved");

});

it("keeps YM-OS from claiming Yang-Mills closure", () => {
  const ym = repos.find((repo) => repo.name === "ym-os-quantization");
  expect(ym?.boundary).toContain("no Uniform LSI");
  expect(ym?.boundary).toContain("no Yang-Mills closure is claimed");
});

it("records the YMOS theorem obligation registry update", () => {
  const ym = repos.find((repo) => repo.name === "ym-os-quantization");
  expect(ym).toBeDefined();
  expect(ym?.integrity).toBe(99);
  expect(ym?.theoremClosure).toBeGreaterThanOrEqual(69);
  expect(ym?.boundary).toMatch(/PRs #13-#1[67]/);
  expect(ym?.boundary).toContain("YMOS-001 through YMOS-010 theorem-obligation registry");
});

it("keeps YMOS registry obligations open on the dashboard", () => {
  const ym = repos.find((repo) => repo.name === "ym-os-quantization");
  expect(ym?.boundary).toContain("FRONTIER_OPEN is preserved");
  expect(ym?.boundary).toMatch(/no (obligation|bridge target) marked PROVED/);
  expect(ym?.boundary).toMatch(/no (obligation|bridge target) marked CONDITIONAL_CLOSED/);
  expect(ym?.boundary).toContain("no Yang-Mills closure is claimed");
});

it("records the YMOS probabilistic bridge contract update", () => {
  const ym = repos.find((repo) => repo.name === "ym-os-quantization");
  expect(ym).toBeDefined();
  expect(ym?.integrity).toBe(99);
  expect(ym?.theoremClosure).toBe(70);
  expect(ym?.boundary).toContain("PRs #13-#17");
  expect(ym?.boundary).toContain("YMOS probabilistic bridge contract");
});

it("keeps YMOS probabilistic bridge targets unproved", () => {
  const ym = repos.find((repo) => repo.name === "ym-os-quantization");
  expect(ym?.boundary).toContain("FRONTIER_OPEN is preserved");
  expect(ym?.boundary).toContain("no Herbst proof");
  expect(ym?.boundary).toContain("no Laplace-to-even-moment proof");
  expect(ym?.boundary).toContain("no product-moment proof");
  expect(ym?.boundary).toContain("no bridge target marked PROVED");
  expect(ym?.boundary).toContain("no bridge target marked CONDITIONAL_CLOSED");
  expect(ym?.boundary).toContain("no Yang-Mills closure is claimed");
});
  it("records the Chronos SiMSLV weakest frontier lemma update", () => {
    const chronos = repos.find((repo) => repo.name === "chronos-urf-rr");
    const latestUpdate = (chronos as { latestUpdate?: string } | undefined)?.latestUpdate;
    expect(latestUpdate).toContain("SiMSLV weakest frontier lemma");
    expect(latestUpdate).toContain("PR #97");
  });





  it("prevents NaN dashboard averages for metadata and Chronos prefix entries", () => {
    const repositoryIndex = repos.find((repo) => repo.name === "Repository Index Snapshot");
    const chronosPrefix = repos.find(
      (repo) => repo.name === "chronos-prefix-conditioning-embedding-2026-05-03",
    );

    expect(repositoryIndex?.integrity).toBe(100);
    expect(repositoryIndex?.theoremClosure).toBe(0);
    expect(repositoryIndex?.ci).toBe("green");

    expect(chronosPrefix?.integrity).toBe(99);
    expect(chronosPrefix?.theoremClosure).toBe(79);
    expect(chronosPrefix?.ci).toBe("green");

    expect(Number.isNaN(average(repos.map((repo) => repo.integrity)))).toBe(false);
    expect(Number.isNaN(average(repos.map((repo) => repo.theoremClosure)))).toBe(false);
  });

  it("visually surfaces Chronos prefix-conditioning embedding dashboard update", () => {
    const match = repos.find(
      (repo) => repo.name === "chronos-prefix-conditioning-embedding-2026-05-03",
    );

    expect(match).toBeDefined();
    expect(match?.domain).toBe("Chronos");
    expect(match?.status).toBe("CONDITIONAL_PREFIX_EMBEDDING_REDUCTION");
    expect(match?.boundary).toContain("Conditional prefix-embedding reduction only");
    expect(match?.boundary).toContain("Does not prove P vs NP");
    expect(match?.boundary).toContain("Does not prove terminal Chronos lower bound");
  });

  it("keeps Chronos H4.1/FGL theorem-level closure open", () => {
    const chronos = repos.find((repo) => repo.name === "chronos-urf-rr");
    expect(chronos?.boundary).toContain("FRONTIER_OPEN is preserved");
    expect(chronos?.boundary).toContain("No theorem-level H4.1/FGL closure");
    expect(chronos?.theoremClosure).toBeLessThan(100);
  });

});
it("includes Chronos prefix-conditioning embedding dashboard update", () => {
  const dataText = JSON.stringify(repos);
  expect(dataText).toContain("chronos-prefix-conditioning-embedding-2026-05-03");
  expect(dataText).toContain("CONDITIONAL_PREFIX_EMBEDDING_REDUCTION");
  expect(dataText).toContain("PrefixEmb_{n#} zeta = mu_n");
  expect(dataText).not.toContain("terminal Chronos lower bound is proved");
  expect(dataText).not.toContain("P vs NP is proved");
});

