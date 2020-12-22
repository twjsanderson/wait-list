import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// pages 
import Home from './Home';
import Analytics from './Analytics';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/analytics' component={Analytics} />
        <Redirect path="*" to="/" />
    </Switch>
);