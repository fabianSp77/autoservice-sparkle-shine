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
  mapsEmbed:
    "https://www.google.com/maps?q=Autoservice+Beuerberg+GmbH,+Bahnhofstra%C3%9Fe+45,+82547+Eurasburg&output=embed",
  mapsLink:
    "https://www.google.com/maps/place/Autoservice+Beuerberg+GmbH/@47.8285867,11.4072894,17z",
  // Place ID aus der Google-Maps-URL des Eintrags
  googlePlaceId: "ChIJZahmrqe4nUcR54emC0uv9SQ",
  // Direktlink zum Bewertungsformular auf Google
  googleReviewLink:
    "https://search.google.com/local/writereview?placeid=ChIJZahmrqe4nUcR54emC0uv9SQ",
  facebookUrl: "https://www.facebook.com/AutoserviceBeuerberg/",
  facebookHandle: "AutoserviceBeuerberg",
} as const;
