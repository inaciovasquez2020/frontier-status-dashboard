import { describe, expect, it } from "vitest";
import source from "./App.tsx?raw";

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
