import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Login from './pages/login/Login';
import Plan from './pages/Plan';
import History from './pages/History';
import Account from './pages/Account';
import Tablet from './pages/Tablet';
import Reservation from './pages/Reservation';
import NavigationBar from './components/NavigationBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Grid container direction="column">
        <Grid item>
          <NavigationBar />
        </Grid>
        <Grid item container>
          <Grid item xs={1} md={2} />
          <Grid item xs={10} md={8}>
            <Router>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/plan" component={Plan} />
                <Route path="/history" component={History} />
                <Route path="/account" component={Account} />
                <Route path="/tablet" component={Tablet} />
                <Route path="/" component={Reservation} />
              </Switch>
            </Router>
          </Grid>
          <Grid item xs={1} md={2} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
