import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const artifact = JSON.parse(
  readFileSync("artifacts/gravity/chronos_gravity_stack_binding_map_2026_05_22.json", "utf8"),
);

const doc = readFileSync(
  "docs/status/CHRONOS_GRAVITY_STACK_BINDING_MAP_2026_05_22.md",
  "utf8",
);

describe("Chronos gravity stack binding map", () => {
  it("supplies only the Chronos gravity stack binding map", () => {
    expect(artifact.object).toBe("CHRONOS_GRAVITY_STACK_BINDING_MAP");
    expect(artifact.status).toBe("BINDING_MAP_ONLY_NO_GRAVITY_CLOSURE");
    expect(artifact.supplies).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
  });

  it("binds the current gravity source-map objects into Chronos stack slots", () => {
    expect(artifact.input_objects).toContain("FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED");
    expect(artifact.input_objects).toContain("EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED");
    expect(artifact.input_objects).toContain("KERR_DESITTER_WCCC_SOURCE_MAP");
    expect(artifact.input_objects).toContain("PBH_SLOW_FOPT_SOURCE_MAP");
    expect(artifact.input_objects).toContain("PBH_THERMAL_EVAPORATION_SOURCE_MAP");
    expect(artifact.input_objects).toContain("GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX");
    expect(artifact.binding_rows).toHaveLength(6);
  });

  it("selects binding soundness as the next weakest object", () => {
    expect(artifact.next_required_object).toBe("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
    expect(doc).toContain("CHRONOS_GRAVITY_STACK_BINDING_SOUNDNESS_LEMMA");
  });

  it("preserves no-closure boundaries", () => {
    expect(artifact.does_not_prove).toContain("gravity closure");
    expect(artifact.does_not_prove).toContain("Chronos gravity stack binding soundness");
    expect(artifact.does_not_prove).toContain("four-dimensional collapse theorem");
    expect(artifact.does_not_prove).toContain("unrestricted non-symmetric collapse theorem");
    expect(artifact.does_not_prove).toContain("unrestricted cosmic censorship");
    expect(artifact.does_not_prove).toContain("hoop conjecture");
    expect(artifact.does_not_prove).toContain("unrestricted primordial black hole formation theorem");
    expect(artifact.does_not_prove).toContain("unrestricted primordial black hole evaporation theorem");
    expect(artifact.does_not_prove).toContain("dark matter detection");
    expect(artifact.does_not_prove).toContain("dark matter resolution");
    expect(artifact.does_not_prove).toContain("DFM-MKC validation");
    expect(artifact.does_not_prove).toContain("Lambda-CDM failure");
    expect(artifact.does_not_prove).toContain("empirical validation");
    expect(artifact.does_not_prove).toContain("any Clay problem");
  });
});
