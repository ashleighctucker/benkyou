import React from 'react';
import SideBar from '../SideBar';
import CollectionStudyView from './CollectionStudyView';

const StudyCollectionPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <CollectionStudyView className="main" />
    </div>
  );
};

export default StudyCollectionPage;
