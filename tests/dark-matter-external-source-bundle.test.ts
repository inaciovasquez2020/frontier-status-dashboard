import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const artifact = JSON.parse(
readFileSync(
"artifacts/gravity/dark_matter_external_source_bundle_2026_05_22.json",
"utf8",
),
);
const sources = Object.fromEntries(
artifact.sources.map((source: { id: string }) => [source.id, source]),
);
describe("dark matter external source bundle", () => {
it("records three bounded external source roles", () => {
expect(artifact.status).toBe("EXTERNAL_SOURCE_BUNDLE_ONLY_NO_EMPIRICAL_PROMOTION");
expect(sources.MIT_GW190728_SCALAR_FIELD_METHOD_SOURCE).toBeTruthy();
expect(sources.NASA_WEBB_COSMOS_DARK_MATTER_MAP_SOURCE).toBeTruthy();
expect(sources.ICTP_SAIFR_HBSM2026_COMMUNITY_VALIDATION_VENUE_SOURCE).toBeTruthy();
});
it("keeps MIT GW190728 as candidate only", () => {
const mit = sources.MIT_GW190728_SCALAR_FIELD_METHOD_SOURCE;
expect(mit.claim_status).toBe("candidate_only_not_detection");
expect(mit.reported_surface.screened_events).toBe(28);
expect(mit.reported_surface.vacuum_consistent_events).toBe(27);
expect(mit.reported_surface.candidate_event).toBe("GW190728");
expect(mit.next_required_object).toBe(
"INDEPENDENT_REPRODUCTION_OF_GW190728_SCALAR_ENVIRONMENT_BAYES_FACTOR",
);
});
it("keeps NASA Webb COSMOS as observational map source only", () => {
const nasa = sources.NASA_WEBB_COSMOS_DARK_MATTER_MAP_SOURCE;
expect(nasa.claim_status).toBe(
"observational_map_source_only_not_particle_identification",
);
expect(nasa.reported_surface.instrument).toBe("James Webb Space Telescope");
expect(nasa.reported_surface.field).toBe("COSMOS");
expect(nasa.next_required_object).toBe(
"PRIMARY_WEBB_COSMOS_LENSING_MAP_DATA_AND_METHOD_AUDIT",
);
});
it("keeps ICTP-SAIFR as venue source only", () => {
const ictp = sources.ICTP_SAIFR_HBSM2026_COMMUNITY_VALIDATION_VENUE_SOURCE;
expect(ictp.claim_status).toBe("venue_source_only_not_evidence");
expect(ictp.reported_surface.dates).toBe("2026-06-01_to_2026-06-12");
expect(ictp.reported_surface.application_status).toBe("closed");
expect(ictp.next_required_object).toBe(
"COMMUNITY_FEEDBACK_OR_CONTACT_RECORD_SUPPLIED",
);
});
it("preserves no-promotion boundaries", () => {
const boundary = artifact.boundary.join("\n");
expect(boundary).toContain("No dark matter detection is claimed.");
expect(boundary).toContain("No dark matter particle identification is claimed.");
expect(boundary).toContain("No gravity solution is claimed.");
expect(boundary).toContain("No DFM-MKC validation is claimed.");
expect(boundary).toContain("No Lambda-CDM failure is claimed.");
expect(boundary).toContain("No Euclid Q2 empirical claim is made.");
expect(artifact.does_not_prove).toContain("any Clay problem");
});
});
