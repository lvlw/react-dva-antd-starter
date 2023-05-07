import React from 'react';
import { connect } from 'dva';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import PageContent from '../../../components/PageContent/index';

@connect(({ user, loading }) => ({ user, loading: loading.models.user }))
class Chart extends React.Component {
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts',
        subtext: 'line',
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      legend: {
        data: ['销量'],
      },
      series: [{
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20],
      }],
    });
  }
  render() {
    return (
      <PageContent title="EChart">
        <div id="main" style={{ width: 400, height: 400 }} />
      </PageContent>
    );
  }
}

export default Chart;
