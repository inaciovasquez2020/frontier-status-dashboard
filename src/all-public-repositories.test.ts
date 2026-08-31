import { describe, expect, it } from "vitest";
import { publicRepos } from "./App";
import publicRepositoryInventory from "./data/public-repository-inventory.json";

const publicRepositoryRoot = /^https:\/\/github\.com\/inaciovasquez2020\/([^/]+)\/?$/i;

const renderedRootNames = new Set(
  publicRepos.flatMap((repo) => {
    const match = repo.url.match(publicRepositoryRoot);
    return match ? [match[1].toLowerCase()] : [];
  }),
);

const inventoryNames = (publicRepositoryInventory as Array<{ name: string; url: string }>).map(
  (entry) => entry.name.toLowerCase(),
);

describe("complete public repository inventory", () => {
  it("contains every and only current owned public repository as a root row", () => {
    expect(new Set(inventoryNames).size).toBe(inventoryNames.length);
    expect([...renderedRootNames].sort()).toEqual([...inventoryNames].sort());
  });
});
