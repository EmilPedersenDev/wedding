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
    // TODO: bekräfta att vigseln faktiskt hålls på gården, och var på området — inte dokumenterat än.
    body: "Holmanäs gård är en skånsk lantgård från mitten av 1800-talet, varsamt renoverad, med sädesfält som når ända fram till husknuten och havet i horisonten. Själva festen hålls i gårdens ombyggda loge — vitkalkade stenväggar, ursprungliga stallfönster sida vid sida med stora moderna glaspartier som släpper in dagsljuset, och en minglingsterrass ut mot fälten. Planen är att både vigsel och fest ska hållas här på gården, så ni slipper förflytta er under dagen.",
    address: "Lyckebovägen 248, 231 93 Trelleborg",
    mapQuery: "Holmanäs Gård, Lyckebovägen 248, 231 93 Trelleborg",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Holman%C3%A4s+G%C3%A5rd%2C+Lyckebov%C3%A4gen+248%2C+231+93+Trelleborg",
  },

  schedule: {
    eyebrow: "Dagen",
    title: "Tidsschema",
    body: "Tiderna nedan är preliminära — vi uppdaterar dem närmare bröllopet. Klockan 22.00 stängs dörrarna mot fälten av hänsyn till grannarna, så festen flyttar in efter det.",
    // TODO: vigselns exakta tid och plats på gården är inte bestämd. Hela schemat är en gissning tills vidare.
    items: [
      { time: "14.00", title: "Vigsel", body: "Exakt tid och plats på gården är inte spikat än — var på plats i god tid så ni inte missar något." },
      { time: "15.00", title: "Mingel", body: "Bubbel och tilltugg på innergården och terrassen." },
      { time: "17.30", title: "Middag", body: "Vi äter i logen. Menyn är inte klar än, men det blir gott — och säkert några tal och skålar på vägen." },
      { time: "21.00", title: "Fest", body: "Tårta, dans och bar. Klockan 22.00 stängs dörrarna mot fälten, så festen flyttar in." },
    ],
  },

  accommodation: {
    eyebrow: "Boende",
    title: "Sov kvar på gården",
    // TODO: antalet sovplatser är inte bekräftat. Holmanäs eget planeringsunderlag anger upp till
    // 13 dubbelrum i 4 hus, men holmanas.se anger 15 dubbelrum — stäm av med Emma på Holmanäs
    // innan den här siffran publiceras.
    beds: 26,
    bedsLabel: "sovplatser på gården",
    body: "Det finns rum i flera av gårdens hus, men platserna är begränsade. Vi fördelar dem när alla har svarat, med förtur till er som reser längst — ange i din OSA om du vill sova över.",
    note: "Vi återkommer med vilka som fått rum och de praktiska detaljerna kring boendet.",
    nearbyTitle: "Boende i närheten",
    // TODO: leta upp faktiska boenden i Höllviken/Skanör-trakten och ersätt raden nedan.
    // Inga påhittade hotell — de fyra som stod här tidigare fanns inte.
    nearby: [
      { name: "Mer information kommer", detail: "Vi tipsar om boende i närheten närmare bröllopet", link: "" },
    ],
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

  dressCode: {
    eyebrow: "Klädkod",
    // TODO: klädkoden är inte bestämd än (och inte heller om vi ber gäster undvika vitt).
    title: "Meddelas senare",
    body: "Klädkoden är inte spikad än, men vi lägger upp den här i god tid före bröllopet. Delar av dagen är utomhus på gräs, så räkna gärna med att det kan svalna på kvällen.",
    note: "Mer information kommer.",
  },

  gifts: {
    eyebrow: "Presenter",
    title: "Presentönskemål",
    body: "Den största presenten är att ni firar med oss. Om vi önskar oss något mer än så är inte bestämt än — vi återkommer.",
    swishLabel: "Swish",
    // TODO: det här Swish-numret är påhittat — publicera inte sajten förrän det är ersatt med ett riktigt.
    swish: "123 456 78 90",
    note: "Önskelista och Swish-nummer läggs upp här så snart de är klara.",
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

  faq: {
    eyebrow: "Frågor",
    title: "Vanliga frågor",
    items: [
      {
        q: "Behöver jag förflytta mig under dagen?",
        // TODO: bekräfta att vigseln hålls på gården, se venue-sektionen ovan.
        a: "Planen är att både vigsel och fest hålls på Holmanäs, så du slipper åka mellan flera platser under dagen.",
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

  contact: {
    eyebrow: "Kontakt",
    title: "Undrar du något?",
    body: "Hör av dig till vår toastmaster, så slipper brudparet frågorna.",
    // TODO: toastmaster inte utsedd — namn, e-post och telefon nedan måste ersättas innan sajten delas.
    person: "Meddelas senare",
    role: "Toastmaster",
    email: "placeholder@example.se",
    phone: "070-000 00 00",
  },

  footer: {
    hashtagLabel: "Tagga gärna era bilder",
    // TODO: bekräfta hashtaggen.
    hashtag: "#annaochemil2027",
    closing: "Vi ses på Holmanäs",
  },

  /** Placeholder-bilder från Unsplash. Byt ut mot egna foton när de finns. */
  images: {
    hero: {
      src: unsplash("1519741497674-611481863552", 2000),
      alt: "Brudpar i motljus, bruden håller en bukett",
    },
    venue: {
      src: unsplash("1518780664697-55e3ad937233"),
      alt: "Rött trähus i ett böljande fält",
    },
    schedule: {
      src: unsplash("1519225421980-715cb0215aed"),
      alt: "Dukat långbord med ängsblommor",
    },
    travel: {
      src: unsplash("1441974231531-c6227db76b6e"),
      alt: "Grusväg genom en sommargrön skog",
    },
    dressCode: {
      src: unsplash("1490481651871-ab68de25d43d"),
      alt: "Klädställning med plagg i beige och vitt",
    },
    gifts: {
      src: unsplash("1465495976277-4387d4b0b4c6"),
      alt: "Två händer med vigselringar vilar på en bukett",
    },
    footer: {
      src: unsplash("1520854221256-17451cc331bf"),
      alt: "Brudpar som håller varandra i handen",
    },
  },

  /** Ordning och etiketter för navigationen; id:na matchar sektionernas ankare. */
  nav: [
    { id: "plats", label: "Plats" },
    { id: "schema", label: "Schema" },
    { id: "boende", label: "Boende" },
    { id: "resa", label: "Resa" },
    { id: "kladkod", label: "Klädkod" },
    { id: "presenter", label: "Presenter" },
    { id: "osa", label: "OSA" },
    { id: "faq", label: "FAQ" },
    { id: "kontakt", label: "Kontakt" },
  ],
} as const;

export type Wedding = typeof wedding;
