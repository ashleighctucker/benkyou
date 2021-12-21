import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EditDeckForm from './EditDeckForm';

const EditDeckModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      <button
        className="deck-view-button"
        onClick={() => setShowEditModal(true)}
      >
        <EditTwoToneIcon />
        Edit Deck Details
      </button>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditDeckForm close={() => setShowEditModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default EditDeckModal;
