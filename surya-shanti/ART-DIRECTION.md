# Surya Shanti — direction et conventions

Les 14 pages officielles ont été lues avant la conception. Les originaux photographiques ont été téléchargés et examinés. Les vignettes stock de menus 36–46, les photographies de soins mal associées et les images Webflow non vérifiées sont exclues.

L’hôtel se raconte par le soleil, la paix, Sidemen et les personnes qui l’ont créé. Palette : ivoire chaud #f3f0e7, vert forêt #233e35, cuivre doux #987652. Typographie Cormorant Garamond pour les grandes compositions éditoriales, DM Sans pour les textes et informations. Photographies larges ; compositions alternées ; peu de texte dans les premières vues, davantage dans l’histoire humaine et les informations réellement utiles.

## Architecture

Home, Rooms, cinq pages de chambres, Spa, Yoga, Dining, Our Story, Experiences, Gallery, Contact. Les pages sont distinctes, avec de vraies adresses ; l’export autonome utilise des routes par fragment pour rester portable.

## API des pages

Les modules sous `src/pages` importent depuis `../ui.js` :

- `image(id, {className, alt, eager, position, sizes})` : vraie photo locale ; position est une valeur CSS object-position. Les images disponibles correspondent aux ids de downloaded-photographs.json, sauf les fichiers exclus.
- `link(route, label, className='text-link')` : liens internes, y compris les adresses avec query.
- `hero({imageId, title, kicker, description, position, variant})` : première vue plein écran ; `variant:'split'` pour les portraits (Yoga et histoire). title accepte du HTML éditorial comme `<em>…</em>`.
- `sectionHead(kicker, title, copy='')` : intitulé de section.
- `contactLink(topic, label)` : demande par la page Contact, sans prétendre prendre une réservation.
- `zoomImage(id, caption, options={})` : bouton ouvrant une photo originale dans une visionneuse.
- `bookingLink(label='Check availability')` : lien au vrai moteur Cloudbeds officiel.

Classes partagées : `section`, `container`, `eyebrow`, `section-head`, `split`, `prose`, `caption`, `button`, `text-link`, `photo-strip`, `quote`, `section-dark`, `section-sand`. Les styles spécifiques sont propres à chaque module ; ne pas modifier les fichiers partagés d’un autre agent.

Chaque module exporte une fonction retournant la chaîne HTML de sa page. `main.js` gère navigation, menu mobile, focus, accordéons natifs, galeries, visionneuse et formulaire Contact. Aucune action externe automatique.

## Exactitude

Numéro provenant de la page Contact : +62 856 4528 8463. Les anciens tarifs 0/$, offres sans validité et informations Covid périmées ne sont pas reproduits. Pas de faux horaires, retraite, professeurs certifiés, prestations privées ou prix. Dates historiques établies : repère 2000, inauguration 2010, association 2012, soutien à l’équipe en 2021. Identifier le portrait Joël/Sylvie ; ne pas attribuer individuellement les visages des trois femmes sans légende nominative.

La dernière passe complète et les contrôles de navigation, de sources, de contenu et de rendu mobile sont obligatoires avant publication.
