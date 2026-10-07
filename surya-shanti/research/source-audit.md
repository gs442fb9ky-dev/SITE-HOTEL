# Surya Shanti — revue indépendante des sources

Revue du 7 octobre 2026. Le contrôle porte sur l’exactitude du concept et des descriptions photographiques, à partir des quatre dossiers de recherche et des copies officielles conservées dans `/workspace/research/surya-shanti`. Il ne remplace pas la confirmation par l’hôtel des prestations actuellement disponibles, ni la revue visuelle sur ordinateur et téléphone.

## Périmètre contrôlé

- `story-research.md`, `wellness-research.md`, `dining-rooms-research.md`, `verified-facts.md`.
- Modules `src/pages/story.js`, `wellness.js`, `dining.js`, `experiences.js` ; données `src/rooms-data.js` ; liens et coordonnées de `src/ui.js`.
- Métadonnées du manifeste `public/images/sources.json` et du module généré `src/photos.js`.
- Inspection indépendante des originaux 006, 063, 066, 070, 071, 088, 108, 109 et 110, en complément des inspections documentées par les chercheurs.
- `src/main.js` : accueil, aperçu des chambres et cinq pages détaillées, galerie, contact, pieds de page et préparation du message.
- Contrôle Chromium local sur `http://127.0.0.1:5174/` pour les dates du formulaire, le contenu du brouillon, l’absence d’envoi et la persistance du crédit de conception.

## Résultats sur les modules disponibles

- **Histoire :** les trois femmes, leurs origines et les jalons 2000/2010/2012/2021 correspondent à la page officielle. Aucun récit de rencontre, biographie, date de photographie ou rôle juridique n’a été ajouté. Joël reste associé à l’accueil avec Sylvie et n’est pas présenté comme membre du trio initial. Le soutien pendant la pandémie est raconté au passé.
- **Chambres :** les cinq catégories et leurs équipements suivent les pages officielles, avec leurs propres séries photographiques. Les capacités non établies, surfaces et tarifs sont absents. Le nombre ambigu « 4 Bed rooms » de la Deluxe n’a pas été repris comme quatre chambres. L’accès au bassin Agung n’est pas présenté comme une piscine privée.
- **Spa :** les sept soins et durées annoncées sont étayés ; aucune tarification ni promesse médicale n’est ajoutée. Les photographies illustrent le soin ou l’atmosphère qu’elles montrent, sans transformer une fleur ou une statue en preuve d’un traitement.
- **Yoga :** Wayan et son équipe sont nommés uniquement dans le texte sourcé. Le pratiquant de l’image 069 n’est pas identifié comme Wayan. Aucun horaire, tarif, cours privé, niveau requis, retraite ou certification n’est inventé. L’image 071 montre réellement des postures sur tapis malgré son placement dans l’ancienne section Morning Prayer ; sa description reste littérale.
- **Cuisine :** cuisine balinaise et influence française, petits-déjeuners, préparations maison, plats et cocktails correspondent aux sélections officielles. Aucun prix ou horaire n’est ajouté. Le plateau photographié n’est pas renommé « smoked duck », et les gâteaux ne sont pas présentés comme de la glace ou de la marmelade.
- **Expériences :** marche guidée, cours de cuisine, prière, Pasraman et activités complémentaires restent dans le périmètre des descriptions officielles. Les modalités de visite et contributions ne sont pas chiffrées ou garanties.
- **Coordonnées :** `src/ui.js` reprend `contact@suryashantivilla.com` et `+62 856 4528 8463`, numéro visible sur la page Contact, au lieu du pied de page contradictoire en 8483. Le lien de réservation correspond à Cloudbeds et ne sert pas de plateforme de réservation de soins ou de repas.

## Corrections photographiques appliquées

| Image | Écart corrigé | Description / classement retenu |
| --- | --- | --- |
| 063 | Rôle de chaque personne non explicitement légendé ; « spa team » attribuait une fonction à tout le groupe. | « Four members of the team greeting visitors beside the pool and garden ». Aucun nom personnel ajouté. |
| 070 | L’alt parlait d’offrandes tenues alors que l’image montre principalement des mains jointes en prière. | `experiences.js` : « Participants praying with palms together at the temple ». |
| 088 | Le lieu Pasraman n’est pas établi ; l’image officielle est placée dans Core Values. | « A group praying with joined hands and bowls of flowers at a building entrance ». |
| 090 | La catégorie FOUNDERS pouvait faire de Joël une personne du trio initial. | OUR STORY uniquement ; portrait de Joël et Sylvie explicitement légendé par la source. |
| 108 | Le cliché montre un coin assis à l’étage, sans lit visible. | « The Mezzanine Family Villa’s upper-level sitting area overlooking the valley ». |

Les descriptions et catégories sont corrigées dans `scripts/prepare-photos.py`, puis propagées aux deux manifestes générés. Le générateur utilise désormais les WebP existants lorsqu’ils sont présents. Comparaison SHA-256 avant/après : **229 fichiers WebP strictement identiques**, sans réencodage.

Les illustrations de menus 036–046, le facial douteux 062, la capture d’ancien site 023 et la miniature 014 sont absents du manifeste sélectionné. Aucun prix `0/night`, signe dollar sans montant, ancien code promotionnel ou information Covid n’est repris dans les modules examinés.

## État de la revue

L’accueil, la galerie et le contact ont été relus. Aucune prestation, capacité, date, identité ou tarification non sourcée ne subsiste après les corrections ci-dessous. Le lien de carte `https://goo.gl/maps/D99joqSa2dSgZaA49` est présent dans le manifeste de la page officielle ; il n’est pas inventé. Les trente-huit images de la galerie utilisent le manifeste revu et gardent des descriptions adaptées à leurs sujets.

### Contrôle effectif du formulaire

- Sujet prérempli « Spa treatment » conservé depuis le lien d’intérêt.
- Arrivée `2026-11-05` et départ `2026-11-04` : rejet avec demande de choisir une date postérieure à l’arrivée.
- Départ corrigé au `2026-11-10` : création d’un lien `mailto:reservation@suryashantivilla.com` contenant le sujet, le message, le nom, l’adresse de réponse et les deux dates.
- Résultat visible ; statut exact : « Your enquiry is ready to review. It has not been sent. »
- **Zéro requête réseau après la préparation du brouillon**, aucune ouverture automatique de l’application email et aucune erreur de page Chromium. Le lien final doit être actionné par le visiteur ; aucun email ou réservation n’a été envoyé pendant le contrôle.

### Points corrigés dans les fichiers de l’interface

| Priorité | Référence initiale | Écart matériel | Correction vérifiée |
| --- | --- | --- | --- |
| P2 | `src/main.js:45` | « inaugurated in 2010 with their families and close friends » ajoutait la présence des familles à l’inauguration, alors que la source établit leur travail commun et l’inauguration avec les amis proches. | Le texte indique désormais « inaugurated in 2010 with close friends ». Relu après modification. |
| P2 | `src/main.js:68` | « We’ll open an email draft » annonçait une ouverture que le bouton de préparation ne déclenche pas. | Le texte annonce désormais « We’ll prepare an email draft for you to open, review and send from your email app ». Relu après modification. |
| P2 | `src/main.js:90–91,100` | Le nom du crédit, fourni dans le fragment du premier lien, disparaissait au clic d’une page interne. | Le nom initial reste en mémoire dans le navigateur et est réutilisé à chaque rendu. Test Playwright réussi de Home vers Gallery puis Retour du navigateur ; le crédit de Sarah reste identique. Aucun nom ajouté au code de l’interface. |

### Tests reproductibles

`tests/enquiry.spec.js` contient cinq tests comportementaux. Exécution avec Chromium local `/usr/bin/chromium`, base `http://127.0.0.1:5174` :

```sh
npx playwright test --config=playwright.config.js tests/enquiry.spec.js
```

**Résultat : 5 tests réussis.** Couverture : intérêt transmis depuis la CTA Spa et depuis la CTA Yoga ; rejet des dates inversées puis brouillon exact avec caractères spéciaux et zéro requête/envoi ; paramètre de requête contenant HTML et guillemets conservé comme texte sans exécution ni requête d’image injectée ; crédit de conception conservé à la navigation et au Retour. Le test examine le lien `mailto` sans l’ouvrir ou envoyer d’email.

Aucun problème factuel matériel restant dans le périmètre de cette revue après correction et vérification.

Les tests de rendu complet sur téléphone, de navigation générale et de livraison sont consignés séparément par les responsables de la revue visuelle ; ils ne sont pas présumés validés par cette revue des sources.
