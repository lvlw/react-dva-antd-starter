import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function VerticalBarChart({ style, data = [], bars }) {
  if (data.length === 0) {
    return (<div style={style} className="ant-table-placeholder">暂无数据</div>);
  }
  const bar = bars.map((item, index) => {
    const { name, color, dataKey } = item;
    return <Bar key={index} name={name || '值'} dataKey={dataKey} fill={color || '#8884d8'} />;
  });
  return (
    <div style={{ ...style, height: data.length * 35 }}>
      <ResponsiveContainer>
        <BarChart layout="vertical" data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }} barSize={20}>
          <XAxis dataKey="value" type="number" />
          <YAxis dataKey="name" type="category" />
          <CartesianGrid horizontal={false} />
          <Tooltip />
          <Legend />
          {bar}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default VerticalBarChart;
