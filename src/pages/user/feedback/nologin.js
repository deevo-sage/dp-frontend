import { Button, Paper, TextField } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import config from '../../../config';
import police from '../assets/images/police.png';

const MobnForm = ({ name, setname, number, setnumber, setentered, station }) => {
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
        boxSizing: 'border-boxs',
      }}
    >
      <img src={police} alt="delhi police logo" style={{ height: '100px' }} s />
      <h3 style={{ textAlign: 'center' }}>
        Thanks for visiting <br />
        {station.split('-').join(' ').toUpperCase()} police station
      </h3>
      <div className="input-cont">
        <TextField
          required
          type="text"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
          label="name"
          variant="outlined"
        />
      </div>
      <br />

      <div className="input-cont" style={{ marginBottom: '20px' }}>
        <TextField
          required
          type="phone"
          value={number}
          onChange={(e) => {
            setnumber(e.target.value);
          }}
          label="mobile number"
          maxLength="10"
          variant="outlined"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (number.length === 10) {
            axios.get(config.database + '/api/otp/' + '91' + number).then((val) => {
              if (val.data.type === 'success') setentered(true);
              else alert('mobile number does not exist');
            });
          } else {
            alert('mobile number is invalid');
          }
        }}
        style={{ width: '250px' }}
      >
        Submit
      </Button>
    </Paper>
  );
};
export default MobnForm;
