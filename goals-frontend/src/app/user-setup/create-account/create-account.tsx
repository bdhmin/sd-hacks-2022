import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './create-account.css';
import { User } from '../../+types/user';

function CreateAccount() {

  function postNewUser() {
    const newUser: User = {
      username: 'bdmin',
      password: 'yoyoma',
      // descriptionParagraph: 'I am determined to follow through with my goals using this app.',
      // tags: [],
      // goals: [],
    }
    axios.post('/api/users', newUser)
    .then((_: any) => {
      console.log("success posting new user")
    })
    .catch((_: any) => {
      console.log("error posting")
    })
  }
  
  return (
    <div className='create-account'>
      <h1>Create Account</h1>
      <button onClick={() => postNewUser()}>Continue</button>
    </div>
  )
}

export default CreateAccount;