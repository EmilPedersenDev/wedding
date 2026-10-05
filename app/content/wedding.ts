/**
 * All redaktionell text på sajten bor här, sektion för sektion.
 * Byt ut placeholder-texterna nedan — komponenterna behöver inte röras.
 *
 * Venue-fakta hämtas från .claude/skills/holmanas-venue/ (verifierat mot Holmanäs eget
 * planeringsunderlag och husregler, plus holmanas.se). Obesvarade beslut är märkta med
 * // TODO: — gissa aldrig i deras ställe, skriv hellre "vi återkommer".
 */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const wedding = {
  names: "Emil & Anna",
  siteUrl: "https://emilanna.se",
  date: "26 juni 2027",
  dateISO: "2027-06-26",
  tagline: "Vi gifter oss",

  hero: {
    intro: "Välkommen till vårt bröllop!",
    location: "Holmanäs gård, Skåne",
    cta: "OSA här",
  },

  venue: {
    eyebrow: "Plats",
    title: "Holmanäs gård",
    body: "En skånsk lantgård från mitten av 1800-talet, med sädesfält ända fram till husknuten och havet i horisonten. Här firar vi hela dagen — vigsel, middag och fest — så ni behöver aldrig förflytta er.",
    address: "Lyckebovägen 248, 231 93 Trelleborg",
    mapQuery: "Holmanäs Gård, Lyckebovägen 248, 231 93 Trelleborg",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Holman%C3%A4s+G%C3%A5rd%2C+Lyckebov%C3%A4gen+248%2C+231+93+Trelleborg",
    items: [
      {
        title: "Parkering",
        body: "Parkera vid den stora parkeringen på Holmanäs. Bilen kan stå kvar över natten.",
      },
      {
        title: "Taxi",
        body: "Taxi hämtar vid den stora parkeringen. Förboka i god tid!",
      },
    ],
  },

  schedule: {
    eyebrow: "Dagen",
    title: "Tidsschema",
    body: "Vigseln börjar klockan 15.00, och sedan firar vi tillsammans resten av dagen och kvällen!",
    items: [
      { time: "15.00", title: "Vigsel", body: 'Vigsel på <a href="#plats">Holmanäs gård</a>.' },
      {
        title: "Mingel",
        body: "Bubbel och tilltugg på innergården och terrassen.",
      },
      {
        title: "Middag",
        body: 'Vi äter en trerättersmiddag med tal och skålar längs vägen. Vill du hålla tal? Glöm inte att anmäla det till våra <a href="#tal">toastmadames</a>.',
      },
      {
        title: "Fest",
        body: "DJ:n kliver upp i båset och dansgolvet öppnar – festen fortsätter in på småtimmarna!",
      },
    ],
  },

  accommodation: {
    title: "Boende",
    intro:
      "För den som vill bo <strong>runt hörnet, bland rapsfälten och nära Holmanäs</strong> finns ett begränsat antal sängplatser att hyra på granngårdarna:",
    nearby: [
      { name: "Lägenhet med två sovrum", detail: "Dubbelsängar, 2–4 personer" },
      { name: "Gästhus", detail: "Dubbelsäng och bäddsoffa, 2–3 personer" },
      { name: "Lägenhet med två sovrum", detail: "4 sängplatser" },
      { name: "Lägenhet med tre sovrum", detail: "5 sängplatser" },
    ],
    bookingNote:
      "Är ni intresserade av något av dessa boenden? Mer information om bokning och kontaktuppgifter kommer inom kort.",
    hotelsTitle: "Hotell och boenden i närheten",
    hotels: [
      {
        distance: "1,5 km",
        name: "Liebacksgården",
        mapQuery: "Liebacksgården",
        detail:
          "Liebacksvägen 59, med 5 sängplatser. Kan bland annat bokas via Booking.com.",
      },
      {
        distance: "5,6 km",
        name: "Hotell Stavstensgården",
        mapQuery: "Hotell Stavstensgården, Trelleborg",
        detail: "Ett lantligt hotellalternativ med nära till Holmanäs.",
      },
      {
        distance: "ca 6,3 km",
        name: "Hotell Gässlingen, Skanör",
        mapQuery: "Hotell Gässlingen, Skanör",
        detail: "Ett hotellalternativ i Skanör.",
      },
      {
        distance: "ca 7 km",
        name: "Strandvillan Ljunghusen",
        mapQuery: "Strandvillan Ljunghusen",
        detail: "Ett mindre boende nära havet och Falsterbokanalen.",
      },
      {
        distance: "ca 7 km",
        name: "Ängavallen",
        mapQuery: "Ängavallen, Norra Håslöv",
        detail: "Ett lantligt boende i gårdsmiljö.",
      },
      {
        distance: "8,3 km",
        name: "Höllviksnäs",
        mapQuery: "Höllviksnäs, Höllviken",
        detail: "Här finns både hotellrum och villor för större sällskap.",
      },
    ],
    cityNote:
      "För den som hellre vill bo i stadsmiljö finns flera hotell i både Malmö och Trelleborg.",
    footer:
      "Det finns även ett stort utbud av hus och lägenheter i <strong>Höllviken, Ljunghusen, Skanör och Falsterbo</strong> genom exempelvis <strong>Airbnb</strong>.",
  },

  speeches: {
    title: "Tal & toastmadames",
    body: "Vi är så glada att ha <strong>Linn Hänsel och Caroline Nileskär</strong> som våra toastmadames och ser fram emot allt fint, roligt och oväntat som kan dyka upp under kvällen. Om du vill hålla tal eller bidra med något annat inslag, är det till dem du vänder dig.",
    note: "Information om vart du vänder dig och när du senast behöver höra av dig kommer snart.",
  },

  rsvp: {
    title: "OSA",
    body: "Vi hoppas att ni vill fira med oss!",
    deadline: "1 mars 2027",
    deadlineLabel: "Sista svarsdag",

    guestNameLabel: "Fullständigt namn på gäst (vid anmälan av respektive)",
    submitLabel: "Skicka svar",
    submittingLabel: "Skickar…",
    retryLabel: "Försök igen",
    summaryError: "Kontrollera de markerade fälten innan du skickar.",

    thanksTitle: "Tack för ditt svar!",
    thanksBody:
      "Vi har tagit emot ditt svar. Hör gärna av dig till oss om något ändrar sig.",

    duplicateTitle: "Du har redan svarat",
    duplicateBody:
      "Vi har redan ett svar från den här e-postadressen. Hör av dig till oss om du vill ändra något i ditt svar.",

    errorTitle: "Något gick fel",
    errorBody:
      "Vi kunde tyvärr inte ta emot ditt svar just nu. Försök igen om en liten stund.",

    fieldErrors: {
      nameRequired: "Fyll i ditt namn.",
      nameTooLong: "Namnet får vara högst 100 tecken.",
      emailRequired: "Fyll i din e-postadress.",
      emailInvalid: "Kontrollera e-postadressen.",
      emailTooLong: "E-postadressen är för lång.",
      guestNameTooLong: "Namnet får vara högst 100 tecken.",
      dietTooLong: "Håll dig till högst 500 tecken.",
      noteTooLong: "Håll dig till högst 1000 tecken.",
      generic: "Kontrollera fältet.",
    },
  },

  practical: {
    title: "Vanliga frågor",
    faq: [
      {
        q: "Finns det någon klädkod?",
        a: "Kavaj – det du känner dig fin i. Holmanäs gård har många vackra miljöer som vi kommer att njuta av och röra oss mellan under dagen och kvällen, både inomhus och utomhus. Glöm inte att ta med något varmt om kvällen blir sval – och såklart, dansskorna!",
      },
      {
        q: "Har ni några önskemål om gåvor?",
        a: "Att ni firar med oss är den finaste gåvan vi kan önska oss! Om ni ändå vill ge något utöver det, blir vi väldigt glada för ett bidrag till vår bröllopsresa. Swisha gärna till <strong>0733520150</strong>.",
      },
      {
        q: "Är barn välkomna?",
        a: "Vi älskar barn, men den här dagen vill vi fira med er vuxna. Barn som ammas är självklart välkomna.",
      },
      {
        q: "Hur gör jag med specialkost?",
        a: "Skriv allergier och specialkost i OSA-formuläret, så för vi det vidare till köket.",
      },
    ],
  },

  footer: {
    closing: "Vi ses på Holmanäs",
  },

  images: {
    hero: {
      src: "/images/IMG20241004230204.jpg",
      alt: "Brudparet skålar i champagne",
    },
    footer: {
      src: "/images/anna-ater-emil.jpeg",
      alt: "Anna ligger i sanden och låtsas äta upp Emil",
    },
    /** Placeholder-bild från Unsplash. Byt ut mot ett eget foto när det finns. */
    schedule: {
      src: unsplash("1519225421980-715cb0215aed"),
      alt: "Dukat långbord med ängsblommor",
    },
  },

  /** Ordning och etiketter för navigationen; id:na matchar sektionernas ankare. */
  nav: [
    { id: "schema", label: "Schema" },
    { id: "plats", label: "Plats" },
    { id: "boende", label: "Boende" },
    { id: "tal", label: "Tal & toastmadames" },
    { id: "fragor", label: "Vanliga frågor" },
    { id: "osa", label: "OSA", cta: true },
  ],
} as const;

export type Wedding = typeof wedding;
