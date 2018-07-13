/**
 * @author lvlw
 * 一组 key value Input 表单组件
 * 数据格式： [{key:"",value:""},{key:"",value:""}]
 */
import React from 'react';
import { Icon, Button, Row } from 'antd';
import MapInput from '../MapInput';
import styles from './index.less';

export default class MapInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: props.value || [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        params: nextProps.value || [],
      });
    }
  }
  handleAddConfig = () => {
    const params = this.state.params;
    params.push({
      key: '',
      value: '',
    });
    this.setState({
      params,
    });
  };
  handleRemoveConfig = (index) => {
    const params = this.state.params;
    params.splice(index, 1);
    this.setState({
      params,
    });
    this.triggerChange(params);
  };
  handleConfigChange = (value, index) => {
    const params = this.state.params;
    const current = params[index];
    current.key = value.key;
    current.value = value.value;

    this.triggerChange(params);
  };
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };
  render() {
    const params = this.state.params;
    return (
      <div>
        <Row style={{ marginBottom: 8 }}>
          {
            params.map((item, index) => {
              return (
                <div className={styles.boxWrapper} key={index} style={{ marginBottom: 8 }}>
                  <MapInput
                    value={item}
                    onChange={(value) => {
                      this.handleConfigChange(value, index);
                    }}
                  />
                  <Icon
                    type="minus-circle-o"
                    className={`${styles.dynamicDeleteButton} ${styles.iconArea}`}
                    onClick={() => this.handleRemoveConfig(index)}
                  />
                </div>
              );
            })
          }
        </Row>
        <Row>
          <div className={styles.btnGroup}>
            <Button type="dashed" onClick={this.handleAddConfig}><Icon type="plus" />增加一组</Button>
          </div>
        </Row>
      </div>
    );
  }
}
