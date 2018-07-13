import React from 'react';
import CodeEditor from '../../../components/CodeEditor';

export default class CodeEditorPanel extends React.Component {
  render() {
    return (
      <div>
        <p>可以支持很多种语言/数据格式的高亮显示</p>
        <CodeEditor
          options={{ lineNumbers: true, mode: 'text/x-sql' }}
          height={500}
        />
      </div>
    );
  }
}
