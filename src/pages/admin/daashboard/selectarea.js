import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Paper, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { checker, findUtil } from '../utils';
import { months, types } from './staticsvars';
import axios from 'axios';
import config from '../../../config';
import Pdf from './pdf';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const SelectArea = ({
  zone,
  range,
  dist,
  subdiv,
  ps,
  setzone,
  setrange,
  setdist,
  setsubdiv,
  setps,
  getdat,
  feedbacks,
  avgs,
  setfeedback,
  user,
  station,
  setstation,
  startDate,
  endDate,
  month,
  setmonth,
  monthsarray,
  setenddate,
  setstartdate,
}) => {
  const classes = useStyles();
  const [number, setnumber] = useState('');
  const [name, setname] = useState('');
  const [count, setcount] = useState();
  const [choice, setchoice] = useState('name');
  const getByName = () => {
    if (name.length !== 0)
      axios.post(config.database + '/admin/feedback/name', { user, station, name }).then(({ data }) => {
        setfeedback(data);
        setcount(data.feedbacks.length);
      });
    else {
      alert('Search field empty');
    }
    // axios
    // .post(config.database + '/admin/feedback', { station: station, user: user })
  };
  const getByNumber = () => {
    if (number.length !== 0)
      axios.post(config.database + '/admin/feedback/number', { user, station, number }).then(({ data }) => {
        setfeedback(data);
        setcount(data.feedbacks.length);
      });
    else {
      alert('Search field empty');
    }
  };
  const getByChoice = () => {
    choice === 'name' ? getByName() : getByNumber();
  };
  const Label = ({ children, id }) => {
    return (
      <InputLabel id={id} style={{ fontSize: '1.25rem', background: 'white' }} variant="outlined" shrink={true}>
        {children}
      </InputLabel>
    );
  };
  const Dropdown = ({ i, set, val, disable }) => {
    const [arr, setarr] = useState([]);
    useEffect(() => {
      let x = [zone, range, dist, subdiv, ps];
      x[i] = 'all';
      // console.log(findUtil({ role: x }, i));
      setarr(findUtil({ role: x }, i));
    }, [i]);
    return (
      <FormControl className={classes.formControl} variant="outlined">
        <Label id={types[i]}>{i !== 4 ? types[i] : 'Police Station'}</Label>
        <Select
          value={val}
          style={{ fontSize: '1.2rem', width: '150px' }}
          onChange={(e) => {
            set(e.target.value);
            // console.log({ ur: user.role });
          }}
          disabled={disable}
        >
          {user.role[i] === 'all' && <MenuItem value={'all'}>All</MenuItem>}
          {user.role[i] === 'all' &&
            arr.map((item, key) => {
              return (
                <MenuItem value={item.toLowerCase()} key={item + key}>
                  {item}
                </MenuItem>
              );
            })}
          {user.role[i] !== 'all' && <MenuItem value={user.role[i]}>{user.role[i]}</MenuItem>}
        </Select>
      </FormControl>
    );
  };
  return (
    <Paper elevation={0} align="center" style={{ padding: '10px 0px', marginBottom: 5 }}>
      <br />
      <Dropdown i={0} set={setzone} val={zone} />
      <Dropdown i={1} set={setrange} val={range} disable={zone === 'all'} />
      <Dropdown i={2} set={setdist} val={dist} disable={range === 'all'} />
      <br />
      <Dropdown i={3} set={setsubdiv} val={subdiv} disable={dist === 'all'} />
      <Dropdown i={4} set={setps} val={ps} disable={subdiv === 'all'} />
      <br />
      <Button
        type="contained"
        onClick={() => {
          getdat([zone, range, dist, subdiv, ps]);
        }}
        style={{ border: '1px solid black' }}
      >
        Search
      </Button>
      <br />
      <FormControl className={classes.formControl} variant="outlined">
        <Label id="months-label">Months</Label>
        <Select
          labelId="months-label"
          id="month-select"
          style={{ fontSize: '1.2rem', width: '150px' }}
          value={month}
          onChange={(e) => {
            setmonth(e.target.value);
          }}
        >
          <MenuItem value={'all'}>All</MenuItem>
          {monthsarray.map((item, key) => {
            if (key !== monthsarray.length - 1)
              return (
                <MenuItem value={key} key={item + key}>
                  {months[item.month - 1] + ' ' + item.year}
                </MenuItem>
              );
          })}
        </Select>
      </FormControl>{' '}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
        <FormControl className={classes.formControl} variant="outlined">
          <TextField
            variant="outlined"
            id="start-date"
            type="date"
            label="Start Date"
            style={{ fontSize: '1.2rem' }}
            value={startDate}
            onChange={(e) => {
              if (endDate !== '') {
                if (checker(endDate.split('-'), e.target.value.split('-'))) {
                  setstartdate(e.target.value);
                } else {
                  alert('start date cannot be greater than end date');
                }
              } else {
                setstartdate(e.target.value);
              }
            }}
            InputLabelProps={{ style: { fontSize: '1.25rem', background: 'white' }, shrink: true }}
          />
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <TextField
            variant="outlined"
            id="end-date"
            label="End Date"
            type="date"
            style={{ fontSize: '1.2rem' }}
            value={endDate}
            onChange={(e) => {
              if (startDate !== '') {
                if (checker(e.target.value.split('-'), startDate.split('-'))) {
                  setenddate(e.target.value);
                } else {
                  alert('end date cannot be smaller than start date');
                }
              } else {
                setenddate(e.target.value);
              }
            }}
            InputLabelProps={{
              style: { fontSize: '1.25rem', background: 'white' },
              shrink: true,
            }}
          />
        </FormControl>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 700 }}>Search by:- {'  '}</span>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={choice}
            onChange={(e) => {
              setchoice(e.target.value);
            }}
            style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', justifyContent: 'center' }}
          >
            <FormControlLabel value="name" control={<Radio />} label="name" />
            <FormControlLabel value="number" control={<Radio />} label="number" />
          </RadioGroup>
        </FormControl>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
        <FormControl className={classes.formControl} variant="outlined">
          <TextField
            variant="outlined"
            id="start-date"
            type="Text"
            label={choice === 'name' ? 'Name' : 'Mobile'}
            value={choice === 'name' ? name : number}
            style={{ fontSize: '1.2rem' }}
            onChange={(e) => {
              choice === 'name' ? setname(e.target.value) : setnumber(e.target.value);
            }}
            required
            InputLabelProps={{ style: { fontSize: '1.25rem', background: 'white' }, shrink: true }}
          />
        </FormControl>
        <Button
          type="contained"
          onClick={() => {
            getByChoice();
          }}
          style={{ border: '1px solid black' }}
        >
          Search
        </Button>
        {count && ` ${count}  feedbacks by this ${choice === 'name' ? 'name' : 'number'}`}
      </div>
      <div>
        <Button
          type="contained"
          onClick={() => {
            if (count !== null) {
              getdat(user.role);
              setcount(null);
              setstation('all');
              setenddate('');
              setstartdate('');
              setmonth('all');
              setname('');
              setnumber('');
            } else {
              alert('');
            }
          }}
          style={{ border: '1px solid black' }}
        >
          Reset
        </Button>
      </div>
      {/* <h3>{(startDate !== '' || endDate !== '') && `Feedback Report for ${station}. Reviews${startDate === '' ? '' : ` from ${startDate}`} ${endDate === '' ? '' : ` till ${endDate}`}`}</h3>
      <Paper elevation={0} align="center">
        <Pdf feedbacks={feedbacks} statuscount={avgs} station={station} startDate={startDate} endDate={endDate} />
      </Paper> */}
    </Paper>
  );
};
export default SelectArea;
