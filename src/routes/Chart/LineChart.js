import React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MyLineChart({ style, data = [], lines }) {
  if (data.length === 0) {
    return (<div style={style} className="ant-table-placeholder">暂无数据</div>);
  }
  const line = lines.map((item, index) => {
    const { name, color, dataKey } = item;
    return (
      <Line
        key={index}
        type="linear"
        dot={false}
        name={name || '值'}
        dataKey={dataKey}
        stroke={color || '#8884d8'}
        yAxisId={0}
        isAnimationActive={false}
      />
    );
  });
  return (
    <div style={style}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis type="number" />
          <CartesianGrid horizontal={false} />
          <Tooltip />
          <Legend />
          {line}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default MyLineChart;
