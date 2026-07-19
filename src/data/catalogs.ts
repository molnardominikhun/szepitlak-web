// Szépít-Lak – Katalógus konfiguráció
// Ha egy PDF-fájl nem létezik a public/catalogs/ mappában,
// a kártya "Hamarosan elérhető" állapotban jelenik meg.

export interface CatalogItem {
  id: string;
  name: string;
  /** A PDF fájl útvonala a public/ mappán belül, pl. /catalogs/nyilaszaro/s8000-katalogus.pdf */
  filePath: string;
  /** Ha false: disabled + "Hamarosan" felirat. Az alkalmazás ezt automatikusan kezeli. */
  available: boolean;
}

export interface CatalogGroup {
  serviceId: string;
  serviceLabel: string;
  items: CatalogItem[];
}

export const catalogGroups: CatalogGroup[] = [
  {
    serviceId: 'nyilaszaro',
    serviceLabel: 'Nyílászárók',
    items: [
      {
        id: 'nyilaszaro-s8000',
        name: 'S8000 katalógus',
        filePath: '/catalogs/nyilaszaro/s8000-katalogus.pdf',
        available: true,
      },
      {
        id: 'nyilaszaro-s9000',
        name: 'S9000 katalógus',
        filePath: '/catalogs/nyilaszaro/s9000-katalogus.pdf',
        available: true,
      },
      {
        id: 'nyilaszaro-s9000-plus',
        name: 'S9000 Plus katalógus',
        filePath: '/catalogs/nyilaszaro/s9000-plus-katalogus.pdf',
        available: true,
      },
      {
        id: 'nyilaszaro-smoovio',
        name: 'SMOOVIO katalógus',
        filePath: '/catalogs/nyilaszaro/smoovio-katalogus.pdf',
        available: true,
      },
      {
        id: 'nyilaszaro-bejati-ajto',
        name: 'Bejárati ajtó panel katalógus',
        filePath: '/catalogs/nyilaszaro/bejarati-ajto-panel-katalogus.pdf',
        available: true,
      },
    ],
  },
  {
    serviceId: 'arnyekolok',
    serviceLabel: 'Árnyékolók',
    items: [
      {
        id: 'arnyekolok-redony',
        name: 'Redőny katalógus',
        filePath: '/catalogs/arnyekolok/redony-katalogus.pdf',
        available: true,
      },
      {
        id: 'arnyekolok-zaluzia',
        name: 'Zsalúzia katalógus',
        filePath: '/catalogs/arnyekolok/zaluzia-katalogus.pdf',
        available: true,
      },
      {
        id: 'arnyekolok-szalagfuggony',
        name: 'Szalagfüggöny katalógus',
        filePath: '/catalogs/arnyekolok/szalagfuggony-katalogus.pdf',
        available: true,
      },
    ],
  },
  {
    serviceId: 'belteri-ajtok',
    serviceLabel: 'Beltéri ajtók',
    items: [
      {
        id: 'belteri-standard-door',
        name: 'Standard Door katalógus 2024',
        filePath: '/catalogs/belteri-ajtok/standard-door-katalogus-2024.pdf',
        available: true,
      },
      {
        id: 'belteri-borovi',
        name: 'Borovi katalógus',
        filePath: '/catalogs/belteri-ajtok/borovi-katalogus.pdf',
        available: true,
      },
      {
        id: 'belteri-full-doors',
        name: 'Full Doors katalógus',
        filePath: '/catalogs/belteri-ajtok/full-doors-katalogus.pdf',
        available: true,
      },
    ],
  },
  {
    serviceId: 'szunyoghalok',
    serviceLabel: 'Szúnyoghálók',
    // Jelenleg nincs PDF – a szekció automatikusan rejtve marad, ha minden available: false
    items: [
      // TODO: PDF-fájl feltöltése után ide kerül a bejegyzés
    ],
  },
];

/** Adott szolgáltatáshoz tartozó katalógusok visszaadása */
export function getCatalogsForService(serviceId: string): CatalogItem[] {
  const group = catalogGroups.find((g) => g.serviceId === serviceId);
  return group?.items ?? [];
}

/** Van-e bármelyik elérhető katalógus az adott szolgáltatásnál? */
export function hasAvailableCatalogs(serviceId: string): boolean {
  return getCatalogsForService(serviceId).some((c) => c.available);
}

/** Van-e bármelyik katalógus (elérhető vagy hamarosan)? */
export function hasAnyCatalogs(serviceId: string): boolean {
  return getCatalogsForService(serviceId).length > 0;
}
