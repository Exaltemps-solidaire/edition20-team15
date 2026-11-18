// Logique métier de l'itération 3 : l'état de pause est enregistré automatiquement
// (pas de ressaisie au retour) et reflété tant que la BURN'ette n'a pas repris (PRD §107).

export const PAUSE_KEY = "lburn-en-pause";

export function estEnPause(valeurStockee: string | null): boolean {
  return valeurStockee === "true";
}
