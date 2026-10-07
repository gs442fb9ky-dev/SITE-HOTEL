# Surya Shanti Villa — concept de site

Projet distinct de Bajalo, réalisé pour présenter une refonte de Surya Shanti Villa à Sidemen. Tout le site est en anglais ; le pied de page précise qu’il s’agit d’un concept non officiel. La réservation renvoie au vrai service Cloudbeds de l’hôtel, et le formulaire Contact prépare un brouillon de courriel sans prétendre l’envoyer.

## Pages

Accueil, chambres et villas, cinq pages détaillées de chambres, Spa, Yoga, Dining, Our Story, Experiences, Gallery et Contact : 14 pages distinctes. Les filtres de galerie et la visionneuse fonctionnent au clavier. Les menus mobiles et les textes sont adaptés aux petits écrans.

## Sources et photographie

Les 14 pages accessibles du site officiel ont été lues avant le design, dont les cinq descriptions de chambres. Les 116 fichiers photographiques candidats ont été téléchargés et examinés. Les vignettes stock de menus, images de soins mal associées et captures d’ancien site sont exclues. Les 90 originaux retenus possèdent des variantes WebP locales ; leurs URL d’origine, contexte de source et descriptions sont enregistrés dans `public/images/sources.json`.

Les dossiers sous `research/` décrivent les preuves et les limites : histoire des trois femmes, Spa/Yoga, restaurant/chambres, contacts contradictoires, tarifs incomplets et anciennes informations Covid. Le numéro de la page Contact officielle, +62 856 4528 8463, est utilisé. Aucun tarif, retraite ou horaire non vérifié n’est annoncé.

## Développement

Depuis `/workspace/SITE-HOTEL`, lancer `npm run dev:surya`. Le serveur Vite utilise le port 5174. `npm run test:surya` exécute les 37 vérifications Playwright (serveur démarré, Chromium local). `npm run build:surya` produit l’aperçu statique sous `docs/surya-shanti`, avec une adresse physique par page. Les dépendances restent celles du dépôt parent ; les images sont locales et aucune génération IA ou banque stock n’est utilisée.

## Revue finale

Les deux passes ont été effectuées : validation des faits et des interactions, puis revue artistique complète des 14 pages sur ordinateur et téléphone. Les 37 tests passent. Les 14 adresses physiques de la version statique ont été ouvertes et rechargées ; aucune requête externe n’est nécessaire pour les photos ou les polices. Voir `research/quality-review.md` et les rapports détaillés sous `research/quality-review/`. Le crédit du design se personnalise dans le navigateur avec le fragment `#name=Sarah%20Castel` du lien initial ; il est conservé pendant la navigation interne.

## Aperçu public vérifié

https://rawcdn.githack.com/gs442fb9ky-dev/SITE-HOTEL/633e238d38e778fd14a98860194ec3ae8bf5c470/docs/surya-shanti/index.html#name=Sarah%20Castel

Les 14 adresses publiques et 66 ressources du rendu ont été vérifiées par HTTPS avec les certificats de confiance de l’environnement. Chromium a rendu les contenus publiés sous leurs adresses originales ; galerie et crédit ont été contrôlés. Voir `research/quality-review/published-preview-check.json`.

La version mise à jour échange les deux grandes photographies de l’accueil : vue aérienne en première image, piscine au crépuscule dans la section suivante. Construction et revue à 1440/390 px réussies.

## Dossier de présentation PDF

`docs/surya-shanti-proposal/` fournit un téléchargement de huit pages en anglais : accueil, chambres, Spa, Yoga, Restaurant, Our Story, parcours mobile et collaboration. De grands aperçus du site et des textes propres à l’hôtel rendent la proposition concrète. Le nom et le numéro sont ajoutés dans le navigateur depuis le fragment du lien ; le modèle publié ne contient aucune coordonnée personnelle. Le PDF final comporte le crédit du design, celui des photographies de l’hôtel et aucun champ éditable.

Pour refaire le document avec le serveur Surya lancé : `node surya-shanti/scripts/capture-summary.mjs`, puis `python surya-shanti/scripts/create-summary.py`, puis `node surya-shanti/scripts/build-summary-download.mjs`. Python utilise ReportLab et FontTools ; les polices proviennent des dépendances existantes. La version personnelle et les captures restent dans `/workspace/previsualisation`, hors du dépôt. Le dossier publié est séparé de la sortie Vite pour être conservé lors d’une reconstruction du site.

Téléchargements vérifiés sur ordinateur et téléphone : PDF de huit pages, environ 2,8 Mo, auteur et numéro exacts, aucun débordement, aucune erreur JavaScript. Les huit pages ont été rendues et examinées ; textes et faits ont été relus.
