import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LegalPage.module.css';

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, children }) => (
  <>
    <section className={styles.hero}>
      <div className="container">
        <Link to="/" className={styles.back}>← Vissza a főoldalra</Link>
        <h1 className={styles.h1}>{title}</h1>
      </div>
    </section>
    <section className={`section ${styles.content}`}>
      <div className={`container ${styles.inner}`}>
        {children}
      </div>
    </section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   ADATKEZELÉSI TÁJÉKOZTATÓ
   GDPR (2016/679/EU) + Infotv. (2011. évi CXII. tv.) kompatibilis
   ═══════════════════════════════════════════════════════════════ */
export const AdatkezelesiPage: React.FC = () => {
  React.useEffect(() => { document.title = 'Adatkezelési tájékoztató – Szépít-Lak Kft.'; }, []);
  return (
    <LegalPage title="Adatkezelési tájékoztató">
      <div className={styles.legal}>
        <p className={styles.lastUpdated}>Utolsó módosítás: 2025. július 25.</p>

        {/* 1. Adatkezelő */}
        <h2>1. Az adatkezelő adatai</h2>
        <table className={styles.table}>
          <tbody>
            <tr><th>Cégnév</th><td>SZÉPÍT-LAK Korlátolt Felelősségű Társaság</td></tr>
            <tr><th>Rövidített cégnév</th><td>SZÉPÍT-LAK Kft.</td></tr>
            <tr><th>Székhely</th><td>2800 Tatabánya, Szőlődomb utca 22.</td></tr>
            <tr><th>Cégjegyzékszám</th><td>11-09-032144</td></tr>
            <tr><th>Adószám</th><td>33047029-2-11</td></tr>
            <tr><th>Képviselő</th><td>Szép Márk, ügyvezető</td></tr>
            <tr><th>E-mail</th><td>szepitlakinfo@gmail.com</td></tr>
            <tr><th>Telefon</th><td>+36 30 210 2581</td></tr>
            <tr><th>Weboldal</th><td>szepitlak.hu</td></tr>
          </tbody>
        </table>

        <p>
          A SZÉPÍT-LAK Kft. (a továbbiakban: <strong>Adatkezelő</strong>) kiemelt figyelmet fordít arra, hogy
          adatkezelése során az Európai Parlament és a Tanács (EU) 2016/679 rendeletének
          (<strong>GDPR</strong>) és az információs önrendelkezési jogról és az információszabadságról
          szóló 2011. évi CXII. törvénynek (<strong>Infotv.</strong>) megfelelően járjon el.
        </p>

        {/* 2. Tájékoztató hatálya */}
        <h2>2. A tájékoztató hatálya</h2>
        <p>
          Jelen adatkezelési tájékoztató a szepitlak.hu weboldalon (a továbbiakban: <strong>Weboldal</strong>)
          keresztül végzett személyes adatkezelésre terjed ki. A tájékoztató célja, hogy az érintettek
          (látogatók, ajánlatkérők) számára egyértelmű és átlátható információt nyújtson a személyes
          adataik kezelésének módjáról, céljáról, jogalapjáról, időtartamáról és az érintetti jogokról.
        </p>

        {/* 3. Értelmező fogalmak */}
        <h2>3. Fogalommeghatározások</h2>
        <ul>
          <li><strong>Személyes adat:</strong> az azonosított vagy azonosítható természetes személyre vonatkozó bármely információ (pl. név, e-mail cím, telefonszám).</li>
          <li><strong>Adatkezelés:</strong> a személyes adatokon végzett bármely művelet (pl. gyűjtés, rögzítés, tárolás, felhasználás, törlés).</li>
          <li><strong>Adatkezelő:</strong> aki az adatkezelés célját és eszközeit meghatározza – jelen esetben a SZÉPÍT-LAK Kft.</li>
          <li><strong>Adatfeldolgozó:</strong> aki az adatkezelő nevében személyes adatokat kezel (pl. tárhelyszolgáltató, levelezőrendszer).</li>
          <li><strong>Érintett:</strong> az a természetes személy, akinek személyes adatait kezelik.</li>
        </ul>

        {/* 4. Adatkezelési tevékenységek */}
        <h2>4. Adatkezelési tevékenységek</h2>

        <h3>4.1. Ajánlatkérő és kapcsolatfelvételi űrlap</h3>
        <table className={styles.table}>
          <tbody>
            <tr><th>Kezelt adatok</th><td>Név, e-mail cím, telefonszám (opcionális), település (opcionális), érdeklődési terület, üzenet szövege</td></tr>
            <tr><th>Az adatkezelés célja</th><td>Az érintett megkeresésének megválaszolása, személyre szabott ajánlat készítése, kapcsolattartás</td></tr>
            <tr><th>Jogalap</th><td>GDPR 6. cikk (1) bekezdés b) pont – az érintett kérésére történő, szerződéskötést megelőző lépések megtétele</td></tr>
            <tr><th>Megőrzési idő</th><td>Az ajánlat megadásától számított 1 év, megrendelés esetén a Számviteli törvény (2000. évi C. tv.) szerinti 8 év</td></tr>
            <tr><th>Adatszolgáltatás jellege</th><td>Önkéntes – az ajánlatkéréshez a név és az e-mail cím megadása szükséges</td></tr>
          </tbody>
        </table>

        <h3>4.2. Visszahívás kérése</h3>
        <table className={styles.table}>
          <tbody>
            <tr><th>Kezelt adatok</th><td>Név, telefonszám</td></tr>
            <tr><th>Az adatkezelés célja</th><td>Az érintett visszahívási kérésének teljesítése</td></tr>
            <tr><th>Jogalap</th><td>GDPR 6. cikk (1) bekezdés b) pont – szerződéskötést megelőző lépések</td></tr>
            <tr><th>Megőrzési idő</th><td>A visszahívás megtörténtétől számított 30 nap</td></tr>
          </tbody>
        </table>

        <h3>4.3. Weboldal működtetése (technikai adatok)</h3>
        <table className={styles.table}>
          <tbody>
            <tr><th>Kezelt adatok</th><td>IP-cím, böngésző típusa és verziója, operációs rendszer, hivatkozó URL, látogatás időpontja</td></tr>
            <tr><th>Az adatkezelés célja</th><td>A Weboldal technikai működésének biztosítása, hibaelhárítás, biztonsági védelem (spam és bot elleni védekezés)</td></tr>
            <tr><th>Jogalap</th><td>GDPR 6. cikk (1) bekezdés f) pont – az Adatkezelő jogos érdeke a Weboldal biztonságos üzemeltetése</td></tr>
            <tr><th>Megőrzési idő</th><td>Legfeljebb 90 nap</td></tr>
          </tbody>
        </table>

        <h3>4.4. Webanalitika és hirdetések (Google Analytics, Google Ads)</h3>
        <table className={styles.table}>
          <tbody>
            <tr><th>Kezelt adatok</th><td>Anonimizált IP-cím, cookie-azonosítók, oldalmegtekintések, munkamenet-adatok, eszközinformációk, konverziós események (pl. ajánlatkérés elküldése)</td></tr>
            <tr><th>Az adatkezelés célja</th><td>A Weboldal látogatottságának mérése, felhasználói viselkedés elemzése, hirdetési kampányok hatékonyságának mérése, remarketing</td></tr>
            <tr><th>Jogalap</th><td>GDPR 6. cikk (1) bekezdés a) pont – az érintett önkéntes hozzájárulása (cookie consent banner)</td></tr>
            <tr><th>Megőrzési idő</th><td>Google Analytics: legfeljebb 14 hónap; Google Ads cookie-k: legfeljebb 540 nap</td></tr>
            <tr><th>Adatszolgáltatás jellege</th><td>Önkéntes – az analitikai és marketing sütik csak az érintett hozzájárulásával aktiválódnak</td></tr>
          </tbody>
        </table>

        {/* 5. Adatfeldolgozók */}
        <h2>5. Adatfeldolgozók</h2>
        <p>
          Az Adatkezelő a Weboldal működtetéséhez és a szolgáltatásnyújtáshoz az alábbi
          adatfeldolgozókat veszi igénybe:
        </p>
        <table className={styles.table}>
          <tbody>
            <tr><th>Adatfeldolgozó</th><th>Tevékenység</th><th>Székhely</th></tr>
            <tr><td>Vercel Inc.</td><td>Weboldal tárhelyszolgáltatás és kiszolgálás</td><td>San Francisco, CA, USA</td></tr>
            <tr><td>Resend Technologies Inc.</td><td>E-mail küldési szolgáltatás (ajánlatkérő űrlapok továbbítása)</td><td>San Francisco, CA, USA</td></tr>
            <tr><td>Cloudflare Inc.</td><td>Spam és bot elleni védelem (Turnstile CAPTCHA szolgáltatás)</td><td>San Francisco, CA, USA</td></tr>
            <tr><td>Google Ireland Ltd.</td><td>Webanalitika (Google Analytics), hirdetéskiszolgálás (Google Ads), címkekezelés (Google Tag Manager)</td><td>Dublin, Írország</td></tr>
          </tbody>
        </table>
        <p>
          Az Egyesült Államokba történő adattovábbítás jogalapját az Európai Bizottság
          megfelelőségi határozata (EU–US Data Privacy Framework) vagy az adatfeldolgozók által
          alkalmazott standard szerződéses klauzulák (SCC-k) biztosítják.
        </p>

        {/* 6. Adatbiztonság */}
        <h2>6. Adatbiztonság</h2>
        <p>
          Az Adatkezelő gondoskodik arról, hogy a személyes adatok a megfelelő technikai és
          szervezési intézkedésekkel védve legyenek az illetéktelen hozzáféréstől, módosítástól,
          továbbítástól, nyilvánosságra hozataltól, törléstől vagy megsemmisüléstől. Ennek keretében:
        </p>
        <ul>
          <li>A Weboldal kizárólag HTTPS titkosított kapcsolaton keresztül érhető el.</li>
          <li>Az űrlapokon Cloudflare Turnstile biztonsági ellenőrzés védi a rendszert az automatizált visszaélésektől.</li>
          <li>A jelszavak és API-kulcsok titkosítva, a forráskódtól elkülönítve kerülnek tárolásra.</li>
        </ul>

        {/* 7. Érintetti jogok */}
        <h2>7. Az érintett jogai</h2>
        <p>Az érintett a GDPR alapján az alábbi jogokkal élhet:</p>
        <ul>
          <li><strong>Tájékoztatáshoz való jog (GDPR 13–14. cikk):</strong> Az érintett jogosult arra, hogy az adatkezelésről átlátható tájékoztatást kapjon.</li>
          <li><strong>Hozzáférési jog (GDPR 15. cikk):</strong> Az érintett jogosult visszajelzést kapni arról, hogy személyes adatainak kezelése folyamatban van-e, és ha igen, a személyes adatokhoz és az adatkezelés részleteihez hozzáférést kapjon.</li>
          <li><strong>Helyesbítéshez való jog (GDPR 16. cikk):</strong> Az érintett kérheti pontatlan személyes adatainak haladéktalan helyesbítését.</li>
          <li><strong>Törléshez való jog / „Elfeledtetéshez" való jog (GDPR 17. cikk):</strong> Az érintett kérheti személyes adatainak indokolatlan késedelem nélküli törlését, ha az adatkezelés célja megszűnt, vagy ha hozzájárulását visszavonja.</li>
          <li><strong>Az adatkezelés korlátozásához való jog (GDPR 18. cikk):</strong> Az érintett kérheti az adatkezelés korlátozását meghatározott feltételek teljesülése esetén.</li>
          <li><strong>Adathordozhatósághoz való jog (GDPR 20. cikk):</strong> Az érintett jogosult arra, hogy az általa megadott személyes adatokat tagolt, géppel olvasható formátumban megkapja.</li>
          <li><strong>Tiltakozáshoz való jog (GDPR 21. cikk):</strong> Az érintett tiltakozhat személyes adatainak jogos érdeken alapuló kezelése ellen.</li>
        </ul>
        <p>
          Az érintetti jogok gyakorlásával kapcsolatos kérelmeket az Adatkezelő a{' '}
          <strong>szepitlakinfo@gmail.com</strong> e-mail címen fogadja, és azokat legkésőbb
          a kérelem beérkezésétől számított <strong>30 napon belül</strong> megválaszolja.
        </p>

        {/* 8. Jogorvoslat */}
        <h2>8. Jogorvoslati lehetőségek</h2>
        <p>
          Amennyiben az érintett úgy ítéli meg, hogy személyes adatainak kezelése sérti a GDPR
          vagy az Infotv. rendelkezéseit, az alábbi jogorvoslati lehetőségekkel élhet:
        </p>
        <h3>8.1. Panasz az adatkezelőnél</h3>
        <p>
          Az érintett bármikor fordulhat közvetlenül az Adatkezelőhöz a{' '}
          <strong>szepitlakinfo@gmail.com</strong> e-mail címen.
        </p>
        <h3>8.2. Panasz a felügyeleti hatóságnál</h3>
        <table className={styles.table}>
          <tbody>
            <tr><th>Hatóság neve</th><td>Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)</td></tr>
            <tr><th>Székhely</th><td>1055 Budapest, Falk Miksa utca 9-11.</td></tr>
            <tr><th>Levelezési cím</th><td>1363 Budapest, Pf. 9.</td></tr>
            <tr><th>Telefon</th><td>+36 (1) 391-1400</td></tr>
            <tr><th>E-mail</th><td>ugyfelszolgalat@naih.hu</td></tr>
            <tr><th>Weboldal</th><td>https://naih.hu</td></tr>
          </tbody>
        </table>
        <h3>8.3. Bírósági jogorvoslat</h3>
        <p>
          Az érintett – választása szerint – a lakóhelye vagy tartózkodási helye szerinti
          törvényszék előtt is érvényesítheti jogait.
        </p>

        {/* 9. Módosítás */}
        <h2>9. A tájékoztató módosítása</h2>
        <p>
          Az Adatkezelő fenntartja a jogot, hogy jelen tájékoztatót egyoldalúan módosítsa.
          A módosításról az érintetteket a Weboldalon közzétett frissített tájékoztató útján
          értesíti. A tájékoztató módosítása a közzététellel lép hatályba.
        </p>
      </div>
    </LegalPage>
  );
};

/* ═══════════════════════════════════════════════════════════════
   COOKIE (SÜTI) TÁJÉKOZTATÓ
   ═══════════════════════════════════════════════════════════════ */
export const CookiePage: React.FC = () => {
  React.useEffect(() => { document.title = 'Cookie (süti) tájékoztató – Szépít-Lak Kft.'; }, []);
  return (
    <LegalPage title="Cookie (süti) tájékoztató">
      <div className={styles.legal}>
        <p className={styles.lastUpdated}>Utolsó módosítás: 2025. július 25.</p>

        <h2>1. Mi az a cookie (süti)?</h2>
        <p>
          A cookie-k (sütik) kis méretű szöveges fájlok, amelyeket a böngésző ment el az
          Ön eszközére a Weboldal látogatásakor. A cookie-k célja, hogy a Weboldal megfelelően
          működjön, és hogy az Adatkezelő javíthassa a felhasználói élményt.
        </p>

        <h2>2. Milyen sütiket használunk?</h2>
        <h3>2.1. Feltétlenül szükséges (technikai) sütik</h3>
        <p>
          Ezek a sütik a Weboldal alapvető működéséhez szükségesek (pl. biztonsági ellenőrzés,
          munkamenet-kezelés). Jogalap: GDPR 6. cikk (1) f) pont – jogos érdek. Ezek a sütik
          nem gyűjtenek személyes adatokat marketing célokra, és nem kapcsolhatók ki.
        </p>
        <table className={styles.table}>
          <tbody>
            <tr><th>Süti neve</th><th>Cél</th><th>Lejárat</th></tr>
            <tr><td>cf_clearance</td><td>Cloudflare Turnstile biztonsági ellenőrzés – spam és bot elleni védelem</td><td>Munkamenet / 30 perc</td></tr>
          </tbody>
        </table>

        <h3>2.2. Analitikai sütik (hozzájáruláshoz kötött)</h3>
        <p>
          Ezek a sütik a Google Analytics szolgáltatáson keresztül segítenek megérteni,
          hogyan használják a látogatók a Weboldalt. Csak az Ön kifejezett hozzájárulásával
          aktiválódnak. Jogalap: GDPR 6. cikk (1) a) pont – hozzájárulás.
        </p>
        <table className={styles.table}>
          <tbody>
            <tr><th>Süti neve</th><th>Cél</th><th>Lejárat</th></tr>
            <tr><td>_ga</td><td>Egyedi azonosító a látogatók megkülönböztetésére</td><td>2 év</td></tr>
            <tr><td>_ga_*</td><td>Munkamenet-állapot tárolása</td><td>2 év</td></tr>
            <tr><td>_gid</td><td>Egyedi azonosító a látogatók megkülönböztetésére (24 órás)</td><td>24 óra</td></tr>
            <tr><td>_gat</td><td>Kérésszám-korlátozás</td><td>1 perc</td></tr>
          </tbody>
        </table>

        <h3>2.3. Marketing sütik (hozzájáruláshoz kötött)</h3>
        <p>
          Ezek a sütik a Google Ads hirdetési rendszerhez kapcsolódnak, és a hirdetési kampányok
          hatékonyságának méréséhez, valamint remarketing célokra szolgálnak. Csak az Ön
          kifejezett hozzájárulásával aktiválódnak. Jogalap: GDPR 6. cikk (1) a) pont – hozzájárulás.
        </p>
        <table className={styles.table}>
          <tbody>
            <tr><th>Süti neve</th><th>Cél</th><th>Lejárat</th></tr>
            <tr><td>_gcl_au</td><td>Google Ads konverziókövetés</td><td>90 nap</td></tr>
            <tr><td>_gcl_aw</td><td>Google Ads kattintásazonosító</td><td>90 nap</td></tr>
            <tr><td>IDE / DSID</td><td>DoubleClick hirdetéskiszolgálás</td><td>1 év / munkamenet</td></tr>
          </tbody>
        </table>

        <h3>2.4. Google Tag Manager</h3>
        <p>
          A Google Tag Manager (GTM-N3F2F3HF) önmagában nem helyez el sütiket és nem gyűjt
          személyes adatokat. A GTM egy címkekezelő rendszer, amelyen keresztül a fenti analitikai
          és marketing szolgáltatások működnek. A GTM a Google Consent Mode v2 technológiát
          használja, így az analitikai és marketing címkék csak a felhasználó hozzájárulása
          után aktiválódnak.
        </p>

        <h2>3. Hogyan kezelheti a sütiket?</h2>
        <p>
          A legtöbb böngésző lehetőséget biztosít a sütik kezelésére a böngésző beállításain
          keresztül. Az alábbi linkeken tájékozódhat a legnépszerűbb böngészők sütibeállításairól:
        </p>
        <ul>
          <li><strong>Google Chrome:</strong> Beállítások → Adatvédelem és biztonság → Cookie-k</li>
          <li><strong>Mozilla Firefox:</strong> Beállítások → Adatvédelem és biztonság</li>
          <li><strong>Microsoft Edge:</strong> Beállítások → Cookie-k és webhelyadatok</li>
          <li><strong>Safari:</strong> Beállítások → Adatvédelem</li>
        </ul>
        <p>
          Felhívjuk figyelmét, hogy a feltétlenül szükséges sütik letiltása esetén a Weboldal
          egyes funkciói nem működnek megfelelően.
        </p>

        <h2>4. Kapcsolat</h2>
        <p>
          A sütikkel kapcsolatos kérdéseivel forduljon az Adatkezelőhöz:{' '}
          <strong>szepitlakinfo@gmail.com</strong>
        </p>
      </div>
    </LegalPage>
  );
};

/* ═══════════════════════════════════════════════════════════════
   IMPRESSZUM
   ═══════════════════════════════════════════════════════════════ */
export const ImpresszumPage: React.FC = () => {
  React.useEffect(() => { document.title = 'Impresszum – Szépít-Lak Kft.'; }, []);
  return (
    <LegalPage title="Impresszum">
      <div className={styles.legal}>
        <p className={styles.lastUpdated}>Utolsó módosítás: 2025. július 25.</p>

        <h2>A szolgáltató adatai</h2>
        <table className={styles.table}>
          <tbody>
            <tr><th>Cégnév</th><td>SZÉPÍT-LAK Korlátolt Felelősségű Társaság</td></tr>
            <tr><th>Rövidített cégnév</th><td>SZÉPÍT-LAK Kft.</td></tr>
            <tr><th>Székhely</th><td>2800 Tatabánya, Szőlődomb utca 22.</td></tr>
            <tr><th>Cégjegyzékszám</th><td>11-09-032144</td></tr>
            <tr><th>Adószám</th><td>33047029-2-11</td></tr>
            <tr><th>Képviselő</th><td>Szép Márk, ügyvezető</td></tr>
            <tr><th>E-mail</th><td>szepitlakinfo@gmail.com</td></tr>
            <tr><th>Telefon</th><td>+36 30 210 2581</td></tr>
          </tbody>
        </table>

        <h2>Tárhelyszolgáltató</h2>
        <table className={styles.table}>
          <tbody>
            <tr><th>Név</th><td>Vercel Inc.</td></tr>
            <tr><th>Székhely</th><td>440 N Barranca Ave #4133, Covina, CA 91723, USA</td></tr>
            <tr><th>Weboldal</th><td>https://vercel.com</td></tr>
          </tbody>
        </table>

        <h2>Szerzői jogok</h2>
        <p>
          A Weboldal tartalma (szövegek, fotók, grafikai elemek, arculat) szerzői jogi
          védelem alatt áll. A tartalom bármely részének felhasználása kizárólag
          az Adatkezelő előzetes írásbeli engedélyével lehetséges.
        </p>

        <h2>Felelősség</h2>
        <p>
          Az Adatkezelő törekszik arra, hogy a Weboldalon közzétett információk pontosak
          és naprakészek legyenek, azonban az esetleges pontatlanságokért vagy az információk
          felhasználásából eredő károkért felelősséget nem vállal.
        </p>
      </div>
    </LegalPage>
  );
};
