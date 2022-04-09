import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {

  function getDataTemplate() {
    axios.get('/api/users')
      .then((response: any) => {
        console.log(response);
      })
      .catch((_: any) => {
        console.log('ERROR');
      })
  }

  function postDataTemplate() {
    axios.post('/api/users', {
      firstName: 'John',
      lastName: 'Doe',
      emailId: 'email@email.com'
    })
    .then((_: any) => {
      console.log("success posting")
    })
    .catch((_: any) => {
      console.log("error posting")
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>All Communities</p>
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => postDataTemplate()}>click to post</button>
        <button onClick={() => getDataTemplate()}>click to get</button>
      </header>
    </div>
  );
}

export default App;
