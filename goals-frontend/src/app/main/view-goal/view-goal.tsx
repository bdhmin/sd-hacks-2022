import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './view-goal.css';
import { Goal } from '../../+types/goal'
import TimelineLine from '../timeline/timeline-line/timeline-line';
import GoalCard from '../../shared/goal-card/goal-card';

function ViewGoal() {
    const [currGoal, setCurrGoal] = useState<any>(null);

    const goal: any = {
        '_id': 'foo',
        '_creatorId': null,
        '_parentId': 'foo',

        'title': 'SD Hacks',
        'description': 'Submit a cool project for sd hacks 2022! We want to make Goals, an app for users to create, manage and follow goals. The stack is React, Flask, and MongoDB',
        'start_date': new Date(),
        'end_date': new Date(),

        'subgoals': [
            {'_id': 'bar',
             '_creatorId': null,
            'title': 'Finish Homework',
            'description': 'Needa do that homework',
            'start_date': new Date(2022, 11, 18),
            'end_date': new Date(2022, 11, 18),
      
            'subgoals': [],
            '_parentId': "",
            'depth': 0,
            'tags': [],
      
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
                'start_date': new Date(2022, 10, 4),
                'end_date': new Date(2022, 10, 4),
          
                'subgoals': [],
                '_parentId': "",
                'depth': 0,
                'tags': [],
          
                'followers': [],
                'follower_count': 0,
          
                'inspired_goals': [],
                'inspired_by': null,
              }
        ],
        'depth': 0,
        'tags': ['fdjka', 'jfdkas;'],

        'followers': [],
        'follower_count': 0,
        'inspired_goals': [],
        'inspired_by': null
    }

    const goalData = [goal];
    
    const subgoals:Goal[] = goal.subgoals;
    const tags:string[] = goal.tags;

    for (var g of subgoals) {
        goalData.push(g);
    }

    return(
        <div className='view-goal'>
            <div className="header">{goal.title}</div>
            <div className="content">
            <TimelineLine
                goalData={goalData}
                setGoal={setCurrGoal}
            ></TimelineLine>
            {
                currGoal === null ? 
                <GoalCard goal={currGoal}></GoalCard>
                : <GoalCard goal={currGoal}></GoalCard>
            }
      </div>
        </div>
    );
}

export default ViewGoal