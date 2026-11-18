// Données d'exemple de l'itération 2 : une personne par rôle du scénario (cf. PRD §149-151).
// Pas de connexion ni de compte : l'application fait choisir l'utilisatrice qu'on incarne.

export type Persona = {
  id: string;
  nom: string;
  role: string;
};

export const PERSONA_KEY = "lburn-persona-id";

export const personas: Persona[] = [
  { id: "sophie", nom: "Sophie", role: "BURN'ette en reconstruction" },
  { id: "claire", nom: "Claire", role: "BURN'ette en remobilisation" },
  { id: "nadia", nom: "Nadia", role: "La professionnelle" },
  { id: "emilie", nom: "Émilie", role: "La directrice d'antenne" },
  { id: "lucie", nom: "Lucie", role: "La Product Owner de la plateforme" },
];

export function trouverPersona(id: string | null): Persona | undefined {
  return personas.find((p) => p.id === id);
}
