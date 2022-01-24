import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { searchDecks } from '../../../store/search';

const SearchBar = () => {
  const [term, setTerm] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();
    await dispatch(searchDecks(term));
    history.push(`/benkyou/search-results/${term}`);
  };

  return (
    <form id="search-bar" onSubmit={handleSearch}>
      <div id="search">
        <input
          id="search-input"
          type="text"
          value={term}
          placeholder="Search Decks"
          onChange={(e) => setTerm(e.target.value)}
          name="search"
        ></input>
        <SearchIcon id="search-nav" onClick={handleSearch} />
      </div>
    </form>
  );
};

export default SearchBar;
