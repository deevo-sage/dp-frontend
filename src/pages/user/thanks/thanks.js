import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, green, yellow } from '@material-ui/core/colors';
import police from '../assets/images/police.png';
import './styles/thanks.css';
const Thanks = ({ station }) => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            main: '#00897b',
          },
          secondary: {
            main: yellow[500],
            100: red[100],
            200: yellow[500],
            300: yellow[300],
            400: green[500],
            500: green[100],
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100vh', width: '100vw' }}>
        <Paper className="thanks-cont">
          <br />
          <img src={police} alt="delhi police logo" style={{ height: '200px' }} s />
          <h3 style={{ textAlign: 'center' }}>
            Thank You for your valuable feedback <br />
          </h3>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
};
export default Thanks;
