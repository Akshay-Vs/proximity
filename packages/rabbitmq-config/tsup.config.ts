import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./conf/**/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'esnext',
  minify: true,
  outExtension({ format }) {
    return format === 'esm' ? { js: '.mjs' } : { js: '.cjs' };
  },
});
