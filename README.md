# Bajalo Cottage Canggu — concept privé

Site premium non officiel, développé à partir du projet existant avec Vite, JavaScript et CSS. Palette ivoire/sable/vert, typographie Bodoni Moda et DM Sans, animations sobres et photographies réelles conservées.

## Les six pages

- `/` : accueil, piscine en photo principale, courts aperçus des autres pages.
- `/cottages` : cottages, chambre, terrasse, salle de bain extérieure et équipements confirmés.
- `/gallery` : les 12 photographies réelles, catégories et agrandissement avec navigation au clavier.
- `/about` : identité, architecture, hospitalité et localisation vérifiables ; aucune histoire de propriétaire inventée.
- `/experience` : piscine, jardins et espaces extérieurs confirmés.
- `/contact` : coordonnées, réservation directe et formulaire de démonstration sans transmission.

Le menu ouvre ces pages, pas des ancres dans l'accueil. Le header et le footer sont communs. Le build génère un fichier HTML dans chaque dossier de page.

## Développement et vérification

Node 20.19+ ou 22.12+ ; validation sur Node 24.

```sh
cd /workspace/SITE-HOTEL
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

`npm run build` produit le site dans `dist/`, y compris les pages séparées. `npm run preview -- --port 4173` sert cette version. `npx playwright test` vérifie les six pages, la navigation, la photo de piscine, les vrais fichiers image, la galerie et ses filtres, le formulaire de démonstration, les liens de réservation, ainsi que les largeurs 320, 390, 768 et 1024 px. Les tests utilisent Chromium disponible à `/usr/bin/chromium`.

## Informations vérifiées

Voir [le dossier de vérification](docs/verification-bajalo.md) pour les sources, les informations confirmées et les limites de la recherche. Restaurant, spa et massages restent non confirmés : aucune page ni promesse de service n'a été ajoutée.

Photographies originales : `public/images/sources.json`. Les copies WebP existent en 640/1280/1920 ; les images ne sont pas agrandies au-delà de leur taille d'origine. Photos et polices sont servies localement. Les conditions de réservation directe sont attribuées au site de l'hôtel et doivent être confirmées lors de la réservation.

## Version privée à transmettre

```sh
node scripts/export-preview.mjs /workspace/previsualisation
node scripts/capture-preview.mjs /workspace/previsualisation
```

L'export contient photos et polices dans un seul fichier HTML. La navigation présente six écrans/pages distincts, via des routes locales `#/about`, `#/gallery`, etc., pour fonctionner sans serveur. L'application normale possède les routes `/about`, `/gallery`, etc. Le script de capture teste aussi une copie téléchargée depuis le bouton privé de l'export, vérifie sa réouverture et capture chaque page sur ordinateur et téléphone sans accès externe.

Les fichiers produits sont dans `/workspace/previsualisation`. La conversation Codex ne dispose pas d'outil pour les joindre sous forme de fichiers téléchargeables ; les anciens liens de téléchargement ont été confirmés non fonctionnels par l'utilisatrice. Ne pas annoncer ces chemins comme des téléchargements accessibles. Aucun site public, push Git ou message à l'hôtel n'a été effectué. Le concept doit rester privé.
