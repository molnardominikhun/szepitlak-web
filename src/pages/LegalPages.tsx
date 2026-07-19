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

export const AdatkezelesiPage: React.FC = () => {
  React.useEffect(() => { document.title = 'Adatkezelési tájékoztató – Szépít-Lak Kft.'; }, []);
  return (
    <LegalPage title="Adatkezelési tájékoztató">
      <div className={styles.placeholder}>
        <p className={styles.placeholderBadge}>🔧 Placeholder tartalom</p>
        <p>
          Az adatkezelési tájékoztató tartalma az élesítés előtt kerül
          véglegesítésre. A végleges szöveg tartalmazza majd az adatkezelő
          pontos adatait, az adatkezelés jogalapját, céljait, az érintetti
          jogokat és a kapcsolattartási lehetőségeket.
        </p>
        <p>
          Az adatkezelési tájékoztató a GDPR (2016/679/EU rendelet) és a
          vonatkozó magyar jogszabályok előírásai alapján kerül elkészítésre.
        </p>
        <p><strong>Kapcsolat:</strong> szepitlakinfo@gmail.com</p>
      </div>
    </LegalPage>
  );
};

export const CookiePage: React.FC = () => {
  React.useEffect(() => { document.title = 'Cookie-tájékoztató – Szépít-Lak Kft.'; }, []);
  return (
    <LegalPage title="Cookie-tájékoztató">
      <div className={styles.placeholder}>
        <p className={styles.placeholderBadge}>🔧 Placeholder tartalom</p>
        <p>
          A cookie-tájékoztató tartalma az élesítés előtt kerül
          véglegesítésre. Az első helyi verzió nem alkalmaz éles analitikai
          vagy marketing sütiket.
        </p>
        <p>
          Az élesítés során Consent Mode v2 kompatibilis cookie-kezelés és
          banner kerül bevezetésre.
        </p>
        <p><strong>Kapcsolat:</strong> szepitlakinfo@gmail.com</p>
      </div>
    </LegalPage>
  );
};

export const ImpresszumPage: React.FC = () => {
  React.useEffect(() => { document.title = 'Impresszum – Szépít-Lak Kft.'; }, []);
  return (
    <LegalPage title="Impresszum">
      <div className={styles.placeholder}>
        <p className={styles.placeholderBadge}>🔧 Placeholder tartalom</p>
        <table className={styles.table}>
          <tbody>
            <tr><th>Cégnév</th><td>Szépít-Lak Kft.</td></tr>
            <tr><th>Székhely</th><td>[KITÖLTENDŐ]</td></tr>
            <tr><th>Cégjegyzékszám</th><td>[KITÖLTENDŐ]</td></tr>
            <tr><th>Adószám</th><td>[KITÖLTENDŐ]</td></tr>
            <tr><th>Kapcsolattartó e-mail</th><td>szepitlakinfo@gmail.com</td></tr>
            <tr><th>Telefon</th><td>+36 30 210 2581</td></tr>
          </tbody>
        </table>
        <p className={styles.note}>
          A [KITÖLTENDŐ] mezők az élesítés előtt cégadatokkal pótlandók.
          Ne tekintse ezt végleges jogi tartalomnak.
        </p>
      </div>
    </LegalPage>
  );
};
