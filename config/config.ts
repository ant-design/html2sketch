import { defineConfig } from 'umi';

export default defineConfig({
  title: 'html2sketch',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  mode: 'site',
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
      path: 'https://github.com/arvinxx/html2sketch',
    },
  ],
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
  hash: true,
});
