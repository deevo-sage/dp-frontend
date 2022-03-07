import React, { useState } from 'react';
import Mood from './moodnumber';
import { navigate } from '@reach/router';
import axios from 'axios';
import config from '../../../config';
import { TextField, Button, Paper } from '@material-ui/core';
import police from '../assets/images/police.png';
const Feedback = ({ station, nameinput, number }) => {
  const [name, setname] = useState(nameinput);
  const [mobno, setmobno] = useState(number);
  const [behaviour, setbehaviour] = useState(0);
  const [cleanliness, setcleanliness] = useState(0);
  const [rating, setrating] = useState(0);
  // const [question4, setquestion4] = useState(0);
  const [question5, setquestion5] = useState('yes');

  const [comment, setcomment] = useState('');

  async function submitform() {
    console.log('trying to submit');
    if (name !== '' && mobno !== '' && behaviour !== 0 && cleanliness !== 0 && rating !== 0)
      await axios
        .post(config.database + '/api/feedback', {
          name,
          mobno,
          station: station.toLowerCase().split('-').join(' '),
          review: {
            comment,
            behaviour,
            cleanliness,
            rating,

            satisfied: question5,
          },
        })
        .then(({ data }) => {
          console.log(data);
          navigate(`/thanks`);
        })
        .catch((err) => {
          console.error(err);
        });
    else {
      alert('Please fill the mandatory fields');
    }
  }
  return (
    <div className="feedback-cont">
      <Paper className="feedback-cont">
        <br />
        <img src={police} alt="delhi police logo" style={{ height: '100px' }} s />
        <h3 style={{ textAlign: 'center' }}>
          Thanks for visiting <br />
          {station.split('-').join(' ').toUpperCase()} police station
        </h3>
        <h4>Please Submit Your Feedback</h4>

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
            disabled
          />
        </div>
        <br />

        <div className="input-cont">
          <TextField
            required
            type="phone"
            value={mobno}
            onChange={(e) => {
              setmobno(e.target.value);
            }}
            label="mobile number"
            maxLength="10"
            variant="outlined"
            disabled
          />
        </div>

        {/* <h4 style={{ textAlign: 'center' }}>Who heard your complaint?*</h4>
          <div>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
              <Button
                color={question4 === 'SHO' ? 'secondary' : ''}
                onClick={() => {
                  setquestion4('SHO');
                }}
              >
                SHO{' '}
              </Button>
              <Button
                color={question4 === 'Additional SHO' ? 'secondary' : ''}
                onClick={() => {
                  setquestion4('Additional SHO');
                }}
              >
                Additional SHO
              </Button>
              <Button
                color={question4 === 'Duty Officer' ? 'secondary' : ''}
                onClick={() => {
                  setquestion4('Duty Officer');
                }}
              >
                Duty Officer
              </Button>
              <Button
                color={question4 === 'Other' ? 'secondary' : ''}
                onClick={() => {
                  setquestion4('Other');
                }}
              >
                Other
              </Button>
            </ButtonGroup> 
          </div>*/}
        <h4 style={{ textAlign: 'center' }}>Response Received*</h4>
        <div>
          <Mood state={question5} setstate={setquestion5} />
        </div>
        <h4 style={{ textAlign: 'center' }}>Staff Behaviour*</h4>
        <div>
          <Mood state={behaviour} setstate={setbehaviour} />
        </div>
        <h4 style={{ textAlign: 'center' }}>Cleanliness*</h4>

        <div>
          <Mood state={cleanliness} setstate={setcleanliness} />
        </div>

        <h4 style={{ textAlign: 'center' }}>Overall Experience*</h4>

        <div>
          <Mood state={rating} setstate={setrating} />
        </div>
        <br />

        <div className="input-cont">
          <TextField
            multiline="true"
            value={comment}
            style={{ minWidth: '250px' }}
            onChange={(e) => {
              setcomment(e.target.value);
            }}
            label="Comments/Suggestions"
            variant="outlined"
            rows={5}
          />
        </div>
        <br />

        <Button variant="contained" color="primary" onClick={submitform} style={{ width: '250px' }}>
          Submit
        </Button>
        <br />
        <br />
        <br />
      </Paper>
    </div>
  );
};
export default Feedback;
