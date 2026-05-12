import { describe, expect, it } from "vitest";
import { average, filterRepos, repos, uniqueDomains, publicRepos } from "./App";describe("frontier status dashboard public/private policy", () => {
  it("keeps helper functions operational on the remaining public rows", () => {
    expect(uniqueDomains(repos)[0]).toBe("All");
    expect(filterRepos(repos, "Chronos", "All").some((repo) => repo.name === "chronos-urf-rr")).toBe(true);
    expect(average([])).toBe(0);
  });

  it("keeps public repository urls on GitHub", () => {
    const publicRows = repos.filter((repo) => !repo.metadataOnly);
    expect(publicRows.every((repo) => repo.url.startsWith("https://github.com/"))).toBe(true);
  });

  it("records the internal aggregate row without exposing private repository metadata", () => {
    const internal = repos.find((repo) => repo.name === "Private/Internal Verification Surfaces");

    expect(internal).toBeDefined();
    expect(internal?.metadataOnly).toBe(true);
    expect(internal?.excludeFromMetrics).toBe(true);
    expect(internal?.status).toBe("INTERNAL_AGGREGATE_ONLY");
    expect(internal?.boundary).toContain("Private repository metadata is intentionally omitted");
    expect(internal?.boundary).toContain("no theorem-level closure is claimed unless explicitly public and inspectable");
  });

  it("excludes internal aggregate rows from dashboard metrics", () => {
    const metricRepos = repos.filter((repo) => !repo.metadataOnly && !repo.excludeFromMetrics);

    expect(metricRepos.some((repo) => repo.name === "Private/Internal Verification Surfaces")).toBe(false);
    expect(metricRepos.every((repo) => typeof repo.integrity === "number")).toBe(true);
    expect(metricRepos.every((repo) => typeof repo.theoremClosure === "number")).toBe(true);
  });

  it("preserves Chronos theorem-level boundary language", () => {
    const chronos = repos.find((repo) => repo.name === "chronos-urf-rr");

    expect(chronos).toBeDefined();
    expect(chronos?.boundary).toContain("No theorem-level H4.1/FGL closure");
    expect(chronos?.boundary).toContain("FRONTIER_OPEN is preserved");
    expect(chronos?.boundary).toContain("No UniversalFiberEntropyGap from Reg-SNF");
    expect(JSON.stringify(chronos)).toContain("https://github.com/inaciovasquez2020/chronos-urf-rr/pull/199");
    expect(chronos?.theoremClosure).toBe(82);
    expect(chronos?.theoremMetricApplicable).toBe(false);
    expect(chronos?.theoremClosureLabel).toContain("unrestricted theorem closure false");
  });

  it("does not expose removed private/non-public row names", () => {
    const dataText = JSON.stringify(repos);

    [
      "ym-os-quantization",
      "clay-problem-lab",
      "poincare-new-derivation",
      "biological-friction-framework",
      "CorrRank",
      "overlap-rigidity-lean-dev",
      "urf-axioms",
      "capacity-locality-certification",
      "pachner-invariant",
      "Operational-Wavefunction-Collapse",
      "whiplash-stability",
      "flagship-lean",
      "aiv-verifier-public"
    ].forEach((name) => expect(dataText).not.toContain(name));
  });
});

it("public dashboard excludes internal aggregate rows from rendered rows", () => {
  expect(repos.some((repo) => repo.metadataOnly || repo.excludeFromMetrics)).toBe(true);
  expect(publicRepos.some((repo) => repo.metadataOnly || repo.excludeFromMetrics)).toBe(false);
  expect(publicRepos.some((repo) => repo.name === "Internal")).toBe(false);
  expect(publicRepos.some((repo) => String(repo.status) === "INTERNAL_AGGREGATE_ONLY")).toBe(false);
});

it("computes the aggregate as a visible closure-scale average, not theorem promotion", () => {
  const metricRepos = repos.filter((repo) => !repo.metadataOnly && !repo.excludeFromMetrics);
  const closureScaleAverage = average(metricRepos.map((repo) => repo.theoremClosure));

  expect(metricRepos.length).toBeGreaterThan(0);
  expect(metricRepos.every((repo) => typeof repo.theoremClosure === "number")).toBe(true);
  expect(closureScaleAverage).toBeGreaterThan(0);
  expect(repos.find((repo) => repo.name === "chronos-urf-rr")?.theoremMetricApplicable).toBe(false);
});
