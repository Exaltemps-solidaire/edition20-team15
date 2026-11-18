import { describe, expect, it } from "vitest";
import { prochaineAction } from "./envie-du-moment";

describe("prochaineAction", () => {
  it("propose une ressource pour l'envie 'ressource'", () => {
    expect(prochaineAction("ressource").titre).toBe("Découvrir une ressource");
  });

  it("propose un atelier pour l'envie 'atelier'", () => {
    expect(prochaineAction("atelier").titre).toBe("S'inscrire à un atelier");
  });

  it("propose une pause pour l'envie 'pause', sans message culpabilisant", () => {
    const action = prochaineAction("pause");
    expect(action.titre).toBe("Faire une pause");
    expect(action.description.toLowerCase()).not.toMatch(/devoir|obliger|retard/);
  });
});
