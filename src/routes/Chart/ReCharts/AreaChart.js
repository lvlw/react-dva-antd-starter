import React from 'react';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MyAreaChart({ style, data = [], areas }) {
  if (data.length === 0) {
    return (<div style={style} className="ant-table-placeholder">暂无数据</div>);
  }
  const area = areas.map((item, index) => {
    const { name, color, dataKey } = item;
    return (
      <Area
        key={index}
        type="monotone"
        name={name || '值'}
        dataKey={dataKey}
        stroke={color || '#8884d8'}
        fill={color || '#8884d8'}
        yAxisId={0}
        isAnimationActive={false}
      />
    );
  });
  return (
    <div style={style}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis type="number" />
          <CartesianGrid horizontal={false} />
          <Tooltip />
          <Legend />
          {area}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export default MyAreaChart;
