import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './timeline.css';
import TimelineLine from './timeline-line/timeline-line';
import { useParams } from 'react-router';

function Timeline() {
  
  const goalData = [
    {
      '_id': 'foo',
      'title': 'SD Hacks',
      'description': 'Submit a cool project for sd hacks 2022! We want to make Goals, an app for users to create, manage and follow goals. The stack is React, Flask, and MongoDB',
      'creator': 'Udo',
      'start_date': new Date(2022, 11, 17),
      'end_date': new Date(2022, 11, 17),

      'subgoals': ['foo1', 'foo2'],
      '_parentId': "",
      'depth': 0,
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
    },

    {
      '_id': 'bar',
      'title': 'Finish Homework',
      'description': 'Needa do that homework',
      'creator': 'Udo',
      'start_date': new Date(2022, 11, 18),
      'end_date': new Date(2022, 11, 18),

      'subgoals': [],
      '_parentId': "",
      'depth': 0,
      'tags': [],

      'followers': [],
      'follower_count': 4,

      'inspired_goals': [],
    },

    {
      '_id': 'foo2',
      'title': 'Subgoal 2',
      'description': 'This is the second subgoal for sd hacks 2022',
      'creator': 'Udo',
      'start_date': new Date(2021, 10, 4),
      'end_date': new Date(2021, 10, 4),

      'subgoals': [],
      '_parentId': "foo",
      'depth': 1,
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
    },

    {
      '_id': 'buz',
      'title': 'Old Goal',
      'description': 'This is goal has passed',
      'creator': 'Udo',
      'start_date': new Date(2021, 10, 3),
      'end_date': new Date(2021, 10, 3),

      'subgoals': [],
      '_parentId': "",
      'depth': 0,
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
    },

    {
      '_id': 'foo1',
      'title': 'Subgoal 1',
      'description': 'This is the first subgoal for the sd hacks goal',
      'creator': 'Udo',
      'start_date': new Date(2022, 10, 2),
      'end_date': new Date(2022, 10, 2),

      'subgoals': [],
      '_parentId': "foo",
      'depth': 1,
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
    },
  ]

  return (
    <div className='timeline'>
      <h4>This is the timeline</h4>
      <div>
      <TimelineLine
        goalData={goalData}
      ></TimelineLine>
      </div>
    </div>
  )
}

export default Timeline;