import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  antd: {},
  dva: {
    immer: true,
    hmr: true,
  },
});
