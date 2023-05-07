import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';


import favicon from '../images/favicon.ico';
import styles from './UserLayout.less';
import Login from '../routes/Login/Login';

const { Content } = Layout;
class UserLayout extends React.PureComponent {
  render() {
    const { dispatch } = this.props;
    return (
      <div className={styles.container}>
        <Helmet>
          <title>示例管理平台</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href={favicon} type="image/x-icon" />
        </Helmet>
        <Layout>
          <Content>
            <Login
              dispatch={dispatch}
            />
          </Content>
        </Layout>
      </div>
    );
  }
}

UserLayout.propTypes = {
};

export default connect(({ app, loading }) => ({ app, loading: loading.models.app }))(UserLayout);
