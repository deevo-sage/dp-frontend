import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { checker } from '../utils';
import { replies, COLORS } from './staticsvars';
import Pdf from './pdf';
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Detailedinner = ({ station, feedbacks, startDate, endDate, children, avgs }) => {
  const [innerfeedbacks, setinnerfeedbacks] = useState([]);
  const [statuscount, setstatuscount] = useState([]);

  useEffect(() => {
    console.log(avgs);
    if (feedbacks) {
      let [startyear, startmonth, startday] = startDate.split('-');
      let [endyear, endmonth, endday] = endDate.split('-');
      let ratingcount = 0,
        behaviourcount = 0,
        cleanlinesscount = 0,
        satisfiactioncount = 0;
      let count = 0;

      let arr = [];
      feedbacks.forEach((element) => {
        let mybool = false;

        let { created_at } = element;
        let elementdate = created_at.split('T');
        let [eleyear, elemonth, eleday] = elementdate[0].split('-');
        // console.log({ eleyear, elemonth, eleday });
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
          arr.push(element);
          count += 1;
          let { rating, behaviour, cleanliness, satisfied } = element.review;

          if (rating) {
            ratingcount += rating;
          }
          if (behaviour) {
            behaviourcount += behaviour;
          }
          if (cleanliness) {
            cleanlinesscount += cleanliness;
          }
          if (satisfied) {
            satisfiactioncount += satisfied;
          }
        }
      });

      let countarr = [Math.floor(satisfiactioncount / count), Math.floor(behaviourcount / count), Math.floor(cleanlinesscount / count), Math.floor(ratingcount / count)];
      setstatuscount(countarr);
      setinnerfeedbacks(arr);
    }
  }, [feedbacks, startDate, endDate]);
  return (
    // <div>
    //   <Paper>
    //     <div style={{ padding: '10px' }}>
    //       <Typography variant="h4" align="center">
    //         Detailed View
    //       </Typography>
    //     </div>
    //   </Paper>
    //   <br />

    //   <TableContainer component={Paper}>
    //     {children}
    <>
      <Paper elevation={0} align="center">
        <h3>{(startDate !== '' || endDate !== '') && `Feedback Report for ${station}. Reviews${startDate === '' ? '' : ` from ${startDate}`} ${endDate === '' ? '' : ` till ${endDate}`}`}</h3>
        <Pdf feedbacks={innerfeedbacks} statuscount={avgs} station={station} startDate={startDate} endDate={endDate} />
      </Paper>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}>Name</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}>Number</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}>Date</b>
            </TableCell>
            {station === 'all' && (
              <TableCell align="center">
                <b style={{ fontSize: '1.25rem' }}>Police Station</b>
              </TableCell>
            )}
            {/* <TableCell align="center">
                <b style={{ fontSize: '1.25rem' }}>Done by</b>
              </TableCell> */}
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}>Satisfaction</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}>Behaviour</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}>Cleanliness</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}>Overall</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}>Comment</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}></b>
            </TableCell>

            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}></b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}></b>
            </TableCell>
            {station === 'all' && (
              <TableCell align="center">
                <b style={{ fontSize: '1.25rem' }}></b>
              </TableCell>
            )}
            {/* <TableCell align="center">
                <b style={{ fontSize: '1.25rem' }}>Done by</b>
              </TableCell> */}
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem', color: avgs && COLORS[avgs && Math.floor(avgs.satisfied)] }}>{avgs && replies[Math.floor(avgs.satisfied)]}</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem', color: avgs && COLORS[avgs && Math.floor(avgs.behaviour)] }}> {avgs && replies[Math.floor(avgs.behaviour)]}</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem', color: avgs && COLORS[avgs && Math.floor(avgs.cleanliness)] }}> {avgs && replies[Math.floor(avgs.cleanliness)]}</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem', color: avgs && COLORS[avgs && Math.floor(avgs.rating)] }}> {avgs && replies[Math.floor(avgs.rating)]}</b>
            </TableCell>
            <TableCell align="center">
              <b style={{ fontSize: '1.25rem' }}></b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {innerfeedbacks &&
            innerfeedbacks.map((data, key) => {
              return (
                <StyledTableRow key={data.name + key}>
                  <StyledTableCell align="center">{data.name}</StyledTableCell>
                  <StyledTableCell align="center">{data.mobno}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(data.created_at).toDateString()}</StyledTableCell>

                  {station === 'all' && <StyledTableCell align="center">{data.station.split('-').join(' ')}</StyledTableCell>}
                  {/* <StyledTableCell align="center">{data.review && data.review.doneby}</StyledTableCell> */}
                  <StyledTableCell align="center">{data.review && data.review.satisfied}</StyledTableCell>
                  <StyledTableCell align="center">{data.review && data.review.behaviour}</StyledTableCell>
                  <StyledTableCell align="center">{data.review && data.review.cleanliness}</StyledTableCell>
                  <StyledTableCell align="center">{data.review && data.review.rating}</StyledTableCell>
                  <StyledTableCell align="center">{data.review && data.review.comment}</StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
    //   </TableContainer>
    // </div>
  );
};

export default Detailedinner;
