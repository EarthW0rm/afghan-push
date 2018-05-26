import React from 'react'
import {  BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Todo from './todo/todo'

export default props => (
    <Switch>
        <Route exact path="/" component={Todo} />
        <Route path="/todos" component={Todo} />
        <Route component={Todo} />
    </Switch>
)