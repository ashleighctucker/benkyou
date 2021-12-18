import React from 'react';
import MenuList from './MenuList';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import './profile.css';
import '../LoginButton/LoginForm.css';

const ProfileButton = () => {
  return (
    <div className="dropdown">
      <div id="nav-profile">
        <FaceTwoToneIcon id="profile-logo" />
      </div>
      <div className="dropdown-content">
        <MenuList />
      </div>
    </div>
  );
};

export default ProfileButton;
