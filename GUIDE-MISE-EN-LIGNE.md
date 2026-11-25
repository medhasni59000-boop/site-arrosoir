# Mettre le site en ligne gratuitement (GitHub + Netlify)

Coût : 0 €. Adresse de départ du type `theatre-arrosoir.netlify.app` ; un nom de domaine pourra être ajouté plus tard.

## 1. GitHub (stockage du site) · 5 min

1. Créer un compte gratuit sur https://github.com/signup (de préférence avec l'adresse de la troupe).
2. En haut à droite, « + » puis « New repository ».
   - Nom : `site-arrosoir`
   - Visibilité : Private (ou Public, au choix)
   - Ne rien cocher d'autre (pas de README), puis « Create repository ».
3. Autoriser Claude à envoyer le code : https://claude.ai/connect-github, puis installer
   l'application Claude GitHub sur le dépôt `site-arrosoir`.
4. Donner à Claude le nom du compte GitHub : il envoie le code dans le dépôt.

## 2. Netlify (hébergement) · 5 min

1. Aller sur https://app.netlify.com/signup et choisir « Sign up with GitHub ».
2. « Add new project » puis « Import an existing project » → GitHub → `site-arrosoir`.
3. Les réglages sont lus automatiquement (fichier `netlify.toml`) : cliquer sur « Deploy ».
4. Dans « Project configuration » → « Change project name », mettre par exemple `theatre-arrosoir`.
   Le site est alors sur https://theatre-arrosoir.netlify.app

## 3. Accès des admins · 5 min

Dans Netlify, sur le projet :
1. « Project configuration » → « Identity » → « Enable Identity ».
2. « Registration » → choisir **Invite only** (personne ne peut s'inscrire seul).
3. « Services » → « Git Gateway » → « Enable Git Gateway ».
4. Onglet « Identity » → « Invite users » : saisir l'e-mail de chaque admin.

Chaque admin reçoit un e-mail, clique sur le lien, choisit son mot de passe,
puis se connecte sur https://theatre-arrosoir.netlify.app/admin/

## Ensuite

Chaque modification enregistrée dans l'admin met le site à jour tout seul en 1 à 2 minutes.
Le plan gratuit de Netlify suffit largement pour un site de troupe.
