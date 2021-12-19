import React from 'react';
import { useSelector } from 'react-redux';

import SearchBar from './SearchBar';
import LoginButtonModal from './LoginButtonModal';
import ProfileDropdown from './ProfileDropdown';
import SignupButtonModal from './SignupButtonModal';

import './Navbar.css';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <header id="navbar">
      <div id="logo">
        <div id="nav-logo"></div>
        <div id="nav-logo-name">勉強 benkyou</div>
      </div>
      <div id="nav-1">
        {sessionUser ? `Hi, ${sessionUser.first_name}!` : <LoginButtonModal />}
      </div>
      <div id="nav-2">
        {sessionUser ? <ProfileDropdown /> : <SignupButtonModal />}
      </div>
      <SearchBar />
    </header>
  );
};

export default NavBar;
