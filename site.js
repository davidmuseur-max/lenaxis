const VIDEO="https://www.dropbox.com/scl/fi/45sbxwk9uftuwg2oh4cm2/Lenaxis-FR.mp4?rlkey=rg7ula361gbmitq31qpz9zdyv&raw=1";
const LOGO="assets/logos/Lenaxis_LOGO.png";
const APP="https://lenaxis.osc-fr1.scalingo.io/";
const MODULES=[
  {
    "id": "core",
    "name": "CORE",
    "phase": "Cartographier",
    "tag": "Cartographiez vos risques",
    "icon": "◆",
    "logo": "assets/logos/LENAXIS_CORE_Logo.png",
    "poster": "assets/posters/core.jpg",
    "start": 80,
    "end": 95,
    "desc": "Un référentiel commun pour comprendre les expositions et les dépendances de chaque site.",
    "features": [
      [
        "Sites et entités",
        "Regroupez les établissements, locaux et zones dans un référentiel géolocalisé."
      ],
      [
        "Actifs et équipements",
        "Rattachez les équipements, processus et flux à leur contexte d’exploitation."
      ],
      [
        "Cartographie des expositions",
        "Consultez les informations géographiques et réglementaires utiles à l’analyse du site."
      ],
      [
        "Dépendances et supply chain",
        "Documentez les liens entre sites, fournisseurs et fonctions critiques pour examiner les effets de cascade."
      ],
      [
        "Scénarios de risque",
        "Rapprochez les vulnérabilités internes des événements et menaces identifiés."
      ],
      [
        "Historique du site",
        "Retrouvez les audits, constats et informations nécessaires à une analyse suivie."
      ]
    ],
    "benefit": "Un référentiel commun pour comprendre les expositions et les dépendances de chaque site.",
    "example": "Un Risk Manager rassemble les informations d’un site, identifie ses équipements sensibles et examine les dépendances de production avant une visite ou une discussion avec son assureur.",
    "related": [
      "watch",
      "matrix",
      "audit",
      "crisis"
    ],
    "video": "assets/video/core.mp4",
    "videoCaption": "Cartographie d’un site · vue WATCH dans LENAXIS"
  },
  {
    "id": "watch",
    "name": "WATCH",
    "phase": "Identifier",
    "tag": "Détectez et anticipez",
    "icon": "◉",
    "logo": "assets/logos/LENAXIS_WATCH_Logo.png",
    "poster": "assets/posters/watch.jpg",
    "start": 138,
    "end": 157,
    "desc": "Une veille rapprochée de vos sites pour donner un contexte concret à chaque signal.",
    "features": [
      [
        "Veille multi-sources",
        "Rassemblez les évolutions réglementaires, événements industriels et informations contextuelles."
      ],
      [
        "Filtrage sectoriel",
        "Examinez les informations selon l’activité et les risques de l’organisation."
      ],
      [
        "Lecture géographique",
        "Rapprochez un événement des établissements potentiellement concernés."
      ],
      [
        "Qualification des signaux",
        "Identifiez le sujet, la source et le niveau d’attention nécessaire."
      ],
      [
        "Alertes et suivi",
        "Conservez une lecture organisée des alertes et de leur traitement."
      ],
      [
        "Connexion au référentiel",
        "Utilisez la veille pour enrichir la cartographie, l’évaluation et la préparation de crise."
      ]
    ],
    "benefit": "Une veille rapprochée de vos sites pour donner un contexte concret à chaque signal.",
    "example": "Une alerte d’inondation ou un accident industriel proche est rapproché du portefeuille de sites. L’équipe vérifie l’exposition réelle et organise les mesures utiles.",
    "related": [
      "alerts",
      "core",
      "matrix",
      "crisis"
    ],
    "video": "assets/video/watch.mp4",
    "videoCaption": "Extrait WATCH · présentation officielle"
  },
  {
    "id": "audit",
    "name": "AUDIT",
    "phase": "Identifier",
    "tag": "Démontrez et progressez",
    "icon": "▤",
    "logo": "assets/logos/LENAXIS_AUDIT_Logo.png",
    "poster": "assets/posters/audit.jpg",
    "start": 117,
    "end": 138,
    "desc": "Des constats structurés et des preuves reliées aux actions de prévention.",
    "features": [
      [
        "Questionnaires métier",
        "Préparez les visites à partir de grilles sectorielles et de critères adaptés à la mission."
      ],
      [
        "Constats et preuves terrain",
        "Rattachez observations, photos et pièces justificatives au site et au point contrôlé."
      ],
      [
        "Analyse des écarts",
        "Organisez les constats et les risques pour faciliter la rédaction et la décision."
      ],
      [
        "Plans d’action intégrés",
        "Associez aux recommandations un responsable, une échéance et un suivi d’avancement."
      ],
      [
        "Rapports de visite",
        "Consolidez les résultats dans un support partageable avec les parties prenantes autorisées."
      ],
      [
        "Continuité de la prévention",
        "Retrouvez les écarts précédents pour préparer la prochaine visite et vérifier les actions."
      ]
    ],
    "benefit": "Des constats structurés et des preuves reliées aux actions de prévention.",
    "example": "Lors d’une visite incendie, l’auditeur documente le compartimentage, les moyens de protection et les contrôles. Les écarts donnent lieu à des recommandations suivies dans le même dossier.",
    "related": [
      "core",
      "matrix",
      "livestream",
      "at"
    ],
    "video": "assets/video/audit.mp4",
    "videoCaption": "Extrait AUDIT · présentation officielle"
  },
  {
    "id": "matrix",
    "name": "MATRIX",
    "phase": "Évaluer",
    "tag": "Priorisez vos risques",
    "icon": "◇",
    "start": 52,
    "end": 68,
    "desc": "Une évaluation explicite pour hiérarchiser les risques et expliquer les arbitrages.",
    "features": [
      [
        "Probabilité et gravité",
        "Positionnez les scénarios dans une matrice de criticité."
      ],
      [
        "Modèles d’analyse",
        "Structurez l’évaluation à l’aide des méthodes décrites dans le référentiel LENAXIS."
      ],
      [
        "Critères et pondérations",
        "Documentez les facteurs retenus pour rendre l’évaluation compréhensible."
      ],
      [
        "Impacts multiples",
        "Examinez les conséquences humaines, opérationnelles, financières et réglementaires."
      ],
      [
        "Comparaison de scénarios",
        "Comparez les niveaux d’exposition et les effets attendus des mesures de prévention."
      ],
      [
        "Restitution décisionnelle",
        "Présentez les priorités à la direction à partir du contexte du site et des constats."
      ]
    ],
    "benefit": "Une évaluation explicite pour hiérarchiser les risques et expliquer les arbitrages.",
    "example": "Pour un même site, l’équipe compare les scénarios incendie, inondation et rupture fournisseur afin de choisir les mesures prioritaires.",
    "related": [
      "core",
      "audit",
      "stats",
      "dashboard"
    ],
    "logo": "assets/logos/LENAXIS_MATRIX_Logo.png",
    "video": "assets/video/overview.mp4",
    "poster": "assets/posters/overview.jpg",
    "videoCaption": "Présentation transversale de LENAXIS"
  },
  {
    "id": "stats",
    "name": "STATS",
    "phase": "Évaluer",
    "tag": "Analysez et comparez",
    "icon": "▥",
    "start": 100,
    "end": 114,
    "desc": "Une lecture des tendances pour comparer les situations et éclairer la prévention.",
    "features": [
      [
        "Tendances dans le temps",
        "Suivez l’évolution des indicateurs sur la période disponible."
      ],
      [
        "Comparaisons entre sites",
        "Examinez les écarts au sein d’un périmètre homogène."
      ],
      [
        "Lecture sectorielle",
        "Rapprochez les constats du contexte métier et des données de référence disponibles."
      ],
      [
        "Typologies de risques",
        "Analysez les informations par famille de risques ou de constats."
      ],
      [
        "Qualité des comparaisons",
        "Gardez les périmètres, dates et volumes en vue pour interpréter les résultats."
      ],
      [
        "Restitution des analyses",
        "Utilisez les tendances dans les tableaux de bord et les échanges avec la direction."
      ]
    ],
    "benefit": "Une lecture des tendances pour comparer les situations et éclairer la prévention.",
    "example": "Le responsable prévention examine les écarts récurrents entre établissements avant de lancer une campagne ciblée sur une même famille de risques.",
    "related": [
      "audit",
      "matrix",
      "dashboard",
      "at"
    ],
    "logo": "assets/logos/Lenaxis_LOGO.png",
    "video": "assets/video/overview.mp4",
    "poster": "assets/posters/overview.jpg",
    "videoCaption": "Présentation transversale de LENAXIS"
  },
  {
    "id": "alerts",
    "name": "ALERTS",
    "phase": "Identifier",
    "tag": "Soyez alerté au bon moment",
    "icon": "!",
    "start": 140,
    "end": 153,
    "desc": "Une lecture organisée des événements qui appellent une vérification ou une action.",
    "features": [
      [
        "Alertes contextualisées",
        "Reliez les notifications aux risques et aux établissements concernés."
      ],
      [
        "Source et événement",
        "Retrouvez l’information à l’origine de l’alerte avant de décider."
      ],
      [
        "Journal des alertes",
        "Consultez les événements et leur historique."
      ],
      [
        "Suite opérationnelle",
        "Orientez l’alerte vers une vérification terrain, une mise à jour du dossier ou une gestion de crise."
      ]
    ],
    "kind": "Fonction transversale · WATCH",
    "benefit": "Une lecture organisée des événements qui appellent une vérification ou une action.",
    "example": "L’équipe reçoit une information critique, vérifie la proximité et l’exposition du site, puis décide de la suite à donner.",
    "related": [
      "watch",
      "core",
      "audit",
      "crisis"
    ],
    "logo": "assets/logos/LENAXIS_ALERTES_Logo.png",
    "video": "assets/video/alerts.mp4",
    "poster": "assets/posters/alerts.jpg",
    "videoCaption": "Extrait ALERTS · présentation officielle"
  },
  {
    "id": "livestream",
    "name": "LIVESTREAM",
    "phase": "Identifier + Évaluer",
    "tag": "Auditez à distance en temps réel",
    "icon": "▶",
    "start": 84,
    "end": 100,
    "desc": "L’expertise à distance reliée au dossier de risque et aux constats terrain.",
    "features": [
      [
        "Vidéo terrain en direct",
        "Un opérateur partage la situation avec un expert à distance."
      ],
      [
        "Échange entre intervenants",
        "Rapprochez les personnes sur place et les compétences nécessaires à la visite."
      ],
      [
        "Annotation et guidage",
        "Précisez les points à observer et guidez l’inspection."
      ],
      [
        "Captures et observations",
        "Capitalisez les éléments utiles au dossier de visite."
      ],
      [
        "Lien avec l’audit",
        "Replacez les observations dans la démarche d’évaluation et de prévention."
      ],
      [
        "Retour d’expérience",
        "Conservez les éléments utiles aux prochaines interventions et à la transmission des connaissances."
      ]
    ],
    "benefit": "L’expertise à distance reliée au dossier de risque et aux constats terrain.",
    "example": "Un expert accompagne à distance un opérateur pour examiner un équipement sensible et préparer les constats à compléter dans AUDIT.",
    "related": [
      "audit",
      "core",
      "matrix",
      "crisis"
    ],
    "logo": "assets/logos/LENAXIS_LIVESTREAM_Logo.png",
    "video": "assets/video/overview.mp4",
    "poster": "assets/posters/overview.jpg",
    "videoCaption": "Présentation transversale de LENAXIS"
  },
  {
    "id": "crisis",
    "name": "CRISIS",
    "phase": "Gérer la crise",
    "tag": "Préparez et gérez",
    "icon": "♢",
    "logo": "assets/logos/LENAXIS_CRISE_Logo.png",
    "poster": "assets/posters/crisis.jpg",
    "start": 157,
    "end": 177,
    "desc": "Un contexte partagé pour coordonner les équipes et conserver la trace des décisions.",
    "features": [
      [
        "Activation de la cellule",
        "Rassemblez les intervenants dans un espace de gestion de crise."
      ],
      [
        "Journal horodaté",
        "Consignez les événements, décisions et actions au fil de la situation."
      ],
      [
        "Rôles et coordination",
        "Organisez les responsabilités et les tâches des intervenants."
      ],
      [
        "Carte tactique",
        "Replacez les informations opérationnelles dans le contexte géographique."
      ],
      [
        "Plans et communications",
        "Retrouvez les éléments de préparation, contacts et supports utiles à la réponse."
      ],
      [
        "Retour d’expérience",
        "Capitalisez les enseignements après l’événement pour améliorer la prévention."
      ]
    ],
    "benefit": "Un contexte partagé pour coordonner les équipes et conserver la trace des décisions.",
    "example": "Après un sinistre, le responsable coordonne les intervenants, suit les actions et consigne les décisions dans un journal commun.",
    "related": [
      "core",
      "watch",
      "audit",
      "dashboard"
    ],
    "video": "assets/video/crisis.mp4",
    "videoCaption": "Extrait CRISIS · présentation officielle"
  },
  {
    "id": "dashboard",
    "name": "DASHBOARD",
    "phase": "Suivre",
    "tag": "Pilotez en temps réel",
    "icon": "▦",
    "start": 0,
    "end": 14,
    "desc": "Une vision consolidée pour passer des constats aux priorités de pilotage.",
    "features": [
      [
        "Indicateurs de risque",
        "Regroupez les indicateurs utiles à votre périmètre."
      ],
      [
        "Vues par profil",
        "Adaptez la lecture à la direction, au Risk Manager et aux équipes opérationnelles."
      ],
      [
        "Consolidation multi-sites",
        "Rapprochez les établissements et les entités dans une même vue."
      ],
      [
        "Suivi de prévention",
        "Observez l’avancement des audits et des actions."
      ],
      [
        "Accès au contexte",
        "Revenez aux informations qui expliquent un indicateur."
      ],
      [
        "Reporting",
        "Préparez des restitutions cohérentes pour les parties prenantes autorisées."
      ]
    ],
    "benefit": "Une vision consolidée pour passer des constats aux priorités de pilotage.",
    "example": "La direction examine les établissements les plus exposés et les actions en retard pour décider des moyens à engager.",
    "related": [
      "core",
      "audit",
      "stats",
      "matrix"
    ],
    "logo": "assets/logos/LENAXIS_DASHBOARD_Logo.png",
    "video": "assets/video/overview.mp4",
    "poster": "assets/posters/overview.jpg",
    "videoCaption": "Présentation transversale de LENAXIS"
  },
  {
    "id": "flotte",
    "name": "FLOTTE",
    "phase": "Identifier + Évaluer",
    "tag": "Maîtrisez le risque routier",
    "icon": "↗",
    "start": 14,
    "end": 28,
    "desc": "La prévention du risque routier dans la même démarche que les autres risques de l’entreprise.",
    "features": [
      [
        "Parc de véhicules",
        "Organisez les informations du parc et de ses usages."
      ],
      [
        "Conducteurs",
        "Rassemblez les informations utiles au suivi des conducteurs."
      ],
      [
        "Documents et contrôles",
        "Suivez les pièces, contrôles et échéances liés aux véhicules."
      ],
      [
        "Sinistres et incidents",
        "Conservez une lecture des événements et de leurs conséquences."
      ],
      [
        "Prévention routière",
        "Rattachez les mesures de prévention aux situations identifiées."
      ],
      [
        "Pilotage du risque",
        "Rapprochez les informations de flotte de l’analyse et du reporting global."
      ]
    ],
    "benefit": "La prévention du risque routier dans la même démarche que les autres risques de l’entreprise.",
    "example": "Le gestionnaire de flotte rapproche les incidents, les échéances documentaires et les actions de prévention pour préparer sa revue du parc.",
    "related": [
      "audit",
      "stats",
      "dashboard",
      "crisis"
    ],
    "logo": "assets/logos/LENAXIS_FLOTTE_Logo.png",
    "video": "assets/video/overview.mp4",
    "poster": "assets/posters/overview.jpg",
    "videoCaption": "Présentation transversale de LENAXIS"
  },
  {
    "id": "at",
    "name": "AT",
    "phase": "Suivre + Traiter",
    "tag": "Gérez les accidents du travail",
    "icon": "+",
    "start": 52,
    "end": 68,
    "desc": "Des événements documentés pour comprendre les causes et suivre la prévention.",
    "features": [
      [
        "Accidents et incidents",
        "Rassemblez les circonstances et les éléments disponibles dans le dossier."
      ],
      [
        "Enquête et causes",
        "Structurez l’analyse à partir des faits et des preuves recueillies."
      ],
      [
        "Actions correctives",
        "Rattachez les mesures retenues aux causes et aux risques identifiés."
      ],
      [
        "Indicateurs de suivi",
        "Examinez les tendances sur un périmètre et une période définis."
      ]
    ],
    "kind": "Fonction transversale · AUDIT, CORE, MATRIX",
    "benefit": "Des événements documentés pour comprendre les causes et suivre la prévention.",
    "example": "Après un accident du travail, l’équipe documente les circonstances, examine les causes et suit les mesures de prévention associées.",
    "related": [
      "audit",
      "core",
      "matrix",
      "stats"
    ],
    "logo": "assets/logos/Lenaxis_LOGO.png",
    "video": "assets/video/overview.mp4",
    "poster": "assets/posters/overview.jpg",
    "videoCaption": "Présentation transversale de LENAXIS"
  },
  {
    "id": "admin",
    "name": "ADMIN",
    "phase": "Transverse",
    "tag": "Gouvernez la plateforme",
    "icon": "⚙",
    "start": 0,
    "end": 14,
    "desc": "Des droits et un cadre de travail adaptés à l’organisation et à ses intervenants.",
    "features": [
      [
        "Utilisateurs et rôles",
        "Organisez les profils et les accès selon les responsabilités."
      ],
      [
        "Périmètres de travail",
        "Définissez les informations accessibles aux intervenants autorisés."
      ],
      [
        "Configuration des modules",
        "Adaptez les paramètres et référentiels à l’usage de l’organisation."
      ],
      [
        "Historique des actions",
        "Disposez d’une trace des opérations réalisées dans la plateforme."
      ],
      [
        "Organisation multi-entités",
        "Structurez le travail des équipes et des filiales."
      ],
      [
        "Intégrations",
        "Étudiez les échanges nécessaires avec votre système d’information lors du cadrage du déploiement."
      ]
    ],
    "benefit": "Des droits et un cadre de travail adaptés à l’organisation et à ses intervenants.",
    "example": "L’administrateur organise les accès d’un auditeur, d’un responsable de site et de la direction selon leurs missions respectives.",
    "related": [
      "core",
      "audit",
      "dashboard",
      "lena"
    ],
    "logo": "assets/logos/LENAXIS_ADMIN_Logo.png",
    "video": "assets/video/overview.mp4",
    "poster": "assets/posters/overview.jpg",
    "videoCaption": "Présentation transversale de LENAXIS"
  },
  {
    "id": "lena",
    "name": "Application LÉNA",
    "phase": "Assistant",
    "tag": "Interrogez votre risque",
    "icon": "★",
    "start": 0,
    "end": 14,
    "desc": "Interrogez les informations de risque pour préparer une décision, une visite ou un document.",
    "features": [
      [
        "Questions en langage naturel",
        "Décrivez votre besoin sans changer de méthode de travail."
      ],
      [
        "Synthèse du contexte",
        "Rassemblez les informations utiles issues du dossier et des modules accessibles."
      ],
      [
        "Analyse documentaire",
        "Exploitez les documents disponibles dans votre environnement autorisé."
      ],
      [
        "Explication des risques",
        "Demandez une lecture des expositions, constats et mesures de prévention."
      ],
      [
        "Sources et points à confirmer",
        "Distinguez les faits disponibles des informations à vérifier."
      ],
      [
        "Préparation de l’action",
        "Préparez les questions de visite, priorités et éléments d’un support de travail."
      ]
    ],
    "kind": "Assistant transversal",
    "benefit": "Interrogez les informations de risque pour préparer une décision, une visite ou un document.",
    "example": "« Quels éléments dois-je vérifier avant la prochaine visite de ce site ? » LÉNA aide à préparer les contrôles à partir du contexte disponible.",
    "related": [
      "core",
      "watch",
      "audit",
      "crisis"
    ],
    "logo": "assets/logos/Lenaxis_LOGO.png",
    "video": "assets/video/overview.mp4",
    "poster": "assets/posters/overview.jpg",
    "videoCaption": "Présentation transversale de LENAXIS"
  }
];
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nativeModules=()=>MODULES.filter(m=>!['alerts','at','lena'].includes(m.id));
function nav(){return `<a class="skip-link" href="#main">Aller au contenu</a><header class="topbar"><a class="brand" href="index.html" aria-label="LENAXIS, accueil"><img src="${LOGO}" alt="LENAXIS" width="52" height="52"><span>LENAXIS</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-navigation">Menu</button><nav class="mainnav" id="main-navigation" aria-label="Navigation principale"><div class="navdrop"><button aria-expanded="false" aria-controls="solutions-menu">Solutions <span aria-hidden="true">⌄</span></button><div class="dropgrid" id="solutions-menu">${MODULES.map(m=>`<a href="${m.id}.html"><b>${m.name}</b><span>${m.tag}</span></a>`).join('')}</div></div><a href="index.html#industries">Industries</a><a href="index.html#resources">Ressources</a><a href="index.html#about">À propos</a><a href="lena.html">LÉNA</a></nav><div class="rightnav"><a class="demo" href="mailto:contact@lenaxis.fr?subject=Demande%20de%20d%C3%A9monstration%20LENAXIS">Demander une démo</a></div></header>`}
function trust(){return `<div class="trust proof-strip"><div><b>Un référentiel partagé</b><small>Sites, actifs et dépendances</small></div><div><b>Des preuves terrain</b><small>Constats, documents et actions</small></div><div><b>Une chaîne continue</b><small>De la prévention à la crise</small></div></div>`}
function footer(){return `<footer class="footer"><a href="index.html"><img src="${LOGO}" alt="LENAXIS" width="140" height="48"></a><span>10 modules natifs · fonctions transversales · LÉNA</span><div class="footer-links"><a href="solutions.html">Toutes les solutions</a><a href="${APP}" target="_blank" rel="noopener noreferrer">Accéder à LENAXIS</a><a href="mailto:contact@lenaxis.fr">Contact</a></div></footer>`}
function icon(m,cls='sol-icon'){return `<div class="${cls}"><img src="${m.logo}" alt="Logo ${m.name}" width="80" height="80" loading="lazy"></div>`}
function cards(items){return items.map(m=>`<a class="sol" href="${m.id}.html">${icon(m)}<div class="phase">${m.kind||'Module natif · '+m.phase}</div><h3>${m.name}</h3><b>${m.tag}</b><p>${m.desc}</p><span class="card-link">Découvrir ${m.name}</span></a>`).join('')}
function device(m){return `<figure class="video-figure"><div class="device"><video muted playsinline loop controls preload="none" poster="${m.poster}" data-capsule aria-label="${esc(m.videoCaption)}"><source data-src="${m.video}" type="video/mp4"></video></div><figcaption>${m.videoCaption}</figcaption></figure>`}
function lenaSection(){return `<section class="section lena-offer" id="ask-lena"><div class="section-head"><div class="kicker">LÉNA ET ASK LENA</div><h2>Une question pour entrer.<br>Un contexte pour agir.</h2><p>Dans LENAXIS, LÉNA accompagne le travail sur les informations accessibles à votre organisation. ASK LENA est le parcours public prévu pour découvrir cette expertise.</p></div><div class="detailgrid"><article class="dcard"><h3>ASK LENA · découverte</h3><p>Questions sur le risque, la prévention et les documents. Un premier accès simple pour préciser votre besoin.</p><a class="text-link" href="mailto:contact@lenaxis.fr?subject=Acc%C3%A8s%20ASK%20LENA">Demander un accès</a></article><article class="dcard"><h3>LÉNA · dans LENAXIS</h3><p>Analysez le contexte de vos sites, audits, documents et risques dans votre environnement de travail autorisé.</p><a class="text-link" href="${APP}" target="_blank" rel="noopener noreferrer">Accéder à LENAXIS</a></article><article class="dcard"><h3>Votre organisation · sur mesure</h3><p>Pour plusieurs sites, équipes ou usages de prévention et de crise : définissons le périmètre LENAXIS adapté.</p><a class="text-link" href="mailto:contact@lenaxis.fr?subject=Projet%20LENAXIS">Parler de votre projet</a></article></div><div class="question-card"><h3>Préparer votre première question</h3><label for="lena-question">Votre question</label><textarea id="lena-question" rows="3" maxlength="4000" placeholder="Quels éléments dois-je vérifier avant la prochaine visite de mon site ?"></textarea><p>Transmettez votre question à l’équipe LENAXIS pour organiser une démonstration sur votre besoin.</p><a class="btn dark" id="question-mail" href="mailto:contact@lenaxis.fr?subject=Question%20pour%20une%20d%C3%A9monstration%20L%C3%89NA">Préparer ma demande par e-mail</a><span id="question-status" role="status"></span></div></section>`}
function modulePage(m){return nav()+`<main id="main" class="module-page"><section class="module-hero"><div class="module-copy"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a> / <a href="solutions.html">Solutions</a> / ${m.name}</nav><div class="titleline">${icon(m,'bigicon')}<div><div class="phase">${m.kind||'Module natif · '+m.phase}</div><h1>${m.name}</h1></div></div><h2>${m.tag}</h2><p>${m.benefit}</p><div class="module-cta"><a class="btn dark" href="mailto:contact@lenaxis.fr?subject=${encodeURIComponent('Démo LENAXIS '+m.name)}">Demander une démo</a><a class="btn light" href="${APP}" target="_blank" rel="noopener noreferrer">Accéder à LENAXIS</a></div><div class="mini">${m.features.slice(0,4).map(f=>`<div>${f[0]}</div>`).join('')}</div></div>${device(m)}</section><section class="detail"><div class="section-head"><div class="kicker">FONCTIONS ET VALEUR MÉTIER</div><h2>Ce que ${m.name} apporte à votre travail.</h2></div><div class="detailgrid">${m.features.map(f=>`<article class="dcard"><h3>${f[0]}</h3><p>${f[1]}</p></article>`).join('')}</div><article class="use-case"><div class="kicker">EXEMPLE D’USAGE</div><p>${m.example}</p></article></section>${m.id==='lena'?lenaSection():''}<section class="related"><h2>Le même contexte dans les autres solutions.</h2><div class="relatedgrid">${m.related.map(id=>MODULES.find(x=>x.id===id)).map(x=>`<a href="${x.id}.html">${x.name}<span>${x.tag}</span></a>`).join('')}</div></section>${trust()}</main>`+footer()}
function solutionsPage(){return nav()+`<main id="main" class="module-page"><section class="section"><div class="section-head"><div class="kicker">L’ÉCOSYSTÈME LENAXIS</div><h1>Un contexte commun.<br>Tous les métiers du risque.</h1><p>10 modules natifs couvrent l’identification, la cartographie, l’évaluation, la prévention, le pilotage et la gestion de crise. Les alertes, les accidents du travail et LÉNA complètent ce socle.</p></div><div class="grid">${cards(nativeModules())}</div></section><section class="section"><div class="section-head"><div class="kicker">FONCTIONS TRANSVERSALES ET ASSISTANT</div><h2>Relier l’information à l’action.</h2></div><div class="grid transverse-grid">${cards(MODULES.filter(m=>['alerts','at','lena'].includes(m.id)))}</div></section></main>`+footer()}
function setupCapsules(){const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const videos=[...document.querySelectorAll('video[data-capsule]')];function load(v){const s=v.querySelector('source');if(!s.src){s.src=s.dataset.src;v.load()}v.playbackRate=.75}function play(v){load(v);if(!reduce&&!v.dataset.userPaused)v.play().catch(()=>{});}const io=new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target;if(e.isIntersecting)play(v);else v.pause()}),{threshold:.25});videos.forEach(v=>{v.addEventListener('playing',()=>{v.closest('.thumb')?.classList.add('playing')});v.addEventListener('error',()=>{v.closest('.thumb')?.classList.remove('playing')});v.addEventListener('pointerdown',()=>{load(v);v.dataset.userPaused='1'});io.observe(v)});document.addEventListener('visibilitychange',()=>{videos.forEach(v=>{if(document.hidden)v.pause();else{const r=v.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)play(v)}})})}
document.addEventListener('DOMContentLoaded',()=>{if(document.getElementById('header'))document.getElementById('header').outerHTML=nav();if(document.getElementById('footer'))document.getElementById('footer').outerHTML=footer();if(document.getElementById('app')){const m=MODULES.find(x=>x.id===document.body.dataset.module);document.getElementById('app').outerHTML=m?modulePage(m):solutionsPage()}const menu=document.querySelector('.menu-toggle'),navigation=document.getElementById('main-navigation');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open)});const dropdown=document.querySelector('.navdrop>button');dropdown?.addEventListener('click',()=>{const open=dropdown.getAttribute('aria-expanded')!=='true';dropdown.setAttribute('aria-expanded',String(open));dropdown.parentElement.classList.toggle('is-open',open)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){navigation?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');dropdown?.parentElement.classList.remove('is-open');dropdown?.setAttribute('aria-expanded','false')}});document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{const i=document.querySelector('.askline input');if(i){i.value=c.textContent.trim();i.focus()}}));const ask=document.querySelector('.askline');ask?.addEventListener('submit',e=>{e.preventDefault();const q=ask.querySelector('input').value.trim();if(q)location.href='lena.html?q='+encodeURIComponent(q)});const q=document.getElementById('lena-question');if(q){const supplied=new URLSearchParams(location.search).get('q');if(supplied){q.value=supplied.slice(0,4000);document.getElementById('ask-lena').scrollIntoView({behavior:'auto'})}function update(){document.getElementById('question-mail').href='mailto:contact@lenaxis.fr?subject='+encodeURIComponent('Démonstration LÉNA – mon besoin')+'&body='+encodeURIComponent(q.value.trim()+'\n\nEntreprise :\nVotre fonction :\nSites concernés :');}q.addEventListener('input',update);update()}setupCapsules()});
