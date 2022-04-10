import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './create-goal.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { Goal } from '../../+types/goal';

function CreateGoal() {
  const userId = localStorage.getItem('currentUserId');

  // Goal Content
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [end_date, setEnd_date] = useState<Date | null>(null);
  const [subgoals, setSubgoals] = useState<Goal[]>([]);
  
  // Subgoal Content
  const [isCreatingSubgoal, setIsCreatingSubgoal] = useState(false);
  const [subgoalTitle, setSubgoalTitle] = useState('');
  const [subgoalDescription, setSubgoalDescription] = useState('');
  const [subgoalEnd_date, setSubgoalEnd_date] = useState<Date | null>(null);

  const emptyGoal: Goal = {
    _id: '',
    _creatorId: userId,
    _parentId: '',
    title: '',
    description: '',
    start_date: new Date(),
    end_date: new Date(),
    subgoals: new Array<Goal>(),
    depth: 0,
    tags: [],
    followers: [],
    follower_count: 0,
    inspired_goals: [],
    inspired_by: null,
  }

  function createSubgoal() {
    setIsCreatingSubgoal(true);
  }

  function addSubgoal() {
    let subgoal: Goal = {...emptyGoal}; // Hardcopy of empty goal
    subgoal.depth = 1;
    subgoal.title = subgoalTitle;
    subgoal.description = subgoalDescription;
    subgoal.end_date = subgoalEnd_date ? subgoalEnd_date : new Date();
    setSubgoals([...subgoals, subgoal])
    console.log('added a subgoal', subgoals)
    setIsCreatingSubgoal(false);
    setSubgoalTitle('');
    setSubgoalDescription('');
    setSubgoalEnd_date(null);
  }

  function getSubgoals() {
    var x = [];
    for (let subgoal of subgoals) {
      x.push(
        <h6>Subgoal: {subgoal.title} - {subgoal.description}</h6>
      );
    }
    return x;
  }

  function postGoal() {
    let newGoal: Goal = {...emptyGoal} // Hardcopy of empty goal
    // Set start date on submission.
    newGoal.title = title;
    newGoal.description = description;
    newGoal.start_date = new Date();
    newGoal.end_date = end_date ? end_date : new Date();
    newGoal.subgoals = subgoals;

    axios.post('/api/goals', newGoal)
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

      <p>Subgoals</p>
      {(getSubgoals())}

      {isCreatingSubgoal ? (
        <div>
            <p>Goal Title</p>
            <input type='text' value={subgoalTitle} onChange={(event) => setSubgoalTitle(event.target.value)}></input>
            <p>Description</p>
            <input type='text' value={subgoalDescription} onChange={(event) => setSubgoalDescription(event.target.value)}></input>

            <p>Completion Date</p>
            <DatePicker selected={subgoalEnd_date} onChange={(date) => setSubgoalEnd_date(date)} />
            <button onClick={() => addSubgoal()}>Add subgoal</button>
        </div>
      ) : (
        <button onClick={() => createSubgoal()}>Create a subgoal</button>
      )}

      <br/>
      <button onClick={() => postGoal()}>Create Goal</button>

    </div>
  )
}

export default CreateGoal;