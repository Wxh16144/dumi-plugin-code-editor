import { defineConfig } from 'dumi';
import { resolve } from 'path';
import { homepage, name } from '../package.json';

const isProd = process.env.NODE_ENV === 'production';
// 不是预览模式 同时是生产环境
const isProdSite = process.env.PREVIEW !== '1' && isProd;

export default defineConfig({
  plugins: [
    // https://github.com/Wxh16144/dumi-plugin-code-snippets
    'dumi-plugin-code-snippets',
    name
  ],

  themeConfig: {
    name: 'code-editor',
    socialLinks: {
      github: homepage,
    },
  },
  resolve: {
    codeBlockMode: 'passive',
  },
  outputPath: resolve(__dirname, '../.doc'),
  base: isProdSite ? `/${name}/` : '/',
  publicPath: isProdSite ? `/${name}/` : '/',
});
