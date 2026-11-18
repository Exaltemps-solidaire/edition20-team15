// Logique métier de l'itération 2 : une envie du moment (facultative) donne une seule
// prochaine action, sans délai imposé ni message culpabilisant (cf. PRD §105).

export type EnvieMoment = "ressource" | "atelier" | "pause";

export type ProchaineAction = {
  titre: string;
  description: string;
};

const PROCHAINE_ACTION: Record<EnvieMoment, ProchaineAction> = {
  ressource: {
    titre: "Découvrir une ressource",
    description: "Une ressource du module en cours vous attend, sans obligation de la terminer.",
  },
  atelier: {
    titre: "S'inscrire à un atelier",
    description: "Un atelier du module en cours est ouvert, à votre rythme.",
  },
  pause: {
    titre: "Faire une pause",
    description: "Vos notifications seront suspendues, reprenez quand vous voulez.",
  },
};

export function prochaineAction(envie: EnvieMoment): ProchaineAction {
  return PROCHAINE_ACTION[envie];
}
