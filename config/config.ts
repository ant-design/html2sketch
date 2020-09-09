import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  title: 'html2sketch',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  mode: 'site',
  // 部署在非根目录时, base 和 publicPath 都需要配置
  base: '/html2sketch/',
  publicPath: '/html2sketch/',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/ant-design/html2sketch',
    },
  ],
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
  alias: {
    '@e2e-utils': resolve(__dirname, '../docs/__utils__'),
  },
  hash: true,
});
