import { describe, expect, it } from "vitest";
import statusData from "./data/status-data.json";

type StatusEntry = {
  id?: string;
  repository?: string;
  status?: string;
  theoremClosure?: number;
  theoremClosureLabel?: string;
  theoremMetricApplicable?: boolean;
};

const flatten = (value: unknown): StatusEntry[] => {
  if (Array.isArray(value)) {
    return value.flatMap(flatten);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (record.id === "fo4-constraint-isolation") {
      return [record as StatusEntry];
    }
    return Object.values(record).flatMap(flatten);
  }

  return [];
};

describe("FO4 constraint-isolation dashboard entry", () => {
  it("registers FO4 constraint-isolation without theorem closure", () => {
    const entry = flatten(statusData).find(
      (item) => item.id === "fo4-constraint-isolation",
    );

    expect(entry).toBeTruthy();
    expect(entry?.status).toBe("FO4_CONSTRAINT_ISOLATION_ONLY");
    expect(entry?.repository).toBe("inaciovasquez2020/fo4-constraint-isolation");
    expect(entry?.theoremClosure).toBe(0);
    expect(entry?.theoremMetricApplicable).toBe(false);
    expect(entry?.theoremClosureLabel).toContain("proof-hygiene isolation only");
  });

  it("keeps overclaim boundary tokens absent", () => {
    const serialized = JSON.stringify(statusData);
    expect(serialized).not.toContain("Chronos-RR is solved");
    expect(serialized).not.toContain("H4.1/FGL is solved");
    expect(serialized).not.toContain("UniversalFiberEntropyGap is proved");
    expect(serialized).not.toContain("P vs NP is solved");
    expect(serialized).not.toContain("Clay problem is solved");
  });
});
