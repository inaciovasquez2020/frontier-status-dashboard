import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

describe("urf-textbook dashboard status", () => {
  const row = statusData.find((entry) => entry.name === "urf-textbook");

  it("records urf-textbook as an exposition/textbook surface", () => {
    expect(row).toBeDefined();
    expect(row?.status).toBe("ACTIVE_EXPOSITION_TEXTBOOK_SURFACE");
    expect(row?.theoremClosure).toBe(0);
    expect(row?.theoremMetricApplicable).toBe(false);
    expect(row?.excludeFromMetrics).toBe(true);
  });

  it("preserves theorem-boundary language", () => {
    expect(row?.boundary).toContain("Documentation/textbook/exposition surface only");
    expect(row?.boundary).toContain("do not constitute theorem-level proof");
    expect(row?.boundary).toContain("No independent theorem-level closure");
    expect(row?.boundary).toContain("No Chronos-RR closure");
    expect(row?.boundary).toContain("No H4.1/FGL closure");
    expect(row?.boundary).toContain("No UniversalFiberEntropyGap theorem");
    expect(row?.boundary).toContain("No P vs NP result");
    expect(row?.boundary).toContain("No Clay-problem closure");
  });
});
