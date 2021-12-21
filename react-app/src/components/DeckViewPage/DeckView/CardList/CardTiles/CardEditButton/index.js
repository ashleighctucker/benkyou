import React, { useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import { Modal } from '../../../../../../context/Modal';
import EditCardForm from './EditCardForm';
import './EditCardButton.css';

const EditCardButton = ({ card }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <button
        className="edit-card-button"
        onClick={() => setShowEditModal(true)}
      >
        <EditTwoToneIcon />
        Edit Card
      </button>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditCardForm close={() => setShowEditModal(false)} card={card} />
        </Modal>
      )}
    </>
  );
};

export default EditCardButton;
