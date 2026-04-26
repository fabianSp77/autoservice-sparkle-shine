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
  // Aktuelle Öffnungszeiten (vom Inhaber bestätigt)
  hours: [
    { day: "Montag", time: "07:30 – 12:00 · 13:00 – 18:00" },
    { day: "Dienstag", time: "07:30 – 12:00 · 13:00 – 18:00" },
    { day: "Mittwoch", time: "07:30 – 12:00 · 13:00 – 18:00" },
    { day: "Donnerstag", time: "07:30 – 12:00 · 13:00 – 18:00" },
    { day: "Freitag", time: "07:30 – 12:00" },
    { day: "Samstag", time: "Geschlossen" },
    { day: "Sonntag", time: "Geschlossen" },
  ],
  hoursShort: [
    { day: "Mo – Do", time: "07:30 – 12:00 · 13:00 – 18:00" },
    { day: "Freitag", time: "07:30 – 12:00" },
    { day: "Sa & So", time: "Geschlossen" },
  ],
  owners: ["Jürgen Fischer", "Monika Fischer", "Ludwig Fischer"],
  // Verifiziert: NorthData / Amtsgericht München
  registerCourt: "Amtsgericht München",
  registerNumber: "HRB 177787",
  mapsEmbed:
    "https://www.google.com/maps?q=Autoservice+Beuerberg+GmbH,+Bahnhofstra%C3%9Fe+45,+82547+Eurasburg&output=embed",
  // Verifizierter Google-Maps-Eintrag (Hex Place-ID 0x479db8a7ae26a865:0x24f5af4b0ba698e7).
  mapsLink:
    "https://www.google.com/maps/place/Autoservice+Beuerberg+GmbH/@47.8285903,11.4047145,17z/data=!3m1!4b1!4m6!3m5!1s0x479db8a7ae26a865:0x24f5af4b0ba698e7!8m2!3d47.8285867!4d11.4072894!16s%2Fg%2F1tj99_1y",
  // "Bewertung schreiben" — direkter Deeplink über die echte CID (dezimal von 0x24f5af4b0ba698e7).
  googleReviewLink:
    "https://search.google.com/local/writereview?placeid=ChIJZahmrqe4nUcR54emC0uv9SQ&ludocid=2663517445934358759",
  facebookUrl: "https://www.facebook.com/AutoserviceBeuerberg/",
  facebookHandle: "AutoserviceBeuerberg",
} as const;
