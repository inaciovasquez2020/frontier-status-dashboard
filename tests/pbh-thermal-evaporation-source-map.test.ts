import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/pbh_thermal_evaporation_source_map_2026_05_22.json",
"utf8",
),
);
describe("PBH thermal-evaporation source map", () => {
it("records a model-specific PBH thermal-evaporation source only", () => {
expect(artifact.status).toBe("MODEL_SPECIFIC_PBH_THERMAL_EVAPORATION_SOURCE_ONLY_NO_GRAVITY_CLOSURE");
expect(artifact.supplies).toContain("MODEL_SPECIFIC_PBH_THERMAL_EVAPORATION_SOURCE");
expect(artifact.supplies).toContain("THERMOFIELD_DYNAMICS_HAWKING_SPECTRUM_SOURCE");
expect(artifact.supplies).toContain("REHEATING_BATH_EVAPORATION_RATE_SOURCE");
expect(artifact.supplies).toContain("PBH_LIFETIME_SHORTENING_SOURCE");
});
it("keeps the source metadata fixed", () => {
expect(artifact.source.title).toBe(
"Evaporation of primordial black holes in a thermal universe: a thermofield dynamics approach",
);
expect(artifact.source.arxiv).toBe("2512.07284");
expect(artifact.source.doi).toBe("10.1007/JHEP04(2026)026");
expect(artifact.source.journal).toBe("Journal of High Energy Physics");
expect(artifact.source.published).toBe("2026-04-02");
});
it("does not promote the source into gravity closure", () => {
expect(artifact.does_not_supply).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
expect(artifact.does_not_supply).toContain("FOUR_DIMENSIONAL_GRAVITY_CLOSURE_THEOREM");
expect(artifact.does_not_supply).toContain("UNRESTRICTED_PBH_DARK_MATTER_VALIDATION");
expect(artifact.does_not_supply).toContain("EMPIRICAL_PBH_ABUNDANCE_VALIDATION");
expect(artifact.does_not_supply).toContain("SIX_FIELD_ANALYTIC_PACKAGE_HYPOTHESIS");
expect(artifact.weakest_sufficient_missing_lemma).toBe(
"MODEL_SPECIFIC_PBH_THERMAL_EVAPORATION_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP",
);
});
it("preserves no-closure boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("Model-specific PBH thermal-evaporation source only.");
expect(boundary).toContain("No gravity closure is claimed.");
expect(boundary).toContain("No Chronos gravity stack binding map is claimed.");
expect(boundary).toContain("No unrestricted primordial black hole evaporation theorem is claimed.");
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
