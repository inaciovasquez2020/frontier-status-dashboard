import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/einstein_klein_gordon_assumptions_extracted_2026_05_22.json",
"utf8",
),
);
describe("Einstein-Klein-Gordon assumptions extracted", () => {
it("resolves the assumption extraction object", () => {
expect(artifact.status).toBe(
"ASSUMPTION_EXTRACTION_SURFACE_ONLY_NO_FORMAL_PROMOTION",
);
expect(artifact.resolved_from_previous_next_required_object).toBe(
"EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED",
);
});
it("records the extracted assumptions", () => {
expect(artifact.extracted_assumptions.gravitational_system).toBe(
"spherically_symmetric_Einstein_gravity",
);
expect(artifact.extracted_assumptions.spacetime_dimension).toBe(
"D_spacetime_dimensions",
);
expect(artifact.extracted_assumptions.matter_field).toBe("massless_scalar_field");
expect(artifact.extracted_assumptions.coupling).toBe("minimal_coupling");
expect(artifact.extracted_assumptions.method).toBe("large_D_expansion");
});
it("leaves the four-dimensional relevance map open", () => {
expect(artifact.remaining_next_required_objects).toEqual([
"FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
]);
expect(artifact.required_before_promotion).toContain(
"FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
);
expect(artifact.required_before_promotion).toContain(
"LARGE_D_LIMIT_ERROR_OR_TRANSFER_AUDIT_SUPPLIED",
);
});
it("preserves no-promotion boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("No theorem promotion is claimed.");
expect(boundary).toContain("No gravity solution is claimed.");
expect(boundary).toContain(
"No unrestricted non-symmetric collapse theorem is claimed.",
);
expect(boundary).toContain("No four-dimensional collapse theorem is claimed.");
expect(boundary).toContain("No black-hole production claim is made.");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No Lambda-CDM failure is claimed.");
expect(boundary).toContain("No Euclid Q2 empirical claim is made.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
