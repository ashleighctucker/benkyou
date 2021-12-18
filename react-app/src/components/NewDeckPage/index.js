import React from 'react';
import SideBar from '../SideBar';
import NewDeckForm from '../NewDeckForm';
import './NewDeckPage.css';

const NewDeckPage = () => {
  return (
    <div className="main-page-grid-container">
      <SideBar className="side" />
      <NewDeckForm className="main" />
    </div>
  );
};

export default NewDeckPage;
