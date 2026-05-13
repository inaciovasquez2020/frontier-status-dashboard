import { describe, expect, it } from "vitest";
import statusData from "./data/status-data.json";

describe("public GitHub repository surface", () => {
  const repos = statusData;
  const urls = new Set(repos.map((repo) => repo.url).filter(Boolean));

  it("covers public repository rows by URL without the removed profile row", () => {
    expect(urls).not.toContain("https://github.com/inaciovasquez2020");
    expect(urls).not.toContain("https://github.com/inaciovasquez2020?tab=repositories");

    expect(urls).toContain("https://github.com/inaciovasquez2020/chronos-urf-rr");
    expect(urls).toContain("https://github.com/inaciovasquez2020/urf-core");
    expect(urls).toContain("https://github.com/inaciovasquez2020/urf-textbook");
    expect(urls).toContain("https://github.com/inaciovasquez2020/vasquez-index");
  });

  it("keeps index rows non-theorem-bearing", () => {
    for (const url of ["https://github.com/inaciovasquez2020/vasquez-index"]) {
      const row = repos.find((repo) => repo.url === url);
      expect(row).toBeTruthy();
      expect(row?.theoremClosure).toBe(0);
      expect(row?.theoremMetricApplicable).toBe(false);
      expect(row?.boundary).toContain("no theorem claim is promoted");
    }
  });
});
