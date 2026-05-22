import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/pbh_slow_fopt_source_map_2026_05_22.json",
"utf8",
),
);
describe("PBH slow-FOPT source map", () => {
it("records a model-specific PBH slow-FOPT source only", () => {
expect(artifact.status).toBe("MODEL_SPECIFIC_PBH_SLOW_FOPT_SOURCE_ONLY_NO_GRAVITY_CLOSURE");
expect(artifact.supplies).toContain("MODEL_SPECIFIC_PBH_SLOW_FOPT_FORMATION_SOURCE");
expect(artifact.supplies).toContain("GAUGE_INVARIANT_DENSITY_CONTRAST_TREATMENT_SOURCE");
expect(artifact.supplies).toContain("EARLY_MATTER_DOMINATED_PBH_GROWTH_SOURCE");
expect(artifact.supplies).toContain("PBH_ABUNDANCE_PROFILE_MODEL_SOURCE");
});
it("keeps the source metadata fixed", () => {
expect(artifact.source.title).toBe(
"Reviving primordial black hole formation in slow first-order phase transitions",
);
expect(artifact.source.arxiv).toBe("2605.11332v2");
expect(artifact.source.category).toBe("hep-ph");
expect(artifact.source.version_date).toBe("2026-05-21");
});
it("does not promote the source into gravity closure", () => {
expect(artifact.does_not_supply).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
expect(artifact.does_not_supply).toContain("FOUR_DIMENSIONAL_GRAVITY_CLOSURE_THEOREM");
expect(artifact.does_not_supply).toContain("UNRESTRICTED_PBH_DARK_MATTER_VALIDATION");
expect(artifact.does_not_supply).toContain("GENERAL_MATTER_TRANSFER_MAP");
expect(artifact.does_not_supply).toContain("NONSPHERICAL_STABILITY_OR_EXTENSION_THEOREM");
expect(artifact.does_not_supply).toContain("SIX_FIELD_ANALYTIC_PACKAGE_HYPOTHESIS");
expect(artifact.weakest_sufficient_missing_lemma).toBe(
"MODEL_SPECIFIC_PBH_SLOW_FOPT_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP",
);
});
it("preserves no-closure boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("Model-specific PBH slow-FOPT source only.");
expect(boundary).toContain("No gravity closure is claimed.");
expect(boundary).toContain("No Chronos gravity stack binding map is claimed.");
expect(boundary).toContain("No unrestricted primordial black hole formation theorem is claimed.");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No dark matter resolution is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No Lambda-CDM failure is claimed.");
expect(boundary).toContain("No cosmic censorship result is claimed.");
expect(boundary).toContain("No hoop conjecture result is claimed.");
expect(boundary).toContain("No empirical validation is claimed.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
