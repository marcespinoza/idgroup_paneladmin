import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login/SignIn.js';
import Main from './components/Main/Main.js';
  

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/main" component={Main} />
        </Switch>
    )
}

export default Routes;