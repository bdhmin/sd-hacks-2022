import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Goal } from '../../../+types/goal';
import './timeline-line.css';
import LineNode from '../line-node/line-node';

function TimelineLine(props: any) {
  const goals: Goal[] = props.goalData;

  goals.sort((a: Goal, b: Goal) => {
    return a.end_date < b.end_date ? -1 : a.end_date === b.end_date ? 0 : 1;
  });

  return (
    <div className='timeline-line'>
        {
            goals.map((goal: Goal, idx: number) => {
                return <LineNode goal={goal} key={idx} setGoal={props.setGoal}></LineNode>
            })
        }
    </div>
  )
}

export default TimelineLine;