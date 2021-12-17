import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginForm from './LoginForm';

const LoginButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowLoginModal(true);
        }}
      >
        Log In
      </button>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginButton;
