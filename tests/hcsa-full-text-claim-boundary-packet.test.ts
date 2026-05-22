import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
const root = process.cwd();
const artifact = JSON.parse(
fs.readFileSync(
path.join(root, "artifacts/gravity/hcsa_full_text_claim_boundary_packet_2026_05_22.json"),
"utf8",
),
);
const doc = fs.readFileSync(
path.join(root, "docs/status/HCSA_FULL_TEXT_CLAIM_BOUNDARY_PACKET_2026_05_22.md"),
"utf8",
);
describe("HCSA_FULL_TEXT_CLAIM_BOUNDARY_PACKET", () => {
it("records HCSA as a no-validation boundary packet", () => {
expect(artifact.id).toBe("HCSA_FULL_TEXT_CLAIM_BOUNDARY_PACKET");
expect(artifact.status).toBe("HCSA_FULL_TEXT_CLAIM_BOUNDARY_ONLY_NO_VALIDATION");
expect(artifact.source_class).toBe("ssrn_preprint_full_text");
expect(artifact.internal_object).toBe("no_overclaim_boundary");
expect(artifact.claim_classification).toBe("speculative_external_cosmology_claim");
});
it("records Lambda-CDM only as a baseline reference", () => {
expect(artifact.baseline_reference.key).toBe("lambda_cdm_model_wikipedia_reference");
expect(artifact.baseline_reference.source_class).toBe("encyclopedic_reference");
expect(artifact.baseline_reference.claim_status).toBe("baseline_reference_only_no_failure_claim");
expect(artifact.baseline_reference.url).toBe("https://en.wikipedia.org/wiki/Lambda-CDM_model");
expect(doc).toContain("baseline_reference_only_no_failure_claim");
});
it("records the external claims without promoting them", () => {
expect(artifact.content_claims_recorded).toContain("deterministic resolution of dark matter");
expect(artifact.content_claims_recorded).toContain("deterministic resolution of dark energy");
expect(artifact.content_claims_recorded).toContain("deterministic resolution of CMB anomalies");
expect(artifact.content_claims_recorded).toContain("10^66 total informational pressure coefficient");
expect(artifact.content_claims_recorded).toContain("10^300 source information density");
expect(artifact.content_claims_recorded).toContain("2.725 K CMB temperature derivation claim");
});
it("preserves no-overclaim boundaries", () => {
const boundaries = [
"dark matter resolution",
"dark energy resolution",
"CMB anomaly resolution",
"DFM-MKC validation",
"QICT validation",
"Lambda-CDM failure",
"modified gravity failure",
"gravity closure",
"empirical validation",
"P vs NP",
"any Clay problem",
];
expect(new Set(artifact.does_not_prove)).toEqual(new Set(boundaries));

for (const boundary of boundaries) {
  expect(doc).toContain(boundary);
}
});
});
