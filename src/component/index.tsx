import * as React from 'react';
import * as monaco from 'monaco-editor';
import MonacoEditor, { loader, type EditorProps } from '@monaco-editor/react';
import { usePrefersColor } from 'dumi';

loader.config({ monaco });

export interface SourceCodeEditorProps extends
  Omit<EditorProps, 'value'> {
  children: string;
}

type AnyObject = Record<string, any>;

const extendsObject = <T extends AnyObject = AnyObject>(...list: T[]) => {
  const result: AnyObject = { ...list[0] };

  for (let i = 1; i < list.length; i++) {
    const obj = list[i];
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (val !== undefined) {
          result[key] = val;
        }
      });
    }
  }

  return result;
};

const SourceCodeEditor = (props: SourceCodeEditorProps) => {
  const {
    children: code,
    language,
    path,
    ...resetProps
  } = props;

  const [color] = usePrefersColor();

  const transformedLanguage = (function () {
    const _lang = String(language).toLowerCase();

    if (['js', 'jsx', 'map'].includes(_lang)) return 'javascript';
    if (['ts', 'tsx'].includes(_lang)) return 'typescript';
    if (_lang === 'md') return 'markdown';

    return _lang;
  }());

  const mergedOptions = extendsObject<Partial<Required<EditorProps>['options']>>(
    {
      readOnly: true,
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    },
    resetProps.options!,
  );

  return (
    <MonacoEditor
      height={280}
      theme={`vs-${color}`}
      path={path}
      {...resetProps}
      options={mergedOptions}
      language={transformedLanguage}
      value={code}
    />
  );
}

export default SourceCodeEditor;
