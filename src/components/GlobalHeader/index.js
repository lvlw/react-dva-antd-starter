import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Spin, Dropdown } from 'antd';
import styles from './index.less';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {

  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      // window.location.href = '/logout';
      alert('logout!');
    }
  };
  handleCollapse = () => {
    const { collapsed } = this.props;
    this.props.dispatch({
      type: 'app/save',
      payload: {
        collapsed: !collapsed,
      },
    });
  };
  render() {
    const { currentInfo, collapsed } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
    return (
      <Header className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.handleCollapse}
          style={{ color: '#fff' }}
        />
        <div className={styles.right}>
          {currentInfo.user ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action}`} style={{ color: '#fff' }}>
                {currentInfo.user.account}
              </span>
            </Dropdown>
          ) : <Spin size="small" style={{ marginLeft: 8 }} />}
        </div>
      </Header>
    );
  }
}
