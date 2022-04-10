import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './explore.css';
import { Goal } from '../../+types/goal';

function Explore() {

    const [goals, setGoals] = useState<Goal[]>([]);

    // get all goals where creator is not equal to current user

    // get all tags

    // if the user is filtering by tags, filter goals by tag

}

export default Explore