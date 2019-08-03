import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Collection from './Collection';
import Other from './Other';

function App(props) {
  return (
    <Router>

      <Switch>
            <Route exact path ='/' component={Home} />
            <Route path ='/authentication/login' component={Login} />
            <Route path ='/authentication/logout' component={Logout} />
            <Route path ='/authentication/register' component={Register} />
            <Route path ='/collection' component={Collection} />
            <Route path='/comingsoon' component={Other} />
      </Switch>
    </Router>
  );
}

export default connect()(App);
