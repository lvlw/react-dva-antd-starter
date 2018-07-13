import React from 'react';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars';
import favicon from '../images/favicon.ico';
import SiderMenu from '../components/SiderMenu';
import GlobalHeader from '../components/GlobalHeader';
import styles from './IndexLayout.less';

const { Content, Footer } = Layout;
class IndexLayout extends React.PureComponent {
  getRouteData = (nav, parentPath = '') => {
    const result = [];
    for (const item of nav) {
      const { children, component } = item;
      const path = `${parentPath}/${item.path}`;
      if (children && !component) {
        result.push(...this.getRouteData(children, path));
      } else {
        result.push({ ...item, path });
      }
    }
    return result;
  };
  render() {
    const { dispatch, loading, location, navData, app: { currentInfo, collapsed } } = this.props;
    const siderMenuProps = {
      dispatch,
      location,
      menus: navData.children,
      currentInfo,
      collapsed,
    };
    const globalHeaderProps = {
      dispatch,
      loading,
      currentInfo,
      collapsed,
    };
    const routeData = this.getRouteData(navData.children);
    return (
      <Scrollbars style={{ height: '100vh' }}>
        <div className={styles.container}>
          <Helmet>
            <title>示例管理平台</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href={favicon} type="image/x-icon" />
          </Helmet>
          <Layout>
            <SiderMenu {...siderMenuProps} />
            <Layout>
              <GlobalHeader {...globalHeaderProps} />
              <Content className={styles.outerContent}>
                <div className={styles.innerContent}>
                  <Switch>
                    {
                      routeData.map((item, index) => {
                        return (
                          <Route
                            exact
                            key={index}
                            path={item.path}
                            component={item.component}
                          />
                        );
                      })
                    }
                    <Redirect to={routeData[0].path} />
                  </Switch>
                </div>
              </Content>
              <Footer className={styles.footer} />
            </Layout>
          </Layout>
        </div>
      </Scrollbars>
    );
  }
}

IndexLayout.propTypes = {
};

export default connect(({ app, loading }) => ({ app, loading: loading.models.app }))(IndexLayout);
