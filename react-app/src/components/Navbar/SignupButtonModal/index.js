import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';

const SignupButtonModal = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <button
        id="nav-signup"
        className="nav-buttons"
        onClick={() => {
          setShowSignupModal(true);
        }}
      >
        Sign Up
      </button>
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
};

export default SignupButtonModal;
