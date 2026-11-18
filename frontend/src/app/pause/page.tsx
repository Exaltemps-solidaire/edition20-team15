"use client";

import { useRouter } from "next/navigation";
import { PAUSE_KEY } from "../pause-data";
import styles from "../page.module.css";

export default function FaireUnePause() {
  const router = useRouter();

  function reprendre() {
    window.localStorage.removeItem(PAUSE_KEY);
    router.push("/");
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <span className={styles.logo}>L&apos;BURN</span>
        <span className={styles.topbarTitle}>Faire une pause</span>
      </header>

      <main className={styles.main}>
        <section className={styles.heroBand}>
          <div>
            <div className={styles.heroLabel}>Votre rythme, votre choix</div>
            <div className={styles.heroTitle}>Vos notifications sont suspendues</div>
            <div className={styles.moduleDescription}>
              Aucun délai n&apos;est imposé. Revenez quand vous le souhaitez, votre avancement vous attend.
            </div>
          </div>
        </section>

        <button type="button" className={styles.badge} onClick={reprendre}>
          Reprendre mon parcours
        </button>
      </main>
    </div>
  );
}
