import React from 'react';
import { connect } from 'dva';
import PageContent from '../../../components/PageContent';
import UserTable from './UserTable';

@connect(({ user, app, loading }) => ({ user, app, loading: loading.models.app }))
class Table extends React.Component {
  render() {
    const { dispatch, loading, user: { users, city } } = this.props;
    const userTableProps = {
      dispatch,
      loading,
      users,
      city,
    };
    return (
      <PageContent title="用户管理">
        <UserTable {...userTableProps} />
      </PageContent>
    );
  }
}

export default Table;
