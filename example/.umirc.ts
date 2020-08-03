import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: '../dist',
  publicPath: '/html2sketch/',
  base: '/html2sketch',
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/canvas', component: '@/pages/Canvas' },
  ],
});
