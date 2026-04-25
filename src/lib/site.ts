export const SITE = {
  name: "Autoservice Beuerberg",
  legalName: "Autoservice Beuerberg GmbH",
  street: "Bahnhofstraße 45",
  zip: "82547",
  city: "Eurasburg-Beuerberg",
  phone: "08179 929244",
  phoneIntl: "+498179929244",
  email: "info@autoservice-beuerberg.de",
  founded: 2009,
  // Verifizierte Öffnungszeiten (Quelle: Gelbe Seiten / Das Örtliche)
  hours: [
    { day: "Montag", time: "08:00 – 17:00" },
    { day: "Dienstag", time: "08:00 – 17:00" },
    { day: "Mittwoch", time: "08:00 – 17:00" },
    { day: "Donnerstag", time: "08:00 – 17:00" },
    { day: "Freitag", time: "08:00 – 17:00" },
    { day: "Samstag", time: "Geschlossen" },
    { day: "Sonntag", time: "Geschlossen" },
  ],
  hoursShort: [
    { day: "Mo – Fr", time: "08:00 – 17:00" },
    { day: "Sa & So", time: "Geschlossen" },
  ],
  owners: ["Jürgen Fischer", "Monika Fischer", "Ludwig Fischer"],
  // Verifiziert: NorthData / Amtsgericht München
  registerCourt: "Amtsgericht München",
  registerNumber: "HRB 177787",
  mapsEmbed:
    "https://www.google.com/maps?q=Autoservice+Beuerberg+GmbH,+Bahnhofstra%C3%9Fe+45,+82547+Eurasburg&output=embed",
  // Standardisierte Google-Maps-Suche nach Name + Adresse — landet zuverlässig
  // auf dem Brancheneintrag mit Bewertungs-Tab, ohne auf eine geratene
  // Place-ID angewiesen zu sein.
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Autoservice+Beuerberg+GmbH+Bahnhofstra%C3%9Fe+45+82547+Eurasburg",
  // "Bewertung schreiben" über die offizielle Google-Suche — funktioniert
  // ohne Place-ID, indem es den Eintrag namentlich auflöst.
  googleReviewLink:
    "https://www.google.com/search?q=Autoservice+Beuerberg+GmbH+Bahnhofstra%C3%9Fe+45+82547+Eurasburg#lrd=,1,,,,",
  facebookUrl: "https://www.facebook.com/AutoserviceBeuerberg/",
  facebookHandle: "AutoserviceBeuerberg",
} as const;
