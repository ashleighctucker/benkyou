import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from './SearchBar';
import './navbar.css';

const NavBar = () => {
  return (
    <nav id="navbar">
      <div id="nav-logo"></div>
      <div id="nav-logo-name">Manabu</div>
      <div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
