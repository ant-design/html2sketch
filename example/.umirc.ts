import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: '../dist',
  routes: [{ path: '/', component: '@/pages/index' }],
});
