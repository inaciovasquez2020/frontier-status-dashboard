import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

describe("Chronos PR #344 selected-domain H4.1/FGL dashboard status", () => {
  it("records selected-domain H4.1/FGL without unrestricted promotion", () => {
    const chronos = statusData.find((row: any) =>
      JSON.stringify(row).includes("chronos-urf-rr")
    ) as any;

    expect(chronos).toBeTruthy();

    const text = JSON.stringify(chronos);

    expect(text).toContain("PR #344 merged selected-domain H4.1/FGL");
    expect(text).toContain("Selected-domain interface only");
    expect(text).toContain("no unrestricted UniversalFiberEntropyGap");
    expect(text).toContain("no unrestricted Chronos-RR");
    expect(text).toContain("no unrestricted H4.1/FGL");
    expect(text).toContain("no P vs NP");
    expect(text).toContain("no Clay closure");

    expect(text).not.toContain("unrestricted H4.1/FGL solved");
    expect(text).not.toContain("P vs NP solved");
    expect(text).not.toContain("proves Clay closure");
  });
});
