import { defineConfig } from 'dumi';
import type { SiteThemeConfig } from 'dumi-theme-antd-style';
import { resolve } from 'path';

import { nav, sidebar } from './config/routes';

const themeConfig: SiteThemeConfig = {
  name: 'html2sketch',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/8AsXJa8sgo/Logo.svg',
  footer: 'Made with ❤️ by 蚂蚁集团 - AFX & 数字科技',
  github: 'https://github.com/ant-design/html2sketch',
};

const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.PREVIEW !== '1' && process.env.NODE_ENV === 'production';

export default defineConfig({
  themeConfig: {
    nav,
    sidebar,
    ...themeConfig,
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
