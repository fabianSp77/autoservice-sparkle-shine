// Verifizierte echte Google-Bewertungen für Autoservice Beuerberg GmbH
// Quelle: Google-Profil (manuell vom Inhaber übermittelt)

export type StaticReview = {
  author: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  ownerReply?: string;
  isLocalGuide?: boolean;
  reviewCount?: number;
};

export const GOOGLE_REVIEWS: StaticReview[] = [
  {
    author: "Severin H.",
    initials: "SH",
    rating: 5,
    date: "vor 5 Monaten",
    reviewCount: 2,
    text:
      'Ich bin seit mehreren Jahren mit sowohl Firmen- als auch Privatfahrzeugen Kunde und bin rundum zufrieden. Die Kommunikation ist einfach und zuverlässig – ein kurzer Anruf, Termin absprechen und man kann sich darauf verlassen, dass alles wie vereinbart erledigt wird. Das gesamte Team ist stets freundlich, hilfsbereit und nimmt sich auch für "dumme" Fragen wie selbstverständlich Zeit.\n\nDie Beratung ist dabei immer kundenorientiert und niemals produkt- oder margengetrieben. Preise sind transparent und nachvollziehbar. Kleine Dinge wie ein defektes Abblendlicht werden oft kurzfristig und ohne lange Wartezeit erledigt. Auch komplexere Probleme werden kompetent, zuverlässig und zu sehr fairen Preisen gelöst – egal ob bei älteren oder neueren Fahrzeugen.\n\nIch fahre inzwischen knapp 50 km einfache Strecke, nur um meine Autos hier machen zu lassen, selbst wenn es nur um einen Reifenwechsel geht. Diese Werkstatt genießt mein vollstes Vertrauen. Klare Empfehlung!',
  },
  {
    author: "Auto Linner",
    initials: "AL",
    rating: 5,
    date: "vor 5 Monaten",
    isLocalGuide: true,
    reviewCount: 255,
    text: "Super Ausstattung der Kfz Werkstatt und sehr nette Chefs.",
  },
  {
    author: "Mia Oeckl",
    initials: "MO",
    rating: 5,
    date: "vor 6 Monaten",
    reviewCount: 1,
    text:
      "Sehr nette und kompetente Mitarbeiter! Sehr guter Service und beste Beratung. Sehr empfehlenswert!!!",
  },
  {
    author: "Andreas M.",
    initials: "AM",
    rating: 5,
    date: "vor einem Jahr",
    isLocalGuide: true,
    reviewCount: 44,
    text:
      "Sehr freundliche und zuverlässige Mitarbeiter, die noch ihr Handwerk verstehen. Obwohl es ein weiter Weg für uns ist, kommen wir immer noch gerne hin!",
    ownerReply:
      "Vielen Dank für Ihre tolle Bewertung! Es freut uns sehr zu hören, dass Sie mit unserem Team und unserer Arbeit zufrieden sind. Ihr Vertrauen und Ihre Treue bedeuten uns viel – besonders, da Sie einen weiten Weg auf sich nehmen, um zu uns zu kommen. Wir wünschen Ihnen allzeit Gute Fahrt.",
  },
  {
    author: "Josef Fichtner",
    initials: "JF",
    rating: 5,
    date: "vor einem Jahr",
    reviewCount: 2,
    text:
      "Eine super Werkstatt – ohne Termin wurde ich schnell, kompetent und sehr freundlich dazwischen geschoben! Vielen Dank, weiter so.",
    ownerReply:
      "Herzlichen Dank für Ihre tolle Bewertung! Es freut uns sehr, dass wir Ihnen schnell und unkompliziert helfen konnten. Ihr Lob motiviert unser Team, weiterhin den bestmöglichen Service zu bieten.",
  },
  {
    author: "S. C. Hindenberg",
    initials: "SC",
    rating: 5,
    date: "vor 2 Jahren",
    isLocalGuide: true,
    reviewCount: 27,
    text:
      "Wie sehr man sein Auto braucht, merkt man auch immer dann erst, wenn es streikt. Herzlichen Dank für eure schnelle und kompetente Hilfe. Immer wieder gerne, super Service.",
    ownerReply:
      "Wir bedanken uns für Ihr positives Feedback sowie die netten und ehrlichen Worte. Wir wünschen Ihnen Gute Fahrt.",
  },
  {
    author: "S. Köster",
    initials: "SK",
    rating: 5,
    date: "vor 3 Jahren",
    reviewCount: 5,
    text:
      "Uns ist auf dem Rückweg aus dem Urlaub der Auspuff bei unserem Wohnmobil gebrochen! Es war die erste Werkstatt nach der Autobahnabfahrt. Die Auspuffanlage wurde innerhalb kürzester Zeit wieder zusammengeschweißt und ist stabiler denn je! 👍 Netter Familienbetrieb mit sehr gutem Service. Gerne wieder!",
    ownerReply:
      "Vielen lieben Dank für Ihre tolle Bewertung. Gerne haben wir Ihre Panne während Ihrer Urlaubsfahrt schnell behoben. Wenn man dafür eine so tolle Rezension erhält, motiviert uns das sehr.",
  },
];

// Aggregat — verifiziert direkt vom Google-Profil (Stand: 2026-04)
// Quelle: Google Search/Maps öffentliches Profil
export const REVIEWS_SUMMARY = {
  rating: 4.7,
  count: 63,
};
