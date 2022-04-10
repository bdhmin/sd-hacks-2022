import React from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Landing from './app/main/landing/landing';
import Timeline from './app/main/timeline/timeline';
import CreateAccount from './app/user-setup/create-account/create-account';
import Navbar from './app/shared/navbar/navbar';
import CreateGoal from './app/main/create-goal/create-goal';
import Explore from './app/main/explore/explore';
import ViewGoal from './app/main/view-goal/view-goal';

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
    <div className='App'>
      {/* <button onClick={() => postDataTemplate()}>click to post</button>
      <button onClick={() => getDataTemplate()}>click to get</button> */}

      {/* Routing */}
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Landing/> }/>
          <Route path='/create-account' element={ <CreateAccount/> }/>
          <Route path='/timeline' element={ <Timeline/> }/>
          <Route path='/create-goal' element={ <CreateGoal/> }/>
          <Route path='/explore' element={ <Explore/> } />
          <Route path='/view-goal' element={ <ViewGoal/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
