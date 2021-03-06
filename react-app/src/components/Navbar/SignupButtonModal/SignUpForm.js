import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp, login } from '../../../store/session';
import '../LoginButtonModal/LoginForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [first_name, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors({});
    if (password !== repeatPassword) {
      setErrors({ repeat_password: 'Passwords do not match.' });
    }
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, first_name, email, password)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const demoLogin = async () => {
    await dispatch(login('benkyou@benkyou.com', 'password'));
  };

  return (
    <form className="auth-form" onSubmit={onSignUp}>
      <h1>
        Sign Up for <span className="logo-name">benkyou</span>
      </h1>
      <div className="form-input-containers">
        <label htmlFor="first_name">First Name</label>
        <input
          className="form-inputs"
          type="text"
          name="first_name"
          onChange={(e) => setFirstName(e.target.value)}
          value={first_name}
        ></input>
        <p className="error-display">{errors['first_name']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="user_name">User Name</label>
        <input
          className="form-inputs"
          type="text"
          name="user_name"
          onChange={updateUsername}
          value={username}
          autoComplete="username"
        ></input>
        <p className="error-display">{errors['user_name']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="email">Email</label>
        <input
          className="form-inputs"
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          autoComplete="email"
        ></input>
        <p className="error-display">{errors['email']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="password">Password</label>
        <input
          className="form-inputs"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          autoComplete="new-password"
        ></input>
        <p className="error-display">{errors['password']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="repeat_password">Confirm Password</label>
        <input
          className="form-inputs"
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          autoComplete="new-password"
        ></input>
        <p className="error-display">{errors['repeat_password']}</p>
      </div>
      <div className="form-button-containers">
        <button className="form-submit-button" type="submit">
          Sign Up
        </button>
      </div>
      <span>or</span>
      <div className="form-redirect" onClick={demoLogin}>
        Log In to Demo Account
      </div>
    </form>
  );
};

export default SignUpForm;
