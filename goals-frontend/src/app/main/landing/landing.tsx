import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './landing.css';

import Login from '../../user-setup/login/login';

function Landing() {
  
  return (
    <div className='landing'>
      <h1>This is Goals.</h1>
      <Login />
    </div>
  )
}

export default Landing;