"use client";

import { useRouter } from "next/navigation";
import { personas, PERSONA_KEY } from "../personas-data";
import styles from "../page.module.css";

export default function QuiEtesVous() {
  const router = useRouter();

  function choisir(id: string) {
    window.localStorage.setItem(PERSONA_KEY, id);
    router.push("/");
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <span className={styles.logo}>L&apos;BURN</span>
        <span className={styles.topbarTitle}>Qui êtes-vous ?</span>
      </header>

      <main className={styles.main}>
        <p className={styles.chargement}>Choisissez la personne que vous incarnez pour cette démonstration.</p>
        <ul className={styles.listeModules}>
          {personas.map((persona) => (
            <li key={persona.id} className={styles.module}>
              <div className={styles.moduleInfo}>
                <div className={styles.moduleNom}>{persona.nom}</div>
                <div className={styles.moduleDescription}>{persona.role}</div>
              </div>
              <button type="button" className={styles.badge} onClick={() => choisir(persona.id)}>
                Choisir
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
