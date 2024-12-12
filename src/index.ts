import type { IApi } from 'dumi';
import path from 'path';
import { name as pluginName } from '../package.json';
import { COMPONENT_NAME, rehypePlugin } from './core';

const COMPONENT_PATH = path.join(__dirname, '../es/component/index.js');

export default (api: IApi) => {
  api.describe({
    key: 'dumi-third-party:code-editor',
    enableBy: api.EnableBy.register,
  });

  api.register({
    key: 'modifyConfig',
    stage: Infinity,
    fn: (memo: IApi['config']) => {
      Object.assign(memo.alias ?? {}, {
        [`${pluginName}/component`]: COMPONENT_PATH,
      });

      const cloneExtraRemarkPlugins = memo.extraRemarkPlugins,
        cloneExtraRehypePlugins = memo.extraRehypePlugins;

      memo.extraRemarkPlugins = [
        ...(Array.isArray(cloneExtraRemarkPlugins)
          ? cloneExtraRemarkPlugins
          : ([cloneExtraRemarkPlugins].filter(Boolean) as any)),
      ];

      memo.extraRehypePlugins = [
        [
          rehypePlugin,
          {
            cwd: api.cwd,
          },
        ],
        ...(Array.isArray(cloneExtraRehypePlugins)
          ? cloneExtraRehypePlugins
          : ([cloneExtraRehypePlugins].filter(Boolean) as any)),
      ];

      return memo;
    },
  });

  api.register({
    key: 'modifyTheme',
    stage: Infinity,
    fn: (memo: IApi['config']) => {
      memo.builtins = Object.assign(
        {
          [COMPONENT_NAME]: {
            specifier: COMPONENT_NAME,
            source: COMPONENT_PATH,
          },
        },
        memo.builtins,
      );

      return memo;
    },
  });
};
