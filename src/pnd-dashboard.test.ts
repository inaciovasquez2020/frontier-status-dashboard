import { describe, expect, it } from "vitest";
import statusData from "./data/status-data.json";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

function collectRows(value: JsonValue): Record<string, JsonValue>[] {
  if (Array.isArray(value)) {
    const dicts = value.filter(
      (item): item is Record<string, JsonValue> =>
        typeof item === "object" && item !== null && !Array.isArray(item),
    );

    if (
      dicts.some((item) => JSON.stringify(item).includes("poincare-new-derivation"))
    ) {
      return dicts;
    }

    return dicts.flatMap((item) => collectRows(item));
  }

  if (typeof value === "object" && value !== null) {
    return Object.values(value).flatMap((item) => collectRows(item));
  }

  return [];
}

describe("Poincare dashboard status", () => {
  const rows = collectRows(statusData as unknown as JsonValue);
  const pnd = rows.find((row) => row.name === "poincare-new-derivation");

  it("records the PND-D3EL 10 percent theorem-closure upgrade", () => {
    expect(pnd).toBeTruthy();
    expect(JSON.stringify(pnd)).toContain("PND_D3EL_excess_10pct");
    expect(JSON.stringify(pnd)).toContain("VERIFIED_PARTIAL_THEOREM_CLOSURE");
    expect(JSON.stringify(pnd)).toContain("PLEquivalence gate discharged");
  });

  it("keeps Pachner connectivity external", () => {
    expect(JSON.stringify(pnd)).toContain("formal_Pachner_connectivity_3D");
    expect(JSON.stringify(pnd)).toContain("ImportedPachnerTheorem3D remains external");
    expect(JSON.stringify(pnd)).toContain("formal_Pachner_connectivity_3D is not proved");
  });

  it("records the dashboard-visible metrics", () => {
    expect(pnd?.integrity).toBe(100);
    expect(pnd?.theoremClosure).toBe(10);
    expect(pnd?.ci).toBe("green");
  });

  it("forbids unconditional closure promotion", () => {
    expect(JSON.stringify(pnd)).not.toContain("theoremClosure=100");
    expect(JSON.stringify(pnd)).not.toContain("Poincare conjecture proved");
    expect(JSON.stringify(pnd)).not.toContain("ImportedPachnerTheorem3D is internally proved");
  });
});
