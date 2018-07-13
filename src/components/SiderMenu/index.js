import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import logo from '../../images/logo.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menus: props.menus,
      // openKeys: this.getDefaultOpenSubMenus(),
      openKeys: props.menus.map((item) => { // 2018-3-13 17:14:03 默认全展开
        return item.path;
      }),
    };
  }
  getDefaultOpenSubMenus = () => {
    const currentMenuSelectedKeys = this.getCurrentMenuSelectedKeys();
    if (currentMenuSelectedKeys.length === 0) {
      return ['dataSource'];
    }
    return currentMenuSelectedKeys;
  };
  getCurrentMenuSelectedKeys = () => {
    const { location: { pathname }, menus } = this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [menus[0].path];
    }
    return keys;
  };
  getMenuItems = (menusData, parentPath = '') => {
    return menusData.map((item) => {
      const { name, icon, children, path } = item;
      const itemPath = `${parentPath}/${path}`;
      if (children) {
        return (
          <SubMenu
            key={path}
            title={
              <span>
                <Icon type={icon} />
                <span>{name}</span>
              </span>
            }
          >
            {this.getMenuItems(children, itemPath)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={path}>
            <Link to={itemPath} replace={itemPath === this.props.location.pathname}>
              <Icon type={icon} />
              <span>{name}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
  };
  handleCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'app/save',
      payload: {
        collapsed,
      },
    });
  };
  handleOpenChange = (openKeys) => {
    // const lastOpenKey = openKeys[openKeys.length - 1];
    // const isMainMenu = this.state.menus.some(
    //   item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    // );
    // this.setState({
    //   openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    // });
    this.setState({
      openKeys,
    });
  };
  render() {
    const { collapsed, currentInfo } = this.props;
    const menuProps = collapsed ? {} : {
      openKeys: this.state.openKeys,
    };
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={this.handleCollapse}
        breakpoint="md"
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="logo" title="示例管理平台" />
            <div>
              <h1 title="示例管理平台">示例管理平台</h1>
            </div>
          </Link>
        </div>
        <Menu
          theme="light"
          mode="inline"
          onOpenChange={this.handleOpenChange}
          selectedKeys={this.getCurrentMenuSelectedKeys()}
          style={{ padding: '16px 0', width: '100%' }}
          {...menuProps}
        >
          {this.getMenuItems(this.state.menus)}
        </Menu>
      </Sider>
    );
  }
}
