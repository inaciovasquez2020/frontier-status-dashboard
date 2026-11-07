import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(process.cwd(), "src", "App.tsx"), "utf8");

describe("public research navigation", () => {
  it("links the dashboard back to canonical research pages", () => {
    expect(source).toContain('href="https://inaciovasquez2020.github.io/"');
    expect(source).toContain('href="https://inaciovasquez2020.github.io/#projects"');
    expect(source).toContain('href="https://inaciovasquez2020.github.io/publications.html"');
    expect(source).toContain('href="https://inaciovasquez2020.github.io/contact.html"');
    expect(source).toContain('href="/verification"');
  });
  it("does not link to a dashboard alias presented as a different front door", () => {
    expect(source).not.toContain('href="/urf-front-door/"');
  });
});
