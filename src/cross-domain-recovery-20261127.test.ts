import { describe, expect, it } from "vitest";
import { CLAIMS, getClaim } from "./data/claims";

describe("November 27 cross-domain recovery checkpoints", () => {
  it("records three scoped, pinned certificate entries without double counting", () => {
    const ids = ["bff-hidden-dissipation-20261127","bff-cosmology-recovery-20261127","chronos-cosmology-projection-20261127"];
    const urls = ["https://github.com/inaciovasquez2020/biological-friction-framework/blob/799b41b4692c71589587cba037f26f0ad4bff7fb/proofs/hidden-dissipation/receipt/HiddenDissipation.lean","https://github.com/inaciovasquez2020/biological-friction-framework/blob/c5c8b2f24a0d4de57c764c161ab29c3689bec62f/proofs/hidden-dissipation/receipt/HiddenDissipation.lean","https://github.com/inaciovasquez2020/chronos-urf-rr/blob/2ed7df1497824343fce34924501d42a220c3006f/research/certificates/cosmology_causal_projection/receipt/CausalProjection.lean"];
    expect(new Set(CLAIMS.map(c => c.id)).size).toBe(CLAIMS.length);
    ids.forEach((id, i) => {
      const c = getClaim(id);
      expect(c?.status).toBe("machine-checked");
      expect(c?.artifactUrl).toBe(urls[i]);
      expect(c?.lastChecked).toBe("2026-11-27");
      expect(c?.limitations).toContain("OPEN");
    });
    expect(getClaim(ids[1])?.scope).toContain("41/41");
    expect(getClaim(ids[2])?.scope).toContain("wider integration CI pending");
    expect(getClaim(ids[2])?.artifactLabel).toContain("not a merge claim");
  });
});
