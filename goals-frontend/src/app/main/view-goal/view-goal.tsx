import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './view-goal.css';
import { Goal } from '../../+types/goal'
import TimelineLine from '../timeline/timeline-line/timeline-line';
import GoalCard from '../../shared/goal-card/goal-card';
import { Tag } from '../../+types/tag';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ViewGoal(props: any) {
    const [currGoal, setCurrGoal] = useState<any>(null);

    const location = useLocation();
    const state : any = location.state;
    const goal: any = state.data;

    console.log(Object.keys(goal['data']));

    let go: Goal = {
        _id: goal['data']['_id'],
        _creatorId: goal['data']['_creatorId'],
        _parentId: goal['data']['_parentId'],
        title: goal['data']['title'],
        description: goal['data']['description'],
        start_date: goal['data']['start_date'],
        end_date: goal['data']['end_date'],
        subgoals: goal['data']['subgoals'],
        depth: goal['data']['depth'],
        tags: goal['data']['tags'],
        followers: goal['data']['followers'],
        follower_count: goal['data']['follower_count'],
        inspired_goals: goal['data']['inspired_goals'],
        inspired_by: goal['data']['inspired_by'],
    }

    const goalData = [go];
    
    const subgoals:Goal[] = go.subgoals;
    if (subgoals.length > 0)
    {
        for (var g of subgoals) {
            goalData.push(g);
        } 
    
    }
    
    return(
        <div className='view-goal'>
            <div className="header">{go.title}</div>
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
