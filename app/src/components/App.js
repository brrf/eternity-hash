import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './Home'
import Login from './Login'
import Register from './Register'

function App(props) {
  return (
    <Router>

      <Switch>
            <Route exact path ='/' component={Home} />
            <Route path ='/authentication/login' component={Login} />
            <Route path ='/authentication/register' component={Register} />
            <Route render={() => (
              <div>
                <h1 className='throw404'>I'm throwing you a 404</h1>
                <img className='throw404' alt='404 error' src='data:image/jpeg;base64,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' />
              </div>)} />
      </Switch>
    </Router>
  );
}

export default connect()(App);
