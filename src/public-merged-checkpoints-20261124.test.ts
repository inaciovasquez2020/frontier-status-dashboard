import { describe, expect, it } from "vitest";
import { CLAIMS, getClaim } from "./data/claims";

const published = [
  ["urf-core-sharp-rank-20261124", "machine-checked", "https://github.com/inaciovasquez2020/urf-core/commit/422294157daa95a8e7d95a0ce79caf5492821a9c"],
  ["urf-core-fo-k-boundary-20261124", "verified-surface", "https://github.com/inaciovasquez2020/urf-core/commit/afdc0a20960b0f396b0a7fca85216a21f46ca14c"],
  ["dfm-mkc-evidence-20261124", "verified-surface", "https://github.com/inaciovasquez2020/dfm-mkc-cosmology/commit/436b2a132edd1fb98665887a530f0b337db88f1f"],
  ["poincare-u16-witnesses-20261124", "verified-surface", "https://github.com/inaciovasquez2020/poincare-new-derivation/commit/8842f3bf42c7ddc604a1b545d9116ef34effdc25"],
] as const;

describe("November 24 public verification checkpoints", () => {
  it("links four exact public source merges without theorem promotion", () => {
    expect(new Set(CLAIMS.map((claim) => claim.id)).size).toBe(CLAIMS.length);
    expect(published).toHaveLength(4);
    for (const [id, status, url] of published) {
      const claim = getClaim(id);
      expect(claim).toBeDefined();
      expect(claim?.status).toBe(status);
      expect(claim?.artifactUrl).toBe(url);
      expect(claim?.lastChecked).toBe("2026-11-24");
      expect(claim?.scope).toBeTruthy();
      expect(claim?.limitations).toBeTruthy();
    }
  });
  it("retains the isolated/formal and finite/global separation", () => {
    expect(getClaim("urf-core-sharp-rank-20261124")?.limitations).toContain("production-module");
    expect(getClaim("urf-core-sharp-rank-20261124")?.limitations).toContain("OPEN");
    expect(getClaim("poincare-u16-witnesses-20261124")?.limitations).toContain("GLOBAL_POINCARE := OPEN");
    expect(getClaim("poincare-u16-witnesses-20261124")?.status).toBe("verified-surface");
  });
});
