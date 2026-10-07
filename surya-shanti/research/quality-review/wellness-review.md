# Revue Spa / Yoga — 7 octobre 2026

Revue effectuée sur le site assemblé, avec Chromium et Playwright, puis examen visuel des captures à **1440 × 1000** et **390 × 844**.

## Contrôles réussis

- Aucun débordement horizontal sur Spa ou Yoga, aux deux dimensions.
- Aucune erreur JavaScript de page.
- Toutes les véritables photos de ces pages sont chargées. L'image sans source de la visionneuse inactive n'est pas une photo manquante.
- Sept accordéons Spa natifs : tous s'ouvrent correctement.
- Durées du menu limitées aux données officielles : Signature 90 min, Hot stone 60 min, Cream bath 60 min, Honeymoon 90 min. Aucune durée inventée pour Lulur, manicure/pedicure ou facial.
- Demande Spa → `/contact?interest=Spa%20treatment`, champ prérempli `Spa treatment`.
- Demande Yoga → `/contact?interest=Yoga%20class`, champ prérempli `Yoga class`.
- Aucun ancien tarif vide, horaire, retraite, style de yoga ou nom de personne déduit d'un visage.
- Photos de soins mal associées exclues : 048–052 et 062. Aucun menu stock 036–046.

## Conclusion visuelle

La page Spa tient son registre calme : pavillon de bois en première vue, photos de soins larges, respiration entre les sections, menu vert forêt bien lisible et séquences humaines. Les deux versions conservent des photos cohérentes et une hiérarchie claire.

La page Yoga montre bien le vrai cours et son contexte. Une correction spécifique a été faite dans `src/pages/wellness.css` : **sur mobile, le portrait 007 apparaît avant le texte**, entièrement visible à 390 × 520, après l'en-tête de 78 pixels. Les personnes sont désormais visibles dans le premier écran. La version précédente plaçait environ 580 pixels de texte avant la photo, révélant seulement le toit dans la première vue.

## Points transmis au parent pour fichiers partagés

1. Le hero Yoga desktop utilisait encore `object-fit: cover` pendant la capture initiale. Le parent prévoit `contain` pour préserver l'intégralité du portrait. Mobile est déjà `contain`.
2. Les flèches `↗` des liens/boutons apparaissaient comme un carré manquant dans les captures initiales. Le correctif doit être partagé (SVG ou police de repli couvrant ce caractère).
3. Le logo blanc est très discret sur l'en-tête ivoire de Yoga. À traiter dans le style du logo partagé.
4. Le hero Spa mobile choisissait une source de 640 pixels avec `sizes="100vw"`, tandis que son recadrage `cover` nécessite environ 1100 pixels de largeur avant recadrage. Proposition au parent : `sizes="(max-width:760px) 130vh, 100vw"` pour les heroes paysage, en conservant `100vw` pour Yoga en portrait. La capture initiale Spa mobile montre la perte de netteté.

Le lien « Skip to content » visible dans une capture de section très haute était un artefact de capture. Vérification en capture normale de viewport : élément actif `body`, lien masqué à y = −66,5 ; aucune anomalie d'usage.

## Captures

- `spa-1440-hero.png`, `spa-1440-full.png`, `spa-1440-treatments.png`.
- `spa-390-hero.png`, `spa-390-full.png`, `spa-390-treatments.png`, `spa-390-treatments-viewport.png`.
- `yoga-1440-hero.png`, `yoga-1440-full.png`, `yoga-1440-guidance.png`.
- `yoga-390-hero.png` et `yoga-390-full.png` ont été remplacées après la correction d'ordre du portrait ; `yoga-390-guidance.png` reste valable.

Les captures ne constituent pas un envoi externe ni une publication.

## Recontrôle final après correctifs partagés

**Les quatre points partagés sont résolus et vérifiés.** Les captures hero/full ont été remplacées avec la version corrigée. Preuve structurée : `wellness-final-check.json`.

- Spa mobile demande désormais `photo-058-1280.webp` avec `sizes="(max-width:760px) max(100vw, 131svh), 100vw"`. La première vue est nettement plus nette ; la toiture, les matières et la végétation restent détaillées après le recadrage vertical.
- Yoga desktop est `object-fit: contain` : boîte 720 × 860, portrait entièrement contenu, sans découpe des personnes, avec de fines marges latérales de fond chaud. Capturé et examiné à nouveau.
- Yoga mobile reste `contain`, boîte 390 × 520 à y = 78, photo entière dès le premier écran, puis texte. Aucune perte de corps ni de contexte.
- Le logo Yoga est maintenant vert et lisible sur ivoire. Celui du Spa conserve sa variante blanche sur photographie.
- Les flèches sont des SVG `.link-arrow svg` et sont visibles ; aucun carré manquant dans les nouvelles premières vues.
- Les quatre combinaisons page/viewport restent sans erreur JavaScript et sans débordement horizontal. Sept accordéons Spa ouvrent toujours, et les demandes Spa/Yoga arrivent sur Contact avec le bon intérêt prérempli.

Aucune nouvelle modification des pages n'a été nécessaire lors de ce dernier contrôle.
