import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginForm from './LoginForm';

const LoginButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <button
        id="nav-login"
        className="nav-buttons"
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
