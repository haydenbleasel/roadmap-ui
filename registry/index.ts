import type { Registry } from 'shadcn-ui/apps/www/registry/schema';

/*
 * As shadcn/ui custom registry components are undocumented, here are some notes:
 *
 * - `registryDependencies` is an array of shadcn/ui component names that this component depends on.
 * - `dependencies` is an array of npm package names that this component depends on.
 * - `devDependencies` is an array of npm package names that this component depends on.
 */

export const ui: Registry = [
  {
    name: 'calendar',
    type: 'registry:component',
    registryDependencies: ['button'],
    dependencies: ['date-fns', 'lucide-react', 'zustand'],
    devDependencies: [],
    files: [
      {
        path: 'roadmap-ui/calendar.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'gantt',
    type: 'registry:component',
    registryDependencies: ['card', 'context-menu'],
    dependencies: [
      '@dnd-kit/core',
      '@dnd-kit/modifiers',
      '@uidotdev/usehooks',
      'date-fns',
      'lodash.throttle',
      'lucide-react',
      'zustand',
    ],
    devDependencies: ['@types/lodash.throttle'],
    files: [
      {
        path: 'roadmap-ui/gantt.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'kanban',
    type: 'registry:component',
    registryDependencies: [],
    dependencies: ['@dnd-kit/core'],
    devDependencies: [],
    files: [
      {
        path: 'roadmap-ui/kanban.tsx',
        type: 'registry:component',
      },
    ],
  },
  {
    name: 'list',
    type: 'registry:component',
    registryDependencies: [],
    dependencies: ['@dnd-kit/core', '@dnd-kit/modifiers', 'lucide-react'],
    devDependencies: [],
    files: [
      {
        path: 'roadmap-ui/list.tsx',
        type: 'registry:component',
      },
    ],
  },
];
