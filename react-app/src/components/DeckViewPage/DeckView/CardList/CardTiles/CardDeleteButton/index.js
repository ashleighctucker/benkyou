import React, { useState } from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { Modal } from '../../../../../../context/Modal';
import ConfirmDeleteCard from './ConfirmDeleteCard';

const DeleteCardButton = ({ card }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <button
        className="edit-card-button"
        onClick={() => setShowDeleteModal(true)}
      >
        <DeleteTwoToneIcon />
        Delete Card
      </button>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <ConfirmDeleteCard
            card={card}
            close={() => setShowDeleteModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default DeleteCardButton;
