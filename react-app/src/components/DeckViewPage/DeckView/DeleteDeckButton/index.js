import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ConfirmDeleteForm from './ConfirmDeleteForm';

const DeleteDeckModal = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <button
        className="deck-view-button"
        onClick={() => setShowDeleteModal(true)}
      >
        <DeleteTwoToneIcon /> Delete Deck
      </button>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <ConfirmDeleteForm close={() => setShowDeleteModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default DeleteDeckModal;
