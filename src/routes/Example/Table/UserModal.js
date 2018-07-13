import React from 'react';
import { Modal, Form, Input, Select, Radio, Switch } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
};

@Form.create()
export default class UserModal extends React.Component {
  handleOk = () => {
    const { dispatch, currentUser, form: { validateFields, getFieldsValue } } = this.props;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...currentUser,
        ...getFieldsValue(),
      };
      data.status = data.status ? 1 : 0;
      dispatch({
        type: `user/${data.id ? 'updateUser' : 'addUser'}`,
        payload: {
          user: data,
          cb: this.handleCancel,
        },
      });
    });
  };
  handleCancel = () => {
    const { form: { resetFields }, onCancel } = this.props;
    onCancel();
    resetFields();
  };
  render() {
    const { loading, visible, currentUser, city, form: { getFieldDecorator } } = this.props;
    const modalProps = {
      title: currentUser.id ? '修改用户' : '新增用户',
      visible,
      // width: 780, //默认520
      onOk: this.handleOk,
      onCancel: this.handleCancel,
      wrapClassName: 'vertical-center-modal',
      confirmLoading: loading,
      maskClosable: false,
    };
    const ageRange = [];
    for (let i = 0; i < 200; i += 1) {
      ageRange.push(`${i}`);
    }
    return (
      <Modal {...modalProps}>
        <Form>
          <FormItem
            label="姓名"
            {...formItemLayout}
          >
            {getFieldDecorator('name', {
              initialValue: currentUser.name || '',
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="性别"
            {...formItemLayout}
          >
            {getFieldDecorator('sex', {
              initialValue: currentUser.sex || 1,
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                },
              ],
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="年龄"
            {...formItemLayout}
          >
            {getFieldDecorator('age', {
              initialValue: currentUser.age || 0,
              rules: [
                {
                  required: true,
                  message: '请选择年龄',
                },
              ],
            })(
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={
                  (input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  ageRange.map((item, index) => {
                    return <Option value={item} key={index}>{item}</Option>;
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            label="城市"
            {...formItemLayout}
          >
            {getFieldDecorator('city', {
              initialValue: currentUser.city || '',
              rules: [
                {
                  required: true,
                  message: '请选择城市',
                },
              ],
            })(
              <Select>
                <Option value="" key="-1">请选择</Option>
                {
                  city.map((item, index) => {
                    return <Option value={item.id} key={index}>{`${item.name} [${item.id}]`}</Option>;
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            label="邮箱"
            {...formItemLayout}
          >
            {getFieldDecorator('email', {
              initialValue: currentUser.email || '',
              rules: [
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="手机号"
            {...formItemLayout}
          >
            {getFieldDecorator('phone', {
              initialValue: currentUser.phone || '',
              rules: [
                {
                  pattern: new RegExp('^1[0-9]{10}$'),
                  message: '请输入正确的手机号',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="个人简介"
            {...formItemLayout}
          >
            {getFieldDecorator('profile', {
              initialValue: currentUser.profile || '',
              rules: [],
            })(
              <TextArea rows={4} />
            )}
          </FormItem>
          <FormItem
            label="状态"
            {...formItemLayout}
          >
            {getFieldDecorator('status', {
              valuePropName: 'checked',
              initialValue: currentUser.status === 1,
              rules: [],
            })(
              <Switch
                checkedChildren="启用"
                unCheckedChildren="禁用"
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
