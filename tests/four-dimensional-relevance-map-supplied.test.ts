import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/four_dimensional_relevance_map_supplied_2026_05_22.json",
"utf8",
),
);
describe("four-dimensional relevance map supplied", () => {
it("closes the previous four-dimensional relevance-map object", () => {
expect(artifact.status).toBe("FOUR_DIMENSIONAL_RELEVANCE_MAP_ONLY_NO_TRANSFER_THEOREM");
expect(artifact.resolved_from_previous_next_required_object).toBe(
"FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
);
expect(artifact.closed_object).toBe("FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED");
});
it("records relevance without transfer", () => {
expect(artifact.four_dimensional_relevance_map.D4_status).toBe(
"RELEVANCE_ONLY_NOT_TRANSFERRED",
);
expect(artifact.four_dimensional_relevance_map.admissible_relevance).toContain(
"critical-collapse conceptual analogue",
);
expect(artifact.four_dimensional_relevance_map.admissible_relevance).toContain(
"large-D asymptotic model for comparison only",
);
expect(artifact.four_dimensional_relevance_map.non_admissible_promotions).toContain(
"large_D_to_D4_transfer_theorem",
);
expect(artifact.four_dimensional_relevance_map.non_admissible_promotions).toContain(
"four_dimensional_physical_collapse_theorem",
);
});
it("records transfer obstructions as the new frontier", () => {
const names = artifact.transfer_obstructions.map(
(row: { name: string }) => row.name,
);
expect(names).toContain("large_D_limit_gap");
expect(names).toContain("spherical_symmetry_gap");
expect(names).toContain("massless_scalar_matter_gap");
expect(names).toContain("critical_threshold_gap");
expect(names).toContain("chronos_stack_binding_gap");
});
it("preserves no-promotion boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("No large-D to D=4 transfer theorem is claimed.");
expect(boundary).toContain("No theorem promotion is claimed.");
expect(boundary).toContain("No gravity solution is claimed.");
expect(boundary).toContain("No unrestricted non-symmetric collapse theorem is claimed.");
expect(boundary).toContain("No four-dimensional collapse theorem is claimed.");
expect(boundary).toContain("No cosmic censorship result is claimed.");
expect(boundary).toContain("No hoop conjecture result is claimed.");
expect(boundary).toContain("No black-hole production claim is made.");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No Lambda-CDM failure is claimed.");
expect(boundary).toContain("No Euclid Q2 empirical claim is made.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
