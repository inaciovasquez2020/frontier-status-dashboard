import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/kerr_desitter_wccc_source_map_2026_05_22.json",
"utf8",
),
);
describe("Kerr-de Sitter WCCC source map", () => {
it("records a model-specific WCCC source only", () => {
expect(artifact.status).toBe("MODEL_SPECIFIC_WCCC_SOURCE_ONLY_NO_GRAVITY_CLOSURE");
expect(artifact.supplies).toContain("MODEL_SPECIFIC_WCCC_HORIZON_ROBUSTNESS_SOURCE");
});
it("keeps the source metadata fixed", () => {
expect(artifact.source.title).toBe(
"Kerr-de Sitter black holes: quantum aspects and cosmic censorship conjecture",
);
expect(artifact.source.doi).toBe("10.1140/epjc/s10052-026-15720-1");
expect(artifact.source.journal).toBe("The European Physical Journal C");
expect(artifact.source.published).toBe("2026-05-17");
});
it("does not promote the source into the missing gravity objects", () => {
expect(artifact.does_not_supply).toContain("CHRONOS_GRAVITY_STACK_BINDING_MAP");
expect(artifact.does_not_supply).toContain("LARGE_D_TO_D4_ERROR_CONTROL_OR_TRANSFER_THEOREM");
expect(artifact.does_not_supply).toContain("NONSPHERICAL_STABILITY_OR_EXTENSION_THEOREM");
expect(artifact.does_not_supply).toContain("GENERAL_MATTER_TRANSFER_MAP");
expect(artifact.does_not_supply).toContain("SIX_FIELD_ANALYTIC_PACKAGE_HYPOTHESIS");
expect(artifact.weakest_sufficient_missing_lemma).toBe(
"MODEL_SPECIFIC_QKDS_WCCC_TO_CHRONOS_GRAVITY_STACK_BINDING_MAP",
);
});
it("preserves no-closure boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("Model-specific weak cosmic censorship source only.");
expect(boundary).toContain("No gravity closure is claimed.");
expect(boundary).toContain("No unrestricted cosmic censorship theorem is claimed.");
expect(boundary).toContain("No hoop conjecture result is claimed.");
expect(boundary).toContain("No four-dimensional non-symmetric collapse theorem is claimed.");
expect(boundary).toContain("No Chronos gravity stack binding map is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No Clay problem is claimed.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
