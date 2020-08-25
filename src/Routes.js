import React from 'react';
import {Switch, Route, Router, HashRouter} from 'react-router-dom'
import Login from './components/Login/Login.js';
import Main from './components/Main/Main.js';
import { createBrowserHistory } from "history";
  

const Routes = () => {
    const browserHistory = createBrowserHistory();

    return(
        <HashRouter basename="/"> 
        <Switch>
            <Route exact  path="/" component={Login} />
            <Route  path="/main" component={Main} />
            <Route component={Main} />
        </Switch>
    </HashRouter>
    )
}

export default Routes;