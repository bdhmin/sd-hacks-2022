import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  
  return (
    <div className='login'>
      <p>Username</p>
      <input></input>
      <p>Password</p>
      <input></input>
      <div className='continue'>
        <p className='fade'>Don't have an account? <Link to='/create-account'>Create one</Link></p>
        <button>Log in</button>
      </div>
    </div>
  )
}

export default Login;