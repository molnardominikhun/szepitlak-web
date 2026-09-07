import { renderToString } from 'react-dom/server';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

export function render(url: string): string {
  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });
  return renderToString(<RouterProvider router={router} />);
}
