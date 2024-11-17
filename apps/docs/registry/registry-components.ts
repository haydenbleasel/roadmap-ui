import type { Registry } from 'shadcn-ui/apps/www/registry/schema';

export const ui: Registry = [
  {
    name: 'gantt',
    type: 'registry:ui',

    // The shadcn/ui component dependencies
    registryDependencies: [],

    // The npm dependencies
    dependencies: [
      '@dnd-kit/core',
      '@dnd-kit/modifiers',
      '@uidotdev/usehooks',
      'date-fns',
      'lodash.throttle',
      'lucide-react',
      'zustand',
    ],

    // The npm dev dependencies
    devDependencies: ['@types/lodash.throttle'],

    files: [
      {
        path: 'ui/roadmap-ui/gantt.tsx',
        type: 'registry:ui',
      },
    ],
  },
];
