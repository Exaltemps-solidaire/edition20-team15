"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { trouverPersona, PERSONA_KEY } from "./personas-data";
import { prochaineAction, type EnvieMoment, type ProchaineAction } from "./envie-du-moment";

const OPTIONS_ENVIE: { id: EnvieMoment; libelle: string }[] = [
  { id: "ressource", libelle: "Je préfère découvrir une ressource" },
  { id: "atelier", libelle: "Je suis prête pour un atelier" },
  { id: "pause", libelle: "Je souhaite faire une pause" },
];

type EtatModule = "termine" | "en-cours" | "a-venir";

type Module = {
  id: string;
  nom: string;
  description: string;
  etat: EtatModule;
};

type Parcours = {
  nom: string;
  modules: Module[];
  progression: { pourcentage: number; label: string };
};

const LIBELLE_ETAT: Record<EtatModule, string> = {
  termine: "Terminé",
  "en-cours": "En cours",
  "a-venir": "Module à venir",
};

export default function Home() {
  const router = useRouter();
  const [parcours, setParcours] = useState<Parcours | null>(null);
  const [erreur, setErreur] = useState(false);
  const [personaId] = useState<string | null>(() =>
    typeof window === "undefined" ? null : window.localStorage.getItem(PERSONA_KEY)
  );
  const [action, setAction] = useState<ProchaineAction | null>(null);

  useEffect(() => {
    if (!personaId) {
      router.replace("/qui-etes-vous");
    }
  }, [personaId, router]);

  useEffect(() => {
    fetch("/api/v1/parcours")
      .then((reponse) => {
        if (!reponse.ok) throw new Error("réponse non ok");
        return reponse.json();
      })
      .then(setParcours)
      .catch(() => setErreur(true));
  }, []);

  const persona = trouverPersona(personaId);

  function changerDePersona() {
    window.localStorage.removeItem(PERSONA_KEY);
    router.push("/qui-etes-vous");
  }

  if (!persona) {
    return null;
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <span className={styles.logo}>L&apos;BURN</span>
        <span className={styles.topbarTitle}>
          Mon parcours, <em>à mon rythme</em>
        </span>
        <span className={styles.chargement}>
          {persona.nom} · {persona.role}
        </span>
        <button type="button" className={styles.badge} onClick={changerDePersona}>
          Changer de persona
        </button>
      </header>

      <main className={styles.main}>
        {erreur && <p className={styles.erreur}>Impossible de charger votre parcours pour l&apos;instant.</p>}

        {!erreur && !parcours && <p className={styles.chargement}>Chargement de votre parcours…</p>}

        {parcours && (
          <>
            <section className={styles.heroBand}>
              <div>
                <div className={styles.heroLabel}>Votre parcours actif</div>
                <div className={styles.heroTitle}>Vous avancez sur {parcours.nom}</div>
              </div>
              <div className={styles.progression}>
                <div className={styles.progressionNum}>{parcours.progression.pourcentage}%</div>
                <div className={styles.progressionLabel}>{parcours.progression.label}</div>
              </div>
            </section>

            <section>
              <h2 className={styles.sectionTitle}>Mon parcours</h2>
              <ul className={styles.listeModules}>
                {parcours.modules.map((module) => (
                  <li key={module.id} className={`${styles.module} ${styles[`etat-${module.etat}`]}`}>
                    <div className={styles.moduleInfo}>
                      <div className={styles.moduleNom}>{module.nom}</div>
                      <div className={styles.moduleDescription}>{module.description}</div>
                    </div>
                    <span className={styles.badge}>{LIBELLE_ETAT[module.etat]}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={styles.sectionTitle}>Une envie du moment ? (facultatif)</h2>
              <ul className={styles.listeModules}>
                {OPTIONS_ENVIE.map((option) => (
                  <li key={option.id} className={styles.module}>
                    <div className={styles.moduleInfo}>
                      <div className={styles.moduleNom}>{option.libelle}</div>
                    </div>
                    <button type="button" className={styles.badge} onClick={() => setAction(prochaineAction(option.id))}>
                      Choisir
                    </button>
                  </li>
                ))}
              </ul>
              {action && (
                <section className={styles.heroBand}>
                  <div>
                    <div className={styles.heroLabel}>Votre prochain pas</div>
                    <div className={styles.heroTitle}>{action.titre}</div>
                    <div className={styles.moduleDescription}>{action.description}</div>
                  </div>
                </section>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
