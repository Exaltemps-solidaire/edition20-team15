import { describe, expect, it } from "vitest";
import { estEnPause } from "./pause-data";

describe("estEnPause", () => {
  it("n'est pas en pause quand rien n'est stocké", () => {
    expect(estEnPause(null)).toBe(false);
  });

  it("est en pause quand la valeur stockée est 'true'", () => {
    expect(estEnPause("true")).toBe(true);
  });

  it("n'est pas en pause pour toute autre valeur stockée", () => {
    expect(estEnPause("false")).toBe(false);
  });
});
