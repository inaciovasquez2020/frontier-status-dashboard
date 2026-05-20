import { describe, expect, it } from "vitest";
import statusData from "./data/status-data.json";

type Repo = {
  name: string;
  status: string;
  boundary: string;
  metadataOnly?: boolean;
  excludeFromMetrics?: boolean;
};

const rows = statusData as Repo[];

const detailPublicRepos = rows.filter(
  (repo) =>
    !repo.metadataOnly &&
    repo.name !== "Internal" &&
    String(repo.status) !== "INTERNAL_AGGREGATE_ONLY",
);

const minimalProgramNames = new Set([
  "urf-core",
  "chronos-urf-rr",
  "urf-textbook",
  "vasquez-index",
  "FO4 Constraint Isolation",
  "URF-11 Translation Subproblem Registry",
]);

const minimalPublicRepos = detailPublicRepos.filter((repo) =>
  minimalProgramNames.has(repo.name),
);

describe("minimal public dashboard mode", () => {
  it("keeps the default public surface smaller than the detailed row set", () => {
    expect(minimalPublicRepos.length).toBeGreaterThan(0);
    expect(detailPublicRepos.length).toBeGreaterThan(minimalPublicRepos.length);
  });

  it("keeps top-level program rows in the minimal public front door", () => {
    const names = minimalPublicRepos.map((repo) => repo.name);

    expect(names).toContain("urf-core");
    expect(names).toContain("chronos-urf-rr");
    expect(names).toContain("urf-textbook");
  });

  it("hides PR-level Chronos rows from the minimal public front door", () => {
    expect(minimalPublicRepos.every((repo) => !repo.name.startsWith("Chronos PR #"))).toBe(true);
  });

  it("preserves claim-boundary text on every minimal row", () => {
    expect(minimalPublicRepos.every((repo) => repo.boundary.length > 0)).toBe(true);
  });
});
