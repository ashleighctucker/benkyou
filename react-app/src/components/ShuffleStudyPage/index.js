import React from 'react';
import SideBar from '../SideBar';

import ShuffleStudyView from './ShuffleStudyView';

const ShuffleStudyDeckPage = () => {
  return (
    <div className="main-page-grid-container">
      <SideBar className="side" />
      <ShuffleStudyView />
    </div>
  );
};

export default ShuffleStudyDeckPage;
