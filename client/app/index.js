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
import Landing from './components/Landing'
import UserDashboard from './components/UserDashboard'
import './css/main.sass'

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Landing}/>
				<Route exact path="/account" component={UserDashboard} />
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
