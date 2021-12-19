import React from 'react';
import MenuList from './MenuList';
import MenuIcon from '@mui/icons-material/Menu';
import './ProfileDropdown.css';
import '../LoginButtonModal/LoginForm.css';

const ProfileDropdown = () => {
  return (
    <div className="dropdown">
      <div id="nav-profile">
        <MenuIcon id="profile-logo" />
      </div>
      <div className="dropdown-content">
        <MenuList />
      </div>
    </div>
  );
};

export default ProfileDropdown;
