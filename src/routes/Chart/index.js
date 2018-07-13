import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Select } from 'antd';
import PageContent from '../../components/PageContent';
import HorizontalBarChart from './HorizontalBarChart';
import LineChart from './LineChart';
import VerticalBarChart from './VerticalBarChart';
import PieChart from './PieChart';
import AreaChart from './AreaChart';
import styles from './index.less';

const Option = Select.Option;
const game = ['王者荣耀', 'DotA', 'DotA2', '英雄联盟', 'QQ飞车'];
const ranking = ['青铜', '白银', '黄金', '铂金', '钻石', '王者'];
const level = ['I', 'II', 'III', 'IV', 'V'];
const interest = ['写代码', '游戏', '听歌', '篮球', '足球', '旅行', '吃', '睡觉', '撩妹', '撩汉', '舞蹈', '厨艺'];
const ageGroup = [
  {
    name: '12-14岁',
    value: {
      min: 12,
      max: 14,
    },
  },
  {
    name: '15-17岁',
    value: {
      min: 15,
      max: 17,
    },
  },
  {
    name: '18-20岁',
    value: {
      min: 18,
      max: 20,
    },
  },
  {
    name: '21-23岁',
    value: {
      min: 21,
      max: 23,
    },
  },
  {
    name: '24-26岁',
    value: {
      min: 24,
      max: 26,
    },
  },
  {
    name: '27-29岁',
    value: {
      min: 27,
      max: 29,
    },
  },
  {
    name: '30-32岁',
    value: {
      min: 30,
      max: 32,
    },
  },
  {
    name: '33-35岁',
    value: {
      min: 33,
      max: 35,
    },
  },
  {
    name: '36岁以上',
    value: {
      min: 36,
      max: 40,
    },
  },
];

@connect(({ user, loading }) => ({ user, loading: loading.models.user }))
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameRanking: this.getGameRanking(),
      cityGameRankingPeopleCount: [],
      cityInterestPeopleCount: [],
      ageGroupGamePeopleCount: [],
    };
  }
  getGameRanking = () => {
    const gameRanking = [];
    for (const g of game) {
      for (const r of ranking) {
        for (const l of level) {
          gameRanking.push({
            id: gameRanking.length + 1,
            game: g,
            ranking: r,
            level: l,
          });
        }
      }
    }
    return gameRanking;
  };
  getCityGameRankingPeopleCount = (value) => {
    let countArray = [];
    if (value) {
      const { users, city } = this.props.user;
      const curGameRanking = this.state.gameRanking.find(n => n.id === value);
      const dataSource = users.filter((n) => {
        const userGamesRanking = n.gamesRanking;
        const thisGameRanking = userGamesRanking.find(t => t.name === curGameRanking.game) || {};
        return curGameRanking.ranking === thisGameRanking.ranking
          && curGameRanking.level === thisGameRanking.level;
      });
      countArray = city.map((item) => {
        return {
          name: item.name,
          value: dataSource.filter(n => n.city === item.id).length,
        };
      });
    }
    this.setState({
      cityGameRankingPeopleCount: countArray,
    });
  };
  getCityInterestPeopleCount = (value) => {
    let countArray = [];
    if (value) {
      const { users, city } = this.props.user;
      countArray = city.map((item) => {
        return {
          name: item.name,
          value: users.filter(n => n.interest.includes(value) && n.city === item.id).length,
        };
      });
    }
    this.setState({
      cityInterestPeopleCount: countArray,
    });
  };
  getAgeGroupGamePeopleCount = (value) => {
    let countArray = [];
    if (value) {
      const { users } = this.props.user;
      const dataSource = users.filter(n => !!n.gamesRanking.find(t => t.name === value));
      countArray = ageGroup.map((item) => {
        return {
          name: item.name,
          value: dataSource.filter(n => n.age >= item.value.min && n.age <= item.value.max).length,
        };
      });
    }
    this.setState({
      ageGroupGamePeopleCount: countArray,
    });
  };
  render() {
    const { users, city } = this.props.user;
    const {
      gameRanking,
      cityGameRankingPeopleCount,
      cityInterestPeopleCount,
      ageGroupGamePeopleCount,
    } = this.state;
    const cityGameRankingPeopleCountProps = {
      style: { width: '100%', height: '200px' },
      data: cityGameRankingPeopleCount,
      bars: [
        {
          name: '人数',
          color: '#ffb039',
          dataKey: 'value',
        },
      ],
    };
    const cityInterestPeopleCountProps = {
      style: { width: '100%', height: '200px' },
      data: cityInterestPeopleCount,
      bars: [
        {
          name: '人数',
          color: '#4d6fff',
          dataKey: 'value',
        },
      ],
    };
    const cityPeopleCountProps = {
      style: { width: '100%', height: '200px' },
      data: city.map((item) => {
        return {
          name: item.name,
          value: users.filter(n => n.city === item.id).length,
        };
      }),
    };
    const cityPeopleSexCountProps = {
      style: { width: '100%', height: '200px' },
      data: city.map((item) => {
        return {
          name: item.name,
          male: users.filter(n => n.sex === 1 && n.city === item.id).length,
          female: users.filter(n => n.sex === 2 && n.city === item.id).length,
        };
      }),
      bars: [
        {
          name: '男',
          color: '#69bfff',
          dataKey: 'male',
        },
        {
          name: '女',
          color: '#ff7aa1',
          dataKey: 'female',
        },
      ],
    };
    const ageGroupPeopleCountProps = {
      style: { width: '100%', height: '200px' },
      data: ageGroup.map((item) => {
        return {
          name: item.name,
          value: users.filter(n => n.age >= item.value.min && n.age <= item.value.max).length,
        };
      }),
      lines: [
        {
          name: '人数',
          color: '#98ff1a',
          dataKey: 'value',
        },
      ],
    };
    const interestPeopleCountProps = {
      style: { width: '100%', height: '200px' },
      data: interest.map((item) => {
        return {
          name: item,
          value: users.filter(n => n.interest.includes(item)).length,
        };
      }),
      bars: [
        {
          name: '人数',
          color: '#4bdaff',
          dataKey: 'value',
        },
      ],
    };
    const ageGroupGamePeopleCountProps = {
      style: { width: '100%', height: '200px' },
      data: ageGroupGamePeopleCount,
      areas: [
        {
          name: '人数',
          color: '#ff643f',
          dataKey: 'value',
        },
      ],
    };
    return (
      <PageContent title="Chart">
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Card className={styles.chartBoard}>
              <p className={styles.chartTitle}>总人数</p>
              <p className={styles.chartContent}>{users.length}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className={styles.chartBoard}>
              <p className={styles.chartTitle}>男性人数</p>
              <p className={styles.chartContent}>{users.filter(n => n.sex === 1).length}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className={styles.chartBoard}>
              <p className={styles.chartTitle}>女性人数</p>
              <p className={styles.chartContent}>{users.filter(n => n.sex === 2).length}</p>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Card title="人数变化趋势(12-40岁年龄段)">
              <LineChart {...ageGroupPeopleCountProps} />
            </Card>
          </Col>
          <Col span={8}>
            <Row style={{ marginBottom: 8 }}>
              <Card title="城市人数分布">
                <PieChart {...cityPeopleCountProps} />
              </Card>
            </Row>
          </Col>
          <Col span={8}>
            <Row style={{ marginBottom: 8 }}>
              <Card title="城市男女人数统计">
                <HorizontalBarChart {...cityPeopleSexCountProps} />
              </Card>
            </Row>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Card title="兴趣爱好-人数分布">
              <VerticalBarChart {...interestPeopleCountProps} />
            </Card>
          </Col>
          <Col span={16}>
            <Row gutter={12} style={{ marginBottom: 8 }}>
              <Card
                title="游戏-年龄段分布"
                extra={
                  <Select
                    defaultValue=""
                    style={{ width: 150 }}
                    onChange={this.getAgeGroupGamePeopleCount}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option index="-2" value="">请选择</Option>
                    {
                      game.map((item, index) => {
                        return <Option key={index} value={item}>{item}</Option>;
                      })
                    }
                  </Select>
                }
              >
                <AreaChart {...ageGroupGamePeopleCountProps} />
              </Card>
            </Row>
            <Row gutter={12} style={{ marginBottom: 8 }}>
              <Col span={12}>
                <Card
                  title="兴趣爱好-城市分布"
                  extra={
                    <Select
                      defaultValue=""
                      style={{ width: 150 }}
                      onChange={this.getCityInterestPeopleCount}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option index="-2" value="">请选择</Option>
                      {
                        interest.map((item, index) => {
                          return <Option key={index} value={item}>{item}</Option>;
                        })
                      }
                    </Select>
                  }
                >
                  <HorizontalBarChart {...cityInterestPeopleCountProps} />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title="游戏排位-城市分布"
                  extra={
                    <Select
                      defaultValue=""
                      style={{ width: 150 }}
                      onChange={this.getCityGameRankingPeopleCount}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option index="-2" value="">请选择</Option>
                      {
                        gameRanking.map((item) => {
                          return <Option key={item.id} value={item.id}>{`${item.game} ${item.ranking} ${item.level}`}</Option>;
                        })
                      }
                    </Select>
                  }
                >
                  <HorizontalBarChart {...cityGameRankingPeopleCountProps} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </PageContent>
    );
  }
}

export default Chart;
