import React from 'react';
import { useDispatch } from 'react-redux';

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { deleteCard } from '../../../../../../../store/current_deck';

const ConfirmDeleteCard = ({ close, card }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteCard(card.id));
    close();
  };

  return (
    <div className="modal-form">
      <h2>Are you sure you want to delete your card?</h2>
      <h3>Card Title: {card.title}</h3>
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

export default ConfirmDeleteCard;
