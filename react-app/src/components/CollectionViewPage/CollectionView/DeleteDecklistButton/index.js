import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ConfirmDeleteList from './ConfirmDeleteList';

const DeleteDecklistModal = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <button
        className="deck-view-button"
        onClick={() => setShowDeleteModal(true)}
      >
        <DeleteTwoToneIcon /> Delete Deck List
      </button>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <ConfirmDeleteList close={() => setShowDeleteModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default DeleteDecklistModal;
