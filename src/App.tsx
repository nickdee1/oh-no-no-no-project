import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./pages/Login";
import Plan from "./pages/Plan";
import History from "./pages/History";
import Account from "./pages/Account";
import Tablet from "./pages/Tablet";
import Reservation from "./pages/Reservation";

import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/plan" component={Plan}/>
                    <Route path="/history" component={History}/>
                    <Route path="/account" component={Account}/>
                    <Route path="/tablet" component={Tablet}/>
                    <Route path="/" component={Reservation}/>
                </Switch>
            </Router>
        </div>
  );
}

export default App;
