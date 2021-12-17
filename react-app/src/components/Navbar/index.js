import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './SignupButton';
import './navbar.css';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <header id="navbar">
      <div id="logo">
        <div id="nav-logo"></div>
        <div id="nav-logo-name">Manabu</div>
      </div>
      <SearchBar />
      <div id="nav-1">
        {sessionUser ? `Hi, ${sessionUser.first_name}!` : <LoginButton />}
      </div>
      <div id="nav-2">{sessionUser ? <LogoutButton /> : <SignupButton />}</div>
    </header>
  );
};

export default NavBar;
