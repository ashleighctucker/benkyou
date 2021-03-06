import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../../store/session';

const MenuList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/new-deck">Create A New Deck</NavLink>
      <NavLink to="/new-collection">Create A New Collection</NavLink>

      <button id="logout-button" onClick={handleLogout}>
        Log Out <ExitToAppIcon id="logout-icon" />
      </button>
    </>
  );
};

export default MenuList;
