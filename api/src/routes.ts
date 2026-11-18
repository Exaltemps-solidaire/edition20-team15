// Routage de l'API, sans dépendance : une fonction pure, testable sans démarrer de serveur.
// Le proxy d'entrée envoie /api/... à ce service sans retirer le préfixe : les routes métier
// se déclarent donc sous /api/v1/... ; /health et /sante restent à la racine (port 8081).

import { parcoursActif } from "./parcours.ts";

export type Reponse = { statut: number; corps?: unknown };

export function router(methode: string, url: string): Reponse {
  const chemin = new URL(url, "http://api").pathname;
  if (methode === "GET" && (chemin === "/health" || chemin === "/sante")) {
    return { statut: 200, corps: { status: "ok" } };
  }
  if (methode === "GET" && chemin === "/api/v1/parcours") {
    return { statut: 200, corps: parcoursActif() };
  }
  return { statut: 404 };
}
