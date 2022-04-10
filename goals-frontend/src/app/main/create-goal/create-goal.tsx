import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './create-goal.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { Goal } from '../../+types/goal';

function CreateGoal() {
  const userId = localStorage.getItem('currentUserId');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [end_date, setEnd_date] = useState<Date | null>(null);
  const [subgoals, setSubgoals] = useState([]);

  const goal = {
    _creatorId: userId,
    _parentId: '',
    title: '',
    description: '',
    start_date: new Date(),
    end_date: new Date(),
    subgoals: [],
    depth: 0,
    tags: [],
    followers: [],
    follower_count: 0,
    inspired_goals: [],
  }

  function postGoal() {
    // Set start date on submission.
    goal.title = title;
    goal.description = description;
    goal.start_date = new Date();
    goal.end_date = end_date ? end_date : new Date();

    axios.post('/api/goals', goal)
      .then((_: any) => {
        console.log('Successfully created goal');
      })
      .catch((_: any) => {
        console.log('error posting goal');
      })
  }

  return (
    <div className='create-goal'>
      <h2>Create a Goal</h2>
      <h4>Current user: {userId}</h4>

      <p>Goal Title</p>
      <input type='text' value={title} onChange={(event) => setTitle(event.target.value)}></input>
      <p>Description</p>
      <input type='text' value={description} onChange={(event) => setDescription(event.target.value)}></input>

      <p>Completion Date</p>
      <DatePicker selected={end_date} onChange={(date) => setEnd_date(date)} />

      <button onClick={() => postGoal()}>Create Goal</button>

    </div>
  )
}

export default CreateGoal;