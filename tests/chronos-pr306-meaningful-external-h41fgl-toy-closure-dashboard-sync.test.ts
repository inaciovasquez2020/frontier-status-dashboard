import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

const serialized = JSON.stringify(statusData);

describe("Chronos PR306 meaningful external H41FGL toy closure dashboard sync", () => {
  it("records the PR306 toy external-model closure boundary", () => {
    expect(serialized).toContain("meaningful external H41FGL toy closure");
    expect(serialized).toContain("no nontrivial external H4.1/FGL theorem");
    expect(serialized).toContain("no unrestricted Chronos-RR");
    expect(serialized).toContain("no unrestricted H4.1/FGL");
    expect(serialized).toContain("no P vs NP");
    expect(serialized).toContain("no Clay-problem closure");
  });

  it("does not promote the toy closure to an unrestricted theorem", () => {
    expect(serialized).not.toContain("proves unrestricted Chronos-RR");
    expect(serialized).not.toContain("proves unrestricted H4.1/FGL");
    expect(serialized).not.toContain("solves P vs NP");
    expect(serialized).not.toContain("solves a Clay problem");
  });
});
