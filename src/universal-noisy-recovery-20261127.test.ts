import { describe, expect, it } from "vitest";
import { CLAIMS, getClaim } from "./data/claims";
describe("universal noisy recovery checkpoint", () => {
  it("keeps pinned proof status and limits explicit", () => {
    expect(new Set(CLAIMS.map(c => c.id)).size).toBe(CLAIMS.length);
    const u = getClaim("urf-universal-recovery-20261127");
    const b = getClaim("bff-noisy-recovery-20261127");
    expect(u?.artifactUrl).toBe("https://github.com/inaciovasquez2020/biological-friction-framework/blob/76317e758f932638945934bcac2ce9ffa7fa3d31/proofs/hidden-dissipation/recovery/UniversalRecovery.lean");
    expect(b?.artifactUrl).toBe("https://github.com/inaciovasquez2020/biological-friction-framework/blob/76317e758f932638945934bcac2ce9ffa7fa3d31/proofs/hidden-dissipation/recovery/EntropyConvexity.lean");
    expect(u?.status).toBe("machine-checked");
    expect(b?.status).toBe("machine-checked");
    expect(b?.scope).toContain("57/57");
    expect(b?.scope).toContain("Linux reproduction pending");
    expect(b?.limitations).toContain("OPEN");
    expect(u?.limitations).toContain("Classical optimal-recovery");
  });
});
