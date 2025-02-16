import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./conf/*'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'es2020',
  minify: true,
});