/**
 * All redaktionell text på sajten bor här, sektion för sektion.
 * Byt ut placeholder-texterna nedan — komponenterna behöver inte röras.
 *
 * Fastställt i dagsläget: datum, plats och antal sovplatser. Övrigt är placeholder.
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
    body: "Placeholder: Holmanäs gård ligger på de skånska slätterna utanför Höllviken, med sädesfält ända fram till husknuten och havet i horisonten. Vigsel och fest hålls på gården — ni behöver inte förflytta er under dagen.",
    address: "Lyckebovägen, Trelleborg",
    mapQuery: "Holmanäs Gård, Lyckebovägen, Trelleborg",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Holman%C3%A4s+G%C3%A5rd%2C+Lyckebov%C3%A4gen%2C+Trelleborg",
  },

  schedule: {
    eyebrow: "Dagen",
    title: "Tidsschema",
    body: "Placeholder: preliminära tider — vi uppdaterar närmare bröllopet.",
    items: [
      { time: "14.00", title: "Vigsel", body: "Placeholder: vi samlas i trädgården. Var på plats i god tid." },
      { time: "15.00", title: "Mingel", body: "Placeholder: bubbel och tilltugg på gårdsplanen." },
      { time: "17.30", title: "Middag", body: "Placeholder: trerätters i logen, med tal och lite för många skålar." },
      { time: "21.00", title: "Fest", body: "Placeholder: tårta, dans och bar till småtimmarna." },
    ],
  },

  accommodation: {
    eyebrow: "Boende",
    title: "Sov kvar på gården",
    beds: 26,
    bedsLabel: "sovplatser på gården",
    body: "Placeholder: det finns 26 sovplatser fördelade på gårdens rum och flygel. Vi fördelar platserna när alla har svarat, med förtur till er som reser längst. Ange i din OSA om du vill sova över.",
    note: "Placeholder: lakan och handdukar ingår. Incheckning från kl. 12.00 på bröllopsdagen.",
    nearbyTitle: "Boende i närheten",
    nearby: [
      { name: "Placeholder Hotell", detail: "Höllviken · ca 10 min med bil", link: "" },
      { name: "Placeholder B&B", detail: "Trelleborg · ca 20 min med bil", link: "" },
      { name: "Placeholder Vandrarhem", detail: "Falsterbo · ca 15 min med bil", link: "" },
      { name: "Placeholder Stugby", detail: "Skanör · ca 15 min med bil", link: "" },
    ],
  },

  travel: {
    eyebrow: "Hitta hit",
    title: "Resa & transport",
    body: "Placeholder: Holmanäs ligger cirka 30 minuter från Malmö med bil.",
    items: [
      { title: "Parkering", body: "Placeholder: det finns gott om parkering på grusplanen vid infarten. Bilen kan stå kvar över natten." },
      { title: "Kollektivtrafik", body: "Placeholder: buss från Malmö C till Höllviken, därefter cirka 10 minuter med taxi." },
      { title: "Samåkning", body: "Placeholder: hör av dig så hjälper vi till att matcha ihop er som reser från samma håll." },
    ],
  },

  dressCode: {
    eyebrow: "Klädkod",
    title: "Kavaj",
    body: "Placeholder: kavaj — men gärna med sommarkänsla. Vigseln hålls utomhus på gräs, så ta med skor som klarar det, och ett extra lager för kvällen när det svalnar.",
    note: "Placeholder: undvik vitt.",
  },

  gifts: {
    eyebrow: "Presenter",
    title: "Presentönskemål",
    body: "Placeholder: den största presenten är att ni firar med oss. Vill ni ändå ge något drömmer vi om en bröllopsresa — ett bidrag till den gör oss väldigt glada.",
    swishLabel: "Swish",
    swish: "123 456 78 90",
    note: "Placeholder: önskelista kommer senare.",
  },

  rsvp: {
    eyebrow: "OSA",
    title: "Säg att ni kommer",
    body: "Placeholder: svara gärna så snart ni vet — det hjälper oss enormt med planeringen av mat och sovplatser.",
    deadline: "1 mars 2027",
    deadlineLabel: "Sista svarsdag",
    thanksTitle: "Tack för ditt svar!",
    thanksBody: "Placeholder: vi har tagit emot din anmälan och hör av oss närmare bröllopet. Hör gärna av dig om något ändrar sig.",
  },

  faq: {
    eyebrow: "Frågor",
    title: "Vanliga frågor",
    items: [
      {
        q: "Får jag ta med sällskap?",
        a: "Placeholder: ange i din OSA om du vill ta med sällskap, så återkommer vi. Vi har tyvärr ett begränsat antal platser.",
      },
      {
        q: "Är barn välkomna?",
        a: "Placeholder: ja, barn är hjärtligt välkomna. Ange antal och ålder i din OSA så ordnar vi mat och aktiviteter.",
      },
      {
        q: "Hur gör jag med specialkost?",
        a: "Placeholder: skriv allergier och specialkost i OSA-formuläret, så för vi det vidare till köket.",
      },
      {
        q: "Hur tar jag mig hem på natten?",
        a: "Placeholder: taxi behöver förbokas. Vi ordnar gemensam transport om tillräckligt många vill åka samtidigt.",
      },
    ],
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Undrar du något?",
    body: "Placeholder: hör av dig till vår toastmaster, så slipper brudparet frågorna.",
    person: "Placeholder Namn",
    role: "Toastmaster",
    email: "placeholder@example.se",
    phone: "070-000 00 00",
  },

  footer: {
    hashtagLabel: "Tagga gärna era bilder",
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
