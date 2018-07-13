import React from 'react';
import { Row, Col, Card, Tree, Tooltip, Table, Input, Switch } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { DEFAULT_PAGE_SIZE } from '../../../utils/constants';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class TreePanel extends React.Component {
  state = {
    selectedDbKeys: [],
    filter: '',
  };
  handleDBSelect = (selectedKeys) => {
    this.setState({
      selectedDbKeys: selectedKeys,
    });
  };
  handleFilter = (value) => {
    this.setState({
      filter: value,
    });
  };
  handleFilterChange = (e) => {
    const value = e.target.value;
    if (!value) {
      this.setState({
        filter: value,
      });
    }
  };
  render() {
    const { loading, users, city } = this.props;
    const { selectedDbKeys, filter } = this.state;
    const dataSource = selectedDbKeys.length > 0 ?
      users.filter(n => `${n.city}` === selectedDbKeys[0]) : users;
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
        render: (text) => {
          return text === 1 ?
            (
              <span style={{ color: 'green' }}>启用</span>
            ) :
            (
              <span style={{ color: 'red' }}>禁用</span>
            );
        },
      },
    ];
    return (
      <Row gutter={16}>
        <Col span={6}>
          <Card title="普通Tree">
            <Tree
              showLine
            >
              {
                city.map((item) => {
                  return (
                    <TreeNode key={item.id} title={item.name} dataRef={item}>
                      {
                        users.filter(n => n.city === item.id).map((i) => {
                          return (
                            <TreeNode
                              key={i.id}
                              title={
                                <Tooltip
                                  placement="topRight"
                                  title={
                                    <div>
                                      <p>{`姓名：${i.name}`}</p>
                                      <p>{`性别：${i.sex === 1 ? '男' : '女'}`}</p>
                                      <p>{`年龄：${i.age}`}</p>
                                      <p>{`邮箱：${i.email || ''}`}</p>
                                      <p>{`手机号：${i.phone || ''}`}</p>
                                    </div>
                                  }
                                >
                                  {i.name}
                                </Tooltip>
                              }
                              dataRef={i}
                            />
                          );
                        })
                      }
                    </TreeNode>
                  );
                })
              }
            </Tree>
          </Card>
        </Col>
        <Col span={18}>
          <Card title="左树右表">
            <Row gutter={8}>
              <Col span={4}>
                <Search
                  style={{ marginBottom: 8 }}
                  onChange={this.handleFilterChange}
                  onSearch={this.handleFilter}
                />
                <Scrollbars
                  style={{ border: '1px solid #ccc', height: 400 }}
                >
                  <Tree
                    defaultSelectedKeys={selectedDbKeys}
                    selectedKeys={selectedDbKeys}
                    onSelect={this.handleDBSelect}
                  >
                    {
                      city.filter(n => n.name.includes(filter)).map((item) => {
                        return <TreeNode key={item.id} title={item.name} dataRef={item} />;
                      })
                    }
                  </Tree>
                </Scrollbars>
              </Col>
              <Col span={20}>
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  loading={loading}
                  rowKey={record => record.id}
                  expandedRowRender={record => <p style={{ margin: 0 }}>{record.profile || '没有简介'}</p>}
                  pagination={{
                    pageSize: DEFAULT_PAGE_SIZE,
                  }}
                  bordered
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
