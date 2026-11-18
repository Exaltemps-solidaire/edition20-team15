# Déploiement

L'BURN propose à chaque adhérente un tableau de bord de son parcours de reconstruction
(BURN TO BE ALIVE), pour qu'elle retrouve où elle en est après une pause. Association : L'BURN
(Les BURN'ettes).

## Services

- `frontend/` : export statique Next.js servi par nginx, port 80 du conteneur (8080 publié). **Service exposé au public.**
- `api/` : Node sans dépendance, port 8081 du conteneur (8081 publié). Appelé par le front en chemin relatif (`/api/v1/...`).

## Services externes

Aucun pour l'instant : les données du parcours sont en dur dans `api/src/parcours.ts`. Pas de base
de données, pas d'appel à un modèle d'IA, pas de service de paiement.

## Fragile / inachevé

- Un seul parcours, un seul profil en dur : pas encore de sélection de persona ni de pause/reprise
  (prévues aux itérations suivantes).
- Aucune persistance : les données repartent de zéro à chaque redémarrage du service `api`.

## Contacts

- Équipe : Équipe 15 (`9UV4RR`).
- Association : L'BURN (Les BURN'ettes) — contact à préciser par les cadreurs.
