import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// @ts-ignore
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Login from './pages/login/Login';
import Plan from './pages/plan/Plan';
import History from './pages/History';
import Account from './pages/Account';
import Tablet from './pages/Tablet';
import Main from './pages/main/Main';
import 'moment/locale/cs';

import './App.css';
import Reception from './pages/reception/Reception';
import UnauthenticatedRoute from './components/router/UnauthenticatedRoute';
import AuthenticatedRoute from './components/router/AuthenticatedRoute';
import { useAppSelector } from './hooks';
import AdminRoute from './components/router/AdminRoute';

function App() {
  const localizer = momentLocalizer(moment);
  const logged = useAppSelector((state) => state.login.logged);
  const role = useAppSelector((state) => state.login.role);

  return (
    <div className="App">
      <Router>
        <Switch>
          <UnauthenticatedRoute path="/login" component={Login} logged={logged} />
          <AuthenticatedRoute
            path="/plan"
            component={() => <Plan localizer={localizer} />}
            logged={logged}
          />
          <AuthenticatedRoute path="/history" component={History} logged={logged} />
          <AuthenticatedRoute path="/account" component={Account} logged={logged} />
          <AdminRoute path="/tablet" component={Tablet} logged={logged} role={role} />
          <AdminRoute
            path="/reception"
            component={() => <Reception localizer={localizer} />}
            logged={logged}
            role={role}
          />
          <AuthenticatedRoute path="/" component={Main} logged={logged} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
