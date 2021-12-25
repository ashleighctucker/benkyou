import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import AddDeckForm from './AddDeckForm';

const AddDeckButton = () => {
  const [showAddDeckModal, setShowAddDeckModal] = useState(false);

  return (
    <>
      <button
        className="deck-view-button"
        onClick={() => setShowAddDeckModal(true)}
      >
        <AddCircleTwoToneIcon />
        Add Deck
      </button>
      {showAddDeckModal && (
        <Modal onClose={() => setShowAddDeckModal(false)}>
          <AddDeckForm close={() => setShowAddDeckModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddDeckButton;
