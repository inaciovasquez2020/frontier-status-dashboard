import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rows = statusData as Array<Record<string, unknown>>;
const row = rows.find((entry) => entry.name === "chronos-urf-rr");

function textOf(entry: Record<string, unknown> | undefined): string {
  return JSON.stringify(entry ?? {});
}

describe("Chronos rate-thick conditional reduction dashboard sync", () => {
  it("keeps the canonical Chronos row status unchanged", () => {
    expect(row).toBeTruthy();
    expect(row?.status).toBe("LEAN_LIBRARY_TARGET_EXPOSED");
    expect(row?.frontierStatus).toBe("FRONTIER_OPEN");
  });

  it("preserves prior canonical boundary tokens", () => {
    const text = textOf(row);
    expect(text).toContain("No theorem-level H4.1/FGL closure");
    expect(text).toContain("No theorem-level Chronos-RR closure");
    expect(text).toContain("FRONTIER_OPEN is preserved");
    expect(text).toContain("No UniversalFiberEntropyGap from Reg-SNF");
  });

  it("records the rate-thick conditional reduction as an appended surface", () => {
    const text = textOf(row);
    expect(text).toContain("RateThickConditionalReductionOnly");
    expect(text).toContain("CONDITIONAL_REDUCTION_ONLY");
    expect(text).toContain("6d3c3754");
  });

  it("records the missing structural lemmas", () => {
    const text = textOf(row);
    expect(text).toContain("DimensionRegularFiberGrowth");
    expect(text).toContain("RankRateToLyapunovExpansion");
    expect(text).toContain("FiberEntropyMassLowerBoundsUnstableEntropy");
    expect(text).toContain("positive entropy lower bound");
  });

  it("preserves no-promotion boundaries", () => {
    const text = textOf(row);
    expect(text).toContain("no full-category fiber-entropy gap promotion");
    expect(text).toContain("no unrestricted Chronos-RR closure");
    expect(text).toContain("no unrestricted H4.1/FGL closure");
    expect(text).toContain("no P vs NP closure");
    expect(text).toContain("no Clay-problem closure");
  });
});
