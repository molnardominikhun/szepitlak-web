export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}

export const SITE_URL = 'https://szepitlak.hu';

export const routesSeoData: Record<string, SeoMetadata> = {
  '/': {
    title: 'Szépít-Lak Kft. – Minőségi Nyílászárók, Árnyékolók és Beépítés Tatabányán',
    description: 'Komplett nyílászáró-, beltéri ajtó-, árnyékolástechnikai és szúnyogháló-megoldások felméréssel, tanácsadással és precíz beépítéssel Tatabányán és Komárom-Esztergom vármegyében.',
    canonicalUrl: `${SITE_URL}/`,
  },
  '/szolgaltatasaink': {
    title: 'Szolgáltatásaink – Nyílászárók, Árnyékolók, Beltéri Ajtók | Szépít-Lak Kft.',
    description: 'Fedezze fel szolgáltatásainkat: nyílászárók, árnyékolástechnika, beltéri ajtók és szúnyoghálók szakszerű felmérése és beépítése Tatabányán.',
    canonicalUrl: `${SITE_URL}/szolgaltatasaink`,
  },
  '/szolgaltatasaink/nyilaszaro': {
    title: 'Műanyag és Fa Nyílászárók Tatabányán | Szépít-Lak Kft.',
    description: 'Prémium minőségű műanyag és fa ablakok, erkélyajtók és bejárati ajtók szakszerű felmérése, értékesítése és beépítése Tatabányán és környékén.',
    canonicalUrl: `${SITE_URL}/szolgaltatasaink/nyilaszaro`,
  },
  '/szolgaltatasaink/arnyekolok': {
    title: 'Árnyékolástechnika: Redőnyök, Zsaluziák, Reluxák | Szépít-Lak Kft.',
    description: 'Kültéri és beltéri árnyékolók, műanyag és alumínium redőnyök, motoros zsaluziák széles választéka és szakszerű beépítése.',
    canonicalUrl: `${SITE_URL}/szolgaltatasaink/arnyekolok`,
  },
  '/szolgaltatasaink/belteri-ajtok': {
    title: 'Beltéri Ajtók – CPL, Dekorfóliás és Festett Ajtók | Szépít-Lak Kft.',
    description: 'Stílusos és tartós beltéri ajtók széles szín- és mintaválasztékban, egyedi méretre gyártva és szakszerűen beépítve Tatabányán.',
    canonicalUrl: `${SITE_URL}/szolgaltatasaink/belteri-ajtok`,
  },
  '/szolgaltatasaink/szunyoghalok': {
    title: 'Szúnyoghálók – Fix, Rolós és Plisszé Rendszerek | Szépít-Lak Kft.',
    description: 'Egyedi méretre készült szúnyoghálók ablakokra és ajtókra. Fix, mobil rolós és plisszé szúnyoghálók szakszerű felszereléssel.',
    canonicalUrl: `${SITE_URL}/szolgaltatasaink/szunyoghalok`,
  },
  '/referenciak': {
    title: 'Referenciáink – Elvégzett Munkáink Tatabányán | Szépít-Lak Kft.',
    description: 'Tekintse meg legutóbbi ablakcsere, ajtóbeépítés és árnyékolástechnikai munkáinkat fotókkal és elégedett ügyfélvéleményekkel.',
    canonicalUrl: `${SITE_URL}/referenciak`,
  },
  '/kapcsolat': {
    title: 'Kapcsolat – Kérjen Ingyenes Ajánlatot | Szépít-Lak Kft.',
    description: 'Lépjen kapcsolatba velünk! Ingyenes helyszíni felmérés és árajánlatadás Tatabányán és környékén. Elérhetőségek és nyitvatartás.',
    canonicalUrl: `${SITE_URL}/kapcsolat`,
  },
  '/adatkezelesi-tajekoztato': {
    title: 'Adatkezelési Tájékoztató | Szépít-Lak Kft.',
    description: 'A Szépít-Lak Kft. adatkezelési tájékoztatója és GDPR adatvédelmi szabályzata.',
    canonicalUrl: `${SITE_URL}/adatkezelesi-tajekoztato`,
  },
  '/cookie-tajekoztato': {
    title: 'Cookie (Süti) Tájékoztató | Szépít-Lak Kft.',
    description: 'Információk a Szépít-Lak Kft. weboldalán használt sütikről (cookie-król) és azok kezeléséről.',
    canonicalUrl: `${SITE_URL}/cookie-tajekoztato`,
  },
  '/impresszum': {
    title: 'Impresszum | Szépít-Lak Kft.',
    description: 'Céginformációk, üzemeltető adatai és jogi tudnivalók - Szépít-Lak Kft.',
    canonicalUrl: `${SITE_URL}/impresszum`,
  },
};
