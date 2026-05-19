import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

function flatten(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.flatMap(flatten);
  }
  if (value && typeof value === "object") {
    const row = value as Record<string, unknown>;
    return [row, ...Object.values(row).flatMap(flatten)];
  }
  return [];
}

describe("Chronos PR #308 FPz1 restricted lambda dashboard sync", () => {
  it("records the restricted lambda solved surface without unrestricted promotion", () => {
    const rows = flatten(statusData);
    const chronos = rows.find((row) =>
      JSON.stringify(row).toLowerCase().includes("chronos-urf-rr"),
    );

    expect(chronos).toBeTruthy();

    const text = JSON.stringify(chronos);

    expect(text).toContain("Chronos PR #308");
    expect(text).toContain("Chronos PR #308");
    expect(text).toContain("restrictedRateSpectrumIsolation");
    expect(text).toContain("lowerEnvelope_to_quantitativeLambda");
    expect(text).toContain("fpz1_restricted_lambda_route");
    expect(text).toContain("EntropyFaithfulLowerEnvelope");
    expect(text).toContain("DepthBridgeLambda");
    expect(text).toContain("no unrestricted RateSpectrumIsolation");
    expect(text).toContain("no unrestricted UniversalFiberEntropyGap");
    expect(text).toContain("no unrestricted Chronos-RR");
    expect(text).toContain("no unrestricted H4.1/FGL");
    expect(text).toContain("no P vs NP");
    expect(text).toContain("no Clay-problem closure");
  });
});
