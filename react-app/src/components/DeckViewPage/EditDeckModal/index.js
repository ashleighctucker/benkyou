import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditDeckForm from './EditDeckForm';

const EditDeckModal = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowEditModal(true)}>Edit Deck</button>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditDeckForm close={() => setShowEditModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default EditDeckModal;
