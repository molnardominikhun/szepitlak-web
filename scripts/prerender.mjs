import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');
const serverBundlePath = path.resolve(distDir, 'server', 'entry-server.js');

const routesSeoData = {
  '/': {
    title: 'Szépít-Lak Kft. – Minőségi Nyílászárók, Árnyékolók és Beépítés Tatabányán',
    description: 'Komplett nyílászáró-, beltéri ajtó-, árnyékolástechnikai és szúnyogháló-megoldások felméréssel, tanácsadással és precíz beépítéssel Tatabányán és Komárom-Esztergom vármegyében.',
    canonicalUrl: 'https://www.szepitlak.hu/',
  },
  '/szolgaltatasaink': {
    title: 'Szolgáltatásaink – Nyílászárók, Árnyékolók, Beltéri Ajtók | Szépít-Lak Kft.',
    description: 'Fedezze fel szolgáltatásainkat: nyílászárók, árnyékolástechnika, beltéri ajtók és szúnyoghálók szakszerű felmérése és beépítése Tatabányán.',
    canonicalUrl: 'https://www.szepitlak.hu/szolgaltatasaink',
  },
  '/szolgaltatasaink/nyilaszaro': {
    title: 'Műanyag és Fa Nyílászárók Tatabányán | Szépít-Lak Kft.',
    description: 'Prémium minőségű műanyag és fa ablakok, erkélyajtók és bejárati ajtók szakszerű felmérése, értékesítése és beépítése Tatabányán és környékén.',
    canonicalUrl: 'https://www.szepitlak.hu/szolgaltatasaink/nyilaszaro',
  },
  '/szolgaltatasaink/arnyekolok': {
    title: 'Árnyékolástechnika: Redőnyök, Zsaluziák, Reluxák | Szépít-Lak Kft.',
    description: 'Kültéri és beltéri árnyékolók, műanyag és alumínium redőnyök, motoros zsaluziák széles választéka és szakszerű beépítése.',
    canonicalUrl: 'https://www.szepitlak.hu/szolgaltatasaink/arnyekolok',
  },
  '/szolgaltatasaink/belteri-ajtok': {
    title: 'Beltéri Ajtók – CPL, Dekorfóliás és Festett Ajtók | Szépít-Lak Kft.',
    description: 'Stílusos és tartós beltéri ajtók széles szín- és mintaválasztékban, egyedi méretre gyártva és szakszerűen beépítve Tatabányán.',
    canonicalUrl: 'https://www.szepitlak.hu/szolgaltatasaink/belteri-ajtok',
  },
  '/szolgaltatasaink/szunyoghalok': {
    title: 'Szúnyoghálók – Fix, Rolós és Plisszé Rendszerek | Szépít-Lak Kft.',
    description: 'Egyedi méretre készült szúnyoghálók ablakokra és ajtókra. Fix, mobil rolós és plisszé szúnyoghálók szakszerű felszereléssel.',
    canonicalUrl: 'https://www.szepitlak.hu/szolgaltatasaink/szunyoghalok',
  },
  '/referenciak': {
    title: 'Referenciáink – Elvégzett Munkáink Tatabányán | Szépít-Lak Kft.',
    description: 'Tekintse meg legutóbbi ablakcsere, ajtóbeépítés és árnyékolástechnikai munkáinkat fotókkal és elégedett ügyfélvéleményekkel.',
    canonicalUrl: 'https://www.szepitlak.hu/referenciak',
  },
  '/kapcsolat': {
    title: 'Kapcsolat – Kérjen Ingyenes Ajánlatot | Szépít-Lak Kft.',
    description: 'Lépjen kapcsolatba velünk! Ingyenes helyszíni felmérés és árajánlatadás Tatabányán és környékén. Elérhetőségek és nyitvatartás.',
    canonicalUrl: 'https://www.szepitlak.hu/kapcsolat',
  },
  '/adatkezelesi-tajekoztato': {
    title: 'Adatkezelési Tájékoztató | Szépít-Lak Kft.',
    description: 'A Szépít-Lak Kft. adatkezelési tájékoztatója és GDPR adatvédelmi szabályzata.',
    canonicalUrl: 'https://www.szepitlak.hu/adatkezelesi-tajekoztato',
  },
  '/cookie-tajekoztato': {
    title: 'Cookie (Süti) Tájékoztató | Szépít-Lak Kft.',
    description: 'Információk a Szépít-Lak Kft. weboldalán használt sütikről (cookie-król) és azok kezeléséről.',
    canonicalUrl: 'https://www.szepitlak.hu/cookie-tajekoztato',
  },
  '/impresszum': {
    title: 'Impresszum | Szépít-Lak Kft.',
    description: 'Céginformációk, üzemeltető adatai és jogi tudnivalók - Szépít-Lak Kft.',
    canonicalUrl: 'https://www.szepitlak.hu/impresszum',
  },
};

async function prerender() {
  console.log('🚀 Starting SSG Prerendering process...');

  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found! Run "vite build" first.');
  }

  if (!fs.existsSync(serverBundlePath)) {
    throw new Error('dist/server/entry-server.js not found! Run "vite build --ssr" first.');
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');
  const { render } = await import(pathToFileURL(serverBundlePath).href);

  const routes = Object.keys(routesSeoData);

  for (const url of routes) {
    console.log(`  - Prerendering: ${url}`);

    const seo = routesSeoData[url];
    const appHtml = render(url);

    let html = templateHtml;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/s, `<title>${seo.title}</title>`);

    // Replace Meta Description
    if (html.includes('name="description"')) {
      html = html.replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
        `<meta name="description" content="${seo.description}" />`
      );
    } else {
      html = html.replace(
        '</head>',
        `  <meta name="description" content="${seo.description}" />\n</head>`
      );
    }

    // Inject Canonical URL
    const canonicalTag = `<link rel="canonical" href="${seo.canonicalUrl}" />`;
    if (html.includes('rel="canonical"')) {
      html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s, canonicalTag);
    } else {
      html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
    }

    // Replace or Inject Open Graph Tags
    const ogTags = `
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:url" content="${seo.canonicalUrl}" />`;

    if (html.includes('property="og:title"')) {
      html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s, `<meta property="og:title" content="${seo.title}" />`);
    }
    if (html.includes('property="og:description"')) {
      html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s, `<meta property="og:description" content="${seo.description}" />`);
    }
    if (html.includes('property="og:url"')) {
      html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/s, `<meta property="og:url" content="${seo.canonicalUrl}" />`);
    } else {
      html = html.replace('</head>', `${ogTags}\n</head>`);
    }

    // Replace Root DIV with prerendered app HTML
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Determine target output filepath
    let filePath;
    if (url === '/') {
      filePath = path.resolve(distDir, 'index.html');
    } else {
      const routePath = url.startsWith('/') ? url.slice(1) : url;
      const targetDir = path.resolve(distDir, routePath);
      fs.mkdirSync(targetDir, { recursive: true });
      filePath = path.resolve(targetDir, 'index.html');
    }

    fs.writeFileSync(filePath, html, 'utf8');
  }

  // Remove temporary server bundle folder
  fs.rmSync(path.resolve(distDir, 'server'), { recursive: true, force: true });
  console.log('✅ SSG Prerendering completed successfully!');
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
