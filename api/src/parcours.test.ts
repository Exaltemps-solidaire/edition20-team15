import { describe, expect, it } from "vitest";
import { calculerProgression, type Module } from "./parcours.ts";

describe("calculerProgression", () => {
  it("calcule le pourcentage et le libellé à partir des modules terminés", () => {
    const modules: Module[] = [
      { id: "1", nom: "a", description: "", etat: "termine" },
      { id: "2", nom: "b", description: "", etat: "en-cours" },
      { id: "3", nom: "c", description: "", etat: "a-venir" },
    ];
    expect(calculerProgression(modules)).toEqual({
      pourcentage: 33,
      termines: 1,
      total: 3,
      label: "1 sur 3 modules",
    });
  });

  it("répond 100% quand tous les modules sont terminés", () => {
    const modules: Module[] = [
      { id: "1", nom: "a", description: "", etat: "termine" },
      { id: "2", nom: "b", description: "", etat: "termine" },
    ];
    expect(calculerProgression(modules).pourcentage).toBe(100);
  });
});
