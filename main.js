/* =========================================================================
   TheNEW Boss Academy V2.0 — main.js
   -------------------------------------------------------------------------
   Ce fichier regroupe les trois blocs JavaScript "logiques" du site :

     1) I18N     — dictionnaires FR / EN + traduction automatique du DOM
     2) COMPTES  — inscription / connexion / déconnexion (démo locale,
                   les comptes sont stockés dans le navigateur via
                   localStorage — il n'y a pas de vrai serveur derrière)
     3) COURS    — catalogue de formations (tableau COURSES) + génération
                   des cartes et remplissage de la modale "Formation"

   Il est chargé à la toute fin de <body>, juste avant le petit script
   inline qui gère déjà le menu mobile, le scroll reveal, le carousel de
   témoignages et les formulaires de réservation / contact (ce script-là
   n'a pas été touché : il reste dans index.html).
   ========================================================================= */

(function () {
    "use strict";

    /* =====================================================================
       1) I18N — dictionnaires + application au DOM
       ---------------------------------------------------------------------
       Chaque clé (ex. "nav.programme") correspond à un attribut
       data-i18n="nav.programme" (texte), data-i18n-placeholder="..."
       (placeholder d'un input) ou data-i18n-aria="..." (aria-label) posé
       quelque part dans index.html. Comme les trois familles de clés ne se
       chevauchent jamais, on peut les mettre dans un seul dictionnaire par
       langue.
       ===================================================================== */

    const I18N = {
        fr: {
            "nav.programme": "Programme",
            "nav.why": "Pourquoi nous",
            "nav.courses": "Formations",
            "nav.mentors": "Mentors",
            "nav.testimonials": "Témoignages",
            "nav.booking": "Réserver",
            "nav.contact": "Contact",
            "nav.login": "Se connecter",
            "nav.signup": "Créer un compte",
            "nav.logout": "Déconnexion",
            "nav.bookCta": "Prendre rendez-vous",
            "hero.eyebrow": "Écosystème entrepreneurial du Cameroun",
            "hero.title1": "Faire émerger les",
            "hero.title2": "Boss",
            "hero.title3": "qui vont façonner l'économie de demain",
            "hero.sub": "TheNEW Boss Academy V2.0 structure l'accompagnement des porteurs de projets, du Cameroun et d'ailleurs : formation, coaching, business plan, mise en réseau, mentorat et suivi post-création.",
            "hero.quote": "« De l'idée à l'entreprise qui dure »",
            "hero.ctaPrimary": "Réserver un appel découverte",
            "hero.ctaGhost": "Voir le programme",
            "hero.meta1": "Promotion V2.0 — candidatures ouvertes",
            "hero.meta2": "Cameroun &amp; diaspora",
            "stats.label1": "porteurs de projets accompagnés",
            "stats.label2": "mentors &amp; experts mobilisés",
            "stats.label3": "semaines de parcours intensif",
            "stats.label4": "taux de business plan finalisés",
            "about.eyebrow": "Notre mission",
            "about.title": "Un accompagnement entrepreneurial complet, pensé pour le contexte camerounais",
            "about.p1": "TheNEW Boss Academy V2.0 est une initiative structurée qui vise à accélérer l'émergence d'un écosystème entrepreneurial dynamique, au Cameroun et au-delà. Nous ne proposons pas une formation isolée : nous construisons un parcours complet, de l'idée jusqu'aux premiers mois d'activité.",
            "about.p2": "Formation pratique, coaching individuel, élaboration de business plan, mise en réseau, mentorat avec de grandes figures entrepreneuriales et suivi post-création : chaque étape prépare la suivante, pour que l'entreprise créée tienne dans la durée.",
            "about.pillar1Strong": "Un parcours, pas un événement",
            "about.pillar1Span": "Un fil conducteur du diagnostic de l'idée jusqu'au suivi après la création.",
            "about.pillar2Strong": "Un réseau qui reste actif",
            "about.pillar2Span": "Mentors, partenaires et alumni restent mobilisables après le programme.",
            "about.pillar3Strong": "La version V2.0",
            "about.pillar3Span": "Un programme retravaillé avec des outils, un suivi et une progression renforcés.",
            "journey.eyebrow": "Le parcours",
            "journey.title": "Six étapes, un seul objectif : une entreprise qui dure",
            "journey.subtitle": "Chaque promotion suit une progression structurée. Les étapes s'enchaînent, mais l'accompagnement individuel s'adapte au rythme de chaque porteur de projet.",
            "journey.step1Title": "Formation",
            "journey.step1Desc": "Modules pratiques sur la gestion, le marketing, la finance et le pilotage d'entreprise, adaptés aux réalités du marché camerounais.",
            "journey.step2Title": "Coaching",
            "journey.step2Desc": "Accompagnement individuel pour clarifier le projet, lever les blocages personnels et fixer un cap réaliste et tenable.",
            "journey.step3Title": "Élaboration du Business Plan",
            "journey.step3Desc": "Construction pas à pas d'un business plan solide, chiffré et présentable aux partenaires financiers.",
            "journey.step4Title": "Mise en réseau",
            "journey.step4Desc": "Connexion avec un écosystème d'entrepreneurs, de partenaires techniques et d'acteurs du financement.",
            "journey.step5Title": "Mentorat",
            "journey.step5Desc": "Binômes avec des chefs d'entreprise et cadres expérimentés qui partagent une expérience réelle du terrain.",
            "journey.step6Title": "Suivi post-création",
            "journey.step6Desc": "Un accompagnement qui continue après le lancement, pour sécuriser les premiers mois d'activité.",
            "why.eyebrow": "Pourquoi TheNEW Boss Academy",
            "why.title": "Quatre engagements qui font la différence",
            "why.label1": "ANCRAGE LOCAL",
            "why.title1": "Pensé pour le Cameroun",
            "why.desc1": "Un programme construit autour des réalités économiques locales, pas un copier-coller importé.",
            "why.label2": "RÉSEAU ACTIF",
            "why.title2": "Des mentors impliqués",
            "why.desc2": "Des dirigeants et entrepreneurs qui accompagnent réellement, au-delà d'une conférence ponctuelle.",
            "why.label3": "SUIVI DANS LA DURÉE",
            "why.title3": "Après la création aussi",
            "why.desc3": "L'accompagnement ne s'arrête ni au diplôme, ni à la création de l'entreprise.",
            "why.label4": "MÉTHODE V2.0",
            "why.title4": "Un parcours amélioré",
            "why.desc4": "Des outils, un suivi et une progression clarifiée à chaque étape du programme.",
            "courses.eyebrow": "Formations &amp; Blog",
            "courses.title": "Nos formations en ligne",
            "courses.subtitle": "Une première formation offerte pour découvrir notre méthode. Les formations suivantes sont payantes et incluent vidéos et articles détaillés.",
            "mentors.eyebrow": "Mentorat",
            "mentors.title": "Un réseau de mentors issus du monde entrepreneurial camerounais",
            "mentors.subtitle": "Chaque porteur de projet est mis en relation avec un mentor dont le parcours est proche de son secteur d'activité, pour des conseils concrets et applicables.",
            "mentors.tag1": "Commerce &amp; distribution",
            "mentors.title1": "Dirigeants d'entreprises établies",
            "mentors.desc1": "Des chefs d'entreprise qui ont construit leur activité au Cameroun et partagent les arbitrages concrets du terrain.",
            "mentors.tag2": "Finance &amp; investissement",
            "mentors.title2": "Experts en structuration financière",
            "mentors.desc2": "Un accompagnement pour préparer un dossier finançable et dialoguer avec les partenaires financiers.",
            "mentors.tag3": "Digital &amp; services",
            "mentors.title3": "Fondateurs de jeunes entreprises",
            "mentors.desc3": "Des entrepreneurs récemment passés par les mêmes étapes, pour un mentorat au plus près des réalités actuelles.",
            "testi.eyebrow": "Témoignages",
            "testi.title": "Ce que retiennent nos anciens participants",
            "testi.text1": "J'avais une idée mais pas de structure. En quelques semaines, j'avais un business plan finançable et une feuille de route claire.",
            "testi.role1": "Fondatrice, agroalimentaire",
            "testi.text2": "Le mentorat a changé ma façon de voir mon entreprise. Mon mentor a connu les mêmes blocages que moi, quelques années plus tôt.",
            "testi.role2": "Fondateur, services numériques",
            "testi.text3": "Le suivi post-création m'a évité plusieurs erreurs de trésorerie durant les premiers mois d'activité.",
            "testi.role3": "Fondateur, commerce général",
            "booking.eyebrow": "Réservation",
            "booking.title": "Prenez rendez-vous avec notre équipe",
            "booking.subtitle": "Choisissez le format d'échange le plus adapté à votre situation. Notre équipe revient vers vous sous 24h pour confirmer votre créneau.",
            "booking.opt1Strong": "Appel découverte — 30 min, gratuit",
            "booking.opt1Span": "Un premier échange pour comprendre votre projet et vous orienter.",
            "booking.opt2Strong": "Session de coaching individuel",
            "booking.opt2Span": "Un temps de travail dédié sur un point précis de votre projet.",
            "booking.opt3Strong": "Entretien d'admission — Promotion V2.0",
            "booking.opt3Span": "Pour rejoindre le programme complet d'accompagnement.",
            "booking.whatsappText": "Besoin d'une réponse rapide ?",
            "booking.whatsappLink": "Écrivez-nous sur WhatsApp",
            "booking.formNameLabel": "Nom complet",
            "booking.formPhoneLabel": "Téléphone / WhatsApp",
            "booking.formEmailLabel": "Adresse email",
            "booking.formTypeLabel": "Type de rendez-vous",
            "booking.formTypeOpt0": "Sélectionnez une option",
            "booking.formTypeOpt1": "Appel découverte (30 min, gratuit)",
            "booking.formTypeOpt2": "Session de coaching individuel",
            "booking.formTypeOpt3": "Entretien d'admission — Promotion V2.0",
            "booking.formTypeOpt4": "Autre demande",
            "booking.formDateLabel": "Date souhaitée",
            "booking.formSlotLabel": "Créneau préféré",
            "booking.slotMorning": "Matin",
            "booking.slotAfternoon": "Après-midi",
            "booking.slotEvening": "Soir",
            "booking.formMsgLabel": "Votre projet en quelques mots",
            "booking.submitBtn": "Confirmer la demande de rendez-vous",
            "booking.successTitle": "Demande envoyée avec succès",
            "booking.successText": "Merci ! Notre équipe vous recontacte sous 24h pour confirmer votre rendez-vous.",
            "booking.resetBtn": "Faire une nouvelle demande",
            "contact.eyebrow": "Contact",
            "contact.title": "Une question sur le programme ?",
            "contact.subtitle": "Notre équipe vous répond rapidement, pour toute question qui ne nécessite pas une prise de rendez-vous formelle.",
            "contact.emailLabel": "Email",
            "contact.phoneLabel": "Téléphone / WhatsApp",
            "contact.addressLabel": "Adresse",
            "contact.addressValue": "Cameroun — sessions présentielles &amp; en ligne",
            "contact.formNameLabel": "Nom complet",
            "contact.formContactLabel": "Email ou téléphone",
            "contact.formMsgLabel": "Votre message",
            "contact.submitBtn": "Envoyer le message",
            "footer.tagline": "Une initiative structurée pour accélérer l'émergence d'un écosystème entrepreneurial dynamique, au Cameroun et au-delà.",
            "footer.linksTitle": "Liens rapides",
            "footer.link1": "Le parcours",
            "footer.link2": "Pourquoi nous",
            "footer.link3": "Formations",
            "footer.link4": "Mentors",
            "footer.link5": "Réserver un rendez-vous",
            "footer.contactTitle": "Coordonnées",
            "footer.country": "Cameroun",
            "footer.copyright": "© 2026 TheNEW Boss Academy V2.0 — Tous droits réservés.",
            "footer.madeFor": "Conçu pour l'écosystème entrepreneurial camerounais",
            "auth.tabLogin": "Connexion",
            "auth.tabSignup": "Créer un compte",
            "auth.loginTitle": "Content de vous revoir",
            "auth.loginSubtitle": "Connectez-vous pour accéder à votre espace et à vos formations.",
            "auth.email": "Adresse email",
            "auth.password": "Mot de passe",
            "auth.loginBtn": "Se connecter",
            "auth.noAccount": "Pas encore de compte ?",
            "auth.createOne": "Créer un compte",
            "auth.signupTitle": "Créer votre compte Boss",
            "auth.signupSubtitle": "Créez un compte gratuit pour suivre la formation offerte et demander l'accès aux formations payantes.",
            "auth.fullname": "Nom complet",
            "auth.signupBtn": "Créer mon compte",
            "auth.alreadyAccount": "Déjà inscrit ?",
            "auth.loginLink": "Se connecter",
            "courses.lockedTitle": "Formation payante",
            "courses.bankTransfer": "Virement bancaire",
            "courses.lockedHelp": "Écrivez-nous avec le nom de la formation : notre équipe vous envoie les instructions de paiement et vous donne accès sous 24h.",
            "courses.unlockBtn": "Demander l'accès sur WhatsApp",
            "booking.formNamePh": "Votre nom",
            "booking.formMsgPh": "Décrivez brièvement votre projet ou votre besoin",
            "contact.formMsgPh": "Écrivez votre question ici",
            "testi.prevAria": "Témoignage précédent",
            "testi.nextAria": "Témoignage suivant",
            "contact.socialFacebook": "Facebook",
            "contact.socialLinkedin": "LinkedIn",
            "contact.socialWhatsapp": "WhatsApp",
            "contact.socialInstagram": "Instagram"
        },
        en: {
            "nav.programme": "Programme",
            "nav.why": "Why us",
            "nav.courses": "Courses",
            "nav.mentors": "Mentors",
            "nav.testimonials": "Testimonials",
            "nav.booking": "Book a call",
            "nav.contact": "Contact",
            "nav.login": "Log in",
            "nav.signup": "Sign up",
            "nav.logout": "Log out",
            "nav.bookCta": "Book an appointment",
            "hero.eyebrow": "Cameroon's entrepreneurial ecosystem",
            "hero.title1": "Building the",
            "hero.title2": "Bosses",
            "hero.title3": "who will shape tomorrow's economy",
            "hero.sub": "TheNEW Boss Academy V2.0 structures support for project owners, from Cameroon and beyond: training, coaching, business plan, networking, mentorship and post-launch follow-up.",
            "hero.quote": "“From idea to a business that lasts”",
            "hero.ctaPrimary": "Book a discovery call",
            "hero.ctaGhost": "See the programme",
            "hero.meta1": "Cohort V2.0 — applications open",
            "hero.meta2": "Cameroon &amp; the diaspora",
            "stats.label1": "project owners supported",
            "stats.label2": "mentors &amp; experts mobilised",
            "stats.label3": "weeks of intensive programme",
            "stats.label4": "completion rate for business plans",
            "about.eyebrow": "Our mission",
            "about.title": "Complete entrepreneurial support, built for the Cameroonian context",
            "about.p1": "TheNEW Boss Academy V2.0 is a structured initiative aimed at accelerating the emergence of a dynamic entrepreneurial ecosystem, in Cameroon and beyond. We don't offer a one-off training course: we build a complete journey, from the idea to the first months of activity.",
            "about.p2": "Practical training, one-on-one coaching, business plan development, networking, mentorship with leading entrepreneurial figures and post-launch follow-up: each stage prepares the next, so the business created lasts.",
            "about.pillar1Strong": "A journey, not an event",
            "about.pillar1Span": "A common thread from diagnosing the idea to follow-up after launch.",
            "about.pillar2Strong": "A network that stays active",
            "about.pillar2Span": "Mentors, partners and alumni remain available after the programme.",
            "about.pillar3Strong": "The V2.0 version",
            "about.pillar3Span": "A reworked programme with stronger tools, follow-up and progression.",
            "journey.eyebrow": "The journey",
            "journey.title": "Six steps, one goal: a business that lasts",
            "journey.subtitle": "Each cohort follows a structured progression. The steps build on each other, while individual support adapts to each project owner's pace.",
            "journey.step1Title": "Training",
            "journey.step1Desc": "Practical modules on management, marketing, finance and business operations, adapted to the realities of the Cameroonian market.",
            "journey.step2Title": "Coaching",
            "journey.step2Desc": "One-on-one support to clarify the project, remove personal blockers and set a realistic, sustainable direction.",
            "journey.step3Title": "Business Plan Development",
            "journey.step3Desc": "Step-by-step construction of a solid, costed business plan ready to present to financial partners.",
            "journey.step4Title": "Networking",
            "journey.step4Desc": "Connection with a network of entrepreneurs, technical partners and financing stakeholders.",
            "journey.step5Title": "Mentorship",
            "journey.step5Desc": "Pairing with experienced business leaders and executives who share real, on-the-ground experience.",
            "journey.step6Title": "Post-launch follow-up",
            "journey.step6Desc": "Ongoing support after launch, to secure the first months of activity.",
            "why.eyebrow": "Why TheNEW Boss Academy",
            "why.title": "Four commitments that make the difference",
            "why.label1": "LOCAL ROOTS",
            "why.title1": "Designed for Cameroon",
            "why.desc1": "A programme built around local economic realities, not an imported copy-paste.",
            "why.label2": "ACTIVE NETWORK",
            "why.title2": "Mentors who are truly involved",
            "why.desc2": "Leaders and entrepreneurs who provide real, ongoing support, beyond a one-off talk.",
            "why.label3": "LONG-TERM FOLLOW-UP",
            "why.title3": "Support after launch too",
            "why.desc3": "Support doesn't stop at graduation, nor at the creation of the business.",
            "why.label4": "V2.0 METHOD",
            "why.title4": "An improved programme",
            "why.desc4": "Tools, follow-up and a clearer progression at every stage of the programme.",
            "courses.eyebrow": "Courses &amp; Blog",
            "courses.title": "Our online courses",
            "courses.subtitle": "A first course offered for free to discover our method. The following courses are paid and include videos and detailed articles.",
            "mentors.eyebrow": "Mentorship",
            "mentors.title": "A network of mentors from Cameroon's entrepreneurial world",
            "mentors.subtitle": "Each project owner is matched with a mentor whose background is close to their sector, for concrete, actionable advice.",
            "mentors.tag1": "Trade &amp; distribution",
            "mentors.title1": "Leaders of established businesses",
            "mentors.desc1": "Business leaders who built their activity in Cameroon and share real, on-the-ground decisions.",
            "mentors.tag2": "Finance &amp; investment",
            "mentors.title2": "Financial structuring experts",
            "mentors.desc2": "Support to prepare a fundable file and engage with financial partners.",
            "mentors.tag3": "Digital &amp; services",
            "mentors.title3": "Founders of young companies",
            "mentors.desc3": "Entrepreneurs who recently went through the same steps, for mentorship close to today's realities.",
            "testi.eyebrow": "Testimonials",
            "testi.title": "What our alumni remember most",
            "testi.text1": "I had an idea but no structure. Within a few weeks, I had a fundable business plan and a clear roadmap.",
            "testi.role1": "Founder, agri-food",
            "testi.text2": "Mentorship changed the way I see my business. My mentor faced the same blockers as me, a few years earlier.",
            "testi.role2": "Founder, digital services",
            "testi.text3": "Post-launch follow-up saved me from several cash-flow mistakes during the first months of activity.",
            "testi.role3": "Founder, general trade",
            "booking.eyebrow": "Booking",
            "booking.title": "Book a call with our team",
            "booking.subtitle": "Choose the format best suited to your situation. Our team gets back to you within 24h to confirm your slot.",
            "booking.opt1Strong": "Discovery call — 30 min, free",
            "booking.opt1Span": "A first conversation to understand your project and guide you.",
            "booking.opt2Strong": "One-on-one coaching session",
            "booking.opt2Span": "Dedicated working time on a specific point of your project.",
            "booking.opt3Strong": "Admission interview — Cohort V2.0",
            "booking.opt3Span": "To join the full support programme.",
            "booking.whatsappText": "Need a quick answer?",
            "booking.whatsappLink": "Write to us on WhatsApp",
            "booking.formNameLabel": "Full name",
            "booking.formPhoneLabel": "Phone / WhatsApp",
            "booking.formEmailLabel": "Email address",
            "booking.formTypeLabel": "Appointment type",
            "booking.formTypeOpt0": "Select an option",
            "booking.formTypeOpt1": "Discovery call (30 min, free)",
            "booking.formTypeOpt2": "One-on-one coaching session",
            "booking.formTypeOpt3": "Admission interview — Cohort V2.0",
            "booking.formTypeOpt4": "Other request",
            "booking.formDateLabel": "Preferred date",
            "booking.formSlotLabel": "Preferred time slot",
            "booking.slotMorning": "Morning",
            "booking.slotAfternoon": "Afternoon",
            "booking.slotEvening": "Evening",
            "booking.formMsgLabel": "Your project, in a few words",
            "booking.submitBtn": "Confirm appointment request",
            "booking.successTitle": "Request sent successfully",
            "booking.successText": "Thank you! Our team will get back to you within 24h to confirm your appointment.",
            "booking.resetBtn": "Make a new request",
            "contact.eyebrow": "Contact",
            "contact.title": "A question about the programme?",
            "contact.subtitle": "Our team responds quickly, for any question that doesn't require a formal appointment.",
            "contact.emailLabel": "Email",
            "contact.phoneLabel": "Phone / WhatsApp",
            "contact.addressLabel": "Address",
            "contact.addressValue": "Cameroon — in-person &amp; online sessions",
            "contact.formNameLabel": "Full name",
            "contact.formContactLabel": "Email or phone",
            "contact.formMsgLabel": "Your message",
            "contact.submitBtn": "Send message",
            "footer.tagline": "A structured initiative to accelerate the emergence of a dynamic entrepreneurial ecosystem, in Cameroon and beyond.",
            "footer.linksTitle": "Quick links",
            "footer.link1": "The journey",
            "footer.link2": "Why us",
            "footer.link3": "Courses",
            "footer.link4": "Mentors",
            "footer.link5": "Book an appointment",
            "footer.contactTitle": "Contact details",
            "footer.country": "Cameroon",
            "footer.copyright": "© 2026 TheNEW Boss Academy V2.0 — All rights reserved.",
            "footer.madeFor": "Designed for Cameroon's entrepreneurial ecosystem",
            "auth.tabLogin": "Log in",
            "auth.tabSignup": "Sign up",
            "auth.loginTitle": "Welcome back",
            "auth.loginSubtitle": "Log in to access your space and your courses.",
            "auth.email": "Email address",
            "auth.password": "Password",
            "auth.loginBtn": "Log in",
            "auth.noAccount": "Don't have an account yet?",
            "auth.createOne": "Sign up",
            "auth.signupTitle": "Create your Boss account",
            "auth.signupSubtitle": "Create a free account to follow the free course and request access to paid courses.",
            "auth.fullname": "Full name",
            "auth.signupBtn": "Create my account",
            "auth.alreadyAccount": "Already have an account?",
            "auth.loginLink": "Log in",
            "courses.lockedTitle": "Paid course",
            "courses.bankTransfer": "Bank transfer",
            "courses.lockedHelp": "Write to us with the name of the course: our team sends you the payment instructions and gives you access within 24h.",
            "courses.unlockBtn": "Request access on WhatsApp",
            "booking.formNamePh": "Your name",
            "booking.formMsgPh": "Briefly describe your project or need",
            "contact.formMsgPh": "Write your question here",
            "testi.prevAria": "Previous testimonial",
            "testi.nextAria": "Next testimonial",
            "contact.socialFacebook": "Facebook",
            "contact.socialLinkedin": "LinkedIn",
            "contact.socialWhatsapp": "WhatsApp",
            "contact.socialInstagram": "Instagram"
        }
    };

    const LANG_STORAGE_KEY = "boss_lang";

    function getStoredLang() {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        return (saved === "fr" || saved === "en") ? saved : "fr";
    }

    // Applique la langue demandée à toute la page : texte, placeholders,
    // aria-label, attribut lang du <html>, état visuel des boutons FR/EN,
    // puis régénère les blocs construits dynamiquement en JS (cartes de
    // formation) pour qu'ils suivent eux aussi le changement de langue.
    function applyLanguage(lang) {
        if (lang !== "fr" && lang !== "en") lang = "fr";
        const dict = I18N[lang];

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
        });

        document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
            const key = el.getAttribute("data-i18n-aria");
            if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
        });

        document.documentElement.setAttribute("lang", lang);
        localStorage.setItem(LANG_STORAGE_KEY, lang);

        document.querySelectorAll(".lang-toggle button").forEach((btn) => {
            btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
        });

        // Les cartes de formation et le contenu de la modale "Formation"
        // sont générés en JS : on les redessine pour qu'ils changent de
        // langue eux aussi, sans recharger la page.
        renderCourses(lang);
        if (typeof window.__refreshOpenCourseModal === "function") {
            window.__refreshOpenCourseModal(lang);
        }
    }

    function initLanguageSwitcher() {
        document.querySelectorAll(".lang-toggle button").forEach((btn) => {
            btn.addEventListener("click", () => applyLanguage(btn.getAttribute("data-lang")));
        });
        applyLanguage(getStoredLang());
    }

    /* =====================================================================
       2) COMPTES — inscription / connexion / déconnexion
       ---------------------------------------------------------------------
       Démo 100% côté client : les comptes sont stockés dans le
       localStorage du navigateur (clé "boss_users"), la session active
       dans la clé "boss_session". Pour un vrai site en production, il
       faudrait remplacer ces fonctions par des appels à une API / un
       backend d'authentification.
       ===================================================================== */

    const USERS_KEY = "boss_users";
    const SESSION_KEY = "boss_session";

    function getUsers() {
        try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
        catch (e) { return []; }
    }
    function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

    function getSession() {
        try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
        catch (e) { return null; }
    }
    function setSession(user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
    }
    function clearSession() { localStorage.removeItem(SESSION_KEY); }

    // Hash très simple, uniquement pour éviter de stocker le mot de passe
    // en clair dans le localStorage. Ce n'est PAS un hash sécurisé : à ne
    // jamais utiliser tel quel pour un vrai système de comptes.
    function simpleHash(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
        }
        return String(h);
    }

    function showAuthError(panelId, message) {
        const el = document.getElementById(panelId);
        if (!el) return;
        el.textContent = message;
        el.classList.add("show");
    }
    function hideAuthErrors() {
        document.querySelectorAll(".auth-error").forEach((el) => {
            el.classList.remove("show");
            el.textContent = "";
        });
    }

    function signup(name, email, password) {
        const users = getUsers();
        const normalizedEmail = email.trim().toLowerCase();
        if (users.some((u) => u.email === normalizedEmail)) {
            const lang = getStoredLang();
            showAuthError("signupError", lang === "en"
                ? "An account with this email already exists."
                : "Un compte existe déjà avec cet email.");
            return;
        }
        const user = { name: name.trim(), email: normalizedEmail, password: simpleHash(password) };
        users.push(user);
        saveUsers(users);
        setSession(user);
        updateAuthUI();
        closeAuthModal();
    }

    function login(email, password) {
        const users = getUsers();
        const normalizedEmail = email.trim().toLowerCase();
        const user = users.find((u) => u.email === normalizedEmail);
        const lang = getStoredLang();
        if (!user || user.password !== simpleHash(password)) {
            showAuthError("loginError", lang === "en"
                ? "Incorrect email or password."
                : "Email ou mot de passe incorrect.");
            return;
        }
        setSession(user);
        updateAuthUI();
        closeAuthModal();
    }

    function logout() {
        clearSession();
        updateAuthUI();
    }

    // Met à jour l'affichage du header (desktop) et du panneau mobile
    // selon qu'un utilisateur est connecté ou non.
    function updateAuthUI() {
        const session = getSession();
        const loggedIn = !!session;

        const ctaLoggedOut = document.getElementById("authCtaLoggedOut");
        const chip = document.getElementById("userChip");
        const mobileLoggedOut = document.getElementById("mobileAuthLoggedOut");
        const mobileLoggedIn = document.getElementById("mobileAuthLoggedIn");

        if (ctaLoggedOut) ctaLoggedOut.style.display = loggedIn ? "none" : "flex";
        if (chip) chip.classList.toggle("show", loggedIn);
        if (mobileLoggedOut) mobileLoggedOut.style.display = loggedIn ? "none" : "flex";
        if (mobileLoggedIn) mobileLoggedIn.style.display = loggedIn ? "flex" : "none";

        if (loggedIn) {
            const initial = session.name ? session.name.trim().charAt(0).toUpperCase() : "?";
            const avatar = document.getElementById("userAvatar");
            const nameLabel = document.getElementById("userNameLabel");
            const mobileLabel = document.getElementById("mobileUserLabel");
            if (avatar) avatar.textContent = initial;
            if (nameLabel) nameLabel.textContent = session.name;
            if (mobileLabel) mobileLabel.textContent = session.name;
        }
    }

    /* ---- Ouverture / fermeture de la modale Connexion / Inscription ---- */
    function openAuthModal(tab) {
        hideAuthErrors();
        const modal = document.getElementById("authModal");
        const scrim = document.getElementById("modalScrim");
        if (!modal || !scrim) return;
        setAuthTab(tab || "login");
        modal.classList.add("open");
        scrim.classList.add("open");
    }
    function closeAuthModal() {
        const modal = document.getElementById("authModal");
        const scrim = document.getElementById("modalScrim");
        if (modal) modal.classList.remove("open");
        // Le scrim est partagé avec la modale "Formation" : on ne le ferme
        // que si aucune des deux modales n'est plus ouverte.
        const courseModal = document.getElementById("courseModal");
        if (scrim && !(courseModal && courseModal.classList.contains("open"))) {
            scrim.classList.remove("open");
        }
    }
    function setAuthTab(tab) {
        const isLogin = tab !== "signup";
        const tabLogin = document.getElementById("tabLogin");
        const tabSignup = document.getElementById("tabSignup");
        const panelLogin = document.getElementById("panelLogin");
        const panelSignup = document.getElementById("panelSignup");
        if (tabLogin) tabLogin.classList.toggle("active", isLogin);
        if (tabSignup) tabSignup.classList.toggle("active", !isLogin);
        if (panelLogin) panelLogin.classList.toggle("active", isLogin);
        if (panelSignup) panelSignup.classList.toggle("active", !isLogin);
        hideAuthErrors();
    }

    function initAccounts() {
        updateAuthUI();

        // Un seul bouton "Se connecter" (desktop + mobile) ouvre la modale
        // sur l'onglet Connexion ; l'onglet "Créer un compte" reste
        // accessible en un clic à l'intérieur de la même fenêtre — comme
        // sur ramseys-digital.vercel.app/login.
        const openLoginBtn = document.getElementById("openLoginBtn");
        const openLoginBtnMobile = document.getElementById("openLoginBtnMobile");
        if (openLoginBtn) openLoginBtn.addEventListener("click", () => openAuthModal("login"));
        if (openLoginBtnMobile) openLoginBtnMobile.addEventListener("click", () => openAuthModal("login"));

        const authModalClose = document.getElementById("authModalClose");
        if (authModalClose) authModalClose.addEventListener("click", closeAuthModal);

        const modalScrim = document.getElementById("modalScrim");
        if (modalScrim) modalScrim.addEventListener("click", () => {
            closeAuthModal();
            closeCourseModal();
        });

        const tabLogin = document.getElementById("tabLogin");
        const tabSignup = document.getElementById("tabSignup");
        if (tabLogin) tabLogin.addEventListener("click", () => setAuthTab("login"));
        if (tabSignup) tabSignup.addEventListener("click", () => setAuthTab("signup"));

        const switchToSignup = document.getElementById("switchToSignup");
        const switchToLogin = document.getElementById("switchToLogin");
        if (switchToSignup) switchToSignup.addEventListener("click", (e) => { e.preventDefault(); setAuthTab("signup"); });
        if (switchToLogin) switchToLogin.addEventListener("click", (e) => { e.preventDefault(); setAuthTab("login"); });

        const loginForm = document.getElementById("loginForm");
        if (loginForm) loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            login(document.getElementById("li-email").value, document.getElementById("li-pass").value);
        });

        const signupForm = document.getElementById("signupForm");
        if (signupForm) signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            signup(
                document.getElementById("su-name").value,
                document.getElementById("su-email").value,
                document.getElementById("su-pass").value
            );
        });

        const logoutBtn = document.getElementById("logoutBtn");
        const logoutBtnMobile = document.getElementById("logoutBtnMobile");
        if (logoutBtn) logoutBtn.addEventListener("click", logout);
        if (logoutBtnMobile) logoutBtnMobile.addEventListener("click", logout);
    }

    /* =====================================================================
       3) COURS — catalogue de formations
       ---------------------------------------------------------------------
       Pour ajouter / modifier / retirer une formation, il suffit d'éditer
       le tableau COURSES ci-dessous (un seul endroit) : les cartes de la
       section #formations et le contenu de la modale sont entièrement
       générés à partir de ce tableau, dans les deux langues.
       ===================================================================== */

    const WHATSAPP_NUMBER = "237692274316"; // À remplacer par le vrai numéro WhatsApp de l'agence.

    const COURSES = [
        {
            id: "fondamentaux",
            badge: "free",
            fr: {
                title: "Les fondamentaux du porteur de projet",
                desc: "La formation offerte : poser les bases avant de se lancer — idée, marché, premiers pas.",
                duration: "6 modules · 1h40",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                article: [
                    "Cette formation d'introduction, entièrement gratuite, pose les bases indispensables avant de se lancer : comment clarifier son idée, vérifier qu'un marché existe réellement, et structurer ses toutes premières démarches.",
                    "Elle sert aussi d'aperçu de la méthode TheNEW Boss Academy V2.0 : chaque module combine une courte vidéo et un article détaillé, pour avancer à son rythme."
                ]
            },
            en: {
                title: "Fundamentals for project owners",
                desc: "The free course: laying the groundwork before you start — idea, market, first steps.",
                duration: "6 modules · 1h40",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                article: [
                    "This fully free introductory course covers the essentials before getting started: how to clarify your idea, check that a real market exists, and structure your very first steps.",
                    "It also serves as a preview of the TheNEW Boss Academy V2.0 method: each module combines a short video with a detailed article, so you can move at your own pace."
                ]
            }
        },
        {
            id: "business-plan",
            badge: "paid",
            price: "25 000 FCFA",
            fr: {
                title: "Construire un business plan finançable",
                desc: "Méthode pas à pas pour chiffrer son projet et le présenter à des partenaires financiers.",
                duration: "10 modules · 3h20",
                lockedDesc: "Le plan complet pour construire, chiffrer et présenter un business plan solide à des partenaires financiers."
            },
            en: {
                title: "Building a fundable business plan",
                desc: "A step-by-step method to cost your project and present it to financial partners.",
                duration: "10 modules · 3h20",
                lockedDesc: "The complete plan to build, cost and present a solid business plan to financial partners."
            }
        },
        {
            id: "marketing-digital",
            badge: "paid",
            price: "20 000 FCFA",
            fr: {
                title: "Marketing digital pour entrepreneurs camerounais",
                desc: "Réseaux sociaux, WhatsApp Business et publicité en ligne, adaptés au contexte local.",
                duration: "8 modules · 2h50",
                lockedDesc: "Des outils concrets de marketing digital, pensés pour le contexte camerounais et les budgets de démarrage."
            },
            en: {
                title: "Digital marketing for Cameroonian entrepreneurs",
                desc: "Social media, WhatsApp Business and online advertising, adapted to the local context.",
                duration: "8 modules · 2h50",
                lockedDesc: "Practical digital marketing tools, designed for the Cameroonian context and starting budgets."
            }
        },
        {
            id: "gestion-financiere",
            badge: "paid",
            price: "20 000 FCFA",
            fr: {
                title: "Gestion financière pour petite entreprise",
                desc: "Trésorerie, marges et suivi comptable simple pour garder le contrôle dès les premiers mois.",
                duration: "9 modules · 2h30",
                lockedDesc: "Les bases de gestion financière indispensables pour garder le contrôle de sa trésorerie dès les premiers mois."
            },
            en: {
                title: "Financial management for small businesses",
                desc: "Cash flow, margins and simple bookkeeping to stay in control from the first months.",
                duration: "9 modules · 2h30",
                lockedDesc: "The essential financial management basics to stay in control of your cash flow from the first months."
            }
        }
    ];

    function courseIconSvg() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
    }

    function isUnlocked(course) {
        // Une formation gratuite est toujours accessible. Une formation
        // payante est débloquée manuellement par l\'équipe après paiement
        // (WhatsApp / Orange Money / MTN MoMo) — il n\'y a pas encore de
        // paiement en ligne automatisé sur ce site.
        if (course.badge === "free") return true;
        const unlocked = JSON.parse(localStorage.getItem("boss_unlocked_courses") || "[]");
        return unlocked.includes(course.id);
    }

    function renderCourses(lang) {
        const grid = document.getElementById("courseGrid");
        if (!grid) return;
        const l = (lang === "en") ? "en" : "fr";

        grid.innerHTML = COURSES.map((course) => {
            const t = course[l];
            const unlocked = isUnlocked(course);
            const badgeLabel = course.badge === "free"
                ? (l === "en" ? "Free" : "Gratuit")
                : (l === "en" ? "Paid" : "Payant");
            const priceHtml = course.badge === "free"
                ? '<span class="free-tag">' + (l === "en" ? "Free" : "Gratuit") + '</span>'
                : course.price;
            const lockIcon = (course.badge === "paid" && !unlocked)
                ? '<span class="course-lock">🔒</span>' : "";
            const ctaLabel = course.badge === "free"
                ? (l === "en" ? "Watch the course" : "Voir la formation")
                : (unlocked
                    ? (l === "en" ? "Watch the course" : "Voir la formation")
                    : (l === "en" ? "See details" : "Voir les détails"));

            return '\n                <div class="course-card">' +
                '<div class="course-thumb">' +
                '<span class="course-badge ' + course.badge + '">' + badgeLabel + '</span>' +
                lockIcon +
                courseIconSvg() +
                '</div>' +
                '<div class="course-body">' +
                '<h3>' + t.title + '</h3>' +
                '<p>' + t.desc + '</p>' +
                '<div class="course-meta">' + t.duration + '</div>' +
                '<div class="course-price">' + priceHtml + '</div>' +
                '<button type="button" class="btn btn-outline course-cta" data-course-id="' + course.id + '">' + ctaLabel + '</button>' +
                '</div>' +
                '</div>';
        }).join("");

        grid.querySelectorAll(".course-cta").forEach((btn) => {
            btn.addEventListener("click", () => openCourseModal(btn.getAttribute("data-course-id")));
        });
    }

    /* ---- Modale "Formation" : vidéo + article, ou aperçu verrouillé ---- */
    let openCourseId = null;

    function openCourseModal(courseId) {
        openCourseId = courseId;
        fillCourseModal(getStoredLang());
        const modal = document.getElementById("courseModal");
        const scrim = document.getElementById("modalScrim");
        if (modal) modal.classList.add("open");
        if (scrim) scrim.classList.add("open");
    }
    function closeCourseModal() {
        openCourseId = null;
        const modal = document.getElementById("courseModal");
        const scrim = document.getElementById("modalScrim");
        if (modal) modal.classList.remove("open");
        const authModal = document.getElementById("authModal");
        if (scrim && !(authModal && authModal.classList.contains("open"))) {
            scrim.classList.remove("open");
        }
    }

    function fillCourseModal(lang) {
        if (!openCourseId) return;
        const course = COURSES.find((c) => c.id === openCourseId);
        if (!course) return;
        const l = (lang === "en") ? "en" : "fr";
        const t = course[l];
        const unlocked = isUnlocked(course);

        const badge = document.getElementById("courseModalBadge");
        const title = document.getElementById("courseModalTitle");
        const unlockedContent = document.getElementById("courseModalUnlockedContent");
        const lockedContent = document.getElementById("courseModalLockedContent");

        if (badge) {
            badge.className = "course-view-badge course-badge " + course.badge;
            badge.textContent = course.badge === "free"
                ? (l === "en" ? "Free" : "Gratuit")
                : (l === "en" ? "Paid" : "Payant");
        }
        if (title) title.textContent = t.title;

        if (unlocked) {
            if (unlockedContent) unlockedContent.style.display = "block";
            if (lockedContent) lockedContent.style.display = "none";

            const video = document.getElementById("courseModalVideo");
            const article = document.getElementById("courseModalArticle");
            if (video) {
                video.innerHTML = t.videoUrl
                    ? '<iframe src="' + t.videoUrl + '" title="' + t.title + '" allowfullscreen></iframe>'
                    : (l === "en" ? "Video coming soon." : "Vidéo à venir.");
            }
            if (article) {
                const paragraphs = t.article || [t.desc];
                article.innerHTML = paragraphs.map((p) => "<p>" + p + "</p>").join("");
            }
        } else {
            if (unlockedContent) unlockedContent.style.display = "none";
            if (lockedContent) lockedContent.style.display = "block";

            const lockedDesc = document.getElementById("courseModalLockedDesc");
            const lockedPrice = document.getElementById("courseModalLockedPrice");
            const whatsapp = document.getElementById("courseModalWhatsapp");
            if (lockedDesc) lockedDesc.textContent = t.lockedDesc || t.desc;
            if (lockedPrice) lockedPrice.textContent = course.price || "";
            if (whatsapp) {
                const message = encodeURIComponent(
                    (l === "en" ? "Hello, I would like access to the course: " : "Bonjour, je voudrais accéder à la formation : ") + t.title
                );
                whatsapp.setAttribute("href", "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message);
            }
        }
    }

    function initCourses() {
        const courseModalClose = document.getElementById("courseModalClose");
        if (courseModalClose) courseModalClose.addEventListener("click", closeCourseModal);

        // Permet à applyLanguage() de rafraîchir la modale de formation si
        // elle est ouverte au moment où l\'utilisateur change de langue.
        window.__refreshOpenCourseModal = fillCourseModal;
    }

    /* =====================================================================
       Initialisation, une fois le DOM prêt
       ===================================================================== */
    document.addEventListener("DOMContentLoaded", () => {
        initAccounts();
        initCourses();
        initLanguageSwitcher(); // appelle applyLanguage(), qui appelle renderCourses()
    });
})();
