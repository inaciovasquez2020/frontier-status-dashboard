import { describe, expect, it } from "vitest";
import { repos } from "./App";

describe("Poincare dashboard privacy policy", () => {
  it("omits the private PND row from the public dashboard", () => {
    const pnd = repos.find((repo) => repo.name === "poincare-new-derivation");

    expect(pnd).toBeUndefined();
    expect(JSON.stringify(repos)).not.toContain("PND_D3EL_excess_10pct");
    expect(JSON.stringify(repos)).not.toContain("formal_Pachner_connectivity_3D");
  });

  it("keeps private mathematical metadata represented only by the internal aggregate row", () => {
    const internal = repos.find((repo) => repo.name === "Private/Internal Verification Surfaces");

    expect(internal).toBeDefined();
    expect(internal?.metadataOnly).toBe(true);
    expect(internal?.excludeFromMetrics).toBe(true);
    expect(internal?.boundary).toContain("Private repository metadata is intentionally omitted");
  });

  it("forbids unconditional closure promotion", () => {
    const dataText = JSON.stringify(repos);

    expect(dataText).not.toContain("theoremClosure=100");
    expect(dataText).not.toContain("Poincare conjecture proved");
    expect(dataText).not.toContain("ImportedPachnerTheorem3D is internally proved");
  });
});
