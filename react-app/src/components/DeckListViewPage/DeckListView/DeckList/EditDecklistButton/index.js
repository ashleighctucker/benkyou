import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EditDecklistForm from './EditDecklistForm';

const EditDeckListModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <button
        className="deck-view-button"
        onClick={() => setShowEditModal(true)}
      >
        <EditTwoToneIcon />
        Edit Deck List Details
      </button>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditDecklistForm close={() => setShowEditModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default EditDeckListModal;
