import React from 'react';
import MenuList from './MenuList';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import './ProfileDropdown.css';
import '../LoginButtonModal/LoginForm.css';

const ProfileDropdown = () => {
  return (
    <div className="dropdown">
      <div id="nav-profile">
        <MenuIcon id="profile-logo" />
        {/* <FaceTwoToneIcon id="profile-logo" /> Menu */}
      </div>
      <div className="dropdown-content">
        <MenuList />
      </div>
    </div>
  );
};

export default ProfileDropdown;
