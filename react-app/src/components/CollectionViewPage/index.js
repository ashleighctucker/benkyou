import React from 'react';
import SideBar from '../SideBar';
import CollectionView from './CollectionView';

const CollectionViewPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <CollectionView className="main" />
    </div>
  );
};

export default CollectionViewPage;
