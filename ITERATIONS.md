# Plan d'itérations — L'BURN (équipe `9UV4RR`)

**Plan validé le 2026-11-18.**

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation : ni fichier `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`).
- **Temps restant annoncé** : 60 minutes, à la question posée le 2026-11-18.
- **Temps restant au début de l'itération 1** : 45 minutes, annoncé le 2026-11-18.
- **Durée du tour de test PM Lab** : 10 minutes (valeur par défaut, le développeur ne savait pas).
- **Capacité estimée** : chaque itération coûte au moins publication (~5 min) + tour de test (10 min) = 15 min fixes, plus le codage (10 min au plus). Avec 60 minutes, **2 itérations détaillées tiennent confortablement, la 3e sera probablement une stabilisation courte plutôt qu'une nouvelle fonctionnalité.**
- **✂️ Ce qui sort probablement du périmètre** si le temps ne s'étend pas : l'écran **Pause et reprise** (étape 3 du plan de l'équipe) et l'écran **Découverte de BIB** (étape 4). Ils restent dans « À venir », à re-découper si le temps restant augmente à l'issue de l'itération 2.

## Itération 1 : la BURN'ette voit son tableau de bord avec son avancement par module

- **Dans le périmètre** :
  - `.env.example` et `DEPLOIEMENT.md` (point 3 de la DoD, posés dès cette itération).
  - Écran "Mon parcours, à mon rythme" : bandeau BURN TO BE ALIVE avec jauge (ex. 71% / 5 sur 7 étapes), liste des modules 1 à 3 avec leur état (terminé / en cours / à venir), données en dur (un seul persona, pas de sélecteur).
- **Hors périmètre** : sélecteur de persona « Qui êtes-vous ? », envie du moment, pause/reprise, mémorisation automatique, découverte BIB.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'application déployée, quand on ouvre `/`, alors on voit le tableau de bord avec la jauge et les 3 modules et leur état.
  - Étant donné le tableau de bord affiché, quand on regarde un module terminé, en cours, et à venir, alors les trois états visuels sont distincts.
  - Étant donné l'API déployée, quand on appelle `/api/v1/parcours` (ou équivalent), alors elle répond avec les données du module en JSON.
- **Hypothèse de l'équipe couverte** : « la BURN'ette retrouve où elle en est sans pression grâce à un tableau de bord qui affiche son avancement par module » (mesure : 1 geste) — partiellement, le tableau de bord existe mais sans persona ni pause pour l'instant.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** (~5) :
  - `.env.example`
  - `DEPLOIEMENT.md`
  - `api/src/routes.ts` (route `/api/v1/parcours` avec données en dur)
  - `frontend/src/app/page.tsx` (écran tableau de bord)
  - `frontend/src/app/parcours-data.ts` (ou composant dédié pour les données en dur)
- **Tests unitaires prévus** : 1 à 3, sur le calcul de la jauge (% et "5 sur 7 étapes") et/ou la détermination de l'état d'un module (terminé / en cours / à venir).
- **Étapes ajoutées à la démo** : ouvrir l'application, voir le tableau de bord avec la jauge et les modules.
- **Bilan** :
  - **Durée de codage réelle** : ~3 minutes (début → fin du chrono), aucun dépassement, pas d'alarme à 8 minutes.
  - **Critères d'acceptation** : les 3 satisfaits — tableau de bord visible sur `/`, 3 états visuels distincts (badges « Terminé » / « En cours » / « Module à venir »), `/api/v1/parcours` répond en JSON avec `{nom, modules, progression}`.
  - **Reporté** : rien de cette itération ; le sélecteur de persona et l'envie du moment restent prévus pour l'itération 2, comme annoncé.
  - **Harnais** : aucun blocage — `npm test` (5 tests, 2 fichiers) passe, `./scripts/verifier-deployabilite.sh` ne signale aucune borne, `./scripts/signaler-version.sh 1` a été accepté.
  - **Démo (hors DoD)** : étape ajoutée à `e2e/demo.spec.ts`, mais l'exécution locale échoue — Chromium n'est pas installé sur la machine (`npx playwright install` non lancé, hors budget). Signalé, ne bloque pas la publication.
  - **Modifications** :
    - `api/src/parcours.ts` — modèle du parcours actif (3 modules, calcul de la progression) ; sert les 3 critères.
    - `api/src/routes.ts` — route `GET /api/v1/parcours` ; sert le critère 3.
    - `api/src/parcours.test.ts` — 2 tests sur `calculerProgression`.
    - `api/src/routes.test.ts` — 1 test sur la route `/api/v1/parcours`.
    - `frontend/src/app/page.tsx` — écran tableau de bord (bandeau progression + liste des modules) ; sert les critères 1 et 2.
    - `frontend/src/app/page.module.css` — habillage aux couleurs L'BURN.
    - `.env.example` — documente `PORT` (api) ; sert le point 3 de la DoD.
    - `DEPLOIEMENT.md` — fiche de déploiement d'une page ; sert le point 3 de la DoD.
    - `podman-compose.yml` — assemblage frontend (8080) + api (8081) sur `core-network`.
    - `frontend/nginx.conf` — en-têtes de sécurité, routes `/health` et `/sante`, repli SPA.
    - `api/Dockerfile`, `frontend/Dockerfile` — images qualifiées `docker.io/library/...` (résolution des noms courts hors terminal interactif).
    - `e2e/demo.spec.ts` — étape « Je vois mon tableau de bord avec ma progression ».

## Itération 2 : la BURN'ette choisit qui elle est et indique son envie du moment

- **Dans le périmètre** :
  - Écran « Qui êtes-vous ? » : liste de personas (un par rôle du scénario, données d'exemple), bouton pour en changer à tout moment.
  - Sur le tableau de bord : bloc « envie du moment » facultatif à 3 options (découvrir une ressource / atelier / pause) → une seule prochaine action proposée, sans délai imposé.
- **Hors périmètre** : la persistance de la pause (redirection vers l'écran dédié reportée en itération 3), mémorisation automatique des ateliers/ressources, découverte BIB.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'écran « Qui êtes-vous ? », quand on choisit un persona, alors le tableau de bord s'affiche avec ses droits et son avancement.
  - Étant donné le tableau de bord, quand on clique le bouton de changement de persona, alors on revient à l'écran « Qui êtes-vous ? ».
  - Étant donné le bloc « envie du moment », quand on choisit une option, alors une seule prochaine action s'affiche, sans message culpabilisant.
- **Hypothèse de l'équipe couverte** : « l'indication facultative de son envie du moment permet de choisir son prochain pas sans pression » (mesure : 0 retour négatif) — démontrable par le flux, non mesurable en démo.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** (~5) :
  - `frontend/src/app/qui-etes-vous/page.tsx` (ou composant équivalent)
  - `frontend/src/app/personas-data.ts`
  - `frontend/src/app/page.tsx` (bloc envie du moment + bouton changer de persona)
  - `api/src/routes.ts` (si les personas viennent de l'API)
- **Tests unitaires prévus** : 1 à 3, sur la logique « envie du moment → prochaine action ».
- **Étapes ajoutées à la démo** : choisir un persona, indiquer une envie du moment, voir la prochaine action proposée.
- **Bilan** : _à remplir en fin d'itération_

## À venir (non détaillé, à re-découper au fil de l'eau)

1. Pause et reprise : écran dédié, notifications suspendues, état reflété automatiquement sans action de la Product Owner. *(probablement hors du temps restant)*
2. Mémorisation automatique des ateliers réservés/suivis et ressources consultées, pour un retour sans recherche.
3. Découverte de BIB : modules 4-5-6 (5 et 6 « en préparation »), bloc « Suis-je prête ? », demande d'échange avec l'équipe. *(probablement hors du temps restant)*
4. Stabilisation finale pour le pitch, si le temps restant ne permet plus de nouvelle fonctionnalité.
