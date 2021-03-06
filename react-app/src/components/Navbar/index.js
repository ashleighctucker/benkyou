import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchBar from './SearchBar';
import LoginButtonModal from './LoginButtonModal';
import ProfileDropdown from './ProfileDropdown';
import SignupButtonModal from './SignupButtonModal';

import './navbar.css';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const hello = () => {
    if (sessionUser.first_name.length > 10) {
      return (
        <p id="hello">Hey there, {sessionUser.first_name.slice(0, 11)}!</p>
      );
    } else {
      return <p id="hello">Hey there, {sessionUser.first_name}!</p>;
    }
  };

  return (
    <header id="navbar">
      <div id="logo">
        <div id="nav-logo"></div>
        <div onClick={() => history.push('/')} id="nav-logo-name">
          勉強 benkyou
        </div>
      </div>
      <SearchBar />
      <div id="nav-1">
        {sessionUser ? <ProfileDropdown /> : <LoginButtonModal />}
      </div>
      <div id="nav-2">{sessionUser ? hello() : <SignupButtonModal />}</div>
    </header>
  );
};

export default NavBar;
