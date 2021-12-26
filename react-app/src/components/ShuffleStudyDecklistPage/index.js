import React from 'react';
import SideBar from '../SideBar';
import ShuffleStudyDecklistView from './ShuffleStudyDecklistView';

const ShuffleStudyDecklistPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <ShuffleStudyDecklistView className="main" />
    </div>
  );
};

export default ShuffleStudyDecklistPage;
