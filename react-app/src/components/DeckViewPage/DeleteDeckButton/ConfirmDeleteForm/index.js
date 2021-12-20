import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { deleteDeck } from '../../../../store/my_decks';
import './DeleteForm.css';

const ConfirmDeleteForm = ({ close }) => {
  const current_deck = useSelector((state) => state.current_deck);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = async () => {
    await dispatch(deleteDeck(current_deck.id));
    history.push('/');
  };

  return (
    <div className="modal-form">
      <h2>Are you sure you want to delete your deck?</h2>
      <h3>Deck Title: {current_deck.title}</h3>
      <button id="delete-button" onClick={handleDelete}>
        <DeleteForeverTwoToneIcon /> Confirm Delete
      </button>
      <span id="delete-message">This action cannot be reversed.</span>
      <button id="cancel-delete" onClick={() => close()}>
        Cancel
      </button>
    </div>
  );
};

export default ConfirmDeleteForm;
