import React from 'react';
import SideBar from '../SideBar';

import StudyView from './StudyView';

const StudyDeckPage = () => {
  return (
    <div className="main-page-grid-container">
      <SideBar className="side" />
      <StudyView />
    </div>
  );
};

export default StudyDeckPage;
