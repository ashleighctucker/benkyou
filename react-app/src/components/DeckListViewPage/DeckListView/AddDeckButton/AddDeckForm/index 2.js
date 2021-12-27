import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardCommandKeyTwoToneIcon from '@mui/icons-material/KeyboardCommandKeyTwoTone';
import KeyboardControlKeyTwoToneIcon from '@mui/icons-material/KeyboardControlKeyTwoTone';

import { searchDecks } from '../../../../../store/search';
import { addDeckToDeckList } from '../../../../../store/current_list';

const AddDeckForm = ({ close }) => {
  const curr_list = useSelector((state) => state.current_list);
  const results = useSelector((state) => state.search_results);
  const curr_decks = curr_list['decks'];

  const [term, setTerm] = useState('');
  const [decks_to_add, setDecksToAdd] = useState([]);
  const [errors, setErrors] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [searched, setSearched] = useState(false);

  const available_decks = [];
  for (let key in results) {
    if (!curr_decks[key]) {
      available_decks.push(results[key]);
    }
  }


  useEffect(() => {
    if (searched && available_decks.length === 0) {
      setSearchError('All decks matching this search in list.');
    }
  }, [available_decks.length, searched]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let dispatchErrors = [];
    decks_to_add.forEach(async (deck) => {
      let data = await dispatch(addDeckToDeckList(curr_list.id, deck));
      if (data) {
        dispatchErrors.push(data['errors']);
      }
    });
    if (dispatchErrors.length > 0) {
      setErrors(dispatchErrors);
    }
    window.location.reload();
  };

  const handleSearch = async () => {
    setSearchError('');
    const data = await dispatch(searchDecks(term));
    setSearched(searched ? true : true);
    if (data) {
      return setSearchError(data.message);
    }
  };

  return (
    <>
      <div>
        <form className="modal-form">
          <div className="form-input-containers">
            <label htmlFor="search">
              Find Decks to Add to {curr_list.title}
            </label>
            <div id="search">
              <input
                placeholder="ex: Nouns"
                id="search-input"
                type="text"
                name="search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <SearchIcon id="search-nav" onClick={handleSearch} />
            </div>
            <p className="error-display">{searchError}</p>
          </div>
        </form>
      </div>
      <div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-input-containers">
            <label htmlFor="decks_to_add">Add Decks to List:</label>
            <select
              name="decks_to_add"
              value={decks_to_add}
              onChange={(e) =>
                setDecksToAdd(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
            >
              {available_decks?.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.title} by {deck.creator}
                </option>
              ))}
            </select>
            <span style={{ fontSize: '90%' }}>
              (<KeyboardCommandKeyTwoToneIcon style={{ fontSize: '90%' }} /> or{' '}
              <KeyboardControlKeyTwoToneIcon style={{ fontSize: '90%' }} /> to
              add multiple decks)
            </span>
            {errors?.map((error) => (
              <p className="error-display">{error}</p>
            ))}
          </div>
          <div className="form-button-containers">
            <button type="submit" className="modal-buttons">
              Add Decks
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDeckForm;
