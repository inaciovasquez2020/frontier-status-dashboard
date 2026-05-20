import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";
import artifact from "../artifacts/dashboard/dfm_mkc_act_dr6_holdout_status_2026_05_20.json";

function collectRows(value: unknown): any[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    for (const key of ["rows", "statusRows", "statuses", "items", "data", "projects", "claims", "entries"]) {
      if (Array.isArray(obj[key])) return obj[key] as any[];
    }
    for (const candidate of Object.values(obj)) {
      if (Array.isArray(candidate) && candidate.every((item) => item && typeof item === "object")) {
        return candidate as any[];
      }
    }
  }
  return [];
}

describe("DFM-MKC ACT DR6 holdout dashboard status", () => {
  const rows = collectRows(statusData);
  const row = rows.find((item) => item.id === "dfm-mkc-act-dr6-holdout-status-2026-05-20");

  it("adds the dashboard row", () => {
    expect(row).toBeTruthy();
  });

  it("marks the exact status", () => {
    expect(row.status).toBe("POSTHOC_LOCAL_ONLY + INDEPENDENT_HOLDOUT_OPEN");
    expect(row.classification).toBe("POSTHOC_LOCAL_ONLY_INDEPENDENT_HOLDOUT_OPEN");
  });

  it("keeps the row public-dashboard-owned and metric-excluded", () => {
    expect(row.repo).toBe("frontier-status-dashboard");
    expect(row.repository).toBe("inaciovasquez2020/frontier-status-dashboard");
    expect(row.url).toBe("https://github.com/inaciovasquez2020/frontier-status-dashboard");
    expect(row.excludeFromMetrics).toBe(true);
    expect(row.theoremMetricApplicable).toBe(false);
    expect(row.closureScaleMetricApplicable).toBe(false);
    expect(row.integrity).toBe(100);
    expect(row.theoremClosure).toBe(0);
  });

  it("does not expose private/non-public repository names", () => {
    expect(JSON.stringify(statusData)).not.toContain("flagship-lean");
    expect(JSON.stringify(artifact)).not.toContain("flagship-lean");
  });

  it("preserves boundary text", () => {
    expect(row.boundary).toContain("No ACT DR6 likelihood run");
    expect(row.boundary).toContain("no prediction vector/hash");
    expect(row.boundary).toContain("no Lambda-CDM comparison");
    expect(row.boundary).toContain("no superiority claim");
  });

  it("writes the dashboard artifact", () => {
    expect(artifact.boundary_preserved).toBe(true);
    expect(artifact.dashboard_row.status).toBe("POSTHOC_LOCAL_ONLY + INDEPENDENT_HOLDOUT_OPEN");
    expect(artifact.public_private_policy.private_repository_name_exposed).toBe(false);
    expect(artifact.public_private_policy.excluded_from_metrics).toBe(true);
  });
});
