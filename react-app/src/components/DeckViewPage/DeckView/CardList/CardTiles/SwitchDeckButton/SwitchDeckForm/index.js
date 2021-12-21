import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { switchDeck } from '../../../../../../../store/current_deck';

const SwitchDeckForm = ({ card, close }) => {
  const decks = useSelector((state) => state.my_decks);

  const available_decks = { ...decks };
  delete available_decks[card.deck_id];

  const [deck_id, setDeckId] = useState(available_decks[0]);
  const [errors, setErrors] = useState({});

  const makeOptions = () => {
    let options = [];
    for (let key in available_decks) {
      let option = (
        <option key={key} value={available_decks[key].id}>
          {decks[key].title}
        </option>
      );
      options.push(option);
    }
    return options;
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const data = await dispatch(switchDeck(card.id, deck_id));
    if (data) {
      return setErrors(data.errors);
    }
    close();
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h1>Switch {card.title[0].toUpperCase() + card.title.slice(1)}'s Deck</h1>
      <div className="form-input-containers">
        <label htmlFor="deck_id">New Deck</label>
        <select
          className="dropdown"
          name="deck_id"
          value={deck_id}
          onChange={(e) => setDeckId(e.target.value)}
        >
          {makeOptions()}
        </select>
        <p className="error-display">{errors['deck_id']}</p>
      </div>
      <div className="form-button-containers">
        <button type="submit" className="modal-buttons">
          Switch Deck
        </button>
      </div>
    </form>
  );
};

export default SwitchDeckForm;
