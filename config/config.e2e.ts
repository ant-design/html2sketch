import { defineConfig } from 'umi';

export default defineConfig({
  title: 'html2sketch 测试用例集',
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
  mode: 'doc',
  hash: true,
  resolve: { includes: ['tests/docs'] },
  outputPath: 'tests/dist',
  exportStatic: {
    htmlSuffix: process.env.NODE_ENV === 'production',
    dynamicRoot: true,
  },
});
