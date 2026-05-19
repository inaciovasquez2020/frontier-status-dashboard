import statusData from "../src/data/status-data.json";

const rows = Array.isArray(statusData)
  ? statusData
  : ((statusData as any).repositories ?? (statusData as any).rows ?? (statusData as any).statuses);

const chronosRow = rows.find((row: any) =>
  JSON.stringify(row).includes("chronos-urf-rr") ||
  String(row.domain ?? "").toLowerCase().includes("chronos")
);

describe("Chronos PR #414 uniform temporal relaxation wave target dashboard sync", () => {
  it("records the PR #414 target-isolation boundary without theorem promotion", () => {
    expect(chronosRow).toBeTruthy();

    const text = JSON.stringify(chronosRow);

    expect(text).toContain("UniformTemporalRelaxationWaveExistenceTarget");
    expect(text).toContain("FRONTIER_OPEN");
    expect(text).toContain("target isolation only");
    expect(text).toContain("no UniformTemporalRelaxationWave existence proof");
    expect(text).toContain("no unrestricted UniversalFiberEntropyGap");
    expect(text).toContain("no Chronos-RR");
    expect(text).toContain("no H4.1/FGL");
    expect(text).toContain("no P vs NP");
    expect(text).toContain("no Clay closure");
  });
});
