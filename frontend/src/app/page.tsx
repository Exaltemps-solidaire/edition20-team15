"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

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
  const [parcours, setParcours] = useState<Parcours | null>(null);
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    fetch("/api/v1/parcours")
      .then((reponse) => {
        if (!reponse.ok) throw new Error("réponse non ok");
        return reponse.json();
      })
      .then(setParcours)
      .catch(() => setErreur(true));
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <span className={styles.logo}>L&apos;BURN</span>
        <span className={styles.topbarTitle}>
          Mon parcours, <em>à mon rythme</em>
        </span>
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
          </>
        )}
      </main>
    </div>
  );
}
