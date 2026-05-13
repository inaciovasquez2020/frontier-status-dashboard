import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

describe("Chronos PR254 rank/ambient datum dashboard status", () => {
  const chronos = statusData.find((row) => row.name === "chronos-urf-rr");

  it("records PR254 without theorem promotion", () => {
    expect(chronos).toBeTruthy();
    expect(chronos?.status).toBe("LEAN_LIBRARY_TARGET_EXPOSED");
    expect(chronos?.latestDataSurfaceStatus).toBe("CONDITIONAL_EXTERNAL_DATA_ASSUMPTION_ONLY");
    expect(chronos?.integrity).toBe(100);
    expect(chronos?.theoremClosure).toBe(82);
    expect(chronos?.latestPrUrl).toBe(
      "https://github.com/inaciovasquez2020/chronos-urf-rr/pull/254",
    );
    expect(chronos?.latestArtifact).toBe("RepositoryNativeRankAmbientDatum");
  });

  it("preserves boundary guards", () => {
    const boundary = `${chronos?.boundary ?? ""} ${(chronos?.remainingBoundary ?? []).join(" ")}`;

    expect(boundary).toContain("Metadata is not theorem-level source validity");
    expect(boundary).toContain("Importer is not formalized in Lean");
    expect(boundary).toContain("No unconditional SemanticRankRateCertificate");
    expect(boundary).toContain("No unrestricted UniversalFiberEntropyGap theorem");
    expect(boundary).toContain("No Chronos-RR closure");
    expect(boundary).toContain("No H4.1/FGL closure");
    expect(boundary).toContain("No P vs NP closure");
    expect(boundary).toContain("No Clay-problem closure");
  });
});
