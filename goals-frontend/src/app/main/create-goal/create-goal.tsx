import React, { useEffect, useState } from 'react';
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

  function findTag(text: string) {
    var x: Tag = {_id: '', text: ''};
    axios.get('/api/tags/' + text)
      .then((response: any) => {
        x = response.data;
      })
      .catch((_: any) => {
        console.log('ERROR')
      })
    return x;
  }

  function addTag(tag: Tag) {
    let id: string = '';

    axios.post('/api/tags', tag)
      .then((response: any) => {
        console.log('added Tag');
        id = response.data.id;
        getTags();
      })
      .catch((_: any) => {
        console.log('ERROR');
      })
    return id;
  }

  useEffect(() => {
    getTags();
  }, [])

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
            if (selectedTags.find(tag => tag.text === newTag)) {
              return;
            }
            var id = tags.find(tag => tag.text === newTag)?._id;
            // If tag is selected and exists
            var tag: Tag;
            if (id) {
              tag = {
                _id: newTag,
                text: newTag,
              }
            } else {
              id = addTag({
                _id: newTag,
                text: newTag,
              })
              let foundTag: Tag = findTag(newTag);
              console.log('idididi', id, foundTag)
              tag = {
                _id: newTag,
                text: newTag,
              }
            }
            setCurrentTag(tag);
            setSelectedTags([...selectedTags, tag])
            console.log('selected', selectedTags);
          } else if (newTag && newTag.text) {
            if (selectedTags.find(tag => tag.text === newTag.text)) {
              return;
            }
            let tagtag = newTag.text;
            var id2 = tags.find(tag => tag.text === tagtag)?._id;
            var tag: Tag;
            // Tag is found?
            if (id2) {
              tag = {
                _id: newTag.text,
                text: newTag.text,
              }
            } else {
              let id = addTag({
                _id: newTag.text,
                text: newTag.text,
              })
              let foundTag: Tag = findTag(newTag.text);
              console.log('idididi', id, foundTag)
              tag = {
                _id: newTag.text,
                text: newTag.text,
              }
            }
            setCurrentTag(tag);
            setSelectedTags([...selectedTags, tag])
            console.log('selected', selectedTags);
          } else {
            return;
            // if (!newTag) {
            //   return;
            // };
            // setCurrentTag(newTag);
            // setSelectedTags([...selectedTags, newTag])
          }
        }}
        filterOptions={(options, params) => {

          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.text);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              _id: '',
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