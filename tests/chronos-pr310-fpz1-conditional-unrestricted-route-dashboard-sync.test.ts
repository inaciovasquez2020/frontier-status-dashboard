import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

describe("Chronos PR #310 FPz1 conditional unrestricted route dashboard sync", () => {
  it("records the conditional route without unrestricted theorem promotion", () => {
    const chronos = statusData.find((entry) => entry.name === "chronos-urf-rr");

    expect(chronos).toBeTruthy();
    expect(chronos?.status).toBe("LEAN_LIBRARY_TARGET_EXPOSED");
    expect(chronos?.frontierStatus).toBe("FRONTIER_OPEN");

    const text = JSON.stringify(chronos);

    expect(text).toContain("Chronos PR #310");
    expect(text).toContain("CONDITIONAL_UNRESTRICTED_ROUTE_ONLY");
    expect(text).toContain("rateSpectrumIsolation_and_lowerEnvelope_to_quantitativeUnrestricted");
    expect(text).toContain("fpz1_conditional_unrestricted_route");
    expect(text).toContain("RateSpectrumIsolation");
    expect(text).toContain("EntropyFaithfulLowerEnvelope");
    expect(text).toContain("DepthBridgeUnrestricted");
    expect(text).toContain("conditional composition only");
    expect(text).toContain("does not prove RateSpectrumIsolation");
    expect(text).toContain("does not prove EntropyFaithfulLowerEnvelope");
    expect(text).toContain("does not prove DepthBridgeUnrestricted");
    expect(text).toContain("no unrestricted UniversalFiberEntropyGap");
    expect(text).toContain("no unrestricted Chronos-RR");
    expect(text).toContain("no unrestricted H4.1/FGL");
    expect(text).toContain("no P vs NP");
    expect(text).toContain("no Clay-problem closure");
    expect(text).toContain("FRONTIER_OPEN is preserved");
  });
});
