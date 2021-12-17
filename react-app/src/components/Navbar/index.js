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
    <nav id="navbar">
      <div id="nav-logo"></div>
      <div id="nav-logo-name">Manabu</div>
      <div>
        <SearchBar />
      </div>
      <div>
        {sessionUser ? `Hi, ${sessionUser.first_name}!` : <LoginButton />}
      </div>
      <div>{sessionUser ? <LogoutButton /> : <SignupButton />}</div>
    </nav>
  );
};

export default NavBar;
