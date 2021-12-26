import React from 'react';
import SideBar from '../SideBar';
import DeckListView from './DeckListView';

const DeckListViewPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <DeckListView className="main" />
    </div>
  );
};

export default DeckListViewPage;
