import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { NyilaszaroPage } from './pages/NyilaszaroPage';
import { ArnyekolokPage } from './pages/ArnyekolokPage';
import { BelteriAjtokPage } from './pages/BelteriAjtokPage';
import { SzunyoghalokPage } from './pages/SzunyoghalokPage';
import { KapcsolatPage } from './pages/KapcsolatPage';
import { AdatkezelesiPage, CookiePage, ImpresszumPage } from './pages/LegalPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'szolgaltatasaink', element: <ServicesPage /> },
      { path: 'szolgaltatasaink/nyilaszaro', element: <NyilaszaroPage /> },
      { path: 'szolgaltatasaink/arnyekolok', element: <ArnyekolokPage /> },
      { path: 'szolgaltatasaink/belteri-ajtok', element: <BelteriAjtokPage /> },
      { path: 'szolgaltatasaink/szunyoghalok', element: <SzunyoghalokPage /> },
      { path: 'kapcsolat', element: <KapcsolatPage /> },
      { path: 'adatkezelesi-tajekoztato', element: <AdatkezelesiPage /> },
      { path: 'cookie-tajekoztato', element: <CookiePage /> },
      { path: 'impresszum', element: <ImpresszumPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
