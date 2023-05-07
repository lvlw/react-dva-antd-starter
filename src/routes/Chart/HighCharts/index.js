import React from 'react';
import { connect } from 'dva';
// 引入 Highcharts 主模块
import HighCharts from 'highcharts';
import PageContent from '../../../components/PageContent/index';

@connect(({ user, loading }) => ({ user, loading: loading.models.user }))
class Chart extends React.Component {
  componentDidMount() {
    const options = {
      chart: {
        type: 'bar', // 指定图表的类型，默认是折线图（line）
      },
      title: {
        text: '我的第一个图表', // 标题
      },
      xAxis: {
        categories: ['苹果', '香蕉', '橙子'], // x 轴分类
      },
      yAxis: {
        title: {
          text: '吃水果个数', // y 轴标题
        },
      },
      series: [{ // 数据列
        name: '小明', // 数据列名
        data: [1, 0, 4], // 数据
      }, {
        name: '小红',
        data: [5, 7, 3],
      }],
      credits: { // 去掉版权logo
        enabled: false,
      },
    };
    // 基于准备好的dom，初始化highcharts实例
    const myChart = HighCharts.chart(this.highChartsContainer, options);
  }
  render() {
    return (
      <PageContent title="HighChart">
        <div
          ref={(ref) => { this.highChartsContainer = ref; }}
        />
      </PageContent>
    );
  }
}

export default Chart;
