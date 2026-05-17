import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const rows = statusData as Array<Record<string, unknown>>;

function textOf(row: Record<string, unknown>): string {
  return Object.values(row).map(String).join(" ");
}

describe("Chronos rate-thick conditional reduction dashboard sync", () => {
  const row = rows.find((entry) => textOf(entry).includes("chronos-urf-rr"));

  it("keeps the Chronos row present", () => {
    expect(row).toBeTruthy();
  });

  it("records conditional reduction only status", () => {
    expect(textOf(row!)).toContain("CONDITIONAL_REDUCTION_ONLY");
  });

  it("records the missing structural lemmas", () => {
    const text = textOf(row!);
    expect(text).toContain("DimensionRegularFiberGrowth");
    expect(text).toContain("RankRateToLyapunovExpansion");
    expect(text).toContain("FiberEntropyMassLowerBoundsUnstableEntropy");
    expect(text).toContain("positive entropy lower bound");
  });

  it("preserves no-promotion boundaries", () => {
    const text = textOf(row!);
    expect(text).toContain("no full-category fiber-entropy gap promotion");
    expect(text).toContain("no unrestricted Chronos-RR closure");
    expect(text).toContain("no unrestricted H4.1/FGL closure");
    expect(text).toContain("no P vs NP closure");
    expect(text).toContain("no Clay-problem closure");
  });
});
