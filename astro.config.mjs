import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // 'file' păstrează URL-urile existente: sport.html, promotii.html etc.
  build: { format: 'file' },
});
