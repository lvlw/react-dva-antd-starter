import * as React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Echart extends React.Component {
  render() {
    const { config } = this.props;
    return (
      <ReactEcharts
        style={{ width: '100%', height: 500 }}
        option={config}
      />
    );
  }
}
