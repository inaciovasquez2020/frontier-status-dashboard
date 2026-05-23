
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const artifactPath = path.join(root, "artifacts/nuclear/nuclear_chern_topological_matter_source_map_2026_05_22.json");
const docPath = path.join(root, "docs/status/NUCLEAR_CHERN_TOPOLOGICAL_MATTER_SOURCE_MAP_2026_05_22.md");
describe("Nuclear Chern topological matter source map", () => {
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
const doc = fs.readFileSync(docPath, "utf8");
it("records the PRL source metadata", () => {
expect(artifact.id).toBe("NUCLEAR_CHERN_TOPOLOGICAL_MATTER_SOURCE_MAP");
expect(artifact.status).toBe("MODEL_SPECIFIC_TOPOLOGICAL_NUCLEAR_SOURCE_ONLY_NO_FRONTIER_PROMOTION");
expect(artifact.source.title).toBe("Chern Theorem and Topological Matter in Fast-Rotating Atomic Nuclei");
expect(artifact.source.authors).toEqual(["Mike Guidry", "Yang Sun"]);
expect(artifact.source.journal).toBe("Physical Review Letters");
expect(artifact.source.volume).toBe("136");
expect(artifact.source.issue).toBe("6");
expect(artifact.source.article).toBe("062502");
expect(artifact.source.publication_date).toBe("2026-02-13");
expect(artifact.source.doi).toBe("10.1103/lzdm-ng2k");
});
it("keeps the record as source-map only", () => {
expect(artifact.urf_relevance.admissible_use).toBe("source-map record only");
expect(artifact.required_before_promotion).toContain("exact theorem statement extracted from the paper");
expect(artifact.next_admissible_object).toBe("NUCLEAR_CHERN_TOPOLOGICAL_MATTER_THEOREM_EXTRACTION_TARGET");
});
it("preserves no-promotion boundaries", () => {
const blocked = [
"DFM-MKC validation",
"Lambda-CDM failure",
"dark matter resolution",
"dark energy resolution",
"gravity closure",
"Chronos-RR",
"H4.1/FGL",
"P vs NP",
"any Clay problem",
"nuclear theorem promotion inside URF",
];
for (const item of blocked) {
  expect(artifact.does_not_prove).toContain(item);
  expect(doc).toContain(item);
}
});
});
