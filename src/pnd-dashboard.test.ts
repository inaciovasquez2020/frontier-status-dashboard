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
      dicts.some((item) =>
        JSON.stringify(item).includes("poincare-new-derivation"),
      )
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
  const pnd = rows.find((row) =>
    JSON.stringify(row).includes("poincare-new-derivation"),
  );

  it("records the PND-D3EL coupled discharge frontier", () => {
    expect(pnd).toBeTruthy();
    expect(JSON.stringify(pnd)).toContain("PND-D3EL coupled discharge frontier merged");
    expect(JSON.stringify(pnd)).toContain("pnd_d3el_coupled_discharge");
  });

  it("keeps PND-D3EL open and forbids Poincare closure promotion", () => {
    expect(JSON.stringify(pnd)).toContain("OPEN_FRONTIER");
    expect(JSON.stringify(pnd)).toContain("Does not prove PND-D3EL");
    expect(JSON.stringify(pnd)).toContain("does not prove the Poincare conjecture");
    expect(JSON.stringify(pnd)).not.toContain("Poincare conjecture proved");
    expect(JSON.stringify(pnd)).not.toContain("PND-D3EL is proved");
  });

  it("records artifact integrity without theorem closure", () => {
    expect(pnd?.integrity).toBe(100);
    expect(pnd?.theoremClosure).toBe(0);
    expect(pnd?.ci).toBe("green");
  });
});
