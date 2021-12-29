import React from 'react';
import SideBar from '../SideBar';
import ProfileView from './ProfileView';

const ProfilePage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <ProfileView />
    </div>
  );
};

export default ProfilePage;
