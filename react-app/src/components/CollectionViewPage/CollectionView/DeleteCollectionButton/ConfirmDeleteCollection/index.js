import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { deleteCollection } from '../../../../../store/collections';

const ConfirmDeleteCollection = ({ close }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const list = useSelector((state) => state.current_collection);

  const handleDelete = async () => {
    await dispatch(deleteCollection(list.id));
    history.push('/');
  };

  return (
    <div className="modal-form">
      <h2>Are you sure you want to delete your collection?</h2>
      <h3>Collection Title: {list.title}</h3>
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

export default ConfirmDeleteCollection;
