import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import Graph from './graph';
import GraphMob from './graph';
import { checker } from '../utils';

const Overview = ({ feedbacks, startDate, endDate, children }) => {
  const [review, setreview] = useState([]);
  const [statuscount, setstatuscount] = useState([]);
  // const [donebystate, setdoneby] = useState([]);
  // const [satisfiedstate, setsatisfied] = useState([]);
  const width = window.innerWidth;
  useEffect(() => {
    if (feedbacks) {
      // console.log(feedbacks);
      let [startyear, startmonth, startday] = startDate.split('-');
      let [endyear, endmonth, endday] = endDate.split('-');
      let arr = [
        { name: '1-star', rating: 0, behaviour: 0, cleanliness: 0, satisfied: 0, question5: 0 },
        { name: '2-star', rating: 0, behaviour: 0, cleanliness: 0, satisfied: 0, question5: 0 },
        { name: '3-star', rating: 0, behaviour: 0, cleanliness: 0, satisfied: 0, question5: 0 },
        { name: '4-star', rating: 0, behaviour: 0, cleanliness: 0, satisfied: 0, question5: 0 },
        { name: '5-star', rating: 0, behaviour: 0, cleanliness: 0, satisfied: 0, question5: 0 },
      ];
      let ratingcount = 0,
        behaviourcount = 0,
        cleanlinesscount = 0,
        satisfiactioncount = 0;
      // let done = [
      //   { name: 'SHO', value: 0 },
      //   { name: 'Additional SHO', value: 0 },
      //   { name: 'Duty Officer', value: 0 },
      //   { name: 'Other', value: 0 },
      // ];
      // let satis = [
      //   { name: 'yes', value: 0 },
      //   { name: 'no', value: 0 },
      // ];
      let count = 0;
      //console.log({ startday, startmonth, endday, endmonth });
      feedbacks.forEach((element) => {
        let mybool = false;
        let { created_at } = element;
        let elementdate = created_at.split('T');
        let [eleyear, elemonth, eleday] = elementdate[0].split('-');
        if (element.review) {
          if (startDate !== '' && endDate !== '') {
            if (checker([eleyear, elemonth, eleday], [startyear, startmonth, startday])) {
              if (checker([endyear, endmonth, endday], [eleyear, elemonth, eleday])) {
                mybool = true;
              }
            }
          } else if (startDate !== '') {
            if (checker([eleyear, elemonth, eleday], [startyear, startmonth, startday])) {
              mybool = true;
            }
          } else if (endDate !== '') {
            if (checker([endyear, endmonth, endday], [eleyear, elemonth, eleday])) {
              mybool = true;
            }
          } else {
            mybool = true;
          }
        }
        if (mybool) {
          count += 1;
          let { rating, behaviour, cleanliness, satisfied } = element.review;

          if (rating) {
            arr[rating - 1].rating += 1;
            ratingcount += rating;
          }
          if (behaviour) {
            arr[behaviour - 1].behaviour += 1;
            behaviourcount += behaviour;
          }
          if (cleanliness) {
            arr[cleanliness - 1].cleanliness += 1;
            cleanlinesscount += cleanliness;
          }
          if (satisfied) {
            arr[satisfied - 1].satisfied += 1;
            satisfiactioncount += satisfied;
          }

          // if (doneby) {
          //   if (doneby === 'SHO') {
          //     done[0].value += 1;
          //   } else if (doneby === 'Additional SHO') {
          //     done[0].value += 1;
          //   } else if (doneby === 'Duty Officer') {
          //     done[0].value += 1;
          //   } else {
          //     done[0].value += 1;
          //   }
          // }
        }
      });
      let countarr = [behaviourcount / count, cleanlinesscount / count, satisfiactioncount / count, ratingcount / count];
      //console.log(count);
      // setsatisfied(satis);
      // setdoneby(done);
      //console.log(arr);
      setstatuscount(countarr);
      setreview(arr);
    }
  }, [feedbacks, startDate, endDate]);
  // useEffect(() => {
  //   console.log(review);
  // }, [review]);
  return (
    // <div>
    //   <Paper>
    //     <div style={{ padding: '10px' }}>
    //       <Typography variant="h4" align="center">
    //         Overview
    //       </Typography>
    //     </div>
    //   </Paper>
    //   <br />

    //   <Paper>
    //     {' '}
    //     {children}
    <>
      {feedbacks && width > 800 && (
        <Grid container>
          <Grid item xs={6} align="center">
            <Graph review={review} datakey="behaviour" count={statuscount[0]} />
          </Grid>
          <Grid item xs={6} align="center">
            <Graph review={review} datakey="cleanliness" count={statuscount[1]} />
          </Grid>
          {/* <Grid item xs={4}>
              <Graph feedbacks={feedbacks} review={donebystate} datakey="value" />
            </Grid>{' '} */}
          <Grid item xs={6} align="center">
            <Graph review={review} datakey="satisfied" count={statuscount[2]} />
          </Grid>
          <Grid item xs={6} align="center">
            <Graph review={review} datakey="rating" count={statuscount[3]} />
          </Grid>
        </Grid>
      )}
      {feedbacks && width < 800 && (
        <Grid container>
          <Grid item xs={12} align="center">
            <GraphMob review={review} datakey="behaviour" count={statuscount[0]} />
          </Grid>
          <Grid item xs={12} align="center">
            <GraphMob review={review} datakey="cleanliness" count={statuscount[1]} />
          </Grid>

          {/* <Grid item xs={4}>
              <Graph feedbacks={feedbacks} review={donebystate} datakey="value" />
            </Grid>{' '} */}
          <Grid item xs={12} align="center">
            <GraphMob review={review} datakey="satisfied" count={statuscount[2]} />
          </Grid>
          <Grid item xs={12} align="center">
            <GraphMob review={review} datakey="rating" count={statuscount[3]} />
          </Grid>
        </Grid>
      )}
    </>
    //   </Paper>
    // </div>
  );
};

export default Overview;
