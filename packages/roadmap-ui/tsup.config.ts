import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.tsx'],
  sourcemap: false,
  minify: true,
  dts: true,
  format: ['cjs', 'esm'],
  loader: {
    '.ts': 'tsx',
  },
  noExternal: ['@repo/gantt', '@repo/types', '@repo/shadcn-ui'],
});
