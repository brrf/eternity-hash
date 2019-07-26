import React from 'react';
import artCover from '../images/art-cover.jpg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <img src={artCover} style={{width: '100%', height: '700px'}} alt='artistic design'/>
      </div>
    </Router>
  );
}

export default App;
