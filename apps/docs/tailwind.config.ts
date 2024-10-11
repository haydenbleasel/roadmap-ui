import config from '@repo/tailwind-config';
import { createPreset } from 'fumadocs-ui/tailwind-plugin';

const preset = createPreset();

export default {
  ...config,
  content: [...config.content, './node_modules/fumadocs-ui/dist/**/*.js'],
  plugins: [...config.plugins, preset],
};
