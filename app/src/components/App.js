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
              <div style={{display: 'flex', justifyContent: 'center'}} >
                <h1 className='throw404' style={{color: 'black', marginTop: '100px'}}>Under development</h1>
              </div>)} />
      </Switch>
    </Router>
  );
}

export default connect()(App);
