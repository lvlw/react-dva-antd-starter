import React from 'react';
import { Form, Row, Col, Card } from 'antd';
import MapInput from '../../../components/MapInput';
import MapInputs from '../../../components/MapInputs';
import PasswordInput from '../../../components/PasswordInput';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
export default class CustomizedForm extends React.Component {
  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Row>
        <Col span={8}>
          <Card title="卡片包围的表单">
            <Form>
              <FormItem
                label="参数"
                {...formItemLayout}
              >
                {getFieldDecorator('param', {
                  initialValue: {},
                  rules: [
                    {
                      required: true,
                      message: '请输入参数',
                    },
                  ],
                })(
                  <MapInput />
                )}
              </FormItem>
              <FormItem
                label="参数组"
                {...formItemLayout}
              >
                {getFieldDecorator('params', {
                  initialValue: [],
                  rules: [
                    {
                      required: true,
                      message: '请输入参数组',
                    },
                  ],
                })(
                  <MapInputs />
                )}
              </FormItem>
              <FormItem
                label="密码"
                {...formItemLayout}
              >
                {getFieldDecorator('password', {
                  initialValue: [],
                  rules: [
                    {
                      required: true,
                      message: '请输密码',
                    },
                  ],
                })(
                  <PasswordInput />
                )}
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
