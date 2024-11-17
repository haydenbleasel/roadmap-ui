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
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: ['date-fns', 'lucide-react', 'zustand'],
    devDependencies: [],
    files: [
      {
        path: 'ui/calendar/index.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/calendar/use-calendar.ts',
        type: 'registry:hook',
      },
    ],
  },
  {
    name: 'gantt',
    type: 'registry:ui',
    registryDependencies: [],
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
        path: 'ui/roadmap-ui/gantt.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'kanban',
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: ['@dnd-kit/core'],
    devDependencies: [],
    files: [
      {
        path: 'ui/roadmap-ui/gantt.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'list',
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: ['@dnd-kit/core', '@dnd-kit/modifiers', 'lucide-react'],
    devDependencies: [],
    files: [
      {
        path: 'ui/roadmap-ui/gantt.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'table',
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: ['@tanstack/react-table', 'lucide-react', 'zustand'],
    devDependencies: [],
    files: [
      {
        path: 'ui/roadmap-ui/gantt.tsx',
        type: 'registry:ui',
      },
    ],
  },
];
