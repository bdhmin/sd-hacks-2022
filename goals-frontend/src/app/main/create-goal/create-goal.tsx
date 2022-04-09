import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './create-goal.css';

function CreateGoal() {
  const userId = localStorage.getItem('currentUserId');

  return (
    <div className='create-goal'>
      <h2>Create a Goal</h2>
      <h4>Current user: {userId}</h4>

      

    </div>
  )
}

export default CreateGoal;