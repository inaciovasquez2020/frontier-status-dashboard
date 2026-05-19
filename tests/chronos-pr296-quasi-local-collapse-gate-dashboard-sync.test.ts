import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";
describe("Chronos PR #296 quasi-local collapse gate dashboard sync", () => {
const row = statusData.find(
(entry) => entry.id === "chronos-pr296-quasi-local-collapse-gate",
);
it("adds a separate conditional gravity-frontier row without mutating the canonical Chronos row", () => {
expect(row).toBeTruthy();
expect(row?.repo).toBe("chronos-urf-rr");
expect(row?.status).toBe("CONDITIONAL_GRAVITY_FRONTIER_SURFACE");
expect(row?.latestPR).toBe(296);
expect(row?.theoremMetricApplicable).toBe(false);
expect(row?.closureScaleMetricApplicable).toBe(false);
expect(row?.theoremPromotion).toBe(false);
const canonicalChronos = statusData.find((entry) => entry.name === "chronos-urf-rr");
expect(canonicalChronos?.status).toBe("LEAN_LIBRARY_TARGET_EXPOSED");
});
it("preserves the PR296 no-overclaim boundary", () => {
const boundary = String(row?.boundary ?? "");
expect(boundary).toContain("PR #296 quasi-local collapse gate conditional bridge verified");
expect(boundary).toContain("conditional bridge only");
expect(boundary).toContain("does not prove an unconditional quasi-local collapse theorem");
expect(boundary).toContain("does not prove unrestricted nonspherical collapse exclusion");
expect(boundary).toContain("does not prove Cosmic Censorship");
expect(boundary).toContain("does not prove the Hoop Conjecture");
expect(boundary).toContain("does not prove unrestricted Chronos-RR");
expect(boundary).toContain("does not prove H4.1/FGL");
expect(boundary).toContain("does not prove P vs NP");
expect(boundary).toContain("does not prove any Clay problem");
});
});
