import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../store/session';

const MenuList = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <NavLink to="/profile">Profile</NavLink>

      <NavLink to="/my-decks">My Decks</NavLink>
      <NavLink to="/new-deck">Create A New Deck</NavLink>

      <NavLink to="/my-decks">My Lists</NavLink>
      <NavLink to="/new-deck-list">Create A New List</NavLink>

      <button id="logout-button" onClick={handleLogout}>
        Log Out <ExitToAppIcon id="logout-icon" />
      </button>
    </>
  );
};

export default MenuList;
