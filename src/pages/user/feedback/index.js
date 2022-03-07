import React, { useState } from 'react';
import Feedback from './feedback';
import MobnForm from './nologin';
import VerifyOtp from './otp';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, green, yellow } from '@material-ui/core/colors';
import './styles/feedback.css';
const Feedbackpage = ({ station }) => {
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
  const [entered, setentered] = useState(false);
  const [verified, setverified] = useState(false);
  const [number, setnumber] = useState('');
  const [name, setname] = useState('');

  return (
    <>
      <ThemeProvider theme={theme}>
        {!entered && <MobnForm setentered={setentered} name={name} setname={setname} number={number} setnumber={setnumber} station={station} />}
        {!verified && entered && <VerifyOtp setverified={setverified} number={number} station={station} />}
        {verified && entered && <Feedback station={station} nameinput={name} number={number} />}
      </ThemeProvider>
    </>
  );
};
export default Feedbackpage;
