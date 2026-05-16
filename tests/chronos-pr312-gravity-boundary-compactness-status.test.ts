import statusData from "../src/data/status-data.json";

const rows: any[] = Array.isArray(statusData)
  ? statusData
  : ((statusData as any).repositories ??
     (statusData as any).repos ??
     (statusData as any).data ??
     (statusData as any).items);

const chronos = rows.find((row) =>
  JSON.stringify(row).toLowerCase().includes("chronos-urf-rr")
);

describe("Chronos PR312 gravity boundary compactness dashboard sync", () => {
  it("records PR312 as conditional only without theorem promotion", () => {
    expect(chronos).toBeTruthy();

    const boundary = String(
      chronos.boundary ?? chronos.claimBoundary ?? ""
    );

    expect(boundary).toContain("Chronos PR #312");
    expect(boundary).toContain("CONDITIONAL_BOUNDARY_COMPACTNESS_ROUTE_ONLY");
    expect(boundary).toContain("no unconditional Universal Boundary Compactness");
    expect(boundary).toContain("no unconditional QL_CollapseGate");
    expect(boundary).toContain("no Cosmic Censorship");
    expect(boundary).toContain("no Hoop Conjecture");
    expect(boundary).toContain("no unrestricted Chronos-RR");
    expect(boundary).toContain("no H4.1/FGL");
    expect(boundary).toContain("no P vs NP");
    expect(boundary).toContain("no Clay-problem closure");
  });
});
