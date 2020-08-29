import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  title: 'html2sketch 测试用例集',
  mode: 'doc',
  hash: true,
  resolve: { includes: ['e2e/docs'] },
  outputPath: 'e2e/dist',
  exportStatic: {
    htmlSuffix: process.env.NODE_ENV === 'production',
    dynamicRoot: true,
  },
  alias: {
    '@test-utils': resolve(__dirname, '../e2e/utils'),
  },
});
