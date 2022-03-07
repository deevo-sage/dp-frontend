import { navigate } from '@reach/router';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import config from '../../../config';
import Detailedinner from './detailedinner';
import Navbar from './responsivenav';
import Overview from './overview';
import SelectArea from './selectarea';
import { Paper } from '@material-ui/core';
const montharrinit = (setmonths) => {
  const today = new Date();
  const monthnow = today.getMonth() + 1;
  const yearnow = today.getFullYear();

  const montharr = [];
  for (let m = 3, y = 2021; m - 1 <= monthnow || y < yearnow; m++) {
    if (m === 13) {
      m = 1;
      y += 1;
    }
    montharr.push({ month: m, year: y });
    setmonths(montharr);
  }
};
function Loggedin({ page }) {
  const [user, setuser] = useState();

  useEffect(() => {
    if (!user) {
      let getuser = localStorage.getItem('user');
      if (getuser) {
        let ouruser = JSON.parse(getuser);
        setuser(ouruser);
      }
    }
  }, [user]);
  const [station, setstation] = useState('all');
  const [feedbacks, setfeedback] = useState();
  const [startDate, setstartdate] = useState('');
  const [endDate, setenddate] = useState('');
  const [month, setmonth] = useState('all');
  const [monthsarray, setmonthsarray] = useState([]);
  const [zone, setzone] = useState('all');
  const [range, setrange] = useState('all');
  const [dist, setdist] = useState('all');
  const [subdiv, setsubdiv] = useState('all');
  const [ps, setps] = useState('all');

  useEffect(() => {
    setrange('all');
    setdist('all');
    setsubdiv('all');
    setps('all');
  }, [zone]);
  useEffect(() => {
    setdist('all');
    setsubdiv('all');
    setps('all');
  }, [range]);
  useEffect(() => {
    setsubdiv('all');
    setps('all');
  }, [dist]);
  useEffect(() => {
    setps('all');
    setstation(ps);
  }, [subdiv]);
  const getdat = useCallback(
    (role) => {
      axios
        .post(config.database + '/admin/feedback', { user: user, role })
        .then(({ data }) => {
          setfeedback(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [user]
  );
  useEffect(() => {
    user && getdat(user.role);
  }, [user]);
  useEffect(() => {
    if (!user) {
      let getuser = localStorage.getItem('user');
      if (getuser) {
        let ouruser = JSON.parse(getuser);
        setuser(ouruser);
      } else {
        console.log('not logged in');
        navigate('/');
      }
    }
  }, [user, setuser]);
  useEffect(() => {
    montharrinit(setmonthsarray);
  }, [user]);

  useEffect(() => {
    if (month !== 'all') {
      //console.log(month);
      let m = monthsarray[month].month,
        y = monthsarray[month].year,
        m2 = monthsarray[month + 1].month,
        y2 = monthsarray[month + 1].year;
      if (m < 10) {
        m = `0${m}`;
      }
      if (m2 < 10) {
        m2 = `0${m2}`;
      }
      let start = `${y}-${m}-01`,
        end = `${y2}-${m2}-01`;
      setstartdate(start);
      setenddate(end);
    }
  }, [month, monthsarray]);
  const TopArea = () => (
    <SelectArea
      zone={zone}
      setzone={setzone}
      range={range}
      setrange={setrange}
      dist={dist}
      setdist={setdist}
      getdat={getdat}
      subdiv={subdiv}
      setsubdiv={setsubdiv}
      ps={ps}
      setps={setps}
      station={station}
      setstation={setstation}
      startDate={startDate}
      endDate={endDate}
      month={month}
      setmonth={setmonth}
      monthsarray={monthsarray}
      setenddate={setenddate}
      setstartdate={setstartdate}
      user={user}
      feedbacks={feedbacks && feedbacks.feedbacks}
      setfeedback={setfeedback}
      avgs={feedbacks && feedbacks.avgs[0]}
    />
  );
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Navbar user={user} setuser={setuser}>
        <Paper>
          {user && <TopArea />}
          {user && page === 'main' && (
            <Paper elevation={0}>
              <Overview feedbacks={feedbacks && feedbacks.feedbacks} startDate={startDate} endDate={endDate} avgs={feedbacks && feedbacks.avgs[0]}></Overview>
            </Paper>
          )}
          {user && page === 'detailed' && (
            <Paper elevation={0}>
              <Detailedinner
                station={station}
                setstation={setstation}
                feedbacks={feedbacks && feedbacks.feedbacks}
                startDate={startDate}
                endDate={endDate}
                avgs={feedbacks && feedbacks.avgs[0]}
              ></Detailedinner>
            </Paper>
          )}
        </Paper>
      </Navbar>
    </div>
  );
}
export default Loggedin;
