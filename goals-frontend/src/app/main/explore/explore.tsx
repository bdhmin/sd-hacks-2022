import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './explore.css';
import { Goal } from '../../+types/goal';
import { Tag } from '../../+types/tag';
import { Autocomplete, TextField } from '@mui/material';

function Explore() {

    const [goals, setGoals] = useState<Goal[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [filteredTags, setFilteredTags] = useState<string[]>([]);

    const tagData = ['education', 'hackathon', 'computer science', 'learning', 'homework', 'school']

    const goalData = [
        {
          '_id': 'foo',
          'title': 'SD Hacks',
          'description': 'Submit a cool project for sd hacks 2022! We want to make Goals, an app for users to create, manage and follow goals. The stack is React, Flask, and MongoDB',
          '_creatorId': 'Udo',
          'start_date': new Date(2022, 11, 17),
          'end_date': new Date(2022, 11, 17),
    
          'subgoals': [],
          '_parentId': "",
          'depth': 0,
          'tags': ['education', 'hackathon', 'computer science', 'learning'],
    
          'followers': [],
          'follower_count': 0,
    
          'inspired_goals': [],
          'inspired_by': null,
        },
    
        {
          '_id': 'bar',
          'title': 'Finish Homework',
          'description': 'Needa do that homework',
          '_creatorId': 'Udo',
          'start_date': new Date(2022, 11, 18),
          'end_date': new Date(2022, 11, 18),
    
          'subgoals': [],
          '_parentId': "",
          'depth': 0,
          'tags': ['homework', 'school', 'learning'],
    
          'followers': [],
          'follower_count': 4,
    
          'inspired_goals': [],
          'inspired_by': null,
        },
    
        {
          '_id': 'foo2',
          'title': 'Not Subgoal 2',
          'description': 'This is the second subgoal for sd hacks 2022',
          '_creatorId': 'Udo',
          'start_date': new Date(2021, 10, 4),
          'end_date': new Date(2021, 10, 4),
    
          'subgoals': [],
          '_parentId': "",
          'depth': 0,
          'tags': [],
    
          'followers': [],
          'follower_count': 0,
    
          'inspired_goals': [],
          'inspired_by': null,
        },
    
        {
          '_id': 'buz',
          'title': 'Old Goal',
          'description': 'This is goal has passed',
          '_creatorId': 'Udo',
          'start_date': new Date(2021, 10, 3),
          'end_date': new Date(2021, 10, 3),
    
          'subgoals': [],
          '_parentId': "",
          'depth': 0,
          'tags': [],
    
          'followers': [],
          'follower_count': 0,
    
          'inspired_goals': [],
          'inspired_by': null,
        },
    
        {
          '_id': 'foo1',
          'title': 'Not Subgoal 1',
          'description': 'This is the first subgoal for the sd hacks goal',
          '_creatorId': 'Udo',
          'start_date': new Date(2022, 10, 2),
          'end_date': new Date(2022, 10, 2),
    
          'subgoals': [],
          '_parentId': "",
          'depth': 0,
          'tags': [],
    
          'followers': [],
          'follower_count': 0,
    
          'inspired_goals': [],
          'inspired_by': null,
        },
      ]

    useEffect(() => {
      // get all goals where creator is not equal to current user
      setGoals(goalData)
  
      // get all tags
      setTags(tagData);

    }, [])

    // if the user is filtering by tags, filter goals by tag

    return (
      <div className="explore">
        <Autocomplete
          multiple
          id="tags-outlined"
          options={tags}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="FilterGoals"
              placeholder="Labels"
            />
          )}
          onChange={(_event, newTags) => {
            setFilteredTags(newTags);
          }}
        />
      </div>
    )

}

export default Explore