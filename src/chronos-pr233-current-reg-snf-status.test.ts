import { describe, expect, it } from "vitest";
import statusData from "./data/status-data.json";

function walk(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.flatMap(walk);
  }

  if (value && typeof value === "object") {
    const row = value as Record<string, unknown>;
    return [row, ...Object.values(row).flatMap(walk)];
  }

  return [];
}

function rowText(row: Record<string, unknown>): string {
  return Object.values(row).map(String).join(" ");
}

describe("Chronos PR233 current unrestricted Reg-SNF status", () => {
  const chronos = walk(statusData).find((row) =>
    rowText(row).includes("chronos-urf-rr") || rowText(row).includes("Chronos"),
  );

  it("keeps the Chronos dashboard row present", () => {
    expect(chronos).toBeTruthy();
  });

  it("records current unrestricted Reg-SNF status lock without global promotion", () => {
    const text = rowText(chronos ?? {});

    expect(text).toContain("CURRENT_REAL_CHRONOS_ADMISSIBLE_REG_SNF_CLOSED");
    expect((chronos ?? {}).status).toBe("LEAN_LIBRARY_TARGET_EXPOSED");
    expect((chronos ?? {}).frontierStatus).toBe("FRONTIER_OPEN");
    expect(text).toContain("SELECTED_DEPTHBRIDGE_ONLY");
    expect(text).toContain("no UniversalFiberEntropyGap closure");
    expect(text).toContain("no DepthBridge beyond selected final carrier domain");
    expect(text).toContain("no Chronos-RR theorem-level closure");
    expect(text).toContain("no H4.1/FGL theorem-level closure");
    expect(text).toContain("no P vs NP closure");
    expect(text).toContain("no Clay-problem closure");
  });

  it("uses the updated bounded dashboard percentages", () => {
    const row = chronos ?? {};

    if ("integrity" in row) {
      expect(row.integrity).toBe(100);
    }

    if ("repositoryIntegrity" in row) {
      expect(row.repositoryIntegrity).toBe(100);
    }

    if ("theoremClosure" in row) {
      expect(row.theoremClosure).toBe(82);
      expect(row.theoremMetricApplicable).toBe(false);
      expect(row.theoremClosureLabel).toContain("unrestricted theorem closure false");
    }

    if ("theorem_closure" in row) {
      expect(row.theorem_closure).toBe(82);
    }
  });
});
