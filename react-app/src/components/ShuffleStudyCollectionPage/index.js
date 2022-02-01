import React from 'react';
import SideBar from '../SideBar';
import ShuffleStudyCollectionView from './ShuffleStudyCollectionView';

const ShuffleStudyCollectionPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <ShuffleStudyCollectionView className="main" />
    </div>
  );
};

export default ShuffleStudyCollectionPage;
