import statusData from "../src/data/status-data.json";

describe("urf-textbook manuscript incomplete status", () => {
  const row = (statusData as any[]).find(
    (entry) => entry.name === "urf-textbook" || entry.repository === "urf-textbook",
  );

  it("keeps the canonical exposition surface status", () => {
    expect(row).toBeTruthy();
    expect(row.status).toBe("ACTIVE_EXPOSITION_TEXTBOOK_SURFACE");
  });

  it("marks the manuscript layer as incomplete", () => {
    expect(row.manuscriptStatus).toBe("TEXTBOOK_MANUSCRIPT_INCOMPLETE");
    expect(row.textbookComplete).toBe(false);
  });

  it("keeps the row in the minimal public front door", () => {
    expect(row.minimalPublic).toBe(true);
    expect(row.publicFrontDoor).toBe(true);
    expect(row.topLevelProgram).toBe(true);
  });

  it("keeps the row out of theorem and closure-scale metrics", () => {
    expect(row.theoremMetricApplicable).toBe(false);
    expect(row.closureScaleMetricApplicable).toBe(false);
    expect(row.excludeFromMetrics).toBe(true);
  });

  it("preserves boundary discipline", () => {
    const boundary = String(row.boundary);
    expect(boundary).toContain("Documentation/textbook/exposition surface only");
    expect(boundary).toContain("TEXTBOOK_MANUSCRIPT_INCOMPLETE");
    expect(boundary).toContain("manuscript hygiene only");
    expect(boundary).toContain("not a complete textbook");
    expect(boundary).toContain("not theorem-level closure");
    expect(boundary).toContain("changes do not constitute theorem-level proof");
    expect(boundary).toContain("No independent theorem-level closure");
    expect(boundary).toContain("No Chronos-RR closure");
    expect(boundary).toContain("No H4.1/FGL closure");
    expect(boundary).toContain("No UniversalFiberEntropyGap theorem");
    expect(boundary).toContain("No P vs NP result");
    expect(boundary).toContain("no P vs NP closure");
    expect(boundary).toContain("no Clay-problem closure");
  });
});
