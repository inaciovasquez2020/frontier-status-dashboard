import statusData from "../src/data/status-data.json";

describe("cross-repo historical total dashboard row", () => {
  const rows = statusData as any[];
  const row = rows.find((item) => item.id === "cross-repo-historical-total-2026-06-30");

  it("publishes the cross-repo historical total in the rendered dashboard source", () => {
    expect(row).toBeDefined();
    expect(row?.name).toBe("Cross-repo historical total");
    expect(row?.url).toBe("https://github.com/inaciovasquez2020/frontier-status-dashboard");
    expect(row?.latestArtifact).toBe("CROSS_REPO_HISTORICAL_TOTAL_2026_06_30.md");
  });

  it("covers the tracked repositories and today Chronos work", () => {
    const text = JSON.stringify(row);
    expect(text).toContain("chronos-urf-rr");
    expect(text).toContain("phase-transition-pnp");
    expect(text).toContain("dfm-mkc-cosmology");
    expect(text).toContain("cslib-fmt");
    expect(text).toContain("urf-templates");
    expect(text).toContain("PR #924");
    expect(text).toContain("PR #925");
    expect(text).toContain("PR #926");
  });

  it("keeps frontier closure and efficiency overclaims blocked", () => {
    const boundary = row?.boundary ?? "";
    expect(boundary).toContain("does not prove P vs NP");
    expect(boundary).toContain("Chronos-RR");
    expect(boundary).toContain("gravity");
    expect(boundary).toContain("cosmology");
    expect(boundary).toContain("general proof efficiency");
    expect(row?.theoremMetricApplicable).toBe(false);
    expect(row?.closureScaleMetricApplicable).toBe(false);
  });
});
