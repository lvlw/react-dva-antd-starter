import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import PageContent from '../../../components/PageContent';
import JSONPanel from './JSONPanel';
import JavaExceptionPanel from './JavaExceptionPanel';
import CustomizedForm from './CustomizedForm';
import CodeEditorPanel from './CodeEditorPanel';
import TreePanel from './TreePanel';
import OtherTablePanel from './OtherTablePanel';

const TabPane = Tabs.TabPane;

@connect(({ user, loading }) => ({ user, loading: loading.models.user }))
class Tab extends React.Component {
  render() {
    const { dispatch, loading, user: { users, city } } = this.props;
    const tabsProps = {
      tabPosition: 'top',
      type: 'card',
    };
    const treePanelProps = {
      dispatch,
      loading,
      users,
      city,
    };
    const otherTableProps = {
      loading,
      users,
      city,
    };
    return (
      <PageContent title="Tab">
        <Tabs {...tabsProps}>
          <TabPane tab="出请求" key="1">
            <CustomizedForm />
          </TabPane>
          <TabPane tab="JSON格式" key="2">
            <JSONPanel />
          </TabPane>
          <TabPane tab="JAVA Exception格式" key="3">
            <JavaExceptionPanel />
          </TabPane>
          <TabPane tab="代码编辑框(sql)" key="4">
            <CodeEditorPanel />
          </TabPane>
          <TabPane tab="树形结构" key="5">
            <TreePanel {...treePanelProps} />
          </TabPane>
          <TabPane tab="另一种表" key="6">
            <OtherTablePanel {...otherTableProps} />
          </TabPane>
        </Tabs>
      </PageContent>
    );
  }
}

export default Tab;
