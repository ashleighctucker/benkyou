import React from 'react';
import SideBar from '../SideBar';
import NewDeckForm from './NewDeckForm';

const NewDeckPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <NewDeckForm className="main" />
    </div>
  );
};

export default NewDeckPage;
