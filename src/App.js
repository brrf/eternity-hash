import React from 'react';
import artCover from './images/art-cover.jpg';

function App() {
  return (
    <div>
      <div className='navbar'>
        <h1>Eternity Hash</h1>
        <div className='navbar-right'>
            <a href="./authentication/login">My Account</a>
            <a href="./authentication/login"> Browse Collection</a>
        </div>
      </div>
      <img src={artCover} style={{width: '100%', height: '700px'}} alt='artistic design'/>
    </div>
  );
}

export default App;
