# Surya Shanti Villa — vérification avant conception

Recherche effectuée le 7 octobre 2026. Les pages HTML originales et les textes complets sont conservés dans `html/` et `texts/`. `manifest.json` recense 14 pages accessibles, les liens et la provenance de 403 URL d’images. Les variantes redimensionnées correspondent à 116 fichiers originaux candidats, à examiner visuellement avant sélection.

## Périmètre parcouru

Accueil ; Rooms ; Facilities/Restaurant ; Spa ; Experiences ; Offers ; About Us ; Blog ; Contact Us ; cinq pages détaillées : Agung View, Pool Access, Deluxe Room, Mezzanine, Joglo. Les trois adresses habituelles de sitemap ont aussi été essayées ; la découverte des liens internes a permis d’atteindre les pages détaillées. Aucun article de blog supplémentaire ni PDF de menu n’est lié dans ce périmètre.

## Faits transversaux à conserver

- Hôtel à Sidemen, Karangasem, Bali, entouré de rizières et du paysage du mont Agung. L’accueil annonce environ 1 h 30 de route depuis l’aéroport de Denpasar ; cette durée doit rester approximative.
- « Surya » est présenté comme le soleil et « Shanti » comme la paix sur l’accueil.
- Deux piscines à débordement, avec des vues différentes : mont Agung et baie du sud de Bali. Source : `/facilities` et accueil. Un témoignage ancien parle de trois piscines : utiliser les descriptions de l’hôtel, pas ce témoignage.
- Les chambres sont climatisées selon l’accueil et About Us. Cinq catégories portent les noms officiels Suite Agung View, Suite Agung Pool view, Deluxe Room Valley View, Mezzanine Family Villa et Joglo Saraswati. Vérifier séparément les capacités dans l’audit des chambres ; ne pas interpréter « 4 Bed rooms » de Deluxe comme une villa de quatre chambres.
- Réservation officielle : `https://us2.cloudbeds.com/en/reservation/5USoMX?currency=idr`, reliée par le bouton Check Availability du site. Le prototype doit renvoyer vers ce service, sans créer de moteur de réservation fictif.

## Contacts

La page dédiée `/contact-us` affiche :

- `reservation@suryashantivilla.com`
- `contact@suryashantivilla.com`
- `sales@suryashantivilla.com`
- Réception et WhatsApp : `+62 856 4528 8463`.

Contradictions constatées : le pied de page partagé affiche `+62 856 4528 8483` ; certains liens téléphoniques HTML contiennent un numéro de modèle sans rapport avec le numéro visible. Pour la conception, privilégier le numéro visible sur la page Contact et construire le lien à partir de ce numéro. Aucun profil social propre à l’hôtel n’est vérifié : les liens pointent vers des accueils génériques Instagram/Facebook/Twitter. Ne pas les reprendre comme profils officiels.

## Expériences réellement annoncées

Source principale : `/experiences`.

- Yoga avec Wayan et son équipe : salutations au soleil, asanas, pranayama. Aucune heure, fréquence, séance privée ou retraite confirmée.
- Participation possible à la prière matinale de l’équipe au temple ; présenter comme découverte respectueuse de leurs traditions.
- Cours de cuisine avec visite du marché de Sidemen, chef balinais, déjeuner préparé pendant le cours et livret de recettes. Exemples donnés : sate lilit au poulet et à la noix de coco, salade de papaye verte, beignets de maïs.
- Marche et trekking dans les rizières, la jungle et les villages avec l’équipe balinaise.
- Visite de Pasraman Vidya Giri avec une contribution annoncée à l’association, sans montant ni mécanisme de don précisé.
- Autres activités listées : rafting, excursions, visite du village, scooter, vélo, rencontre de guérisseurs. Aucun itinéraire, tarif ni encadrement précis n’est confirmé ; ne pas développer des prestations fictives.

## Contenus à traiter avec prudence

- Les chambres affichent `0/night` et les menus des signes `$` sans montants : ce sont des champs inutilisables comme tarifs.
- Offers annonce notamment une réduction de 20 %, mais ne donne pas de validité ou de conditions complètes. Ne pas transformer cette ancienne offre en promesse commerciale actuelle ; demander les offres disponibles à l’hôtel.
- Blog et accueil contiennent des mesures Covid anciennes. Elles ne constituent pas des informations pratiques actuelles.
- About Us décrit l’aide aux équipes pendant la pandémie sous la date 2021. Raconter cet épisode au passé ; ne pas annoncer que Bali attend encore la réouverture de ses frontières.
- Les descriptions de métadonnées évoquent Mount Batur alors que les textes principaux et les installations parlent de Mount Agung. Utiliser Agung, cohérent avec le contenu principal vérifié.
- Les éléments Webflow génériques et les illustrations d’offres ne doivent pas être utilisés comme photographies authentiques sans examen visuel.

## Photographies : étape suivante

Toutes les URL photographiques collectées sont sur `cdn.prod.website-files.com`, le serveur d’images lié par le site officiel. Cet accès est actuellement refusé par la configuration réseau de Codex. L’ajout du domaine au brouillon a été enregistré, ainsi que `us2.cloudbeds.com` pour vérifier la destination de réservation ; l’outil demande de publier l’environnement pour activer ces changements.

Après activation : télécharger les originaux, examiner les planches, distinguer les photos actuelles et historiques, vérifier les portraits sans attribuer une identité non explicitée, classer les treize catégories demandées, puis sélectionner les photographies pour les pages. Aucune photographie IA, stock ou d’un autre hôtel ne doit être ajoutée.

## Avant réalisation

Compléter et relire `story-research.md`, `wellness-research.md` et `dining-rooms-research.md`, puis examiner les photographies. Le design ne commence qu’après cette revue. La seconde passe obligatoire suit `audit-checklist.md` et doit couvrir toutes les pages, les textes, la cohérence des photographies, les interactions et le rendu sur téléphone.
