import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import Login from './Components/Login';

export default (
        <Switch>
            <Route path='/dashboard' component={Dashboard}/>
            <Route exact path='/' component={Login}/>
        </Switch>
    )
