import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './goal-card.css';
import { Goal } from '../../+types/goal';
import EventIcon from '@mui/icons-material/Event';
import { Tag } from '../../+types/tag';

function GoalCard(props: any) {

  const goal: any = props.goal

  const numTags: number = goal === null ? 0 : goal.tags.length < 3 ? goal.tags.length : 3;
  
  return (
    <div className='goalcard'>
      {
        goal === null ?

        <div className='none-selected'> select a goal for more info </div>

        : <div> 
            <div className={ hasPassed(goal.end_date) ? goal._parentId.length > 0 ? 'old-child' : 'old' : goal._parentId.length > 0 ? 'curr-child' : 'curr'}>{goal.title}</div>
            <div className="stats">
              <div className="event-deadline"><EventIcon style={{ fontSize: 20 }}></EventIcon><div>{formateDate(goal.end_date)}</div></div>
              <div>{goal.follower_count} followers</div>
              <div className="forum-link">forum</div>
            </div>
            <div className="descript-head">Description:</div>
            <div className="description">{goal.description}</div>
            <div className="tag-holder">
              {
                goal.tags.slice(0, numTags).map((tag: Tag, idx: number) => 
                  <div className="tag" key={idx}>{tag.text}</div>
                )
              }
            </div>
            {
              goal.inspired_by !== null ? <div className="inspiredGoal">this goal was inspired by: <span className='inspired-link'>{goal.inspired_by.title}</span></div>

              : <div></div>
            }
            
          </div>
      }
    </div>
  )

  function formateDate(dateString: string) {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1; // Months start at 0!
    const dd = date.getDate();

    return mm + '/' + dd + '/' + yyyy;
  }

  function hasPassed(date: Date) {
    return date < new Date()
  }
}

export default GoalCard;