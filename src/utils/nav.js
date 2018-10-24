import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data  user相关的放在前面，适应router匹配规则
export const getNavData = app => [
  // {
  //   component: dynamicWrapper(app, ['user'], () => import('../layouts/UserLayout')),
  //   layout: 'UserLayout',
  //   path: '/user',
  //   children: [
  //     {
  //       name: '登录',
  //       path: 'login',
  //       component: dynamicWrapper(app, [], () => import('../routes/User/Login')),
  //     },
  //     {
  //       name: '找回密码',
  //       path: 'password',
  //       component: dynamicWrapper(app, [], () => import('../routes/User/Password')),
  //     },
  //     {
  //       name: '注册',
  //       path: 'register',
  //       component: dynamicWrapper(app, [], () => import('../routes/User/Register')),
  //     },
  //   ],
  // },
  {
    component: dynamicWrapper(app, ['app'], () => import('../layouts/IndexLayout')),
    layout: 'Index',
    name: '首页',
    path: '/',
    children: [
      {
        name: '示例菜单',
        icon: 'bars',
        path: 'example',
        children: [
          {
            name: '表格管理',
            icon: 'table',
            path: 'table',
            component: dynamicWrapper(app, ['user'], () => import('../routes/Example/Table')),
          },
          {
            name: 'Tab管理',
            icon: 'file-text',
            path: 'tab',
            component: dynamicWrapper(app, ['user'], () => import('../routes/Example/Tab')),
          },
        ],
      },
      {
        name: '其他玩意',
        icon: 'setting',
        path: 'config',
        children: [
          {
            name: 'Canvas',
            icon: 'tags-o',
            path: 'paramManager',
            component: dynamicWrapper(app, [], () => import('../routes/Config/Params')),
          },
        ],
      },
      {
        name: '图表展示',
        icon: 'area-chart',
        path: 'chart',
        component: dynamicWrapper(app, ['user'], () => import('../routes/Chart')),
      },
    ],
  },
];
