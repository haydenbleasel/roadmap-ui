import type { HomeLayoutProps } from 'fumadocs-ui/home-layout';
import { Logo } from './components/logo';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: HomeLayoutProps = {
  nav: {
    title: <Logo />,
    enableSearch: true,
  },
  links: [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Docs',
      url: '/docs',
    },
  ],
};
