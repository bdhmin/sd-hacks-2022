import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './create-goal.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { Goal } from '../../+types/goal';
import { Tag } from '../../+types/tag';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';

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

  // Tags Content
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [currentTag, setCurrentTag] = useState<Tag | null>({_id: '', text: ''});
  const filter = createFilterOptions<Tag>();
  var tags: Tag[] = [];

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
    newGoal.tags = selectedTags;

    axios.post('/api/goals', newGoal)
      .then((_: any) => {
        console.log('Successfully created goal');
      })
      .catch((_: any) => {
        console.log('error posting goal');
      })
  }

  function displaySelectedTags() {
    var x = [];
    for (let selectedTag of selectedTags) {
      x.push(
        <h6>{selectedTag.text}</h6>
      )
    }
    return x;
  }

  function getTags() {
    axios.get('/api/tags')
      .then((response: any) => {
        console.log('tagdata', response.data);
        tags = response.data;
      })
      .catch((_: any) => {
        console.log('ERROR');
      })
  }

  function addTag(tag: Tag) {
    let id: string = '';

    axios.post('/api/tags', tag)
      .then((response: any) => {
        console.log('added Tag');
        id = response.data.id;
      })
      .catch((_: any) => {
        console.log('ERROR');
      })
    return id;
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
      <p>Add Tags</p>
      {displaySelectedTags()}
      <Autocomplete
        value={currentTag}
        onChange={(event, newTag) => {
          if (typeof newTag === 'string') {
            let id = tags.find(tag => tag.text === newTag)?._id;
            const tag: Tag = {
              _id: id ? id : '',
              text: newTag,
            }
            setCurrentTag(tag);
            setSelectedTags([...selectedTags, tag])
          } else if (newTag && newTag.text) {
            // Create a new value from the user input
            const tag: Tag = {
              _id: newTag._id,
              text: newTag.text,
            }
            setCurrentTag(tag);
            setSelectedTags([...selectedTags, tag])
          } else {
            newTag = newTag ? newTag : {_id: '', text: ''};
            setCurrentTag(newTag);
            setSelectedTags([...selectedTags, newTag])
          }
        }}
        filterOptions={(options, params) => {

          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.text);
          if (inputValue !== '' && !isExisting) {
            let id = addTag({
              _id: '',
              text: inputValue,
            })
            filtered.push({
              _id: id,
              text: inputValue,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={tags}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.text) {
            return option.text;
          }
          // Regular option
          return option.text;
        }}
        renderOption={(props, option) => <li {...props}>{option.text}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} />
        )}
      />

      <br/>
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