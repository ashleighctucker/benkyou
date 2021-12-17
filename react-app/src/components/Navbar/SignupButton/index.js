import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';

const SignupButton = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <button
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

export default SignupButton;
