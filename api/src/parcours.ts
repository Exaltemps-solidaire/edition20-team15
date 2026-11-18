// Données en dur de l'itération 1 : un seul parcours actif (BBA), 3 modules. Pas de persona ni
// de persistance pour l'instant — ils arrivent en itération 2.

export type EtatModule = "termine" | "en-cours" | "a-venir";

export type Module = {
  id: string;
  nom: string;
  description: string;
  etat: EtatModule;
};

export const modulesBBA: Module[] = [
  {
    id: "module-1",
    nom: "Module 1 · Se reconnecter à soi",
    description: "Un premier pas vers votre bien-être",
    etat: "termine",
  },
  {
    id: "module-2",
    nom: "Module 2 · Gérer son énergie",
    description: "Apprendre à écouter vos besoins",
    etat: "en-cours",
  },
  {
    id: "module-3",
    nom: "Module 3 · Reprendre confiance",
    description: "Module à venir",
    etat: "a-venir",
  },
];

export type Progression = {
  pourcentage: number;
  termines: number;
  total: number;
  label: string;
};

export function calculerProgression(modules: Module[]): Progression {
  const total = modules.length;
  const termines = modules.filter((m) => m.etat === "termine").length;
  const pourcentage = total === 0 ? 0 : Math.round((termines / total) * 100);
  const label = `${termines} sur ${total} module${total > 1 ? "s" : ""}`;
  return { pourcentage, termines, total, label };
}

export function parcoursActif() {
  return {
    nom: "BURN TO BE ALIVE",
    modules: modulesBBA,
    progression: calculerProgression(modulesBBA),
  };
}
