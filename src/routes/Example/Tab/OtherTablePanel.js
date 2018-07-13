import React from 'react';
import { Table, Input } from 'antd';
import { DEFAULT_PAGE_SIZE } from '../../../utils/constants';

const Search = Input.Search;

export default class OtherTablePanel extends React.Component {
  state = {
    filter: '',
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
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '基本信息',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          const { name, sex, age, interest } = record;
          return (
            <div>
              <li type="none" key="0">
                <span>姓名</span>
                {' : '}
                <span style={{ color: '#008bab' }}>
                  {name}
                </span>
              </li>
              <li type="none" key="1">
                <span>性别</span>
                {' : '}
                <span style={{ color: '#008bab' }}>
                  {sex === 1 ? '男' : '女'}
                </span>
              </li>
              <li type="none" key="2">
                <span>年龄</span>
                {' : '}
                <span style={{ color: '#008bab' }}>
                  {age}
                </span>
              </li>
              <li type="none" key="3">
                <span>兴趣爱好</span>
                {' : '}
                <span style={{ color: '#008bab' }}>
                  {interest}
                </span>
              </li>
            </div>
          );
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
        title: '联系方式',
        dataIndex: 'email',
        key: 'email',
        render: (text, record) => {
          const { email, phone } = record;
          return (
            <div>
              <li type="none" key="0">
                <span>邮箱</span>
                {' : '}
                <span style={{ color: '#008bab' }}>
                  {email}
                </span>
              </li>
              <li type="none" key="1">
                <span>手机号</span>
                {' : '}
                <span style={{ color: '#008bab' }}>
                  {phone}
                </span>
              </li>
            </div>
          );
        },
      },
      {
        title: '游戏段位',
        dataIndex: 'gamesRanking',
        key: 'gamesRanking',
        render: (text) => {
          return (
            <div>
              {
                text.map((item, index) => {
                  const { name, ranking, level } = item;
                  return (
                    <li type="none" key={index}>
                      <span>{name}</span>
                      {' : '}
                      <span style={{ color: '#008bab' }}>
                        {`${ranking} ${level}`}
                      </span>
                    </li>
                  );
                })
              }
            </div>
          );
        },
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
      <div>
        <Search
          style={{ width: 200, marginBottom: 8 }}
          onChange={this.handleFilterChange}
          onSearch={this.handleFilter}
          placeholder="姓名筛选"
        />
        <Table
          columns={columns}
          dataSource={users.filter(n => n.name.includes(this.state.filter))}
          loading={loading}
          rowKey={record => record.id}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.profile || '没有简介'}</p>}
          pagination={{
            pageSize: DEFAULT_PAGE_SIZE,
          }}
          bordered
        />
      </div>
    );
  }
}
