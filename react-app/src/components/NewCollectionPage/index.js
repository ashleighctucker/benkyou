import React from 'react';
import SideBar from '../SideBar';
import NewCollectionForm from './NewCollectionForm';

const NewCollectionPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <NewCollectionForm className="main" />
    </div>
  );
};

export default NewCollectionPage;
