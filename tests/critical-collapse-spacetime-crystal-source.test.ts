import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/critical_collapse_spacetime_crystal_source_2026_05_22.json",
"utf8",
),
);
const sources = Object.fromEntries(
artifact.sources.map((source: { id: string }) => [source.id, source]),
);
describe("critical collapse spacetime-crystal source", () => {
it("records the source without theorem promotion", () => {
expect(artifact.status).toBe("ANALYTIC_GRAVITY_SOURCE_ONLY_NO_THEOREM_PROMOTION");
expect(sources.PHYSORG_CRITICAL_COLLAPSE_SPACETIME_CRYSTAL_SOURCE).toBeTruthy();
});
it("records the PRL paper pointer", () => {
const source = sources.PHYSORG_CRITICAL_COLLAPSE_SPACETIME_CRYSTAL_SOURCE;
expect(source.claim_status).toBe("analytic_critical_collapse_source_only");
expect(source.reported_surface.paper_title).toBe(
"Analytic Discrete Self-Similar Solutions of Einstein-Klein-Gordon at Large D",
);
expect(source.reported_surface.journal).toBe("Physical Review Letters");
expect(source.reported_surface.doi).toBe("10.1103/qgl5-5l3t");
});
it("records the formal relevance blockers", () => {
expect(artifact.bundle_next_required_objects).toContain(
"PRIMARY_PRL_CRITICAL_COLLAPSE_PAPER_REVIEW_AND_FORMAL_RELEVANCE_MAP",
);
expect(artifact.bundle_next_required_objects).toContain(
"EINSTEIN_KLEIN_GORDON_ASSUMPTIONS_EXTRACTED",
);
expect(artifact.bundle_next_required_objects).toContain(
"FOUR_DIMENSIONAL_RELEVANCE_MAP_SUPPLIED",
);
});
it("preserves no-promotion boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("No gravity solution is claimed.");
expect(boundary).toContain("No black-hole production claim is made.");
expect(boundary).toContain("No primordial-black-hole abundance claim is made.");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No Lambda-CDM failure is claimed.");
expect(boundary).toContain("No Euclid Q2 empirical claim is made.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
