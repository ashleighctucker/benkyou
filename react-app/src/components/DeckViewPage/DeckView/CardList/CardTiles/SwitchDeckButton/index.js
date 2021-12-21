import React, { useState } from 'react';
import SwitchAccessShortcutTwoToneIcon from '@mui/icons-material/SwitchAccessShortcutTwoTone';

import { Modal } from '../../../../../../context/Modal';
import SwitchDeckForm from './SwitchDeckForm';

const SwitchDeckButton = ({ card }) => {
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  return (
    <>
      <button
        className="edit-card-button"
        onClick={() => setShowSwitchModal(true)}
      >
        <SwitchAccessShortcutTwoToneIcon />
        Switch Deck
      </button>
      {showSwitchModal && (
        <Modal onClose={() => setShowSwitchModal(false)}>
          <SwitchDeckForm card={card} close={() => setShowSwitchModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default SwitchDeckButton;
