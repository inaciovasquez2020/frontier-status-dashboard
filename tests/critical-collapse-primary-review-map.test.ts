import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/critical_collapse_primary_review_map_2026_05_22.json",
"utf8",
),
);
describe("critical collapse primary review map", () => {
it("resolves the first previous next-required object", () => {
expect(artifact.status).toBe("PRIMARY_REVIEW_MAP_SURFACE_ONLY_NO_FORMAL_PROMOTION");
expect(artifact.resolved_from_previous_next_required_object).toBe(
"PRIMARY_PRL_CRITICAL_COLLAPSE_PAPER_REVIEW_AND_FORMAL_RELEVANCE_MAP",
);
});
it("records the primary source identifiers", () => {
expect(artifact.source.title).toBe(
"Analytic Discrete Self-Similar Solutions of Einstein-Klein-Gordon at Large D",
);
expect(artifact.source.arxiv).toBe("2601.14358");
expect(artifact.source.doi).toBe("10.1103/qgl5-5l3t");
expect(artifact.source.journal).toBe("Physical Review Letters");
});
it("records the review and relevance surface", () => {
expect(artifact.review_surface.system).toBe("Einstein-massless-Klein-Gordon");
expect(artifact.review_surface.method).toBe("large_D_expansion");
expect(artifact.formal_relevance_map.chronos_gravity_stack_relevance).toBe(
"ANALYTIC_COLLAPSE_MODEL_SOURCE_ONLY",
);
expect(artifact.formal_relevance_map.possible_links).toContain("critical_collapse");
expect(artifact.formal_relevance_map.blocked_links).toContain(
"four_dimensional_physical_collapse_theorem",
);
});
it("leaves the remaining required objects explicit", () => {
expect(artifact.remaining_next_required_objects).toContain(
"EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED",
);
expect(artifact.remaining_next_required_objects).toContain(
"FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
);
});
it("preserves no-promotion boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("No theorem promotion is claimed.");
expect(boundary).toContain("No gravity solution is claimed.");
expect(boundary).toContain("No four-dimensional collapse theorem is claimed.");
expect(boundary).toContain("No black-hole production claim is made.");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No Lambda-CDM failure is claimed.");
expect(boundary).toContain("No Euclid Q2 empirical claim is made.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
