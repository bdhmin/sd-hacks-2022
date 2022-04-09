import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {

  const [username, setUsername] = useState(0);
  const [password, setpassword] = useState(0);

  function loginUser() {
    console.log('Got username', username);
    console.log('Got password', password);
  }
  
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