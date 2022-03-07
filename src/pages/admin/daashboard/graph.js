import { Paper } from '@material-ui/core';
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { replies, COLORS } from './staticsvars';
const Graph = ({ review, datakey, count }) => {
  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={review}
          dataKey={datakey}
          cx={200}
          cy={200}
          nameKey="name"
          label={({ name, value }) => {
            return name + '(' + value + ')';
          }}
          outerRadius={80}
          fill="#8884d8"
        >
          {review.map((item, index) => {
            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}></Cell>;
          })}
        </Pie>
      </PieChart>
      <div style={{ transform: 'translate(0px,-100%)' }}>
        <Paper elevation={0} align="center" style={{ width: '400px' }}>
          <h1 style={{ transform: ' tanslateY(200%)' }}>{datakey === 'rating' ? 'Overall' : datakey === 'satisfied' ? 'Satisfaction' : datakey.charAt(0).toUpperCase() + datakey.slice(1)}</h1>
          <span style={{ color: COLORS[Math.floor(count)], fontSize: '20px', fontWeight: 700 }}>{replies[Math.floor(count)]}</span>
        </Paper>
      </div>
    </>
  );
};
export default Graph;
