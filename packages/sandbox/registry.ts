import type { Registry } from '@repo/shadcn-ui';

export const ui: Registry = [
  {
    name: 'sandbox',
    type: 'registry:component',
    registryDependencies: [],
    dependencies: [],
    devDependencies: [],
    files: [
      {
        path: 'index.tsx',
        type: 'registry:component',
      },
    ],
  },
];
