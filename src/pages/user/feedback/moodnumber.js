import React, { useEffect, useState } from 'react';
import { IconButton, Grid } from '@material-ui/core';
import { red, green, yellow } from '@material-ui/core/colors';
const COLORS = [red[500], yellow[500], yellow[800], green[400], green[800]];
const Mood = ({ state, setstate }) => {
  const [mood, setmood] = useState(state);
  useEffect(() => {
    setstate(mood);
  }, [mood, setstate]);
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {COLORS.map((item, key) => {
        return (
          <IconButton onClick={() => setmood(key + 1)}>
            <Number number={key + 1} color={mood === key + 1 ? item : 'white'} />
          </IconButton>
        );
      })}
    </Grid>
  );
};

const Number = ({ number, color }) => {
  return <div style={{ borderStyle: 'solid', borderWidth: '2px', borderRadius: '50%', color: color, borderColor: color, width: '25px', height: '25px' }}>{number}</div>;
};
export default Mood;
