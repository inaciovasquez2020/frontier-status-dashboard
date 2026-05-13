import { describe, expect, it } from "vitest";
import statusData from "../src/data/status-data.json";

describe("profile row removal", () => {
  it("does not expose the GitHub profile/start-here row as a theorem dashboard row", () => {
    const names = statusData.map((row) => row.name);
    expect(names).not.toContain("inaciovasquez2020");
  });

  it("keeps theorem and infrastructure rows available", () => {
    const names = statusData.map((row) => row.name);
    expect(names).toContain("chronos-urf-rr");
    expect(names).toContain("urf-core");
    expect(names).toContain("vasquez-index");
  });
});
