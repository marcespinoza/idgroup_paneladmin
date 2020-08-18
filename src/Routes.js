import React from 'react';
import {Switch, Route, Router} from 'react-router-dom'
import Login from './components/Login/Login.js';
import Main from './components/Main/Main.js';
import { createBrowserHistory } from "history";
  

const Routes = () => {
    const browserHistory = createBrowserHistory();

    return(
    
        <Switch>
            <Route exact={true}  path="/" component={Login} />
            <Route exact={true} path="/main" component={Main} />
        </Switch>
    
    )
}

export default Routes;