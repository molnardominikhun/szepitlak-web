// Szépít-Lak – Szolgáltatások adatai

export interface Service {
  id: string;
  name: string;
  slug: string;
  href: string;
  shortDescription: string;
  fullDescription: string;
  /** Placeholder kép útvonala – a valódi képet ide kell másolni */
  imageSrc: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    id: 'nyilaszaro',
    name: 'Nyílászárók',
    slug: 'nyilaszaro',
    href: '/szolgaltatasaink/nyilaszaro',
    shortDescription:
      'Tartós, energiatakarékos és esztétikus műanyag, fa és alumínium nyílászáró-megoldások az otthon adottságaihoz igazítva.',
    fullDescription:
      'Műanyag, fa és alumínium ablakrendszerek, bejárati ajtók, teraszajtók és tolóajtók – a felméréstől a régi szerkezetek bontásán át az új nyílászárók szakszerű beépítéséig.',
    imageSrc: '/images/services/nyilaszaro/nyilaszaro-szolgaltatas.png',
    imageAlt: 'Nyílászáró beépítés – műanyag, fa és alumínium ablakok és ajtók',
  },
  {
    id: 'arnyekolok',
    name: 'Árnyékolók',
    slug: 'arnyekolok',
    href: '/szolgaltatasaink/arnyekolok',
    shortDescription:
      'Redőnyök, zsalúziák és belső árnyékolók a kellemesebb hőérzetért, a szabályozható fényért és a nagyobb komfortért.',
    fullDescription:
      'Külső és belső árnyékolástechnikai megoldások felmérésével, beszerzésével és telepítésével foglalkozunk, a kézi redőnytől az elektromos zsalúziáig.',
    imageSrc: '/images/services/arnyekolok/arnyekolok-szolgaltatas.png',
    imageAlt: 'Árnyékolástechnikai megoldások – redőnyök és zsalúziák',
  },
  {
    id: 'belteri-ajtok',
    name: 'Beltéri ajtók',
    slug: 'belteri-ajtok',
    href: '/szolgaltatasaink/belteri-ajtok',
    shortDescription:
      'Stílusos és tartós beltéri ajtók több gyártó kínálatából, az otthon megjelenéséhez és a helyiségek használatához igazítva.',
    fullDescription:
      'Tömör, üvegezett, tolóajtó és egyéb beltéri ajtómegoldások több megbízható gyártó kínálatából, széles szín- és felületválasztékkal.',
    imageSrc: '/images/services/belteri-ajtok/belteri-ajto-szolgaltatas.png',
    imageAlt: 'Beltéri ajtó beépítés – stílusos és tartós megoldások',
  },
  {
    id: 'szunyoghalok',
    name: 'Szúnyoghálók',
    slug: 'szunyoghalok',
    href: '/szolgaltatasaink/szunyoghalok',
    shortDescription:
      'Egyedi méretre készülő fix, rolós, pliszé és ajtóra szerelhető szúnyoghálók a kényelmes, rovarmentes szellőztetésért.',
    fullDescription:
      'Fix keretes, rolós, pliszé és nyíló/toló szúnyogháló rendszerek ablakokra és teraszajtókra, egyedi méretre gyártva.',
    imageSrc: '/images/services/szunyoghalok/szunyoghalo-szolgaltatas.png',
    imageAlt: 'Szúnyogháló – fix, rolós és pliszé megoldások ablakokra és ajtókra',
  },
];
