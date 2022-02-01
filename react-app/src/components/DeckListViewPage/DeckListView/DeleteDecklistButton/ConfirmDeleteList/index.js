import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { deleteDecklist } from '../../../../../store/collections';

const ConfirmDeleteList = ({ close }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const list = useSelector((state) => state.current_list);

  const handleDelete = async () => {
    await dispatch(deleteDecklist(list.id));
    history.push('/');
  };

  return (
    <div className="modal-form">
      <h2>Are you sure you want to delete your deck list?</h2>
      <h3>Deck List Title: {list.title}</h3>
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

export default ConfirmDeleteList;
