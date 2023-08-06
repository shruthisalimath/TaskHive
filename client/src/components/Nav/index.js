import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='nav-bar'>
        <Link to='/'> Profile </Link>
        <Link to='/'> Logout </Link>
    </div>
  );
}

export default Nav;