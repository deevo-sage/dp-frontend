import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import Thanks from './pages/user/thanks/thanks';
import Login from './pages/admin/login/login';
import LoggedIn from './pages/admin/daashboard';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import Feedbackpage from './pages/user/feedback';
function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'light',
          primary: {
            main: '#e8eaf6',
          },
          secondary: teal,
        },
      }),
    []
  );
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Feedbackpage path="feedback/:station" />
          <Thanks path="thanks" />
          <Login path="/" />
          <LoggedIn path="/dashboard/:page" />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
