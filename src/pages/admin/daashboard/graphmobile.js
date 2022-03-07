import { Paper } from '@material-ui/core';
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { red, green, yellow } from '@material-ui/core/colors';

const COLORS = [red[500], yellow[500], yellow[700], green[300], green[500]];

const Graph = ({ feedbacks, review, datakey }) => {
  return (
    <>
      <PieChart width={320} height={320}>
        <Pie
          data={review}
          dataKey={datakey}
          cx={160}
          cy={160}
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
        <Paper elevation={0} align="center" style={{ width: '300px' }}>
          <h1>{datakey === 'rating' ? 'Overall' : datakey === 'satisfied' ? 'satisfaction' : datakey}</h1>
        </Paper>
      </div>
    </>
  );
};
export default Graph;
