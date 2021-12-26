import React from 'react';
import SideBar from '../SideBar';
import DecklistStudyView from './DecklistStudyView';

const StudyDecklistPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <DecklistStudyView className="main" />
    </div>
  );
};

export default StudyDecklistPage;
