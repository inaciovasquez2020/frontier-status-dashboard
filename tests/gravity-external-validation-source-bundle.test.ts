import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/gravity_external_validation_source_bundle_2026_05_22.json",
"utf8",
),
);
const sources = Object.fromEntries(
artifact.sources.map((source: { id: string }) => [source.id, source]),
);
describe("gravity external validation source bundle", () => {
it("records three bounded external source roles", () => {
expect(artifact.status).toBe(
"EXTERNAL_SOURCE_BUNDLE_ONLY_NO_THEOREM_OR_EMPIRICAL_PROMOTION",
);
expect(sources.SIMONS_ACT_GRAVITY_COSMIC_SCALE_TEST_SOURCE).toBeTruthy();
expect(sources.ICTP_SAIFR_CLASSICAL_GRAVITY_PRIZE_2026_SOURCE).toBeTruthy();
expect(sources.GEOMGRAVX_2026_EXTENDED_GRAVITY_VENUE_SOURCE).toBeTruthy();
});
it("keeps the Simons ACT source as observational support only", () => {
const simons = sources.SIMONS_ACT_GRAVITY_COSMIC_SCALE_TEST_SOURCE;
expect(simons.claim_status).toBe(
"observational_support_source_only_not_gravity_solution",
);
expect(simons.reported_surface.instrument).toBe("Atacama Cosmology Telescope");
expect(simons.next_required_object).toBe(
"PRIMARY_ACT_GRAVITY_TEST_PAPER_AND_DATA_PIPELINE_AUDIT",
);
});
it("keeps the ICTP-SAIFR prize as recognition/community source only", () => {
const ictp = sources.ICTP_SAIFR_CLASSICAL_GRAVITY_PRIZE_2026_SOURCE;
expect(ictp.claim_status).toBe("recognition_venue_source_only_not_validation");
expect(ictp.reported_surface.scope).toBe("classical_gravity_and_applications");
expect(ictp.reported_surface.nomination_deadline).toBe("2026-05-31");
expect(ictp.next_required_object).toBe(
"RELEVANT_CONTACT_OR_SUBMISSION_OPPORTUNITY_RECORD_SUPPLIED",
);
});
it("keeps GeomGravX as an expert venue source only", () => {
const geomgravx = sources.GEOMGRAVX_2026_EXTENDED_GRAVITY_VENUE_SOURCE;
expect(geomgravx.claim_status).toBe("expert_venue_source_only_not_evidence");
expect(geomgravx.reported_surface.dates).toBe("2026-06-29_to_2026-07-03");
expect(geomgravx.reported_surface.venue).toBe("Physicum, University of Tartu");
expect(geomgravx.reported_surface.topics).toContain("dark_matter");
expect(geomgravx.reported_surface.topics).toContain("AI_in_gravity_research");
});
it("preserves no-promotion boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("No gravity solution is claimed.");
expect(boundary).toContain("No modified-gravity refutation theorem is claimed.");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No Lambda-CDM failure is claimed.");
expect(boundary).toContain("No Euclid Q2 empirical claim is made.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
