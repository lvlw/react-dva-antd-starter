import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function HorizontalBarChart({ style, data = [], bars }) {
  if (data.length === 0) {
    return (<div style={style} className="ant-table-placeholder">暂无数据</div>);
  }
  const bar = bars.map((item, index) => {
    const { name, color, dataKey } = item;
    return <Bar key={index} name={name || '值'} dataKey={dataKey} fill={color || '#8884d8'} />;
  });
  return (
    <div style={style}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }} maxBarSize={30}>
          <XAxis dataKey="name" />
          <YAxis type="number" allowDecimals={false} />
          <CartesianGrid horizontal={false} />
          <Tooltip />
          <Legend />
          {bar}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default HorizontalBarChart;
