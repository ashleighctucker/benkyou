import React from 'react';
import { useSelector } from 'react-redux';

import SearchBar from './SearchBar';
import LoginButtonModal from './LoginButtonModal';
import ProfileDropdown from './ProfileDropdown';
import SignupButtonModal from './SignupButtonModal';

import './Navbar.css';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const hello = () => {
    if (sessionUser.first_name.length > 10) {
      return <p>Hey there, {sessionUser.first_name.slice(0, 11)}!</p>;
    } else {
      return <p>Hey there, {sessionUser.first_name}!</p>;
    }
  };

  return (
    <header id="navbar">
      <div id="logo">
        <div id="nav-logo"></div>
        <div id="nav-logo-name">勉強 benkyou</div>
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
