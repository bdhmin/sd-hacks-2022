import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './landing.css';

import Login from '../../user-setup/login/login';

function Landing() {
  
  return (
    <div className='landing'>
      <div className='left-block'>
        <h2 className='left-block-text'>Set Goals.<br/>Finish Goals.<br/><br/>Discover your sense of belonging...</h2>
      </div>
      <div className='right-block'>
        <h1>This is Marathon.</h1>
        <Login />
      </div>
    </div>
  )
}

export default Landing;