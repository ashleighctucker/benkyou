import React from 'react';
import SideBar from '../SideBar';
import NewDecklistForm from './NewDeckListForm';

const NewDeckListPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <NewDecklistForm className="main" />
    </div>
  );
};

export default NewDeckListPage;
