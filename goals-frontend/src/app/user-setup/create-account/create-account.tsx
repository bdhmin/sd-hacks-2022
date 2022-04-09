import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './create-account.css';
import { User } from '../../+types/user';

function CreateAccount() {

  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userFound, setUserFound] = useState(false);

  function find_user() {
    console.log('Got username', username);
    axios.get('api/users/username/' + username)
      .then((response: any) => {
        console.log(response);
        if (response.data == 'DNE') {
          // Can create user
          postNewUser();
          setUserFound(false);
        } else {
          console.log('user exists');
          setUserFound(true);
        }
      })
      .catch((_: any) => {
        console.log('ERROR');
      })
  }

  function postNewUser() {
    const newUser: User = {
      username: username,
      password: password,
      // descriptionParagraph: 'I am determined to follow through with my goals using this app.',
      // tags: [],
      // goals: [],
    }
    axios.post('/api/users', newUser)
    .then((_: any) => {
      console.log("success posting new user")
      login_user();
    })
    .catch((_: any) => {
      console.log("error posting")
    })
  }

  function login_user() {
    console.log('Got username', username);
    console.log('Got password', password);
    axios.get('api/users/username/' + username + '/' + password)
      .then((response: any) => {
        console.log(response);
        localStorage.setItem('currentUserId', response.data._id);
        navigate('/timeline/' + response.data._id);
      })
      .catch((_: any) => {
        console.log('ERROR');
      })
  }
  
  return (
    <div className='create-account'>
      <h1>Create Account</h1>
      <p>Username</p>
      <input type='text' value={username} onChange={(event) => setUsername(event.target.value)}></input>
      <p>Password</p>
      <input type='text' value={password} onChange={(event) => setPassword(event.target.value)}></input>
      <button onClick={() => find_user()}>Create user</button>
      {userFound ? (
       <p className='error'>*Username already exists</p>
      ) : (<p></p>)}
    </div>
  )
}

export default CreateAccount;