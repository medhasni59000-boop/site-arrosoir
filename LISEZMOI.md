# Site du Théâtre de l'Arrosoir

Site statique (sans WordPress) généré avec Eleventy, avec un espace d'administration
(Decap CMS) pour modifier les dates, les actualités, les pièces et les infos de la troupe.

## Lancer le site sur votre ordinateur (Windows)

1. Installer Node.js (version LTS) depuis https://nodejs.org
2. Ouvrir un terminal dans ce dossier, puis une seule fois : `npm install`
3. Lancer le site : `npm start` puis ouvrir http://localhost:8080
4. Pour l'administration, dans un deuxième terminal : `npm run admin`,
   puis ouvrir http://localhost:8080/admin/ et cliquer sur « Se connecter ».

Toute modification enregistrée dans l'admin apparaît aussitôt sur le site local.

## Où est le contenu ?

- `src/evenements/` : une date de spectacle par fichier (calendrier + bouton HelloAsso)
- `src/actualites/` : les actualités
- `src/pieces/` : les pièces passées (titre, année, auteur, affiche)
- `src/_data/site.json` : présentation, ateliers, contact, bureau, lien HelloAsso
- `src/_data/apparence.json` : couleurs et images de fond (rubrique « Apparence » de l'admin)
- `src/_data/theme.js` : les palettes prêtes (Rideau rouge, Bleu nuit, Vert forêt, Prune)
- `src/assets/style.css` : la mise en page ; toutes les couleurs découlent de 6 réglages en haut du fichier

## Changer les couleurs et les fonds

Dans l'admin : « Infos de la troupe et apparence » puis « Apparence (couleurs et fonds) ».
- Choisir une palette prête, ou « Personnalisée » pour choisir ses 6 couleurs
  (principale, accent, fond clair, fond alterné, fond sombre, texte).
- Ajouter si on veut une image de fond pour l'accueil (avec un réglage d'assombrissement)
  et pour la rubrique « Nos pièces ».
- Afficher ou masquer les plis du rideau sur l'accueil.
Les nuances (survols, bordures, ombres) sont calculées automatiquement.

## Avant la mise en ligne

- Les photos sont dans `src/images/uploads/` (récupérées de l'ancien site le 24/11/2026).
- Choisir l'hébergement et brancher la connexion des admins (section `backend`
  de `src/admin/config.yml`).
