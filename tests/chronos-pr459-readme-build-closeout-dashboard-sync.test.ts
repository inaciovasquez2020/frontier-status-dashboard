import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";
const serialized = JSON.stringify(statusData);
describe("Chronos PR459 README build-closeout dashboard sync", () => {
it("records the Chronos PR459 README build-closeout sync", () => {
expect(serialized).toContain("Chronos PR459 README build-closeout sync");
expect(serialized).toContain("DASHBOARD_SYNC_ONLY_NO_THEOREM_PROMOTION");
expect(serialized).toContain("BUILD_CLOSEOUT_SURFACE_ONLY_NO_ANALYTIC_PACKAGE_PROOF");
expect(serialized).toContain("NEXT_BUILD_ALLOWED_AFTER_STOP_LOCK");
});
it("excludes the row from theorem and closure-scale metrics", () => {
expect(serialized).toContain('"theoremMetricApplicable":false');
expect(serialized).toContain('"closureScaleMetricApplicable":false');
expect(serialized).toContain('"theoremClosure":0');
expect(serialized).toContain('"integrity":100');
});
it("preserves no-promotion boundaries", () => {
expect(serialized).toContain("no analytic Einstein-matter bootstrap package proof");
expect(serialized).toContain("no concrete analytic Einstein-matter estimate package proof");
expect(serialized).toContain("no gravity closure");
expect(serialized).toContain("no Chronos-RR");
expect(serialized).toContain("no H4.1/FGL");
expect(serialized).toContain("no P vs NP");
expect(serialized).toContain("no Clay problem");
});
});
