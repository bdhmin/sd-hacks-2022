import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Goal } from '../../../+types/goal';
import './line-node.css';
import CheckIcon from '@mui/icons-material/Check';

function LineNode(props: any) {
  
  const goal: Goal = props.goal;
  const passed = goal.end_date < new Date()



  return (
    <div className='line-node'>
        <div className="vert-bar"></div>
        {
            passed ?
            <div className="ball checked">
                <CheckIcon/>
            </div>
            :
            <div className="ball todo"></div>
        }
        {
            passed ?

                goal._parentId.length > 0 
                
                    ?
                    <div className="passed-child">
                        <div className="title">{ goal.title }</div>
                        <div className="desc">{ goal.description }</div>
                    </div>

                    :
                    <div className="passed">
                        <div className="title">{ goal.title }</div>
                        <div className="desc">{ goal.description }</div>
                    </div>


            :

                goal._parentId.length > 0 
                    
                ?
                <div className="current-child">
                    <div className="title">{ goal.title }</div>
                    <div className="desc">{ goal.description }</div>
                </div>

                :
                <div className="current">
                    <div className="title">{ goal.title }</div>
                    <div className="desc">{ goal.description }</div>
                </div>
        }
    </div>
  )
}

export default LineNode;