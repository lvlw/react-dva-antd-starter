import React from 'react';
import { Icon, Input } from 'antd';
import styles from './index.less';

export default class PasswordInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isPassword: true,
      value: props.value || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || '',
      });
    }
  };
  handleChange = (e) => {
    const value = e.target.value || '';
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
  showPassword = () => {
    this.setState({
      isPassword: !this.state.isPassword,
    });
  };
  render() {
    return (
      <div className={styles.passwordInput}>
        <Input
          type={this.state.isPassword ? 'password' : 'text'}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div
          className={styles.iconArea}
          onClick={this.showPassword}
        >
          <Icon type={this.state.isPassword ? 'eye' : 'eye-o'} />
        </div>
      </div>
    );
  }
}

