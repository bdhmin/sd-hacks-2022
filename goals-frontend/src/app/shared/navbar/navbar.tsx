import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './navbar.css';
import { Link, useParams } from 'react-router-dom';
import { User } from '../../+types/user';

function Navbar() {
  const userId = localStorage.getItem('currentUserId');
  // Does not get updated instantly, but on change, userId will be up to date.

  return userId ? (
    <div className='navbar'>
      <h2>Marathon</h2>
      {/* <p>{ userId }</p> */}
      <Link to={'/timeline/'}>Timeline</Link>
      <Link to={'/create-goal/'}>Create a Goal</Link>
      <Link to={'/explore/'}>Explore Goals</Link>
    </div>
  ) : (
    <Link to='/'></Link>
  )
}

export default Navbar;