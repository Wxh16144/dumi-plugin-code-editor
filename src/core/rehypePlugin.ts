import { unistUtilVisit } from 'dumi';
import path from 'path';

export const COMPONENT_NAME = 'SourceCodeEditor';

export interface RehypePluginProps {
  cwd?: string;
}

function rehypePlugin(opt: RehypePluginProps = {}) {
  const { cwd = process.cwd() } = opt;

  return (tree: any, vFile: any) => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self: any = this;

    let uniqueId = 0;

    unistUtilVisit.visit(tree, 'element', (node, i, parent) => {
      if (node.tagName === 'SourceCode') {
        const { lang, highlightLines } = node.properties!;

        const currentFileAbsPath = (function () {
          if (_self.data?.('fileAbsPath')) return _self.data('fileAbsPath');

          const __fm_path = vFile?.data?.frontmatter?.filename;

          return path.join(cwd, __fm_path || '');
        })();

        const uri = `${currentFileAbsPath}#${uniqueId++}`;

        const code = (node.children[0] as any).value as string;

        parent!.children.splice(i!, 1, {
          type: 'element',
          tagName: COMPONENT_NAME,
          properties: {
            language: lang,
            path: uri,
            highlightLines,
          },
          children: [
            {
              type: 'text',
              value: code,
            },
          ],
        });
      }
    });
  };
}

export default rehypePlugin;
