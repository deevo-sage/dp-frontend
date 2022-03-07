import { Button, Paper, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import config from '../../../config';
import police from '../assets/images/police.png';

const VerifyOtp = ({ number, setverified, station }) => {
  const [otp, setotp] = useState();
  return (
    <Paper
      style={{
        height: '100vh',
        maxWidth: '500px',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <img src={police} alt="delhi police logo" style={{ height: '100px' }} s />
      <h3 style={{ textAlign: 'center' }}>
        Thanks for visiting <br />
        {station.split('-').join(' ').toUpperCase()} police station
      </h3>
      <h3>OTP sent to *{number}*</h3>
      <div className="input-cont" style={{ marginBottom: '20px' }}>
        <TextField
          required
          type="phone"
          value={otp}
          onChange={(e) => {
            setotp(e.target.value);
          }}
          label="OTP"
          maxLength="10"
          variant="outlined"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          axios.get(config.database + '/api/verify/' + '91' + number + '/' + otp).then((val) => {
            if (val.data.type === 'success') setverified(true);
            else alert('wrong otp');
          });
        }}
        style={{ width: '250px', marginBottom: '20px' }}
      >
        Submit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          axios.get(config.database + '/api/resend/' + '91' + number).then((val) => {
            if (val.data.type === 'success') alert('otp successfully sent');
            else alert('otp request failed your number may not be valid pls');
          });
        }}
        style={{ width: '250px' }}
      >
        Resend
      </Button>
    </Paper>
  );
};
export default VerifyOtp;
