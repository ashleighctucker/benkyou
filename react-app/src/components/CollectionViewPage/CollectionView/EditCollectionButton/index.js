import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EditCollectionForm from './EditCollectionForm';

const EditCollectionButton = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <button
        className="deck-view-button"
        onClick={() => setShowEditModal(true)}
      >
        <EditTwoToneIcon />
        Edit Collection 
      </button>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditCollectionForm close={() => setShowEditModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default EditCollectionButton;
