import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ConfirmDeleteCollection from './ConfirmDeleteCollection';

const DeleteCollectionButton = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <button
        className="deck-view-button"
        onClick={() => setShowDeleteModal(true)}
      >
        <DeleteTwoToneIcon /> Delete Collection
      </button>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <ConfirmDeleteCollection close={() => setShowDeleteModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default DeleteCollectionButton;
