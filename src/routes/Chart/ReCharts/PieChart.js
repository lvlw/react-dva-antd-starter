import React from 'react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = [
  '#4fe258',
  '#fff15d',
  '#ffb039',
  '#ff2c08',
  '#e6072c',
  '#9e1a21',
  '#a82073',
  '#481f72',
];

function MyPieChart({ style, data = [] }) {
  if (data.length === 0) {
    return (<div style={style} className="ant-table-placeholder">暂无数据</div>);
  }
  const dataSource = data.map((item, index) => {
    return {
      key: index,
      name: `${item.name}: ${item.value}`,
      value: item.value,
    };
  });
  dataSource.sort((a, b) => a.value - b.value);
  return (
    <div style={style}>
      <ResponsiveContainer>
        <PieChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}  >
          <Pie
            isAnimationActive={false}
            data={dataSource}
            outerRadius={100}
            fill="#8884d8"
            nameKey="name"
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Legend
            layout="vertical"
            align="right"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active) {
                const current = payload[0] || {};
                return current.name;
              } else {
                return null;
              }
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default MyPieChart;
