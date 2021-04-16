import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// @ts-ignore
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Login from './pages/login/Login';
import Plan from './pages/plan/Plan';
import History from './pages/History';
import Account from './pages/Account';
import Tablet from './pages/Tablet';
import Reservation from './pages/Reservation';

import './App.css';

const localizer = momentLocalizer(moment);

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/plan" component={() => <Plan localizer={localizer} />} />
          <Route path="/history" component={History} />
          <Route path="/account" component={Account} />
          <Route path="/tablet" component={Tablet} />
          <Route path="/" component={Reservation} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
