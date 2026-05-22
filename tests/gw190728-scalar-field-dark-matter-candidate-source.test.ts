import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/gw190728_scalar_field_dark_matter_candidate_source_2026_05_22.json",
"utf8",
),
);
describe("GW190728 scalar-field dark-matter candidate source", () => {
it("records the candidate source without promoting it to a detection", () => {
expect(artifact.status).toBe("CANDIDATE_SOURCE_ONLY_NO_DETECTION_CLAIM");
expect(artifact.claim_surface.object).toBe("GW190728");
expect(artifact.claim_surface.screened_events).toBe(28);
expect(artifact.claim_surface.vacuum_consistent_events).toBe(27);
expect(artifact.claim_surface.reported_status).toBe("tentative evidence only");
});
it("records the primary literature identifiers", () => {
expect(artifact.source.primary_article_title).toBe(
"Scalar Fields around Black Hole Binaries in LIGO-Virgo-KAGRA",
);
expect(artifact.source.doi).toBe("10.1103/fv9z-zkxx");
expect(artifact.source.arxiv).toBe("2510.17967");
});
it("requires independent reproduction before empirical promotion", () => {
expect(artifact.next_required_object).toBe(
"INDEPENDENT_REPRODUCTION_OF_GW190728_SCALAR_ENVIRONMENT_BAYES_FACTOR",
);
expect(artifact.required_before_empirical_promotion).toContain(
"LVK_PUBLIC_EVENT_DATA_PIPELINE_REPRODUCED",
);
expect(artifact.required_before_empirical_promotion).toContain(
"BAYES_FACTOR_REPRODUCTION_SUPPLIED",
);
expect(artifact.required_before_empirical_promotion).toContain(
"INDEPENDENT_GROUP_REPLICATION_SUPPLIED",
);
});
it("preserves no-promotion boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No gravity solution is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No Lambda-CDM failure is claimed.");
expect(boundary).toContain("No Euclid Q2 empirical claim is made.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
