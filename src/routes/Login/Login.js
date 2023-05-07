import React from 'react';
import { routerRedux } from 'dva/router';
import { Form, Row, Card, Input, Button } from 'antd';
import PasswordInput from '../../components/PasswordInput';
import styles from './Login.less';
import {replace} from "react-router-redux";

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
export default class Login extends React.Component {
  handleLogin = async () => {
    const { dispatch, form } = this.props;
    const validated = await form.validateFields();
    if (validated) {
      const userInfo = form.getFieldsValue(['account', 'password']);
      dispatch({
        type: 'app/login',
        payload: {
          userInfo,
          cb: () => {
            location.hash = '/';
          },
        },
      });
    }
  }
  render() {
    const { loading, form: { getFieldDecorator } } = this.props;
    return (
      <Row className={styles.loginRow}>
        <Card className={styles.loginForm} title="登录">
          <Form>
            <FormItem
              label="用户名"
              {...formItemLayout}
            >
              {getFieldDecorator('account', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="密码"
              {...formItemLayout}
            >
              {getFieldDecorator('password', {
                initialValue: '',
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
          <div className={styles.loginFooter}>
            <Button
              loading={loading}
              className={styles.loginButton}
              type="primary"
              onClick={this.handleLogin}
            >登录</Button>
          </div>
        </Card>
      </Row>
    );
  }
}
