import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [canLogin, setCanLogin] = useState(true);

  function login_user() {
    console.log('Got username', username);
    console.log('Got password', password);
    axios.get('api/users/username/' + username + '/' + password)
      .then((response: any) => {
        if (response.data == 'DNE' || response.data == 'WRNG') {
          console.log('rejected, input is wrong');
          setCanLogin(false);
        } else {
          setCanLogin(true);
        }
      })
      .catch((_: any) => {
        console.log('ERROR');
      })
  }
  
  return (
    <div className='login'>
      <p>Username</p>
      <input type='text' value={username} onChange={(event) => setUsername(event.target.value)}></input>
      <p>Password</p>
      <input type='text' value={password} onChange={(event) => setPassword(event.target.value)}></input>
      <div className='continue'>
        <p className='fade'>Don't have an account? <Link to='/create-account'>Create one</Link></p>
        <button onClick={() => login_user()}>Log in</button>
      </div>
      {!canLogin ? (
       <p className='error'>*Username or password is incorrect</p>
      ) : (<p></p>)}
    </div>
  )
}

export default Login;