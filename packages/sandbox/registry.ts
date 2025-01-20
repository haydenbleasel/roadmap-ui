import type { Registry } from '@repo/shadcn-ui';

export const ui: Registry = [
  {
    name: 'sandbox',
    type: 'registry:component',
    registryDependencies: [],
    dependencies: ['@codesandbox/sandpack-react'],
    devDependencies: [],
    files: [
      {
        path: 'index.tsx',
        type: 'registry:component',
      },
    ],
  },
];
