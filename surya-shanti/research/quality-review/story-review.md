# Our Story — seconde revue de qualité

Revue artistique et fonctionnelle du 7 octobre 2026 sur le site assemblé, à **1440 × 1000** et **390 × 844**, avec Chromium et Playwright. Les captures de chaque chapitre ont été ouvertes et examinées visuellement. Les captures de sections masquent temporairement l’en-tête fixe pour permettre d’apprécier les compositions ; le site n’est pas modifié par ce masquage de revue.

## Résultat

- Narration complète : amitié des trois femmes et pays d’origine, travail avec leurs familles, inauguration, Sidemen, Pasraman, soutien aux équipes puis accueil de Joël/Sylvie et équipe.
- **Onze photographies distinctes**, toutes chargées ; compositions alternées, grands portraits communs et images de contexte.
- Chronologie **2000 / 2010 / 2012 / 2021** conforme aux sources. Les quatre années sont visibles sur téléphone ; capture dédiée `story-mobile-timeline.png`.
- Citation finale exacte : **“Come as a guest, leave as a family”**, présentée comme philosophie de Surya Shanti, sans attribution à une personne.
- Aucune identité individuelle ajoutée au trio photographié ; portrait Joël/Sylvie nommé conformément à la légende officielle.
- Textes, titres et légendes lisibles ; aucun débordement horizontal : largeur du document égale à celle de l’écran dans les deux formats.
- Aucune erreur JavaScript. Les deux liens Contact ont été cliqués : le lien Pasraman ouvre `/contact?interest=Pasraman%20Vidya%20Giri` et préremplit le sujet ; le lien final ouvre `/contact`.

## Correction effectuée

Le hero partagé utilisait un recadrage `cover` pour la photographie carrée des trois femmes. Une règle **limitée à story.css** conserve maintenant son ratio complet et la centre verticalement dans la composition séparée. La photographie s’affiche en **720 × 720** sur ordinateur et **390 × 390** sur téléphone, sans rogner les personnes. Le récit et les autres fichiers du site n’ont pas été modifiés.

## Observations partagées — toutes résolues

Les trois observations transmises au parent ont été corrigées dans les fichiers communs, puis vérifiées. Les premières vues Our Story à 1440 × 1000 et 390 × 844 ont été rafraîchies et examinées après ces corrections.

- **Flèches : résolu.** Le composant partagé utilise un SVG ; la flèche de « Plan your stay » s’affiche correctement sur la capture ordinateur, sans carré de remplacement.
- **Logo : résolu.** Le pictogramme est désormais vert sur l’en-tête ivoire, avec un contraste net dans les captures ordinateur et téléphone.
- **Inauguration : résolu.** Le texte de l’accueil indique maintenant l’inauguration en 2010 avec les proches amis, conformément à la source. Le travail avec les familles reste distingué dans Our Story.

Aucune autre correction nécessaire pour cette page après ce rafraîchissement.

## Preuves

- `story-review.json` : dimensions, dates, citation, images, absence de débordement et navigation Contact.
- `story-desktop-full.png` et `story-mobile-full.png` : pages complètes.
- `story-*-opening.png`, `story-*-introduction.png`, `story-*-birth.png`, `story-*-sidemen.png`, `story-*-community.png`, `story-*-care.png`, `story-*-hosts.png`, `story-*-team.png`, `story-*-finale.png` : revue par chapitre.
- `story-mobile-timeline.png` : lisibilité des quatre étapes sur téléphone.

**Publication : aucune.**
