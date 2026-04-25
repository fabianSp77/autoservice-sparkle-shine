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
  hours: [
    { day: "Mo – Fr", time: "08:00 – 17:00" },
    { day: "Samstag", time: "Nach Vereinbarung" },
    { day: "Sonntag", time: "Geschlossen" },
  ],
  mapsEmbed:
    "https://www.google.com/maps?q=Autoservice+Beuerberg+GmbH,+Bahnhofstra%C3%9Fe+45,+82547+Eurasburg&output=embed",
  mapsLink:
    "https://www.google.com/maps/place/Autoservice+Beuerberg+GmbH/@47.8285867,11.4072894,17z",
} as const;
