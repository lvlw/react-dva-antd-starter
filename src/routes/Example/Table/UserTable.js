import React from 'react';
import { Card, Table, Button, Popconfirm, Switch, Input } from 'antd';
import styles from '../../common.css';
import { DEFAULT_PAGE_SIZE } from '../../../utils/constants';
import UserModal from './UserModal';
import ExportExcel from '../../../components/ExportExcel';

const Search = Input.Search;

export default class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      modalVisible: false,
      selectedRowKeys: [],
      filter: '',
    };
  }

  handleAddUser = () => {
    this.setState({
      currentUser: {},
      modalVisible: true,
    });
  };
  handleDeleteUser = (record) => {
    this.props.dispatch({
      type: 'user/deleteUser',
      payload: {
        user: record,
      },
    });
  };
  handleUpdateUser = (record) => {
    this.props.dispatch({
      type: 'user/updateUser',
      payload: {
        user: record,
      },
    });
  };
  handleBatchDelete = () => {
    this.props.dispatch({
      type: 'user/batchDelete',
      payload: {
        keys: this.state.selectedRowKeys,
      },
    });
  };
  handleRowSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };
  handleFilter = () => {
    // this.setState({
    //   filter: value,
    // });
    console.log(this.state.filter);
    this.props.dispatch({
      type: 'user/fetchUser',
      payload: {
        name: this.state.filter,
      },
    });
  };
  handleFilterChange = (e) => {
    const value = e.target.value;
    this.setState({
      filter: value,
    });
  };

  render() {
    const { dispatch, loading, users, city } = this.props;
    const { currentUser, modalVisible, selectedRowKeys, filter } = this.state;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        sorter: (a, b) => a.sex - b.sex,
        render: (text) => {
          return text === 1 ? '男' : '女';
        },
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
        sorter: (a, b) => a.city - b.city,
        render: (text) => {
          return city.find(n => n.id === text).name;
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status - b.status,
        render: (text, record) => {
          return (
            <Switch
              checked={record.status === 1}
              checkedChildren="启用"
              unCheckedChildren="禁用"
              onChange={
                checked => this.handleUpdateUser({
                  ...record,
                  status: checked ? 1 : 0,
                })
              }
            />
          );
        },
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div className={styles.operation}>
              <a
                onClick={() => {
                  this.setState({
                    currentUser: record,
                    modalVisible: true,
                  });
                }}
              >
                修改
              </a>
              <Popconfirm title={'确定删除？'} onConfirm={() => this.handleDeleteUser(record)}>
                <a>删除</a>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    const modalProps = {
      dispatch,
      loading,
      visible: modalVisible,
      currentUser,
      city,
      onCancel: () => {
        this.setState({
          currentUser: {},
          modalVisible: false,
        });
      },
    };

    return (
      <div>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ float: 'left' }}>
            <Popconfirm
              title="确认批量删除?"
              onConfirm={this.handleBatchDelete}
            >
              <Button disabled={!selectedRowKeys.length > 0} >批量删除</Button>
            </Popconfirm>
            <span style={{ marginLeft: 16 }}>{`共选择了${selectedRowKeys.length}条`}</span>
            <Search
              style={{ marginLeft: 16, width: 200 }}
              onChange={this.handleFilterChange}
              onSearch={this.handleFilter}
              placeholder="姓名筛选"
            />
          </div>
          <div className={styles.btnGroup}>
            <ExportExcel
              style={{ float: 'right' }}
              dataSet={users}
              filename="userData"
              element={<Button type="primary">导出数据</Button>}
            />
            <Button type="primary" onClick={this.handleAddUser}>新增用户</Button>
          </div>
        </Card>
        <Table
          columns={columns}
          dataSource={users.filter(n => n.name.includes(this.state.filter))}
          loading={loading}
          rowKey={record => record.id}
          pagination={{
            pageSize: DEFAULT_PAGE_SIZE,
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => {
              this.setState({
                selectedRowKeys: keys,
              });
            },
          }}
          bordered
        />
        <UserModal {...modalProps} />
      </div>
    );
  }
}
