import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';

class CodeEditor extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      defaultValue: this.props.defaultValue,
    };
  }
  componentDidMount() {
    const { width, height, onContextMenu, onMouseDown, onFocus } = this.props;
    const editor = this.codeMirror.editor;
    editor.setSize(width, height);
    if (onContextMenu) {
      editor.on('contextmenu', (a, e) => {
        onContextMenu(a, e);
      });
    }
    if (onMouseDown) {
      editor.on('mousedown', (a, e) => {
        onMouseDown(a, e);
      });
    }
    if (onFocus) {
      editor.on('focus', (a, e) => {
        onFocus(a, e);
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    // width and height can be either numbers (interpreted as pixels)
    // or CSS units ("100%", for example).
    // You can pass null for either of them to indicate
    // that that dimension should not be changed.
    const { width, height } = nextProps;
    this.codeMirror.editor.setSize(width, height);
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
    if ('defaultValue' in nextProps) {
      this.setState({
        defaultValue: nextProps.defaultValue,
      });
    }
  }
  handleChange = (editor, data, value) => {
    this.setState({
      value,
    });
    this.triggerChange(value);
  };
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };
  render() {
    return (
      <div style={{ border: '1px solid #ccc', lineHeight: '16px' }}>
        <CodeMirror
          options={this.props.options}
          ref={(ref) => { this.codeMirror = ref; }}
          value={this.state.value}
          onBeforeChange={this.handleChange}
        />
      </div>
    );
  }
}

export default CodeEditor;
