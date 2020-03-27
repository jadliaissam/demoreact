import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Configuration from './Configuration'
import Dashboard from './Dashboard'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile'
import Details from './Details'
import Header from './Header'

export default function Home() {
    return (
        <div>
            <Route path='*'>
                <Header user={{ name: 'Alex robert' }} />
            </Route>
            <Switch>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route path="/product/:id" children={<Details />} />

            </Switch>
        </div>
    )
}