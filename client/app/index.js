import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import App from './components/App'
import NotFound from './components/NotFound'
import Login from './components/Login'
import './css/main.sass'

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
