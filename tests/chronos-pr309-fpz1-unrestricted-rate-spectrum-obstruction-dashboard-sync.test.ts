import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

describe("Chronos PR #309 FPz1 unrestricted rate-spectrum obstruction dashboard sync", () => {
  it("records the obstruction without unrestricted theorem promotion", () => {
    const chronos = statusData.find((entry) => entry.name === "chronos-urf-rr");

    expect(chronos).toBeTruthy();
    expect(chronos?.status).toBe("LEAN_LIBRARY_TARGET_EXPOSED");
    expect(chronos?.frontierStatus).toBe("FRONTIER_OPEN");

    const text = JSON.stringify(chronos);

    expect(text).toContain("Chronos PR #309");
    expect(text).toContain("UNRESTRICTED_RATE_SPECTRUM_OBSTRUCTION_ONLY");
    expect(text).toContain("inverseNatRateSequence_refutes_rateSpectrumIsolation");
    expect(text).toContain("InverseNatRateSequence");
    expect(text).toContain("RateSpectrumIsolation");
    expect(text).toContain("does not construct concrete Chronos admissible objects");
    expect(text).toContain("no unrestricted RateSpectrumIsolation");
    expect(text).toContain("no unrestricted UniversalFiberEntropyGap");
    expect(text).toContain("no unrestricted Chronos-RR");
    expect(text).toContain("no unrestricted H4.1/FGL");
    expect(text).toContain("no P vs NP");
    expect(text).toContain("no Clay-problem closure");
    expect(text).toContain("FRONTIER_OPEN is preserved");
  });
});
