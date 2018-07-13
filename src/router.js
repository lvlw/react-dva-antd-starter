import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { getNavData } from './utils/nav';


export default function RouterConfig({ history, app }) {
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          {
            getNavData(app).map((item, index) => {
              const Component = item.component;
              return (
                <Route
                  key={index}
                  path={item.path}
                  render={props => <Component {...props} navData={item} />}
                />
              );
            })
          }
        </Switch>
      </Router>
    </LocaleProvider>
  );
}
