import React from 'react';
import SideBar from '../SideBar';
import SearchResultsView from './SearchResultsView';

const SearchResultsPage = () => {
  return (
    <div className="main-grid main-page-grid-container">
      <SideBar className="side" />
      <SearchResultsView />
    </div>
  );
};

export default SearchResultsPage;
