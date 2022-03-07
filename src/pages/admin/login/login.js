import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import config from '../../../config';
import CustomInput from './Custominput';
import Button from './Button';

const Login = () => {
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
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  useEffect(() => {
    if (user) {
      navigate('/dashboard/main');
    }
  }, [user]);
  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post(config.database + '/admin/login', {
        email,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        const roles = [];
        for (let i = 0; i < 5; i++) {
          if (data.role[i]) {
            roles.push(data.role[i]);
          } else {
            roles.push('all');
          }
        }
        data.role = roles;
        localStorage.setItem('user', JSON.stringify(data));
        setuser(data);
        navigate('/dashboard/main');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="App">
      <form className="form" onSubmit={submitForm}>
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={(e) => setemail(e.target.value)}
          type="text"
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={(e) => setpassword(e.target.value)}
          type="password"
        />

        <Button type="button" color="primary" className="form__custom-button" onClick={submitForm}>
          Log in
        </Button>
      </form>
    </div>
  );
};
export default Login;
