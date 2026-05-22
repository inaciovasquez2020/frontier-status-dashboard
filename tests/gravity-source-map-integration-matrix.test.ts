import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/gravity_source_map_integration_matrix_2026_05_22.json",
"utf8",
),
);
describe("gravity source-map integration matrix", () => {
it("integrates the three current gravity source maps", () => {
expect(artifact.status).toBe("SOURCE_MAP_INTEGRATION_MATRIX_ONLY_NO_GRAVITY_CLOSURE");
expect(artifact.closed_object).toBe("GRAVITY_SOURCE_MAP_INTEGRATION_MATRIX");
expect(artifact.integrates_source_maps).toContain("FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED_2026_05_22");
expect(artifact.integrates_source_maps).toContain("KERR_DESITTER_WCCC_SOURCE_MAP_2026_05_22");
expect(artifact.integrates_source_maps).toContain("PBH_SLOW_FOPT_SOURCE_MAP_2026_05_22");
});
it("records exactly three integration rows", () => {
expect(artifact.integration_matrix).toHaveLength(3);
const sourceObjects = artifact.integration_matrix.map(
(row: { source_object: string }) => row.source_object,
);
expect(sourceObjects).toContain("FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED");
expect(sourceObjects).toContain("MODEL_SPECIFIC_WCCC_HORIZON_ROBUSTNESS_SOURCE");
expect(sourceObjects).toContain("MODEL_SPECIFIC_PBH_SLOW_FOPT_FORMATION_SOURCE");
});
it("selects the Chronos gravity stack binding map as the next weakest object", () => {
expect(artifact.weakest_sufficient_next_object).toBe("CHRONOS_GRAVITY_STACK_BINDING_MAP");
expect(artifact.remaining_next_required_objects).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
expect(artifact.remaining_next_required_objects).toContain(
"MODEL_SPECIFIC_QKDS_WCCC_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP",
);
expect(artifact.remaining_next_required_objects).toContain(
"MODEL_SPECIFIC_PBH_SLOW_FOPT_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP",
);
expect(artifact.remaining_next_required_objects).toContain("SIX_FIELD_ANALYTIC_PACKAGE_HYPOTHESIS");
});
it("preserves no-closure boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("Gravity source-map integration matrix only.");
expect(boundary).toContain("No gravity closure is claimed.");
expect(boundary).toContain("No Chronos gravity stack binding map is claimed.");
expect(boundary).toContain("No four-dimensional collapse theorem is claimed.");
expect(boundary).toContain("No unrestricted non-symmetric collapse theorem is claimed.");
expect(boundary).toContain("No unrestricted cosmic censorship theorem is claimed.");
expect(boundary).toContain("No hoop conjecture result is claimed.");
expect(boundary).toContain("No unrestricted primordial black hole formation theorem is claimed.");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No dark matter resolution is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No Lambda-CDM failure is claimed.");
expect(boundary).toContain("No empirical validation is claimed.");
expect(boundary).toContain("No Clay problem is claimed.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
