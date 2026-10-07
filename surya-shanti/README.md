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

https://rawcdn.githack.com/gs442fb9ky-dev/SITE-HOTEL/2214f60ce56a0fa56e39e3cb7ec90ec1082a7039/docs/surya-shanti/index.html#name=Sarah%20Castel

Les 14 adresses publiques et 66 ressources du rendu ont été vérifiées par HTTPS avec les certificats de confiance de l’environnement. Chromium a rendu les contenus publiés sous leurs adresses originales ; galerie et crédit ont été contrôlés. Voir `research/quality-review/published-preview-check.json`.
