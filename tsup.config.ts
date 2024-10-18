import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  sourcemap: false,
  minify: true,
  dts: true,
  format: ['cjs', 'esm'],
  loader: {
    '.ts': 'tsx',
  },
  external: ['@repo/shadcn-ui', 'react'],
  noExternal: ['@repo/types'],
});
