import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    output: 'lib',
    transformer: 'babel',
  },
  esm: {
    output: 'es',
  },
  umd: {
    entry: 'src/index.ts',
    output: 'dist',
    name: 'html2sketch',
  },
});
