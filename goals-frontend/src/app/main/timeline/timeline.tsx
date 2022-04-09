import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './timeline.css';

function Timeline() {
  const userId = localStorage.getItem('currentUserId');

  return (
    <div className='timeline'>
      <h2>Timeline</h2>
      <h4>Current user: {userId}</h4>
    </div>
  )
}

export default Timeline;