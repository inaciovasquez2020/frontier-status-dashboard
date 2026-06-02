import { describe, expect, it } from "vitest";
import { repos } from "./App";

describe("June 2026 frontier status update", () => {
  it("adds the bounded finite Markov-kernel stack without overwriting the locked urf-core row", () => {
    const urfCore = repos.find((repo) => repo.name === "urf-core");
    const finiteMarkov = repos.find((repo) => repo.name === "URF finite Markov-kernel stack");

    expect(urfCore).toBeDefined();
    expect(urfCore?.status).toBe("TEXTUAL_ASSUMPTION_BOUNDARY_CLOSED");

    expect(finiteMarkov).toBeDefined();
    expect(finiteMarkov?.status).toBe("FINITE_MARKOV_KERNEL_STACK_CLOSED");
    expect(finiteMarkov?.boundary).toContain("BundledFiniteMarkovKernelCompositionTheorem");
    expect(finiteMarkov?.boundary).toContain("no whole-URF theorem closure");
    expect(finiteMarkov?.boundary).toContain("no unrestricted URF law closure");
    expect(finiteMarkov?.theoremMetricApplicable).toBe(false);
    expect(finiteMarkov?.closureScaleMetricApplicable).toBe(false);
  });

  it("adds the finite graph distance layer without changing the closure-scale average", () => {
    const graph = repos.find((repo) => repo.name === "Finite graph distance layer");

    expect(graph).toBeDefined();
    expect(graph?.status).toBe("GLOBAL_TRIANGLE_CLOSED");
    expect(graph?.boundary).toContain("GlobalDistanceTriangleTheoremUnconditionalOnSLASH");
    expect(graph?.boundary).toContain("directed symmetry is not closed");
    expect(graph?.theoremClosure).toBe(100);
    expect(graph?.closureScaleMetricApplicable).toBe(false);
  });
});
