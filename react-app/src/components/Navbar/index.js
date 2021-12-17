import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';
import './navbar.css';

const NavBar = () => {
  return (
    <nav id="navbar">
      <div id="nav-logo"></div>
      <div id="nav-logo-name">Manabu</div>
      <div>
        <SearchBar />
      </div>
      <div>
        <LoginButton />
      </div>
    </nav>
  );
};

export default NavBar;
