/**
 * @author lvlw on 17-6-9.
 * @description a key-value Input component
 */
import React from 'react';
import { Row, Col, Input } from 'antd';

export default class MapInput extends React.Component {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      key: value.key || '',
      value: value.value || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({
        key: value.key || '',
        value: value.value || '',
      });
    }
  }
  handleKeyChange = (e) => {
    const key = e.target.value || '';
    if (!('key' in this.props)) {
      this.setState({ key });
    }
    this.triggerChange({ key });
  };
  handleValueChange = (e) => {
    const value = e.target.value || '';
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange({ value });
  };
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };
  render() {
    const state = this.state;
    return (
      <Row gutter={10}>
        <Col span={11}>
          <Input
            type="text"
            value={state.key}
            onChange={this.handleKeyChange}
            placeholder="key"
          />
        </Col>
        <Col span={1} style={{ textAlign: 'center' }}>
          <span>:</span>
        </Col>
        <Col span={11}>
          <Input
            type="text"
            value={state.value}
            onChange={this.handleValueChange}
            placeholder="value"
          />
        </Col>
      </Row>
    );
  }
}

