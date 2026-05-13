import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

describe("Chronos RR / H4FGL unrestricted status locks", () => {
  const row = statusData.find((entry) => {
    const haystack = `${entry.domain ?? ""} ${entry.url ?? ""}`.toLowerCase();
    return haystack.includes("chronos-urf-rr");
  });

  it("keeps Chronos row present", () => {
    expect(row).toBeTruthy();
  });

  it("records PR #263 and commit 22acce6", () => {
    expect(row?.boundary).toContain("PR #263");
    expect(row?.boundary).toContain("22acce6");
  });

  it("keeps unrestricted H4.1/FGL open", () => {
    expect(row?.boundary).toContain("Unrestricted H4.1/FGL remains FRONTIER_OPEN");
    expect(row?.boundary).toContain("No unrestricted H4.1/FGL closure");
  });

  it("keeps unrestricted Chronos-RR locked open", () => {
    expect(row?.boundary).toContain("unrestricted Chronos-RR remains locked open");
    expect(row?.boundary).toContain("No unrestricted Chronos-RR closure");
  });

  it("blocks repository-native promotion to unrestricted H4.1/FGL", () => {
    expect(row?.boundary).toContain(
      "Repository-native Chronos-RR conditional closure does not promote unrestricted H4.1/FGL status"
    );
  });

  it("preserves downstream non-claims", () => {
    expect(row?.boundary).toContain("unrestricted DepthBridge");
    expect(row?.boundary).toContain("unrestricted UniversalFiberEntropyGap");
    expect(row?.boundary).toContain("SemanticRankRateToFiberEntropySoundness");
    expect(row?.boundary).toContain("P vs NP");
    expect(row?.boundary).toContain("Clay-problem closure");
  });
});
