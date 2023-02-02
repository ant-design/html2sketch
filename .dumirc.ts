import { defineConfig } from 'dumi';
import { resolve } from 'path';

import { nav, sidebar } from './config/routes';

const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.PREVIEW !== '1' && process.env.NODE_ENV === 'production';

export default defineConfig({
  themeConfig: {
    name: 'html2sketch',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/8AsXJa8sgo/Logo.svg',
    nav,
    sidebar,
  },
  theme: {
    '@c-primary': '#ff9800',
  },
  outputPath: 'docs-dist',
  // 部署在非根目录时, base 和 publicPath 都需要配置
  base: isProdSite ? '/html2sketch/' : '/',
  publicPath: isProdSite ? '/html2sketch/' : '/',
  alias: {
    '@docs-utils': resolve(__dirname, './.dumi/theme/builtins/ToSketch'),
  },
  hash: true,
});
