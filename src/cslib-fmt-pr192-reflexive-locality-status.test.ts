import { describe, expect, it } from "vitest";

import statusData from "./data/status-data.json";

describe("cslib-fmt PR #192 reflexive locality dashboard status", () => {
  it("records the reflexive base case without promoting nontrivial locality", () => {
    const row = statusData.find(
      (entry) => entry.id === "finite-graph-distance-layer-2026-06-02",
    );

    expect(row).toBeDefined();
    expect(row?.latestPR).toBe(192);
    expect(row?.latestPr).toBe(
      "https://github.com/inaciovasquez2020/cslib-fmt/pull/192",
    );
    expect(row?.latestCommit).toBe(
      "cb1236729be818e08823258c86309824d4ac8f5b",
    );
    expect(row?.latestArtifact).toBe("localPointedBackAndForthRefl");
    expect(row?.lastUpdate).toBe("2026-08-05");

    expect(row?.summary).toContain("reflexive local pointed back-and-forth witness");
    expect(row?.boundary).toContain("equality of assignments");
    expect(row?.boundary).toContain("identity pointed-neighborhood equivalence");
    expect(row?.boundary).toContain("reflexive base case only");
    expect(row?.boundary).toContain(
      "no nontrivial witness between distinct assignments",
    );
    expect(row?.boundary).toContain("no Gaifman locality theorem");

    expect(row?.status).toBe("GLOBAL_TRIANGLE_CLOSED");
    expect(row?.theoremClosure).toBe(100);
    expect(row?.boundary).toContain(
      "GlobalDistanceTriangleTheoremUnconditionalOnSLASH",
    );
    expect(row?.boundary).toContain("directed symmetry is not closed");
  });
});
