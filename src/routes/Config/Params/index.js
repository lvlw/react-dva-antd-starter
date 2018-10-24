import React from 'react';
import { connect } from 'dva';
import PageContent from '../../../components/PageContent';
import './index.less';

@connect(({ app, loading }) => ({ app, loading: loading.models.app }))
class Params extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: 1000,
      canvasHeight: 600,
    };
  }
  componentDidMount() {
    const canvas = document.getElementById('canvas'); // 获取画布
    this.context = canvas.getContext('2d');  // 设置模式
    this.drawFillRect();
  }
  drawFillRect = () => {
    const context = this.context;
    // 背景
    context.fillStyle = '#f0f2f5';
    context.fillRect(0, 0, 1000, 600);
    context.textBaseline = 'middle';
    context.font = '26px Arial';
    // 菜单栏
    context.fillStyle = 'white';
    context.shadowBlur = 5;
    context.shadowColor = 'black';
    context.fillRect(0, 0, 150, 600);
    // 菜单栏-文字
    context.shadowBlur = 0;
    context.fillStyle = 'black';
    context.fillText('菜单栏', 75 - (context.measureText('菜单栏').width / 2), 300);
    // Header
    context.shadowBlur = 0;
    context.fillStyle = '#238c1f';
    context.fillRect(150, 0, 850, 40);
    // Header-文字
    context.fillStyle = 'black';
    context.fillText('Header', 575 - (context.measureText('Header').width / 2), 20);

    // 内容
    context.fillStyle = 'white';
    context.fillRect(170, 60, 810, 480);
    context.fillStyle = 'black';
    context.fillText('Content', 575 - (context.measureText('Content').width / 2), 300);
    context.fillText('Footer', 575 - (context.measureText('Footer').width / 2), 580);
  };
  render() {
    const { canvasWidth, canvasHeight } = this.state;
    return (
      <PageContent title="Params">
        <canvas id="canvas" width={canvasWidth} height={canvasHeight} >
          浏览器不支持！
        </canvas>
      </PageContent>
    );
  }
}

export default Params;
