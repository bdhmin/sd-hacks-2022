import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './timeline.css';
import TimelineLine from './timeline-line/timeline-line';
import { useParams } from 'react-router';

function Timeline() {
  const userId = localStorage.getItem('currentUserId');

  const goalData = [
    {
      '_id': 'foo',
      'title': 'SD Hacks',
      'description': 'Submit a cool project for sd hacks 2022! We want to make Goals, an app for users to create, manage and follow goals. The stack is React, Flask, and MongoDB',
      'creator': 'Udo',
      'start_date': new Date(),
      'end_date': new Date(),

      'subgoals': [],
      '_parentId': "",
      'depth': 0,
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
    },

    {
      '_id': 'foo',
      'title': 'SD Hacks',
      'description': 'Submit a cool project for sd hacks 2022! We want to make Goals, an app for users to create, manage and follow goals. The stack is React, Flask, and MongoDB',
      'creator': 'Udo',
      'start_date': new Date(),
      'end_date': new Date(),

      'subgoals': [],
      '_parentId': "",
      'depth': 0,
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
    },

    {
      '_id': 'foo',
      'title': 'SD Hacks',
      'description': 'Submit a cool project for sd hacks 2022! We want to make Goals, an app for users to create, manage and follow goals. The stack is React, Flask, and MongoDB',
      'creator': 'Udo',
      'start_date': new Date(),
      'end_date': new Date(),

      'subgoals': [],
      '_parentId': "",
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
    },

    {
      '_id': 'foo',
      'title': 'SD Hacks',
      'description': 'Submit a cool project for sd hacks 2022! We want to make Goals, an app for users to create, manage and follow goals. The stack is React, Flask, and MongoDB',
      'creator': 'Udo',
      'start_date': new Date(),
      'end_date': new Date(),

      'subgoals': [],
      '_parentId': "",
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
    },
  ]

  return (
    <div className='timeline'>
      <h4>This is the timeline</h4>
      <TimelineLine></TimelineLine>
    </div>
  )
}

export default Timeline;