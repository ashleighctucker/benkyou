import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../store/session';

const MenuList = ({ close }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    close();
  };

  return (
    <>
      <NavLink to="/profile">Profile</NavLink>

      <NavLink to="/my-decks">My Decks</NavLink>

      <NavLink to="/my-decks">My Lists</NavLink>

      <NavLink to="/new-deck">Create A New Deck</NavLink>

      <button onClick={handleLogout}>Log Out</button>
    </>
  );
};

export default MenuList;
