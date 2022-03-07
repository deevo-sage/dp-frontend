import React, { useEffect, useState } from 'react';
import { IconButton, Grid } from '@material-ui/core';
import { SentimentDissatisfied, SentimentSatisfied, SentimentSatisfiedAlt, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@material-ui/icons';
import { red, green, yellow } from '@material-ui/core/colors';
const Mood = ({ state, setstate }) => {
  const [mood, setmood] = useState(state);
  useEffect(() => {
    setstate(mood);
  }, [mood, setstate]);
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      <IconButton onClick={() => setmood(1)}>
        <SentimentVeryDissatisfied style={{ color: mood === 1 ? red[500] : '' }} fontSize="large" />
      </IconButton>
      <IconButton onClick={() => setmood(2)}>
        <SentimentDissatisfied style={{ color: mood === 2 ? yellow[500] : '' }} fontSize="large" />
      </IconButton>
      <IconButton onClick={() => setmood(3)}>
        <SentimentSatisfied style={{ color: mood === 3 ? yellow[800] : '' }} fontSize="large" />
      </IconButton>
      <IconButton onClick={() => setmood(4)}>
        <SentimentSatisfiedAlt style={{ color: mood === 4 ? green[400] : '' }} fontSize="large" />
      </IconButton>
      <IconButton onClick={() => setmood(5)}>
        <SentimentVerySatisfied style={{ color: mood === 5 ? green[800] : '' }} fontSize="large" />
      </IconButton>
    </Grid>
  );
};
export default Mood;
