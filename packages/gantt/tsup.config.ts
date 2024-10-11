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
});
