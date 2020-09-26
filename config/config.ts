import { defineConfig } from 'umi';
import { resolve } from 'path';
const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.PREVIEW !== '1' && process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'html2sketch',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/nOX9AAwXfj/Logo.svg',
  mode: 'site',
  // 部署在非根目录时, base 和 publicPath 都需要配置
  base: isProdSite ? '/html2sketch/' : '/',
  publicPath: isProdSite ? '/html2sketch/' : '/',
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
