import React from 'react';

import SideBar from '../SideBar';
import NewCardForm from './NewCardForm';

const NewCardPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <NewCardForm className="main" />
    </div>
  );
};

export default NewCardPage;
