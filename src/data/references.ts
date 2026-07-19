// Szépít-Lak – Referenciák adatai
// FONTOS: Ne találj ki ügyfélidézeteket! Csak valódi, jóváhagyott szöveg szerepelhet.
// Az idézetmező üresen hagyva, amíg a tulajdonos nem erősíti meg.
// A képek valódi fájlnevei a brief 18.6 pontja alapján vannak előkészítve.

export interface ReferenceItem {
  id: string;
  /** A befejezett munka rövid leírása – csak azt tartalmazza, amit a Szépít-Lak végzett */
  workDescription: string;
  /** Kép útvonala a public/images/references/ mappán belül */
  imageSrc: string;
  imageAlt: string;
  /**
   * Ügyfélidézet – CSAK valódi, jóváhagyott idézet esetén töltendő ki.
   * Ha undefined/null, az idézetmező nem jelenik meg a kártyán.
   */
  quote?: string;
  /** Az idézet szerzőjének (anonim) megnevezése, pl. "Tatabányai ügyfelünk" */
  quoteAuthor?: string;
}

// TODO: A munkaleírásokat a tulajdonossal kell véglegesíteni (melyik kép = milyen munka).
// Az alábbi csoportosítás a brief 18.6 pontja alapján ideiglenes.

export const references: ReferenceItem[] = [
  // --- Nyílászárók ---
  {
    id: 'ref-nyilaszaro-01',
    workDescription: 'Műanyag nyílászáró beépítése',
    imageSrc: '/images/references/nyilaszaro/IMG_9973.jpg',
    imageAlt: 'Műanyag ablak beépítése',
  },
  {
    id: 'ref-nyilaszaro-02',
    workDescription: 'Nyílászárók cseréje családi házban',
    imageSrc: '/images/references/nyilaszaro/IMG_9976.jpg',
    imageAlt: 'Beépített műanyag ablakok',
  },
  {
    id: 'ref-nyilaszaro-03',
    workDescription: 'Homlokzati ablakok szakszerű cseréje',
    imageSrc: '/images/references/nyilaszaro/IMG_9977.jpg',
    imageAlt: 'Új beépítésű ablakok',
  },
  {
    id: 'ref-nyilaszaro-04',
    workDescription: 'Műanyag ablak redőnnyel és könyöklővel',
    imageSrc: '/images/references/nyilaszaro/IMG_9978.jpg',
    imageAlt: 'Műanyag ablak beépítés után',
  },
  {
    id: 'ref-nyilaszaro-05',
    workDescription: 'Kétszárnyas műanyag ablak beépítése',
    imageSrc: '/images/references/nyilaszaro/IMG_9979.jpg',
    imageAlt: 'Beépített kétszárnyas ablak',
  },
  {
    id: 'ref-nyilaszaro-06',
    workDescription: 'Energiatakarékos ablakcsere felújításnál',
    imageSrc: '/images/references/nyilaszaro/IMG_9980.jpg',
    imageAlt: 'Energiatakarékos új ablakok',
  },
  {
    id: 'ref-nyilaszaro-07',
    workDescription: 'Bukó-nyíló műanyag ablak beépítése',
    imageSrc: '/images/references/nyilaszaro/IMG_9982.jpg',
    imageAlt: 'Beépített bukó-nyíló ablak',
  },
  {
    id: 'ref-nyilaszaro-08',
    workDescription: 'Nyílászárók beépítése és finomhangolása',
    imageSrc: '/images/references/nyilaszaro/IMG_0105.jpg',
    imageAlt: 'Szakszerűen beállított ablakok',
  },
  {
    id: 'ref-nyilaszaro-09',
    workDescription: 'Fix és nyíló ablakok kombinációja',
    imageSrc: '/images/references/nyilaszaro/IMG_0385.jpg',
    imageAlt: 'Beépített fix és nyíló ablak',
  },
  {
    id: 'ref-nyilaszaro-10',
    workDescription: 'Nyílászáró csere és beépítés',
    imageSrc: '/images/references/nyilaszaro/IMG_9985.jpg',
    imageAlt: 'Homlokzati nyílászáró csere',
  },

  // --- Beltéri ajtók ---
  {
    id: 'ref-belteri-01',
    workDescription: 'Beltéri ajtó beépítése és tok elhelyezése',
    imageSrc: '/images/references/belteri-ajtok/IMG_1928.jpg',
    imageAlt: 'Dekorüveges beltéri ajtó beépítése',
  },
  {
    id: 'ref-belteri-02',
    workDescription: 'Beltéri ajtók beépítése lakásfelújítás során',
    imageSrc: '/images/references/belteri-ajtok/IMG_1929.jpg',
    imageAlt: 'Új beltéri ajtók és kilincsek',
  },
  {
    id: 'ref-belteri-03',
    workDescription: 'Fa hatású beltéri ajtó szakszerű beépítése',
    imageSrc: '/images/references/belteri-ajtok/IMG_1933.jpg',
    imageAlt: 'Fa erezetű beltéri ajtó beépítése',
  },
  {
    id: 'ref-belteri-04',
    workDescription: 'Világos beltéri ajtó beépítése',
    imageSrc: '/images/references/belteri-ajtok/IMG_1500.jpg',
    imageAlt: 'Világos modern beltéri ajtó',
  },
  {
    id: 'ref-belteri-05',
    workDescription: 'Letisztult beltéri ajtók elhelyezése',
    imageSrc: '/images/references/belteri-ajtok/IMG_1501.jpg',
    imageAlt: 'Modern stílusú beltéri ajtók',
  },
  {
    id: 'ref-belteri-06',
    workDescription: 'Beltéri ajtócsere és beállítás',
    imageSrc: '/images/references/belteri-ajtok/IMG_1502.jpg',
    imageAlt: 'Beállított beltéri ajtók',
  },
  {
    id: 'ref-belteri-07',
    workDescription: 'Beltéri ajtó beépítése utólag szerelhető tokkal',
    imageSrc: '/images/references/belteri-ajtok/IMG_1536.jpg',
    imageAlt: 'Beltéri ajtó beépítés',
  },
  {
    id: 'ref-belteri-08',
    workDescription: 'Sötét tónusú prémium beltéri ajtó beépítése',
    imageSrc: '/images/references/belteri-ajtok/IMG_1799.jpg',
    imageAlt: 'Sötét beltéri ajtó és kilincs',
  },
  {
    id: 'ref-belteri-09',
    workDescription: 'Beltéri ajtó beépítés felújítás alatt',
    imageSrc: '/images/references/belteri-ajtok/IMG_1888.jpg',
    imageAlt: 'Beépített beltéri ajtó tokkal',
  },
  {
    id: 'ref-belteri-10',
    workDescription: 'Fa hatású toló teraszajtó beépítése',
    imageSrc: '/images/references/belteri-ajtok/IMG_0103.jpg',
    imageAlt: 'Toló teraszajtó nagy üvegfelülettel',
  },

  // --- Szúnyoghálók & Árnyékolók ---
  {
    id: 'ref-szunyoghalo-01',
    workDescription: 'Pliszé szúnyogháló telepítése teraszajtóra',
    imageSrc: '/images/references/szunyoghalok/IMG_1866.jpg',
    imageAlt: 'Pliszé szúnyogháló beépítése',
  },
  {
    id: 'ref-szunyoghalo-02',
    workDescription: 'Szúnyogháló ajtó beépítése',
    imageSrc: '/images/references/szunyoghalok/IMG_0573.jpg',
    imageAlt: 'Beépített szúnyogháló',
  },
  {
    id: 'ref-szunyoghalo-03',
    workDescription: 'Rolós szúnyogháló telepítése ablakra',
    imageSrc: '/images/references/szunyoghalok/IMG_1796.jpg',
    imageAlt: 'Rolós szúnyogháló felszerelése',
  },
  {
    id: 'ref-arnyekolo-01',
    workDescription: 'Külső redőny felszerelése családi házon',
    imageSrc: '/images/references/arnyekolok/IMG_0652.jpg',
    imageAlt: 'Műanyag külső redőny beépítése',
  },
];
