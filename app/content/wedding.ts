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
  names: "Anna & Emil",
  date: "26 juni 2027",
  dateISO: "2027-06-26",
  tagline: "Vi gifter oss",

  hero: {
    intro: "Vi säger ja till varandra",
    location: "Holmanäs gård, Skåne",
    cta: "OSA här",
  },

  venue: {
    eyebrow: "Plats",
    title: "Holmanäs gård",
    body: "En skånsk lantgård från mitten av 1800-talet, med sädesfält ända fram till husknuten och havet i horisonten. Här firar vi hela dagen — vigsel, middag och fest — så ni behöver aldrig förflytta er.",
    address: "Lyckebovägen 248, 231 93 Trelleborg",
    mapQuery: "Holmanäs Gård, Lyckebovägen 248, 231 93 Trelleborg",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Holman%C3%A4s+G%C3%A5rd%2C+Lyckebov%C3%A4gen+248%2C+231+93+Trelleborg",
  },

  schedule: {
    eyebrow: "Dagen",
    title: "Tidsschema",
    body: "Tiderna nedan är preliminära — vi uppdaterar dem närmare bröllopet. Klockan 22.00 stängs dörrarna mot fälten av hänsyn till grannarna, så festen flyttar in efter det.",
    items: [
      { time: "15.00", title: "Vigsel", body: "Vigsel på Holmanäs gård." },
      { time: "16.00", title: "Mingel", body: "Bubbel och tilltugg på innergården och terrassen." },
      { time: "17.30", title: "Middag", body: "Vi äter i logen. Menyn är inte klar än, men det blir gott — och säkert några tal och skålar på vägen." },
      { time: "21.00", title: "Fest", body: "Tårta, dans och bar. Klockan 22.00 stängs dörrarna mot fälten, så festen flyttar in." },
    ],
  },

  accommodation: {
    title: "Boende",
    intro: "För den som vill bo <strong>runt hörnet, bland rapsfälten och nära Holmanäs</strong> finns ett begränsat antal sängplatser att hyra på granngårdarna.",
    nearbyTitle: "Närmast Holmanäs",
    nearby: [
      { name: "Lägenhet med två sovrum", detail: "Dubbelsängar, 2–4 personer" },
      { name: "Gästhus", detail: "Dubbelsäng och bäddsoffa, 2–3 personer" },
      { name: "Lägenhet med två sovrum", detail: "4 sängplatser" },
      { name: "Lägenhet med tre sovrum", detail: "5 sängplatser" },
    ],
    bookingNote: "Är ni intresserade av något av dessa boenden? Mer information om bokning och kontaktuppgifter kommer inom kort.",
    hotelsTitle: "Hotell och boenden i närheten",
    hotels: [
      { distance: "1,5 km", name: "Liebacksgården", mapQuery: "Liebacksgården", detail: "Liebacksvägen 59, med 5 sängplatser. Kan bland annat bokas via Booking.com." },
      { distance: "5,6 km", name: "Hotell Stavstensgården", mapQuery: "Hotell Stavstensgården, Trelleborg", detail: "Ett lantligt hotellalternativ med nära till Holmanäs." },
      { distance: "ca 6,3 km", name: "Hotell Gässlingen, Skanör", mapQuery: "Hotell Gässlingen, Skanör", detail: "Ett hotellalternativ i Skanör." },
      { distance: "ca 7 km", name: "Strandvillan Ljunghusen", mapQuery: "Strandvillan Ljunghusen", detail: "Ett mindre boende nära havet och Falsterbokanalen." },
      { distance: "ca 7 km", name: "Ängavallen", mapQuery: "Ängavallen, Norra Håslöv", detail: "Ett lantligt boende i gårdsmiljö." },
      { distance: "8,3 km", name: "Höllviksnäs", mapQuery: "Höllviksnäs, Höllviken", detail: "Här finns både hotellrum och villor för större sällskap." },
    ],
    cityNote: "För den som hellre vill bo i stadsmiljö finns flera hotell i både Malmö och Trelleborg, cirka 25 minuters bilresa från Holmanäs.",
    footer: "Det finns även ett stort utbud av hus och lägenheter i <strong>Höllviken, Ljunghusen, Skanör och Falsterbo</strong> genom exempelvis <strong>Airbnb</strong>.",
  },

  travel: {
    eyebrow: "Hitta hit",
    title: "Resa & transport",
    body: "Holmanäs ligger strax utanför Höllviken, cirka 20 minuter med bil från Malmö.",
    // TODO: kollektivtrafik från Malmö/Höllviken är inte efterforskad — verifiera innan en rutt publiceras.
    items: [
      { title: "Parkering", body: "Släpp av på innergården, kör sedan vidare till den stora parkeringen vid Holmanäs. Bilen kan stå kvar över natten." },
      { title: "Taxi", body: "Taxi hämtar vid den stora parkeringen, inte vid innergården — förboka i god tid." },
      { title: "Samåkning", body: "Hör av dig så hjälper vi till att matcha ihop er som reser från samma håll." },
    ],
  },

  speeches: {
    title: "Tal & toastmadames",
    body: "Vi är så glada att ha <strong>Linn Hänsel och Caroline Nileskär</strong> som våra toastmadames och ser fram emot allt fint, roligt och oväntat som kan dyka upp under kvällen. Om du vill hålla tal eller bidra med något annat inslag, är det till dem du vänder dig.",
    note: "Information om vart du vänder dig och när du senast behöver höra av dig kommer snart.",
  },

  rsvp: {
    eyebrow: "OSA",
    title: "Säg att ni kommer",
    body: "Svara gärna så snart ni vet — det hjälper oss enormt med planeringen av mat och sovplatser. Skriv i formuläret om du vill sova över eller har specialkost.",
    deadline: "1 mars 2027",
    deadlineLabel: "Sista svarsdag",

    guestsLabel: "Antal personer (inklusive dig)",
    submitLabel: "Skicka OSA",
    submittingLabel: "Skickar…",
    againLabel: "Skicka ett svar till",
    retryLabel: "Försök igen",
    summaryError: "Kontrollera de markerade fälten innan du skickar.",
    honeypotLabel: "Lämna det här fältet tomt",

    thanksTitle: "Tack för ditt svar!",
    thanksBody: "Vi har tagit emot ditt svar och hör av oss igen närmare bröllopet med mer information. Hör gärna av dig till oss om något ändrar sig.",

    duplicateTitle: "Du har redan svarat",
    duplicateBody: "Vi har redan ett svar från den här e-postadressen. Hör av dig till oss om du vill ändra något i ditt svar.",

    errorTitle: "Något gick fel",
    errorBody: "Vi kunde tyvärr inte ta emot ditt svar just nu. Försök igen om en liten stund.",
    rateLimitBody: "Du har skickat flera svar på kort tid. Vänta en stund och försök igen.",
    captchaBody: "Vi kunde inte verifiera att du är en människa. Ladda om sidan och försök igen.",

    fieldErrors: {
      nameRequired: "Fyll i ditt namn.",
      nameTooLong: "Namnet får vara högst 100 tecken.",
      emailRequired: "Fyll i din e-postadress.",
      emailInvalid: "Kontrollera e-postadressen.",
      emailTooLong: "E-postadressen är för lång.",
      guestsRequired: "Ange minst en person.",
      guestsRange: "Ange mellan 1 och 10 personer.",
      dietTooLong: "Håll dig till högst 500 tecken.",
      noteTooLong: "Håll dig till högst 1000 tecken.",
      generic: "Kontrollera fältet.",
    },
  },

  practical: {
    eyebrow: "Praktiskt",
    title: "Bra att veta",
    dressCode: {
      label: "Klädkod",
      title: "Kavaj – det du känner dig fin i.",
      body: "Holmanäs gård har många vackra miljöer som vi kommer att njuta av och röra oss mellan under dagen och kvällen, både inomhus och utomhus. Glöm inte att ta med något varmt om kvällen blir sval – och såklart, dansskorna!",
    },
    gifts: {
      label: "Gåvor",
      title: "Önskemål om gåvor",
      body: "Att ni firar med oss är den finaste gåvan vi kan önska oss! Om ni ändå vill ge något utöver det, blir vi väldigt glada för ett bidrag till vår bröllopsresa.",
      swishLabel: "Swish",
      swish: "0733520150",
    },
    faqTitle: "Vanliga frågor",
    faq: [
      {
        q: "Behöver jag förflytta mig under dagen?",
        a: "Nej, både vigsel och fest hålls på Holmanäs, så du slipper åka mellan flera platser under dagen.",
      },
      {
        q: "Får jag ta med sällskap?",
        // TODO: plus-ett-policy inte bestämd.
        a: "Vi har inte bestämt det än, men återkommer om det före svarsdagen.",
      },
      {
        q: "Är barn välkomna?",
        // TODO: barnpolicy inte bestämd.
        a: "Vi har inte bestämt det än — vi återkommer så fort vi vet.",
      },
      {
        q: "Hur gör jag med specialkost?",
        a: "Skriv allergier och specialkost i OSA-formuläret, så för vi det vidare till köket.",
      },
      {
        q: "Hur tar jag mig hem på natten?",
        // TODO: avgör om vi bokar gemensam transport.
        a: "Taxi behöver förbokas och hämtar vid den stora parkeringen, inte vid innergården. Om vi ordnar gemensam transport återkommer vi med det.",
      },
      {
        q: "Får jag röka?",
        a: "Ja, men bara utomhus. Fyrverkerier och smällare är inte tillåtna på gården.",
      },
    ],
  },

  footer: {
    hashtagLabel: "Tagga gärna era bilder",
    // TODO: bekräfta hashtaggen.
    hashtag: "#annaochemil2027",
    closing: "Vi ses på Holmanäs",
  },

  images: {
    hero: {
      src: "/images/IMG20241004230204.jpg",
      alt: "Brudparet skålar i champagne",
    },
    /** Placeholder-bilder från Unsplash. Byt ut mot egna foton när de finns. */
    schedule: {
      src: unsplash("1519225421980-715cb0215aed"),
      alt: "Dukat långbord med ängsblommor",
    },
    footer: {
      src: unsplash("1520854221256-17451cc331bf"),
      alt: "Brudpar som håller varandra i handen",
    },
  },

  /** Ordning och etiketter för navigationen; id:na matchar sektionernas ankare. */
  nav: [
    { id: "schema", label: "Schema" },
    { id: "plats", label: "Plats" },
    { id: "boende", label: "Boende" },
    { id: "resa", label: "Resa" },
    { id: "tal", label: "Tal & toastmadames" },
    { id: "osa", label: "OSA" },
    { id: "praktiskt", label: "Praktiskt" },
  ],
} as const;

export type Wedding = typeof wedding;
