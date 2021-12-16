import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <form id="search-bar">
      <div id="search">
        <input id="search-input" type="text" name="search"></input>
        <SearchIcon id="search-nav" />
      </div>
    </form>
  );
};

export default SearchBar;
